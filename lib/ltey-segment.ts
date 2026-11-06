/** LTEY AI segment in the Resend account. Override with RESEND_LTEY_SEGMENT_ID. */
const LTEY_SEGMENT_ID =
  process.env.RESEND_LTEY_SEGMENT_ID?.trim() || "16a70ff2-04d9-4453-8221-2fef6a5254be"

interface ResendResult {
  ok: boolean
  status: number
  message: string
}

function splitName(name: string) {
  const parts = name.split(/\s+/).filter(Boolean)
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  }
}

function contactAlreadyExists(result: ResendResult) {
  const message = result.message.toLowerCase()
  return result.status === 409 || message.includes("already exists") || message.includes("already in")
}

async function resendJson(path: string, method: string, body?: unknown): Promise<ResendResult> {
  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, status: 503, message: "Email service not configured" }

  const response = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  let message = ""
  try {
    const payload = (await response.json()) as { message?: unknown }
    message = typeof payload.message === "string" ? payload.message : ""
  } catch {
    message = ""
  }

  return { ok: response.ok, status: response.status, message }
}

export interface LteyContact {
  email: string
  name: string
  audience: "individual" | "group"
  organisation: string
}

/** Resend contact properties. An individual registration clears a previous organisation. */
function contactProperties(contact: LteyContact) {
  return {
    training_type: contact.audience,
    organisation: contact.audience === "group" ? contact.organisation : null,
  }
}

/** Create the contact in the LTEY AI segment, or add them if they already exist. */
export async function addLteyInterest(contact: LteyContact): Promise<ResendResult> {
  const email = contact.email.toLowerCase()
  const { firstName, lastName } = splitName(contact.name)
  const properties = contactProperties(contact)
  const created = await resendJson("/contacts", "POST", {
    email,
    first_name: firstName,
    ...(lastName ? { last_name: lastName } : {}),
    unsubscribed: false,
    properties,
    segments: [{ id: LTEY_SEGMENT_ID }],
  })

  if (created.ok || created.status === 503) return created
  if (!contactAlreadyExists(created)) return created

  const encoded = encodeURIComponent(email)
  const added = await resendJson(`/contacts/${encoded}/segments/${LTEY_SEGMENT_ID}`, "POST")
  if (!added.ok && !contactAlreadyExists(added)) return added

  // A repeat registration is a fresh opt-in, so the name, choice, and subscription stay current.
  const updated = await resendJson(`/contacts/${encoded}`, "PATCH", {
    first_name: firstName,
    ...(lastName ? { last_name: lastName } : {}),
    unsubscribed: false,
    properties,
  })
  if (!updated.ok) return updated

  return added.ok ? added : { ok: true, status: 200, message: "" }
}

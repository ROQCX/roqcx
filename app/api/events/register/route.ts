import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { rejectOffsiteContact } from "@/lib/ai/chat-request"
import { enquiryErrorMessage, eventInterestRequestSchema } from "@/lib/enquiry"
import { addLteyInterest } from "@/lib/ltey-segment"
import { budgetResponse, takeEventSlot } from "@/lib/rate-limit"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const fromAddress = "ROQ CX <hello@updates.roqcx.com>"

function plainText(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
}

function singleLine(value: string) {
  return plainText(value).replace(/[\r\n\t]+/g, " ").replace(/ {2,}/g, " ").trim()
}

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return false

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  })

  const data = await response.json()
  return data.success === true && data.action === "event_interest" && typeof data.score === "number" && data.score >= 0.5
}

export async function POST(req: Request) {
  try {
    const denied = rejectOffsiteContact(req)
    if (denied) return denied

    const body = await req.json()
    const parsed = eventInterestRequestSchema.parse(body)

    if (parsed.companyUrlHp) {
      return NextResponse.json({ message: "Registered" })
    }

    const name = singleLine(parsed.name)
    const email = singleLine(parsed.email).toLowerCase()

    const isHuman = await verifyRecaptcha(parsed.token)
    if (!isHuman) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 })
    }

    const limited = budgetResponse(await takeEventSlot(req, email))
    if (limited) return limited

    const audience = parsed.audience
    const organisation = audience === "group" && parsed.organisation ? singleLine(parsed.organisation) : ""

    if (!resend) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 })
    }

    const saved = await addLteyInterest({ email, name, audience, organisation })
    if (!saved.ok) {
      console.error("LTEY segment save failed:", saved.status)
      const status = saved.status === 429 || saved.status === 503 ? saved.status : 500
      return NextResponse.json({ error: enquiryErrorMessage(status) }, { status })
    }

    const confirmation = await resend.emails.send(
      {
        from: fromAddress,
        to: [email],
        replyTo: "hello@roqcx.com",
        subject: "You registered your interest",
        text: [
          "Thanks for registering from the banner at Let’s Talk Early Years.",
          "",
          "This secures your conference discount on the next practical AI training. We will let you know as soon as a date is scheduled.",
          "",
          "That is the only thing this address is for. To be removed, write to hello@roqcx.com.",
          "",
          "ROQ CX - FZCO",
          "Dubai, UAE",
        ].join("\n"),
      },
      { idempotencyKey: `ltey-interest/${email}`.slice(0, 256) },
    )

    if (confirmation.error) {
      console.error("LTEY confirmation email failed:", confirmation.error.name)
    }

    const notice = await resend.emails.send({
      from: fromAddress,
      to: ["zayne@roqcx.com"],
      replyTo: email,
      subject: `LTEY AI training interest from ${name.slice(0, 80) || "a visitor"}`,
      text: [
        "Source: printed banner QR at Let’s Talk Early Years",
        "Offer: conference discount on the next AI training",
        `Name: ${name}`,
        `Email: ${email}`,
        `Training: ${audience === "group" ? "Group / corporate" : "Individual"}`,
        ...(organisation ? [`Organisation: ${organisation}`] : []),
      ].join("\n"),
    })

    if (notice.error) {
      console.error("LTEY notice email failed:", notice.error.name)
    }

    return NextResponse.json({ message: "Registered" })
  } catch (error) {
    console.error("Failed to register LTEY interest:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to register" }, { status: 500 })
  }
}

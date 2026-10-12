import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import { SESSION_TTL_SECONDS } from "../session-ttl"

const SESSION_COOKIE_NAME = "chat-session-id"
const SESSION_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isSessionId(value: string) {
  return SESSION_ID_PATTERN.test(value)
}

function sessionCookie(maxAge: number) {
  return {
    maxAge,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  }
}

export async function getOrCreateSessionId() {
  const cookieStore = await cookies()
  const existingSession = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (existingSession && isSessionId(existingSession)) return existingSession

  const newSessionId = uuidv4()
  cookieStore.set(SESSION_COOKIE_NAME, newSessionId, sessionCookie(SESSION_TTL_SECONDS))
  return newSessionId
}

/** Removes the session cookie and returns the id it held, when that id is one we issued. */
export async function clearSessionId() {
  const cookieStore = await cookies()
  const existingSession = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null
  cookieStore.set(SESSION_COOKIE_NAME, "", sessionCookie(0))
  if (!existingSession || !isSessionId(existingSession)) return null
  return existingSession
}

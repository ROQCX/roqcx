import { NextResponse } from "next/server"
import { deleteChatSession, purgeExpiredChatSessions } from "../../../../lib/chat-sessions"
import { purgeOldRequestLimits } from "../../../../lib/rate-limit"
import { isSessionId } from "../../../../lib/utils/session"

// Cleanup endpoint. Vercel Cron calls GET with Authorization: Bearer CRON_SECRET.
// POST can also delete one demo session when the same secret is presented.

function cronAuthorized(req: Request) {
  const secret =
    req.headers.get("x-cron-secret") || req.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  return Boolean(process.env.CRON_SECRET && secret === process.env.CRON_SECRET)
}

async function purgeExpired() {
  await purgeExpiredChatSessions()
  await purgeOldRequestLimits()
}

export async function GET(req: Request) {
  try {
    if (!cronAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    await purgeExpired()
    return NextResponse.json({ ok: true, scope: "expired" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    if (!cronAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    let sessionId: string | undefined
    if (req.headers.get("content-type")?.includes("application/json")) {
      try {
        const body = await req.json()
        if (typeof body.sessionId === "string" && isSessionId(body.sessionId)) sessionId = body.sessionId
      } catch {
        sessionId = undefined
      }
    }

    if (sessionId) {
      await deleteChatSession(sessionId)
      return NextResponse.json({ ok: true, scope: "session" })
    }

    await purgeExpired()
    return NextResponse.json({ ok: true, scope: "expired" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { db } from "./db"

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE

function positiveInt(name: string, fallback: number) {
  const parsed = Number(process.env[name])
  if (!Number.isFinite(parsed) || parsed < 1) return fallback
  return Math.floor(parsed)
}

const CHAT_IP_LIMIT = positiveInt("CHAT_IP_LIMIT", 12)
const CHAT_IP_WINDOW_MS = positiveInt("CHAT_IP_WINDOW_MS", 10 * MINUTE)
const CHAT_IP_DAILY_LIMIT = positiveInt("CHAT_IP_DAILY_LIMIT", 40)
const CHAT_DAILY_LIMIT = positiveInt("CHAT_DAILY_LIMIT", 500)
const CONTACT_IP_LIMIT = positiveInt("CONTACT_IP_LIMIT", 5)
const CONTACT_IP_WINDOW_MS = positiveInt("CONTACT_IP_WINDOW_MS", HOUR)
const CONTACT_DAILY_LIMIT = positiveInt("CONTACT_DAILY_LIMIT", 40)

export type BudgetResult = "ok" | "limited" | "unavailable"

let tableReady: Promise<void> | null = null

function ensureTable() {
  if (!tableReady) {
    tableReady = db
      .execute(
        `CREATE TABLE IF NOT EXISTS request_limits (
          bucket TEXT PRIMARY KEY,
          hits INTEGER NOT NULL,
          window_start INTEGER NOT NULL
        )`,
      )
      .then(() => undefined)
      .catch((error) => {
        tableReady = null
        throw error
      })
  }
  return tableReady
}

function clientAddress(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const raw = forwarded || req.headers.get("x-real-ip") || "unknown"
  const cleaned = raw.slice(0, 80).replace(/[^0-9a-fA-F.:]/g, "")
  return cleaned || "unknown"
}

async function hashAddress(address: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(address))
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 24)
}

function utcDay() {
  return new Date().toISOString().slice(0, 10)
}

/** windowMs of 0 keeps counting on that bucket until the key itself changes. */
async function bump(bucket: string, windowMs: number) {
  const now = Date.now()
  const result = await db.execute({
    sql: `INSERT INTO request_limits (bucket, hits, window_start)
          VALUES (?, 1, ?)
          ON CONFLICT(bucket) DO UPDATE SET
            hits = CASE
              WHEN ? > 0 AND (? - request_limits.window_start) >= ? THEN 1
              ELSE request_limits.hits + 1
            END,
            window_start = CASE
              WHEN ? > 0 AND (? - request_limits.window_start) >= ? THEN ?
              ELSE request_limits.window_start
            END
          RETURNING hits`,
    args: [bucket, now, windowMs, now, windowMs, windowMs, now, windowMs, now],
  })
  return Number(result.rows[0]?.hits ?? 0)
}

async function takeSlots(slots: Array<[string, number, number]>): Promise<BudgetResult> {
  try {
    await ensureTable()
    for (const [bucket, limit, windowMs] of slots) {
      const hits = await bump(bucket, windowMs)
      if (!Number.isFinite(hits) || hits < 1) return "unavailable"
      if (hits > limit) return "limited"
    }
    return "ok"
  } catch (error) {
    console.error("Rate limit check failed:", error)
    return "unavailable"
  }
}

export async function takeChatSlot(req: Request): Promise<BudgetResult> {
  const ip = await hashAddress(clientAddress(req))
  const day = utcDay()
  return takeSlots([
    [`chat:burst:${ip}`, CHAT_IP_LIMIT, CHAT_IP_WINDOW_MS],
    [`chat:ipday:${ip}:${day}`, CHAT_IP_DAILY_LIMIT, 0],
    [`chat:day:${day}`, CHAT_DAILY_LIMIT, 0],
  ])
}

export async function takeContactSlot(req: Request): Promise<BudgetResult> {
  const ip = await hashAddress(clientAddress(req))
  const day = utcDay()
  return takeSlots([
    [`contact:burst:${ip}`, CONTACT_IP_LIMIT, CONTACT_IP_WINDOW_MS],
    [`contact:day:${day}`, CONTACT_DAILY_LIMIT, 0],
  ])
}

export async function purgeOldRequestLimits() {
  await ensureTable()
  const cutoff = Date.now() - 3 * 24 * HOUR
  await db.execute({
    sql: "DELETE FROM request_limits WHERE window_start < ?",
    args: [cutoff],
  })
}

export function tooManyRequestsResponse() {
  return NextResponse.json(
    {
      error: "Too many requests",
      message: "Too many messages in a short time. Try again in a minute.",
    },
    { status: 429, headers: { "Retry-After": "60" } },
  )
}

export function budgetUnavailableResponse() {
  return NextResponse.json(
    {
      error: "Unavailable",
      message: "This is unavailable right now. Please try again shortly.",
    },
    { status: 503 },
  )
}

export function budgetResponse(result: BudgetResult) {
  if (result === "limited") return tooManyRequestsResponse()
  if (result === "unavailable") return budgetUnavailableResponse()
  return null
}

import { NextResponse } from "next/server"
import { z } from "zod"
import OpenAI from "openai"
import { isAllowedOrigin } from "../allowed-origins"
import { budgetResponse, takeChatSlot } from "../rate-limit"

export const chatRequestSchema = z
  .object({
    messages: z
      .array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().min(1).max(4000),
        }),
      )
      .min(1)
      .max(40),
  })
  .superRefine((value, ctx) => {
    if (value.messages[value.messages.length - 1]?.role !== "user") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["messages"],
        message: "The latest message must be from the visitor",
      })
    }
  })

export type ChatTurn = z.infer<typeof chatRequestSchema>["messages"][number]

/** Only the recent turns are sent to the model, so a long transcript cannot inflate the bill. */
export const MAX_MODEL_MESSAGES = 8
export const MAX_CHAT_OUTPUT_TOKENS = 500

const moderator = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export function modelMessages(messages: ChatTurn[]) {
  return messages.slice(-MAX_MODEL_MESSAGES)
}

export function hasChatApiKey(req: Request) {
  const apiKey = req.headers.get("x-api-key")
  return Boolean(apiKey && apiKey === process.env.NEXT_PUBLIC_API_KEY)
}

export function unauthorizedChatResponse() {
  return NextResponse.json(
    { error: "Unauthorized", message: "Invalid API key" },
    { status: 401 },
  )
}

function originRejectedResponse() {
  return NextResponse.json(
    { error: "Forbidden", message: "This is only available on the ROQ CX site." },
    { status: 403 },
  )
}

export type ModerationResult = "allowed" | "flagged" | "unavailable"

/** A moderation outage refuses the message. The demo must not store text we could not check. */
export async function moderateInput(input: string): Promise<ModerationResult> {
  try {
    const mod = await moderator.moderations.create({
      model: "omni-moderation-latest",
      input,
    })
    return mod.results[0]?.flagged ? "flagged" : "allowed"
  } catch (error) {
    console.error("Moderation check failed:", error)
    return "unavailable"
  }
}

export function flaggedChatResponse(message: string) {
  return NextResponse.json({ error: "Content rejected", message }, { status: 400 })
}

export function moderationUnavailableResponse() {
  return NextResponse.json(
    {
      error: "Unavailable",
      message: "The assistant is unavailable right now. Please try again shortly.",
    },
    { status: 503 },
  )
}

/** Public key and browser origin. Returns a response when the call should stop. */
export function rejectOffsiteChat(req: Request) {
  if (!hasChatApiKey(req)) return unauthorizedChatResponse()
  if (!isAllowedOrigin(req.headers.get("origin"))) return originRejectedResponse()
  return null
}

/** Public key, browser origin, then the shared spend cap. */
export async function rejectUnbudgetedChat(req: Request) {
  const denied = rejectOffsiteChat(req)
  if (denied) return denied
  return budgetResponse(await takeChatSlot(req))
}

export function rejectOffsiteContact(req: Request) {
  if (!isAllowedOrigin(req.headers.get("origin"))) return originRejectedResponse()
  return null
}

export function chatErrorResponse(error: unknown) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Invalid request format", message: "Please check your input and try again" },
      { status: 400 },
    )
  }
  console.error("Chat request failed:", error)
  return NextResponse.json(
    { error: "Internal server error", message: "An error occurred. Please try again." },
    { status: 500 },
  )
}

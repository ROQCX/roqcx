import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { allowedOrigins, normalizeOrigin } from "./lib/allowed-origins"

// Browser origin allow-list for /api. Chat and enquiry routes apply the same
// list and reject a missing Origin. Spend limits live in those routes.

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key, X-Cron-Secret",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  }
}

export function proxy(request: NextRequest) {
  const origin = normalizeOrigin(request.headers.get("origin"))

  if (!origin) {
    if (request.method === "OPTIONS") return new NextResponse(null, { status: 204 })
    return NextResponse.next()
  }

  if (!allowedOrigins().includes(origin)) {
    return new NextResponse(null, { status: 403 })
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
  }

  const response = NextResponse.next()
  for (const [key, value] of Object.entries(corsHeaders(origin))) {
    response.headers.set(key, value)
  }
  return response
}

export const config = {
  matcher: ["/api/:path*"],
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// CORS allow-list. The chat routes are POST-only and gated by their own
// x-api-key check; this middleware only enforces origin + handles preflight.
//
// Real per-IP/per-session rate limiting belongs at the edge platform layer
// (Upstash, Vercel KV, or a CDN rule) — the previous in-memory store didn't
// survive cold starts on serverless edge runtimes and was effectively a no-op
// in production.
const allowedOrigins = [
  'https://www.roqcx.com',
  'https://roqcx.com',
  'http://localhost:3000',
]

function normalizeOrigin(origin: string | null): string | null {
  if (!origin) return null
  return origin.replace(/www\.www\./, 'www.')
}

export function proxy(request: NextRequest) {
  const origin = normalizeOrigin(request.headers.get('origin'))

  // Same-origin requests have no Origin header — allow them.
  const isAllowedOrigin = !origin || allowedOrigins.includes(origin)
  if (!isAllowedOrigin) {
    return new NextResponse(null, { status: 403 })
  }

  // Preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', origin || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
  response.headers.set('Access-Control-Max-Age', '86400')
  return response
}

export const config = {
  matcher: ['/api/:path*'],
}

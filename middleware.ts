import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimit } from './lib/rate-limit'

// List of allowed origins for CORS
const allowedOrigins = [
  'https://www.roqcx.com',
  'https://roqcx.com',
  'http://localhost:3000', // For local development
]

// List of API routes that require authentication
const protectedRoutes = [
  '/api/chat',
  '/api/chat/roqcx',
  '/api/chat/cleanup',
  '/api/chat/clear',
]

// Configure rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
})

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const origin = request.headers.get('origin')

  // Apply rate limiting first
  const rateLimitResponse = limiter(request)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  // Handle CORS
  const isAllowedOrigin = !origin || allowedOrigins.includes(origin)
  if (!isAllowedOrigin) {
    return new NextResponse(null, { status: 403 })
  }

  // Create response with CORS headers
  const response = NextResponse.next()
  
  // Set CORS headers for all responses
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else {
    response.headers.set('Access-Control-Allow-Origin', '*')
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
  response.headers.set('Access-Control-Max-Age', '86400') // 24 hours

  // Handle preflight requests
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

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  if (isProtectedRoute) {
    const apiKey = request.headers.get('x-api-key')
    const expectedApiKey = process.env.NEXT_PUBLIC_API_KEY

    if (!apiKey || apiKey !== expectedApiKey) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized', message: 'Invalid API key' }),
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...Object.fromEntries(response.headers)
          }
        }
      )
    }
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
} 
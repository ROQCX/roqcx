import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimit } from './lib/rate-limit'

// List of allowed origins for CORS
const allowedOrigins = [
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  'http://localhost:3001',
  // Add other allowed origins here
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
  console.log('Middleware triggered for:', request.nextUrl.pathname)
  console.log('Request method:', request.method)
  console.log('Origin:', request.headers.get('origin'))

  // Apply rate limiting first
  const rateLimitResponse = limiter(request)
  if (rateLimitResponse) {
    console.log('Rate limit exceeded')
    return rateLimitResponse
  }

  // Handle CORS
  const origin = request.headers.get('origin')
  const isAllowedOrigin = !origin || allowedOrigins.includes(origin)
  
  if (!isAllowedOrigin) {
    console.log('Origin not allowed:', origin)
    return new NextResponse(null, { status: 403 })
  }

  // Create response with CORS headers
  const response = NextResponse.next()
  
  // Set CORS headers for all responses
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else {
    // Allow requests from same origin (null origin)
    response.headers.set('Access-Control-Allow-Origin', '*')
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
  response.headers.set('Access-Control-Max-Age', '86400') // 24 hours

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    console.log('Handling preflight request')
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
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  console.log('Is protected route:', isProtectedRoute)
  
  if (isProtectedRoute) {
    const apiKey = request.headers.get('x-api-key')
    console.log('API Key received:', apiKey ? 'Present' : 'Missing')
    console.log('Expected API Keys:', {
      API_KEY: process.env.API_KEY ? 'Present' : 'Missing',
      NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY ? 'Present' : 'Missing'
    })
    
    if (!apiKey || (apiKey !== process.env.API_KEY && apiKey !== process.env.NEXT_PUBLIC_API_KEY)) {
      console.log('API key validation failed')
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...Object.fromEntries(response.headers)
          }
        }
      )
    }
    console.log('API key validation successful')
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
} 
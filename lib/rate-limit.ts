import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(config: RateLimitConfig) {
  return function (request: Request | NextRequest) {
    // Get IP from headers or use a fallback
    const headers = request.headers
    const ip = headers.get('x-forwarded-for')?.split(',')[0] || 
               headers.get('x-real-ip') || 
               'anonymous'
    
    const now = Date.now()

    // Initialize or reset the rate limit for this IP
    if (!store[ip] || now > store[ip].resetTime) {
      store[ip] = {
        count: 0,
        resetTime: now + config.windowMs,
      }
    }

    // Increment the request count
    store[ip].count++

    // Check if the rate limit has been exceeded
    if (store[ip].count > config.maxRequests) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          retryAfter: Math.ceil((store[ip].resetTime - now) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((store[ip].resetTime - now) / 1000).toString(),
          },
        }
      )
    }

    return null
  }
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((ip) => {
    if (now > store[ip].resetTime) {
      delete store[ip]
    }
  })
}, 60000) // Run every minute 
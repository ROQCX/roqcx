import { headers } from 'next/headers'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}
const WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS = 10 // 10 requests per minute

export async function rateLimit() {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || '127.0.0.1'
  const now = Date.now()

  // Initialize or reset the rate limit for this IP
  if (!store[ip] || now > store[ip].resetTime) {
    store[ip] = {
      count: 0,
      resetTime: now + WINDOW_MS
    }
  }

  // Increment the request count
  store[ip].count++

  // Check if the rate limit has been exceeded
  if (store[ip].count > MAX_REQUESTS) {
    throw new Error('Rate limit exceeded')
  }

  // Clean up old entries periodically
  Object.keys(store).forEach(key => {
    if (now > store[key].resetTime) {
      delete store[key]
    }
  })
} 
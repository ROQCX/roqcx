import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    // Check API key
    const apiKey = req.headers.get('x-api-key')
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      console.log('API key validation failed:', {
        received: apiKey,
        expected: process.env.NEXT_PUBLIC_API_KEY
      })
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if request has a body
    const contentType = req.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      )
    }

    // Try to parse the request body
    let sessionId: string | undefined
    try {
      const body = await req.json()
      sessionId = body.sessionId
    } catch (error) {
      // If JSON parsing fails, treat as empty body
      sessionId = undefined
    }

    const now = Date.now()
    const cutoffTime = now - (24 * 60 * 60 * 1000) // 24 hours ago

    if (sessionId) {
      // Clear specific session data
      await db.batch([
        {
          sql: `
            DELETE FROM embeddings
            WHERE chunk_id IN (
              SELECT id FROM chunks
              WHERE session_id = ?
            )
          `,
          args: [sessionId]
        },
        {
          sql: `
            DELETE FROM chunks
            WHERE session_id = ?
          `,
          args: [sessionId]
        }
      ])
    } else {
      // Clean up all expired session data
      await db.batch([
        {
          sql: `
            DELETE FROM embeddings
            WHERE chunk_id IN (
              SELECT id FROM chunks
              WHERE is_global = FALSE 
              AND session_id IS NOT NULL
              AND updated_at < ?
            )
          `,
          args: [cutoffTime]
        },
        {
          sql: `
            DELETE FROM chunks
            WHERE is_global = FALSE 
            AND session_id IS NOT NULL
            AND updated_at < ?
          `,
          args: [cutoffTime]
        }
      ])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error during cleanup:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
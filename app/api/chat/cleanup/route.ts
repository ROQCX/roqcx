import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()
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
      { error: 'Failed to perform cleanup' },
      { status: 500 }
    )
  }
} 
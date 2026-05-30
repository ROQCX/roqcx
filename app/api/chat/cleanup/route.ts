import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export const runtime = 'edge'

// Cleanup endpoint — invoked by an external scheduler (Vercel Cron or similar)
// using a server-only CRON_SECRET. Never call from the browser.
export async function POST(req: Request) {
  try {
    const secret = req.headers.get('x-cron-secret') || req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let sessionId: string | undefined
    if (req.headers.get('content-type')?.includes('application/json')) {
      try {
        sessionId = (await req.json()).sessionId
      } catch {
        sessionId = undefined
      }
    }

    const cutoffTime = Date.now() - 24 * 60 * 60 * 1000 // 24h

    if (sessionId) {
      await db.batch([
        {
          sql: `DELETE FROM embeddings WHERE chunk_id IN (SELECT id FROM chunks WHERE session_id = ?)`,
          args: [sessionId],
        },
        { sql: `DELETE FROM chunks WHERE session_id = ?`, args: [sessionId] },
      ])
      return NextResponse.json({ ok: true, scope: 'session', sessionId })
    }

    await db.batch([
      {
        sql: `DELETE FROM embeddings WHERE chunk_id IN (
                SELECT id FROM chunks
                WHERE (is_global = FALSE OR is_global IS NULL)
                AND session_id IS NOT NULL
                AND updated_at < ?
              )`,
        args: [cutoffTime],
      },
      {
        sql: `DELETE FROM chunks
              WHERE (is_global = FALSE OR is_global IS NULL)
              AND session_id IS NOT NULL
              AND updated_at < ?`,
        args: [cutoffTime],
      },
    ])
    return NextResponse.json({ ok: true, scope: 'expired', cutoff: cutoffTime })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

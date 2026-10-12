import { db } from "./db"
import { SESSION_TTL_MS } from "./session-ttl"

const expiredSessionFilter = `(is_global = FALSE OR is_global = 0 OR is_global IS NULL)
  AND session_id IS NOT NULL
  AND updated_at < ?`

export async function purgeExpiredChatSessions() {
  const cutoff = Date.now() - SESSION_TTL_MS
  await db.batch([
    {
      sql: `DELETE FROM embeddings WHERE chunk_id IN (
        SELECT id FROM chunks WHERE ${expiredSessionFilter}
      )`,
      args: [cutoff],
    },
    {
      sql: `DELETE FROM chunks WHERE ${expiredSessionFilter}`,
      args: [cutoff],
    },
  ])
}

export async function deleteChatSession(sessionId: string) {
  await db.batch([
    {
      sql: `DELETE FROM embeddings WHERE chunk_id IN (SELECT id FROM chunks WHERE session_id = ?)`,
      args: [sessionId],
    },
    { sql: `DELETE FROM chunks WHERE session_id = ?`, args: [sessionId] },
  ])
}

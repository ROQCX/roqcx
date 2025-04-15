import { OpenAI } from 'openai'
import { db } from '../db'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Generate embedding using OpenAI
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}

// Store embedding in Turso with session support
export async function storeEmbedding(
  content: string, 
  embedding: number[], 
  sessionId?: string | null
): Promise<void> {
  const now = Date.now()
  
  // Check if content already exists for this session
  const existingChunk = await db.execute(
    `
      SELECT c.id
      FROM chunks c
      WHERE c.content = ? AND (c.session_id = ? OR (c.is_global = TRUE AND ? IS NULL))
      LIMIT 1
    `,
    [content, sessionId ?? null, sessionId ?? null]
  )

  if (existingChunk.rows.length > 0) {
    // Update existing chunk's embedding and timestamp
    const chunkId = existingChunk.rows[0].id as string
    await db.batch([
      {
        sql: `
          UPDATE chunks
          SET updated_at = ?
          WHERE id = ?
        `,
        args: [now, chunkId]
      },
      {
        sql: `
          UPDATE embeddings
          SET embedding = vector32(?), updated_at = ?
          WHERE chunk_id = ?
        `,
        args: [JSON.stringify(embedding), now, chunkId]
      }
    ])
  } else {
    // Insert new chunk and embedding
    const chunkId = crypto.randomUUID()
    
    await db.batch([
      {
        sql: `
          INSERT INTO chunks (id, content, session_id, is_global, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        args: [chunkId, content, sessionId ?? null, !sessionId, now, now]
      },
      {
        sql: `
          INSERT INTO embeddings (id, chunk_id, session_id, embedding, created_at, updated_at)
          VALUES (?, ?, ?, vector32(?), ?, ?)
        `,
        args: [crypto.randomUUID(), chunkId, sessionId ?? null, JSON.stringify(embedding), now, now]
      }
    ])
  }
}

// Find similar chunks based on embedding
export async function findSimilarChunks(
  embedding: number[],
  sessionId?: string | null,
  limit: number = 5
): Promise<{ content: string; similarity: number }[]> {
  const results = await db.execute(
    `
      SELECT DISTINCT c.content, 
             vector_distance_cos(e.embedding, vector32(?)) as similarity
      FROM chunks c
      JOIN embeddings e ON c.id = e.chunk_id
      WHERE c.is_global = TRUE OR c.session_id = ?
      ORDER BY similarity DESC
      LIMIT ?
    `,
    [JSON.stringify(embedding), sessionId ?? null, limit]
  )

  return results.rows.map(row => ({
    content: row.content as string,
    similarity: row.similarity as number
  }))
}

// Clear session data
export async function clearSessionData(sessionId: string): Promise<void> {
  await db.execute(
    `
      DELETE FROM chunks
      WHERE session_id = ?
    `,
    [sessionId]
  )
} 
import { createClient } from '@libsql/client'
import { createTables } from './schema'

if (!process.env.TURSO_DB_URL) {
  throw new Error('TURSO_DB_URL is not set')
}

if (!process.env.TURSO_DB_AUTH_TOKEN) {
  throw new Error('TURSO_DB_AUTH_TOKEN is not set')
}

export const db = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_DB_AUTH_TOKEN,
})

// Initialize tables
export async function initDb() {
  const statements = createTables.split(';').filter(stmt => stmt.trim())
  for (const statement of statements) {
    await db.execute(statement)
  }
} 
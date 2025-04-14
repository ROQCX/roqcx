import { db } from './index'

interface ColumnInfo {
  name: string
  type: string
}

interface IndexInfo {
  name: string
}

async function columnExists(table: string, column: string): Promise<boolean> {
  try {
    const result = await db.execute({
      sql: `PRAGMA table_info(${table})`,
      args: []
    })
    return result.rows.some((row) => (row as unknown as ColumnInfo).name === column)
  } catch (error) {
    console.error(`Error checking column ${column} in table ${table}:`, error)
    return false
  }
}

async function indexExists(table: string, index: string): Promise<boolean> {
  try {
    const result = await db.execute({
      sql: `PRAGMA index_list(${table})`,
      args: []
    })
    return result.rows.some((row) => (row as unknown as IndexInfo).name === index)
  } catch (error) {
    console.error(`Error checking index ${index} in table ${table}:`, error)
    return false
  }
}

async function migrate() {
  try {
    console.log('Starting database migration...')

    // Check if columns exist before adding them
    const sessionIdExists = await columnExists('chunks', 'session_id')
    const isGlobalExists = await columnExists('chunks', 'is_global')
    const updatedAtExists = await columnExists('chunks', 'updated_at')

    // Add session_id column if it doesn't exist
    if (!sessionIdExists) {
      await db.execute({
        sql: 'ALTER TABLE chunks ADD COLUMN session_id TEXT',
        args: []
      })
      await db.execute({
        sql: 'ALTER TABLE embeddings ADD COLUMN session_id TEXT',
        args: []
      })
    }

    // Add is_global column if it doesn't exist
    if (!isGlobalExists) {
      await db.execute({
        sql: 'ALTER TABLE chunks ADD COLUMN is_global BOOLEAN DEFAULT FALSE',
        args: []
      })
    }

    // Add updated_at column if it doesn't exist
    if (!updatedAtExists) {
      await db.execute({
        sql: 'ALTER TABLE chunks ADD COLUMN updated_at INTEGER DEFAULT (strftime(\'%s\', \'now\') * 1000)',
        args: []
      })
      await db.execute({
        sql: 'ALTER TABLE embeddings ADD COLUMN updated_at INTEGER DEFAULT (strftime(\'%s\', \'now\') * 1000)',
        args: []
      })
    }

    // Create indexes if they don't exist
    const sessionIndexExists = await indexExists('chunks', 'idx_chunks_session_id')
    const updatedAtIndexExists = await indexExists('chunks', 'idx_chunks_updated_at')

    if (!sessionIndexExists) {
      await db.execute({
        sql: 'CREATE INDEX IF NOT EXISTS idx_chunks_session_id ON chunks(session_id)',
        args: []
      })
    }

    if (!updatedAtIndexExists) {
      await db.execute({
        sql: 'CREATE INDEX IF NOT EXISTS idx_chunks_updated_at ON chunks(updated_at)',
        args: []
      })
    }

    console.log('Database migration completed successfully')
  } catch (error) {
    console.error('Error during migration:', error)
    throw error
  }
}

export { migrate } 
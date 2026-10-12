import { db } from './index'
import { indexStatements, tableStatements } from './schema'

const TABLES = {
  chunks: 'chunks',
  embeddings: 'embeddings',
} as const

type TableName = keyof typeof TABLES

async function columnExists(table: TableName, column: string): Promise<boolean> {
  try {
    const result = await db.execute({
      sql: `PRAGMA table_info(${TABLES[table]})`,
      args: [],
    })
    return result.rows.some((row) => String(row.name) === column)
  } catch (error) {
    console.error(`Error checking column ${column} in table ${table}:`, error)
    return false
  }
}

async function addColumn(table: TableName, column: string, definition: string) {
  if (await columnExists(table, column)) return
  await db.execute({
    sql: `ALTER TABLE ${TABLES[table]} ADD COLUMN ${column} ${definition}`,
    args: [],
  })
}

async function migrate() {
  try {
    console.log('Starting database migration...')

    for (const sql of tableStatements) {
      await db.execute(sql)
    }

    await addColumn('chunks', 'session_id', 'TEXT')
    await addColumn('embeddings', 'session_id', 'TEXT')
    await addColumn('chunks', 'is_global', 'BOOLEAN DEFAULT FALSE')
    await addColumn('chunks', 'updated_at', "INTEGER DEFAULT (strftime('%s', 'now') * 1000)")
    await addColumn('embeddings', 'updated_at', "INTEGER DEFAULT (strftime('%s', 'now') * 1000)")

    for (const sql of indexStatements) {
      await db.execute(sql)
    }

    console.log('Database migration completed successfully')
  } catch (error) {
    console.error('Error during migration:', error)
    throw error
  }
}

export { migrate }

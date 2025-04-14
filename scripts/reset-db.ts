import 'dotenv/config'
import { db } from '../lib/db'

async function resetDatabase() {
  try {
    console.log('Starting database reset...')
    console.log('Database URL:', process.env.TURSO_DB_URL)
    
    // Delete all data from both tables
    const result = await db.batch([
      {
        sql: 'DELETE FROM embeddings'
      },
      {
        sql: 'DELETE FROM chunks'
      }
    ])

    console.log('Database reset result:', result)
    console.log('Database reset completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error resetting database:', error)
    process.exit(1)
  }
}

resetDatabase() 
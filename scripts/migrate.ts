import 'dotenv/config'
import { migrate } from '../lib/db/migrate'

async function main() {
  try {
    await migrate()
    console.log('Migration completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

main() 
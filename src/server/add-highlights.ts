/**
 * Migration: add highlights column to products table
 * Run with: npx tsx src/server/add-highlights.ts
 */
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

async function main() {
  console.log('Adding highlights column...')
  await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS highlights text[]`
  console.log('Done.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

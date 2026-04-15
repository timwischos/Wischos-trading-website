/**
 * Run with: npx tsx src/server/activate-wp406.ts
 * Activates WP-406 Pure Titanium Capsule Bottle 200ml.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { eq } from 'drizzle-orm'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  await db.update(products)
    .set({ active: true })
    .where(eq(products.id, 'wp-406-pure-titanium-capsule-bottle-200ml'))
  console.log('✓ WP-406 activated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

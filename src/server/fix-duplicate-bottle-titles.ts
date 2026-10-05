/**
 * Run with: npx tsx src/server/fix-duplicate-bottle-titles.ts
 * Appends capacity to names of WP-402 and WP-406 to resolve duplicate page titles.
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
    .set({ name: 'Pure Titanium Capsule Bottle 150ml' })
    .where(eq(products.id, 'wp-402-pure-titanium-capsule-bottle-150ml'))
  console.log('✓ WP-402 name updated.')

  await db.update(products)
    .set({ name: 'Pure Titanium Capsule Bottle 200ml' })
    .where(eq(products.id, 'wp-406-pure-titanium-capsule-bottle-200ml'))
  console.log('✓ WP-406 name updated.')

  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

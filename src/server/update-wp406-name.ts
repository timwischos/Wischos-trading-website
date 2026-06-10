/**
 * Run with: npx tsx src/server/update-wp406-name.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  await db
    .update(products)
    .set({
      name: 'Pure Titanium Capsule Bottle',
      quickAnswer:
        'Pure Titanium Capsule Bottle is a compact titanium drink bottle for branded corporate gifting, offering more capacity than the 150ml capsule format while staying smaller than full-size drinkware.',
    })
    .where(eq(products.id, 'wp-406-pure-titanium-capsule-bottle-200ml'))

  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      tagline: products.tagline,
      quickAnswer: products.quickAnswer,
    })
    .from(products)
    .where(eq(products.id, 'wp-406-pure-titanium-capsule-bottle-200ml'))

  console.log(JSON.stringify(rows, null, 2))
  await sql.end()
}

main().catch(async (err) => {
  console.error(err)
  await sql.end()
  process.exit(1)
})

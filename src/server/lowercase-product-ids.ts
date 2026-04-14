/**
 * Lowercase all product IDs: WP-xxx-... → wp-xxx-...
 * Run with: npx tsx src/server/lowercase-product-ids.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

async function main() {
  const rows = await sql<{ id: string }[]>`SELECT id FROM products WHERE id != lower(id)`
  console.log(`Found ${rows.length} product(s) to update.`)

  for (const { id } of rows) {
    const newId = id.toLowerCase()
    await sql`UPDATE products SET id = ${newId} WHERE id = ${id}`
    console.log(`✓ ${id} → ${newId}`)
  }

  console.log('\n✅ Done.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

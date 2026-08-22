/**
 * Run with: npx tsx src/server/update-wp214-description.ts
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
  await db.update(products)
    .set({
      description: 'A solid brass desk rule. The body is CNC-machined from solid brass, finished with a brushed surface that develops natural patina with handling over time. The scale is machine-etched — not printed — with metric and inch markings on the same face. A trapezoidal cross-section creates a beveled lower edge that holds paper flat and keeps the scale line visible while drawing. The weight registers as a desk object, not an office supply. The flat upper face accepts laser engraving for company logos and text.',
    })
    .where(eq(products.id, 'wp-214-solid-brass-desk-rule'))

  console.log('✓ WP-214 description updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

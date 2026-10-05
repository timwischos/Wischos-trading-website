/**
 * Run with: npx tsx src/server/update-wp309-remove-source-model.ts
 * Removes the "Source Model" spec row from WP-309.
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
      specifications: [
        { label: 'Material', value: 'Brushed stainless steel' },
        { label: 'Dimensions', value: 'Approx. 10.3 × 6.0cm' },
        { label: 'Weight', value: 'Approx. 80g' },
        { label: 'Capacity', value: 'Typically 13-18 standard business cards, depending on paper thickness' },
        { label: 'Access Method', value: 'Thumb-push slide mechanism' },
        { label: 'Finish', value: 'Brushed steel' },
        { label: 'Branding Method', value: 'Laser engraving / screen printing' },
      ],
    })
    .where(eq(products.id, 'wp-309-slim-push-stainless-steel-business-card-case'))

  console.log('Done — Source Model row removed from WP-309 specs.')
  await sql.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

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
      name: 'Solid Brass Ruler',
      metaDescription: 'Custom engraved solid brass ruler with CNC-etched metric and inch scale, available in three sizes. For corporate desk and stationery gifting programs. Inquire for pricing.',
      quickAnswer: 'The Solid Brass Ruler is CNC-machined from solid brass with an etched metric and inch dual scale, available in 15cm, 20cm, and 30cm for corporate desk accessory and custom gift programs.',
      description: 'A solid brass desk ruler. The body is CNC-machined from solid brass, finished with a brushed surface that develops natural patina with handling over time. The scale is machine-etched — not printed — with metric and inch markings on the same face. A trapezoidal cross-section creates a beveled lower edge that holds paper flat and keeps the scale line visible while drawing. The weight registers as a desk object, not an office supply. The flat upper face accepts laser engraving for company logos and text.',
      keyInsight: 'Solid brass mass and CNC-etched scales make this a desk ruler that reads as a material object rather than office stationery — the primary B2B use case is design, architecture, or executive desk gifting where weight and patina development are part of the product story.',
      seoKeywords: [
        'solid brass ruler',
        'solid brass desk ruler',
        'custom engraved brass ruler',
        'brass desk ruler corporate gift',
        'CNC etched brass ruler',
        'engraved metal ruler corporate',
        'custom metal desk accessories',
        'solid brass office accessories',
        'corporate desk gift set metal',
        'metal ruler laser engraving',
        'brass stationery corporate gift',
      ],
    })
    .where(eq(products.id, 'wp-214-solid-brass-desk-rule'))

  console.log('✓ WP-214 name and copy updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

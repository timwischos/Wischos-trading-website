/**
 * Run with: npx tsx src/server/update-wp204-envelope-dimensions.ts
 *
 * Fixes WP-204 Specifications: the "Dimensions" row previously showed
 * 187 × 19 × 4mm — which describes only the flat blade portion. The
 * propeller hub (bearing-mounted spinning head at the handle end) makes
 * the full 3D envelope thicker.
 *
 * Correct values (factory-confirmed, 2026-07-08):
 *   - Blade:                       187 × 19 × 4mm
 *   - Overall envelope (product):  190 × 24.5 × 21mm (with propeller hub)
 *   - Single-piece packed weight:  Approx. 90g (product 85g + bag 5g)
 *   - Single-piece packed volume:  Approx. 73 cm³
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
        { label: 'Material', value: 'Zinc alloy' },
        { label: 'Mechanism', value: 'Bearing-mounted spinning propeller' },
        { label: 'Surface finish', value: 'Matte brushed electroplating (silver)' },
        { label: 'Net weight', value: 'Approx. 85g' },
        { label: 'Blade dimensions', value: '187 × 19 × 4mm' },
        { label: 'Overall envelope (with propeller hub)', value: 'Approx. 190 × 24.5 × 21mm' },
        { label: 'Single-piece packed weight', value: 'Approx. 90g' },
        { label: 'Single-piece packed volume', value: 'Approx. 73 cm³' },
        { label: 'Function', value: 'Letter and envelope opening' },
        { label: 'Use context', value: 'Desk, office, conference gift' },
        { label: 'Branding method', value: 'Laser marking on blade or hub by production spec' },
      ],
    })
    .where(eq(products.id, 'wp-204-propeller-spinning-letter-opener'))

  console.log('✓ WP-204 specifications updated — blade / hub / envelope split for packaging clarity.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

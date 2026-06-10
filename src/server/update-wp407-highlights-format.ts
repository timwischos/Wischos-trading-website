/**
 * Run with: npx tsx src/server/update-wp407-highlights-format.ts
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
      highlights: [
        'Material grade: 304 food-grade steel, not 201. 304 contains 18% chromium and 8% nickel, giving higher corrosion resistance and food safety rating with no metallic taste over time.',
        'Double-wall insulation: The outer surface stays close to room temperature; hot drinks won\'t burn the hand, cold drinks won\'t sweat onto the desk. No rings left on a desk or document.',
        'No-handle cylinder: Minimal desk footprint, clean visual form, and efficient use of gift box space. No handle cutout required in packaging.',
        'Three finishes: Bare brushed steel, gold, and rose gold. Same construction across all, and colour can be matched to a gift set palette or corporate brand.',
        'Laser engraving area: Exterior barrel. Bare brushed steel gives the sharpest contrast; permanent mark with no fading or peeling.',
      ],
    })
    .where(eq(products.id, 'wp-407-double-wall-stainless-steel-desk-cup'))

  console.log('✓ Updated WP-407 highlights format (Label: value) for bold rendering.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

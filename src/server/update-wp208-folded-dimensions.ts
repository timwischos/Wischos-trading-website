/**
 * Run with: npx tsx src/server/update-wp208-folded-dimensions.ts
 *
 * Fixes WP-208 Specifications: the "Folded dimensions" row previously showed
 * 181.5 × 58 × 3.5mm — the 3.5mm was actually the single-leaf panel thickness
 * (measured at the hinge leg), not the packed folded envelope. Real folded
 * stack (measured from the tech drawing) is 21mm. This mismatch caused
 * packaging estimates to look oversized to distributors comparing website
 * specs against carton math.
 *
 * Correct values (per factory tech drawing, 2026-07-08):
 *   - Overall folded envelope (packed):   181.5 × 58 × 21mm
 *   - Single-panel thickness (per leaf):  3.5mm
 *   - Leg width (base of stand):          28.5mm
 *
 * Deployed dimensions kept as previously stated.
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
        { label: 'Material', value: 'Aluminium alloy body + silicone contact pads' },
        { label: 'Weight', value: 'Approx. 150g' },
        { label: 'Format', value: 'Fold-flat 3-mode stand (phone / tablet / laptop riser)' },
        { label: 'Folded dimensions (packed)', value: 'Approx. 181.5 × 58 × 21mm' },
        { label: 'Single-panel thickness', value: 'Approx. 3.5mm (per leaf)' },
        { label: 'Leg width (base)', value: 'Approx. 28.5mm' },
        { label: 'Expanded span', value: 'Approx. 218mm wide' },
        { label: 'Max device support width', value: 'Approx. 190mm' },
        { label: 'Deployed height', value: 'Approx. 129mm' },
        { label: 'Deployed base depth', value: 'Approx. 196mm' },
        { label: 'Branding method', value: 'Laser engraving on base panel' },
      ],
    })
    .where(eq(products.id, 'wp-208-precision-folding-aluminium-device-stand'))

  console.log('✓ WP-208 specifications updated — folded dimensions corrected to 21mm packed envelope.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

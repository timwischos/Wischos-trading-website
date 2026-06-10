/**
 * Run with: npx tsx src/server/update-wp208-highlights-format.ts
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
        'Three configurations: Desktop phone/tablet holder, laptop riser, and folded carry mode.',
        'Ring-array magnets: MagSafe compatible with instant attachment and no adjustment needed.',
        'High-damping hinges: Hold the set angle without drift or creep.',
        'Anodised aluminium body: 150g total weight, fits in a jacket pocket or laptop bag side pocket.',
        'Silicone contact pads: Protect device surfaces and prevent desk slippage.',
        'Laser engraving area: Base panel, with logo visible on every desk it sits on.',
      ],
    })
    .where(eq(products.id, 'wp-208-precision-folding-aluminium-device-stand'))

  console.log('✓ Updated WP-208 highlights format (Label: value) for bold rendering.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

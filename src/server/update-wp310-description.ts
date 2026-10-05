/**
 * Run with: npx tsx src/server/update-wp310-description.ts
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
      description:
        'A machined titanium alloy keychain capsule with a threaded seal. The body is turned from titanium alloy and closed with a threaded cap and O-ring, keeping the interior waterproof and airtight in daily carry. It attaches to keys, bag clips, or carabiners for Everyday Carry (EDC) without adding noticeable weight. The surface is available in sandblasted (matte) or natural finish; both accept laser engraving for company logos and text, applied directly into the metal without a coating. For corporate gifting, it works in wellness programs, outdoor industry accounts, and EDC gift sets where material quality is a visible specification. It is a custom metal corporate gift that carries a functional story, not just a logo.',
    })
    .where(eq(products.id, 'wp-310-titanium-alloy-keychain-capsule'))

  console.log('✓ WP-310 description updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

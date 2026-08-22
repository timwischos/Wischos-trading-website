/**
 * Fix WP-310 quickAnswer — remove "offered by Wischos Gift" phrase.
 * Run with: npx tsx src/server/update-wp310-fix-quick-answer.ts
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
      quickAnswer:
        'The Titanium Alloy Keychain Capsule is a machined titanium alloy sealed container with a threaded cap and keychain loop, available in small (12×32mm, 6g), medium (16×42mm, 15g), and large (20×51mm, 26g) sizes for Everyday Carry (EDC) and corporate gift programs.',
    })
    .where(eq(products.id, 'wp-310-titanium-alloy-keychain-capsule'))

  console.log('✓ WP-310 quickAnswer updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

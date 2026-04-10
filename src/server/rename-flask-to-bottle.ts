/**
 * Run with: npx tsx src/server/rename-flask-to-bottle.ts
 * Renames WP-402 and WP-406 product IDs and names from "flask" to "bottle".
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

async function main() {
  await sql`UPDATE products SET id = 'WP-402-pure-titanium-capsule-bottle-150ml', name = 'Pure Titanium Capsule Bottle' WHERE id = 'WP-402-pure-titanium-capsule-flask-150ml'`
  console.log('✓ WP-402: flask → bottle (id + name)')

  await sql`UPDATE products SET id = 'WP-406-pure-titanium-capsule-bottle-200ml', name = 'Pure Titanium Capsule Bottle (200ml)' WHERE id = 'WP-406-pure-titanium-capsule-flask-200ml'`
  console.log('✓ WP-406: flask → bottle (id + name)')

  console.log('\n✅ Done. Run git push to deploy the code changes.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

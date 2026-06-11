// One-off: deactivate legacy seed product `stainless-steel-money-clip-01`
// (duplicate of wp-303-industrial-stainless-steel-money-clip, broken images).
// Run: npx tsx src/server/deactivate-stainless-steel-money-clip-01.ts
import { config } from 'dotenv'
config({ path: '.env.local' })
import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

const before = await sql`select id, sku, name, active from products where id = 'stainless-steel-money-clip-01'`
console.log('Before:', before)

const updated = await sql`update products set active = false where id = 'stainless-steel-money-clip-01' returning id, active`
console.log('Updated:', updated)

await sql.end()

import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { inArray } from 'drizzle-orm'
import { products } from '../src/server/schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const ids = [
  'wp-101','wp-102','wp-103','wp-104','wp-105','wp-106',
  'wp-201','wp-202','wp-203','wp-204','wp-205','wp-206','wp-207','wp-208',
  'wp-301','wp-302','wp-303','wp-304','wp-305','wp-307','wp-308','wp-309',
  'wp-401','wp-402','wp-403','wp-404','wp-405','wp-406','wp-407','wp-408',
]

async function main() {
  const all = await db.select({
    id: products.id,
    name: products.name,
    materials: products.materials,
    specifications: products.specifications,
    active: products.active,
  }).from(products)
  const rows = all
    .filter(r => /^wp-\d+/i.test(r.id))
    .sort((a, b) => a.id.localeCompare(b.id))

  for (const r of rows) {
    console.log('===')
    console.log('SKU:', r.id.match(/^wp-\d+/)?.[0]?.toUpperCase())
    console.log('NAME:', r.name)
    console.log('ACTIVE:', r.active)
    console.log('MATERIALS:', JSON.stringify(r.materials))
    console.log('SPECS:')
    for (const s of (r.specifications ?? [])) {
      console.log(`  - ${s.label}: ${s.value}`)
    }
  }
  console.log(`\nTotal wp-*: ${rows.length}`)
  await sql.end()
}
main().catch(e => { console.error(e); process.exit(1) })

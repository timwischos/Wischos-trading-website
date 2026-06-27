import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  for (const id of ['wp-107-hexagonal-brass-click-pen', 'wp-108-solid-brass-bolt-action-pen']) {
    const [row] = await db.select({ specifications: products.specifications }).from(products).where(eq(products.id, id))
    if (!row) { console.log(`${id}: not found`); continue }

    const before = row.specifications ?? []
    const after = before.filter((s: { label: string; value: string }) => s.label !== 'SKU')
    console.log(`${id}: removed ${before.length - after.length} SKU row(s)`)

    await db.update(products).set({ specifications: after }).where(eq(products.id, id))
    console.log(`${id}: updated`)
  }
  await sql.end()
}

main().catch(e => { console.error(e); process.exit(1) })

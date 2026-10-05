import { config } from 'dotenv'
config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { like } from 'drizzle-orm'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  const rows = await db.select().from(products).where(like(products.id, '%306%'))
  for (const r of rows) {
    console.log('id:', r.id)
    console.log('name:', r.name)
    console.log('heroImage:', r.heroImage)
    console.log('images:', r.images)
    console.log('active:', r.active)
  }
  await sql.end()
}
main()

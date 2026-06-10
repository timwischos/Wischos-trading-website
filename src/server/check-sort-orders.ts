import { config } from 'dotenv'
config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { asc } from 'drizzle-orm'
const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)
const rows = await db.select({ id: products.id, sku: products.sku, sortOrder: products.sortOrder, category: products.category }).from(products).orderBy(asc(products.sortOrder))
rows.forEach(r => console.log(`${r.sortOrder}\t${r.sku}\t${r.category}\t${r.id}`))
await sql.end()

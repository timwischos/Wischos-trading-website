import { config } from 'dotenv'
config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { inArray } from 'drizzle-orm'
const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)
const rows = await db.select({ id: products.id, heroImage: products.heroImage, images: products.images }).from(products).where(inArray(products.sku, ['WP-106', 'WP-208', 'WP-405']))
rows.forEach(r => console.log(r.id, '\n  hero:', r.heroImage, '\n  img0:', (r.images as string[])?.[0]))
await sql.end()

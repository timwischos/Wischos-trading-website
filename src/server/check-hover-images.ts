import { config } from 'dotenv'
config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { asc } from 'drizzle-orm'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const rows = await db.select({ id: products.id, images: products.images }).from(products).orderBy(asc(products.sortOrder))
rows.forEach(r => {
  console.log(r.id, '→', r.images?.length ?? 0, 'images')
  if (r.images?.[1]) console.log('  hover:', r.images[1])
})

await sql.end()

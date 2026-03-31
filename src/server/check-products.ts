import { config } from 'dotenv'
config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { asc } from 'drizzle-orm'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const rows = await db.select({
  id: products.id,
  name: products.name,
  highlights: products.highlights,
  faqs: products.faqs,
  seoKeywords: products.seoKeywords,
}).from(products).orderBy(asc(products.sortOrder))

rows.forEach(r => {
  const complete = r.highlights?.length && r.faqs?.length && r.seoKeywords?.length
  console.log((complete ? '✅' : '⬜') + ' ' + r.id + '\n   ' + r.name)
})

await sql.end()

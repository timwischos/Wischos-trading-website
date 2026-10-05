import { config } from 'dotenv'
config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)
const BASE = '/products/WP-306-precision-dual-action-metal-edc-slider/precision-dual-action-metal-edc-slider'

async function main() {
  await db.update(products).set({
    images: [
      `${BASE}-cover.avif`,
      `${BASE}-hover.avif`,
      `${BASE}-detail-1.avif`,
      `${BASE}-detail-2.avif`,
      `${BASE}-detail-3.avif`,
      `${BASE}-lifestyle.avif`,
    ],
  }).where(eq(products.id, 'wp-306-precision-dual-action-metal-edc-slider'))
  console.log('Done.')
  await sql.end()
}
main()

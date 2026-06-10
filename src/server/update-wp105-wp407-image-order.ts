/**
 * Run with: npx tsx src/server/update-wp105-wp407-image-order.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  await db
    .update(products)
    .set({
      images: [
        '/products/WP-105-artisan-brass-rollerball/artisan-brass-rollerball-cover.avif',
        '/products/WP-105-artisan-brass-rollerball/artisan-brass-rollerball-cover-hover.avif',
        '/products/WP-105-artisan-brass-rollerball/artisan-brass-rollerball-detail-1.avif',
        '/products/WP-105-artisan-brass-rollerball/artisan-brass-rollerball-detail-2.avif',
        '/products/WP-105-artisan-brass-rollerball/artisan-brass-rollerball-detail-3.avif',
        '/products/WP-105-artisan-brass-rollerball/artisan-brass-rollerball-lifestyle.avif',
      ],
    })
    .where(eq(products.id, 'wp-105-artisan-brass-rollerball'))

  await db
    .update(products)
    .set({
      images: [
        '/products/WP-407-double-wall-stainless-steel-desk-cup/double-wall-stainless-steel-desk-cup-cover.avif',
        '/products/WP-407-double-wall-stainless-steel-desk-cup/double-wall-stainless-steel-desk-cup-hover.avif',
        '/products/WP-407-double-wall-stainless-steel-desk-cup/double-wall-stainless-steel-desk-cup-detail-1.avif',
        '/products/WP-407-double-wall-stainless-steel-desk-cup/double-wall-stainless-steel-desk-cup-detail-2.avif',
        '/products/WP-407-double-wall-stainless-steel-desk-cup/double-wall-stainless-steel-desk-cup-detail-3.avif',
        '/products/WP-407-double-wall-stainless-steel-desk-cup/double-wall-stainless-steel-desk-cup-lifestyle.avif',
      ],
    })
    .where(eq(products.id, 'wp-407-double-wall-stainless-steel-desk-cup'))

  console.log('✓ Updated image order for WP-105 and WP-407 (lifestyle moved to last).')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

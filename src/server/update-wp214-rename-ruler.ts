/**
 * Run with: npx tsx src/server/update-wp214-rename-ruler.ts
 * Renames WP-214 id and image paths from "desk-rule" to "desk-ruler"
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-214-solid-brass-desk-ruler'
const PREFIX = 'solid-brass-desk-ruler'

async function main() {
  await db.update(products)
    .set({
      id: 'wp-214-solid-brass-desk-ruler',
      heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
      images: [
        `/products/${FOLDER}/${PREFIX}-cover.avif`,
        `/products/${FOLDER}/${PREFIX}-hover.avif`,
        `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
        `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
        `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
        `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
      ],
    })
    .where(eq(products.id, 'wp-214-solid-brass-desk-rule'))

  console.log('✓ WP-214 id and image paths updated to "ruler".')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

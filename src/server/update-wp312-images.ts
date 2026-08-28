/**
 * Run with: npx tsx src/server/update-wp312-images.ts
 * Fixes WP-312 image list: replaces detail-6 with lifestyle.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-312-titanium-bolt-action-inkless-pencil'
const PREFIX = 'titanium-bolt-action-inkless-pencil'

async function main() {
  await db
    .update(products)
    .set({
      images: [
        `/products/${FOLDER}/${PREFIX}-cover.avif`,
        `/products/${FOLDER}/${PREFIX}-hover.avif`,
        `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
        `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
        `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
        `/products/${FOLDER}/${PREFIX}-detail-4.avif`,
        `/products/${FOLDER}/${PREFIX}-detail-5.avif`,
        `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
      ],
    })
    .where(eq(products.id, 'wp-312-titanium-bolt-action-inkless-pencil'))

  console.log('✓ WP-312 images updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/update-edc-carabiner-images.ts
 * Fixes image paths for WP-308 — aligns DB with actual Cloudinary filenames.
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
      heroImage: '/products/WP-308-Titanium-EDC-Carabiner/Titanium-EDC-Carabiner-cover.avif',
      images: [
        '/products/WP-308-Titanium-EDC-Carabiner/Titanium-EDC-Carabiner-cover.avif',
        '/products/WP-308-Titanium-EDC-Carabiner/Titanium-EDC-Carabiner-hover.avif',
        '/products/WP-308-Titanium-EDC-Carabiner/Titanium-EDC-Carabiner-detail-1.avif',
        '/products/WP-308-Titanium-EDC-Carabiner/Titanium-EDC-Carabiner-detail-2.avif',
        '/products/WP-308-Titanium-EDC-Carabiner/Titanium-EDC-Carabiner-detail-3.avif',
        '/products/WP-308-Titanium-EDC-Carabiner/Titanium-EDC-Carabiner-lifestyle.avif',
      ],
    })
    .where(eq(products.id, 'WP-308-titanium-edc-carabiner'))

  console.log('✓ WP-308 image paths updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/update-edc-keychain-images.ts
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
      heroImage: '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-cover.avif',
      images: [
        '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-cover.avif',
        '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-hover.avif',
        '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-detail-1.avif',
        '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-detail-2.avif',
        '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-detail-3.avif',
        '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-lifestyle.avif',
      ],
    })
    .where(eq(products.id, 'wp-308-titanium-edc-keychain'))

  console.log('✓ WP-308 image paths updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

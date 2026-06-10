/**
 * Run with: npx tsx src/server/update-wp208-image-order.ts
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
        '/products/WP-208-precision-folding-aluminium-device-stand/precision-folding-aluminium-device-stand-cover.avif',
        '/products/WP-208-precision-folding-aluminium-device-stand/precision-folding-aluminium-device-stand-hover.avif',
        '/products/WP-208-precision-folding-aluminium-device-stand/precision-folding-aluminium-device-stand-detail-1.avif',
        '/products/WP-208-precision-folding-aluminium-device-stand/precision-folding-aluminium-device-stand-detail-2.avif',
        '/products/WP-208-precision-folding-aluminium-device-stand/precision-folding-aluminium-device-stand-detail-4.avif',
        '/products/WP-208-precision-folding-aluminium-device-stand/precision-folding-aluminium-device-stand-lifestyle.avif',
      ],
    })
    .where(eq(products.id, 'wp-208-precision-folding-aluminium-device-stand'))

  console.log('✓ Updated image order for WP-208 (lifestyle moved to last).')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

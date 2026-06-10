/**
 * Run with: npx tsx src/server/migrate-wp308-keychain.ts
 *
 * Migrates WP-308 from the old carabiner slug to the keychain slug and
 * updates image paths after the Cloudinary/public asset rename.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import postgres from 'postgres'

const oldId = 'wp-308-titanium-edc-carabiner'
const newId = 'wp-308-titanium-edc-keychain'

const heroImage = '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-cover.avif'
const images = [
  heroImage,
  '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-hover.avif',
  '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-detail-1.avif',
  '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-detail-2.avif',
  '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-detail-3.avif',
  '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-lifestyle.avif',
]

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

async function main() {
  await sql.begin(async (tx) => {
    const [oldProduct] = await tx`select id from products where id = ${oldId} limit 1`
    const [newProduct] = await tx`select id from products where id = ${newId} limit 1`

    if (oldProduct && newProduct) {
      throw new Error(`Both ${oldId} and ${newId} exist. Resolve the duplicate before migration.`)
    }

    if (oldProduct) {
      await tx`
        update products
        set id = ${newId},
            hero_image = ${heroImage},
            images = ${images}
        where id = ${oldId}
      `
      console.log(`✓ Migrated ${oldId} -> ${newId}`)
      return
    }

    if (newProduct) {
      await tx`
        update products
        set hero_image = ${heroImage},
            images = ${images}
        where id = ${newId}
      `
      console.log(`✓ ${newId} already exists; image paths updated.`)
      return
    }

    throw new Error(`Neither ${oldId} nor ${newId} exists.`)
  })

  await sql.end()
}

main().catch(async (err) => {
  console.error(err)
  await sql.end()
  process.exit(1)
})

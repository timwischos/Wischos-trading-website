/**
 * After renaming product folders/files, run this to update DB image paths.
 * Run with: npx tsx src/server/update-all-image-paths.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import fs from 'fs'
import path from 'path'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const PRODUCTS_DIR = path.join(process.cwd(), 'public/products')

// DB product ID → new folder name
const FOLDER_MAP: Record<string, string> = {
  'aluminium-double-sided-mouse-pad':                     'WP-201-professional-aluminum-desk-mat',
  'aluminium-metal-pen-holder-01':                        'WP-202-precision-aluminum-pen-holder',
  'badge-holder-card-holder-with-metal-clip':             'WP-301-rfid-aluminum-wallet-badge-holder',
  'bolt-action-pen-01':                                   'WP-101-brass-crown-bolt-action-pen',
  'edc-carbon-fibre-magnetic-fidget-sticks-01':           'WP-207-carbon-fiber-magnetic-fidget-stick',
  'key-chain-organizer-holder-01':                        'WP-302-industrial-brass-key-organizer',
  'letter-opener-01':                                     'WP-203-executive-zinc-alloy-letter-opener',
  'letter-opener-02':                                     'WP-204-propeller-spinning-letter-opener',
  'metal-multifunctional-tool-ballpoint-pen-01':          'WP-104-6-in-1-precision-metal-tool-pen',
  'precision-brass-spinning-01':                          'WP-206-precision-brass-spinning-top',
  'tactical-stainless-steel-pen-01':                      'WP-103-tactical-stainless-steel-pen',
  'titanium-anti-static-comb-01':                         'WP-304-titanium-anti-static-edc-comb',
  'titanium-water-bottle-01':                             'WP-401-pure-titanium-vacuum-insulated-bottle',
  'stainless-steel-money-clip-01':                        'WP-303-industrial-stainless-steel-money-clip',
  'aluminum-inkless-pen-01':                              'WP-102-executive-dual-head-metal-pen',
  'industrial-mini-edc-pry-bar-01':                       'WP-305-industrial-mini-edc-pry-bar',
  'integrated-boxed-nail-clipper-01':                     'WP-306-executive-zinc-alloy-nail-clipper',
  'metal-bookmark-01':                                    'WP-205-precision-custom-metal-bookmark',
  'edc-folding-metal-scissors-01':                        'WP-307-edc-folding-metal-scissors',
  'minimalist-portable-stainless-steel-coffee-cup-01':    'WP-403-weighted-vacuum-insulated-office-tumbler',
  'stainless-steel-drink-cup-01':                         'WP-404-bamboo-groove-stainless-steel-mug',
  'pure-titanium-capsule-flask-150ml':                    'WP-402-pure-titanium-capsule-flask-150ml',
  'pure-titanium-capsule-flask-200ml':                    'WP-406-pure-titanium-capsule-flask-200ml',
  'ice-crystal-pure-titanium-egg-cup':                    'WP-405-ice-crystal-pure-titanium-egg-cup',
}

function sortKey(filename: string): string {
  if (/-cover\./i.test(filename))     return '0'
  if (/-hover\./i.test(filename))     return '1'
  if (/-lifestyle\./i.test(filename)) return '2'
  const m = filename.match(/-detail-(\d+)\./i)
  if (m) return `3-${m[1].padStart(3, '0')}`
  return '9'
}

function getImagePaths(folderName: string): string[] {
  const folderPath = path.join(PRODUCTS_DIR, folderName)
  if (!fs.existsSync(folderPath)) return []

  return fs.readdirSync(folderPath)
    .filter(f => /\.(avif|jpg|png|webp)$/i.test(f) && !f.startsWith('~$'))
    .sort((a, b) => sortKey(a).localeCompare(sortKey(b)))
    .map(f => `/products/${folderName}/${f}`)
}

async function main() {
  let updated = 0
  let skipped = 0

  for (const [productId, folderName] of Object.entries(FOLDER_MAP)) {
    const images = getImagePaths(folderName)

    if (images.length === 0) {
      console.log(`⚠ SKIP ${productId} — no images found in ${folderName}`)
      skipped++
      continue
    }

    const heroImage = images[0]

    await db
      .update(products)
      .set({ images, heroImage })
      .where(eq(products.id, productId))

    console.log(`✓ ${productId}`)
    console.log(`    folder : ${folderName}`)
    console.log(`    images : ${images.length} files`)
    console.log(`    hero   : ${heroImage}`)
    updated++
  }

  console.log(`\nDone. Updated: ${updated}  Skipped: ${skipped}`)
  await sql.end()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

/**
 * Updates images arrays for all products to ensure lifestyle image is last.
 * Run with: npx tsx src/server/update-lifestyle-images.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const updates: { id: string; images: string[] }[] = [
  {
    id: 'WP-101-brass-crown-bolt-action-pen',
    images: [
      '/products/WP-101-brass-crown-bolt-action-pen/brass-crown-bolt-action-pen-cover.avif',
      '/products/WP-101-brass-crown-bolt-action-pen/brass-crown-bolt-action-pen-hover.avif',
      '/products/WP-101-brass-crown-bolt-action-pen/brass-crown-bolt-action-pen-detail-1.avif',
      '/products/WP-101-brass-crown-bolt-action-pen/brass-crown-bolt-action-pen-detail-2.avif',
      '/products/WP-101-brass-crown-bolt-action-pen/brass-crown-bolt-action-pen-detail-3.avif',
      '/products/WP-101-brass-crown-bolt-action-pen/brass-crown-bolt-action-pen-detail-5.avif',
      '/products/WP-101-brass-crown-bolt-action-pen/brass-crown-bolt-action-pen-lifestyle.avif',
    ],
  },
  {
    id: 'WP-102-executive-dual-head-metal-pen',
    images: [
      '/products/WP-102-executive-dual-head-metal-pen/executive-dual-head-metal-pen-cover.avif',
      '/products/WP-102-executive-dual-head-metal-pen/executive-dual-head-metal-pen-hover.avif',
      '/products/WP-102-executive-dual-head-metal-pen/executive-dual-head-metal-pen-detail-1.avif',
      '/products/WP-102-executive-dual-head-metal-pen/executive-dual-head-metal-pen-detail-2.avif',
      '/products/WP-102-executive-dual-head-metal-pen/executive-dual-head-metal-pen-detail-3.avif',
      '/products/WP-102-executive-dual-head-metal-pen/executive-dual-head-metal-pen-detail-4.avif',
      '/products/WP-102-executive-dual-head-metal-pen/executive-dual-head-metal-pen-lifestyle.avif',
    ],
  },
  {
    id: 'WP-103-tactical-stainless-steel-pen',
    images: [
      '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-cover.avif',
      '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-hover.avif',
      '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-detail-1.avif',
      '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-detail-2.avif',
      '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-detail-3.avif',
      '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-detail-4.avif',
      '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-detail-5.avif',
      '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-detail-6.avif',
      '/products/WP-103-tactical-stainless-steel-pen/tactical-stainless-steel-pen-lifestyle.avif',
    ],
  },
  {
    id: 'WP-104-6-in-1-precision-metal-tool-pen',
    images: [
      '/products/WP-104-6-in-1-precision-metal-tool-pen/6-in-1-precision-metal-tool-pen-cover.avif',
      '/products/WP-104-6-in-1-precision-metal-tool-pen/6-in-1-precision-metal-tool-pen-hover.avif',
      '/products/WP-104-6-in-1-precision-metal-tool-pen/6-in-1-precision-metal-tool-pen-detail-1.avif',
      '/products/WP-104-6-in-1-precision-metal-tool-pen/6-in-1-precision-metal-tool-pen-detail-2.avif',
      '/products/WP-104-6-in-1-precision-metal-tool-pen/6-in-1-precision-metal-tool-pen-detail-3.avif',
      '/products/WP-104-6-in-1-precision-metal-tool-pen/6-in-1-precision-metal-tool-pen-detail-4.avif',
      '/products/WP-104-6-in-1-precision-metal-tool-pen/6-in-1-precision-metal-tool-pen-detail-5.avif',
      '/products/WP-104-6-in-1-precision-metal-tool-pen/6-in-1-precision-metal-tool-pen-lifestyle.avif',
    ],
  },
  {
    id: 'WP-201-professional-aluminum-desk-mat',
    images: [
      '/products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-cover.avif',
      '/products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-hover.avif',
      '/products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-detail-1.avif',
      '/products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-detail-2.avif',
      '/products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-detail-3.avif',
      '/products/WP-201-professional-aluminum-desk-mat/professional-aluminum-desk-mat-lifestyle.avif',
    ],
  },
  {
    id: 'WP-202-precision-aluminum-pen-holder',
    images: [
      '/products/WP-202-precision-aluminum-pen-holder/precision-aluminum-pen-holder-cover.avif',
      '/products/WP-202-precision-aluminum-pen-holder/precision-aluminum-pen-holder-hover.avif',
      '/products/WP-202-precision-aluminum-pen-holder/precision-aluminum-pen-holder-detail-1.avif',
      '/products/WP-202-precision-aluminum-pen-holder/precision-aluminum-pen-holder-detail-2.avif',
      '/products/WP-202-precision-aluminum-pen-holder/precision-aluminum-pen-holder-detail-3.avif',
      '/products/WP-202-precision-aluminum-pen-holder/precision-aluminum-pen-holder-lifestyle.avif',
    ],
  },
  {
    id: 'WP-203-executive-zinc-alloy-letter-opener',
    images: [
      '/products/WP-203-executive-zinc-alloy-letter-opener/executive-zinc-alloy-letter-opener-cover.avif',
      '/products/WP-203-executive-zinc-alloy-letter-opener/executive-zinc-alloy-letter-opener-hover.avif',
      '/products/WP-203-executive-zinc-alloy-letter-opener/executive-zinc-alloy-letter-opener-detail-1.avif',
      '/products/WP-203-executive-zinc-alloy-letter-opener/executive-zinc-alloy-letter-opener-detail-2.avif',
      '/products/WP-203-executive-zinc-alloy-letter-opener/executive-zinc-alloy-letter-opener-detail-3.avif',
      '/products/WP-203-executive-zinc-alloy-letter-opener/executive-zinc-alloy-letter-opener-lifestyle.avif',
    ],
  },
  {
    id: 'WP-204-propeller-spinning-letter-opener',
    images: [
      '/products/WP-204-propeller-spinning-letter-opener/propeller-spinning-letter-opener-cover.avif',
      '/products/WP-204-propeller-spinning-letter-opener/propeller-spinning-letter-opener-hover.avif',
      '/products/WP-204-propeller-spinning-letter-opener/propeller-spinning-letter-opener-detail-1.avif',
      '/products/WP-204-propeller-spinning-letter-opener/propeller-spinning-letter-opener-detail-2.avif',
      '/products/WP-204-propeller-spinning-letter-opener/propeller-spinning-letter-opener-detail-3.avif',
      '/products/WP-204-propeller-spinning-letter-opener/propeller-spinning-letter-opener-lifestyle.avif',
    ],
  },
  {
    id: 'WP-205-precision-custom-metal-bookmark',
    images: [
      '/products/WP-205-precision-custom-metal-bookmark/precision-custom-metal-bookmark-cover.avif',
      '/products/WP-205-precision-custom-metal-bookmark/precision-custom-metal-bookmark-hover.avif',
      '/products/WP-205-precision-custom-metal-bookmark/precision-custom-metal-bookmark-detail-1.avif',
      '/products/WP-205-precision-custom-metal-bookmark/precision-custom-metal-bookmark-detail-2.avif',
      '/products/WP-205-precision-custom-metal-bookmark/precision-custom-metal-bookmark-detail-3.avif',
      '/products/WP-205-precision-custom-metal-bookmark/precision-custom-metal-bookmark-detail-4.avif',
      '/products/WP-205-precision-custom-metal-bookmark/precision-custom-metal-bookmark-detail-5.avif',
      '/products/WP-205-precision-custom-metal-bookmark/precision-custom-metal-bookmark-lifestyle.avif',
    ],
  },
  {
    id: 'WP-206-precision-brass-spinning-top',
    images: [
      '/products/WP-206-precision-brass-spinning-top/precision-brass-spinning-top-cover.avif',
      '/products/WP-206-precision-brass-spinning-top/precision-brass-spinning-top-hover.avif',
      '/products/WP-206-precision-brass-spinning-top/precision-brass-spinning-top-detail-1.avif',
      '/products/WP-206-precision-brass-spinning-top/precision-brass-spinning-top-detail-2.avif',
      '/products/WP-206-precision-brass-spinning-top/precision-brass-spinning-top-detail-3.avif',
      '/products/WP-206-precision-brass-spinning-top/precision-brass-spinning-top-lifestyle.avif',
    ],
  },
  {
    id: 'WP-207-carbon-fiber-magnetic-fidget-stick',
    images: [
      '/products/WP-207-carbon-fiber-magnetic-fidget-stick/carbon-fiber-magnetic-fidget-stick-cover.avif',
      '/products/WP-207-carbon-fiber-magnetic-fidget-stick/carbon-fiber-magnetic-fidget-stick-hover.avif',
      '/products/WP-207-carbon-fiber-magnetic-fidget-stick/carbon-fiber-magnetic-fidget-stick-detail-1.avif',
      '/products/WP-207-carbon-fiber-magnetic-fidget-stick/carbon-fiber-magnetic-fidget-stick-detail-2.avif',
      '/products/WP-207-carbon-fiber-magnetic-fidget-stick/carbon-fiber-magnetic-fidget-stick-detail-3.avif',
      '/products/WP-207-carbon-fiber-magnetic-fidget-stick/carbon-fiber-magnetic-fidget-stick-detail-4.avif',
      '/products/WP-207-carbon-fiber-magnetic-fidget-stick/carbon-fiber-magnetic-fidget-stick-lifestyle.avif',
    ],
  },
  {
    id: 'WP-301-rfid-aluminum-wallet-badge-holder',
    images: [
      '/products/WP-301-rfid-aluminum-wallet-badge-holder/rfid-aluminum-wallet-badge-holder-cover.avif',
      '/products/WP-301-rfid-aluminum-wallet-badge-holder/rfid-aluminum-wallet-badge-holder-hover.avif',
      '/products/WP-301-rfid-aluminum-wallet-badge-holder/rfid-aluminum-wallet-badge-holder-detail-1.avif',
      '/products/WP-301-rfid-aluminum-wallet-badge-holder/rfid-aluminum-wallet-badge-holder-detail-2.avif',
      '/products/WP-301-rfid-aluminum-wallet-badge-holder/rfid-aluminum-wallet-badge-holder-detail-3.avif',
      '/products/WP-301-rfid-aluminum-wallet-badge-holder/rfid-aluminum-wallet-badge-holder-detail-4.avif',
      '/products/WP-301-rfid-aluminum-wallet-badge-holder/rfid-aluminum-wallet-badge-holder-detail-5.avif',
      '/products/WP-301-rfid-aluminum-wallet-badge-holder/rfid-aluminum-wallet-badge-holder-lifestyle.avif',
    ],
  },
  {
    id: 'WP-302-industrial-brass-key-organizer',
    images: [
      '/products/WP-302-industrial-brass-key-organizer/industrial-brass-key-organizer-cover.avif',
      '/products/WP-302-industrial-brass-key-organizer/industrial-brass-key-organizer-hover.avif',
      '/products/WP-302-industrial-brass-key-organizer/industrial-brass-key-organizer-detail-1.avif',
      '/products/WP-302-industrial-brass-key-organizer/industrial-brass-key-organizer-detail-2.avif',
      '/products/WP-302-industrial-brass-key-organizer/industrial-brass-key-organizer-detail-3.avif',
      '/products/WP-302-industrial-brass-key-organizer/industrial-brass-key-organizer-detail-4.avif',
      '/products/WP-302-industrial-brass-key-organizer/industrial-brass-key-organizer-lifestyle.avif',
    ],
  },
  {
    id: 'WP-303-industrial-stainless-steel-money-clip',
    images: [
      '/products/WP-303-industrial-stainless-steel-money-clip/industrial-stainless-steel-money-clip-cover.avif',
      '/products/WP-303-industrial-stainless-steel-money-clip/industrial-stainless-steel-money-clip-hover.avif',
      '/products/WP-303-industrial-stainless-steel-money-clip/industrial-stainless-steel-money-clip-detail-1.avif',
      '/products/WP-303-industrial-stainless-steel-money-clip/industrial-stainless-steel-money-clip-detail-2.avif',
      '/products/WP-303-industrial-stainless-steel-money-clip/industrial-stainless-steel-money-clip-detail-3.avif',
      '/products/WP-303-industrial-stainless-steel-money-clip/industrial-stainless-steel-money-clip-detail-4.avif',
      '/products/WP-303-industrial-stainless-steel-money-clip/industrial-stainless-steel-money-clip-lifestyle.avif',
    ],
  },
  {
    id: 'WP-304-titanium-anti-static-edc-comb',
    images: [
      '/products/WP-304-titanium-anti-static-edc-comb/titanium-anti-static-edc-comb-cover.avif',
      '/products/WP-304-titanium-anti-static-edc-comb/titanium-anti-static-edc-comb-hover.avif',
      '/products/WP-304-titanium-anti-static-edc-comb/titanium-anti-static-edc-comb-detail-1.avif',
      '/products/WP-304-titanium-anti-static-edc-comb/titanium-anti-static-edc-comb-detail-2.avif',
      '/products/WP-304-titanium-anti-static-edc-comb/titanium-anti-static-edc-comb-detail-3.avif',
      '/products/WP-304-titanium-anti-static-edc-comb/titanium-anti-static-edc-comb-detail-4.avif',
      '/products/WP-304-titanium-anti-static-edc-comb/titanium-anti-static-edc-comb-detail-5.avif',
      '/products/WP-304-titanium-anti-static-edc-comb/titanium-anti-static-edc-comb-lifestyle.avif',
    ],
  },
  {
    id: 'WP-305-industrial-mini-edc-pry-bar',
    images: [
      '/products/WP-305-industrial-mini-edc-pry-bar/industrial-mini-edc-pry-bar-cover.avif',
      '/products/WP-305-industrial-mini-edc-pry-bar/industrial-mini-edc-pry-bar-hover.avif',
      '/products/WP-305-industrial-mini-edc-pry-bar/industrial-mini-edc-pry-bar-detail-1.avif',
      '/products/WP-305-industrial-mini-edc-pry-bar/industrial-mini-edc-pry-bar-detail-2.avif',
      '/products/WP-305-industrial-mini-edc-pry-bar/industrial-mini-edc-pry-bar-detail-3.avif',
      '/products/WP-305-industrial-mini-edc-pry-bar/industrial-mini-edc-pry-bar-lifestyle.avif',
    ],
  },
  {
    id: 'WP-401-pure-titanium-vacuum-insulated-bottle',
    images: [
      '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-cover.avif',
      '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-hover.avif',
      '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-detail-1.avif',
      '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-detail-2.avif',
      '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-detail-3.avif',
      '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-detail-4.avif',
      '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-detail-5.avif',
      '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-detail-6.avif',
      '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-lifestyle.avif',
    ],
  },
]

async function main() {
  console.log(`Updating images arrays for ${updates.length} products...`)
  for (const { id, images } of updates) {
    await db.update(products).set({ images }).where(eq(products.id, id))
    console.log(`✓ ${id}`)
  }
  console.log('Done.')
  await sql.end()
}

main().catch((e) => { console.error(e); process.exit(1) })

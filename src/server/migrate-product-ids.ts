/**
 * Run with: npx tsx src/server/migrate-product-ids.ts
 * Migrates all product IDs from old descriptive slugs to WP-xxx format.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { eq } from 'drizzle-orm'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const migrations: [string, string][] = [
  ['bolt-action-pen-01',                              'WP-101-brass-crown-bolt-action-pen'],
  ['aluminum-inkless-pen-01',                         'WP-102-executive-dual-head-metal-pen'],
  ['tactical-stainless-steel-pen-01',                 'WP-103-tactical-stainless-steel-pen'],
  ['metal-multifunctional-tool-ballpoint-pen-01',     'WP-104-6-in-1-precision-metal-tool-pen'],
  ['aluminium-double-sided-mouse-pad',                'WP-201-professional-aluminum-desk-mat'],
  ['aluminium-metal-pen-holder-01',                   'WP-202-precision-aluminum-pen-holder'],
  ['letter-opener-01',                                'WP-203-executive-zinc-alloy-letter-opener'],
  ['letter-opener-02',                                'WP-204-propeller-spinning-letter-opener'],
  ['metal-bookmark-01',                               'WP-205-precision-custom-metal-bookmark'],
  ['precision-brass-spinning-01',                     'WP-206-precision-brass-spinning-top'],
  ['edc-carbon-fibre-magnetic-fidget-sticks-01',      'WP-207-carbon-fiber-magnetic-fidget-stick'],
  ['badge-holder-card-holder-with-metal-clip',        'WP-301-rfid-aluminum-wallet-badge-holder'],
  ['key-chain-organizer-holder-01',                   'WP-302-industrial-brass-key-organizer'],
  ['stainless-steel-money-clip-01',                   'WP-303-industrial-stainless-steel-money-clip'],
  ['titanium-anti-static-comb-01',                    'WP-304-titanium-anti-static-edc-comb'],
  ['industrial-mini-edc-pry-bar-01',                  'WP-305-industrial-mini-edc-pry-bar'],
  ['integrated-boxed-nail-clipper-01',                'WP-306-executive-zinc-alloy-nail-clipper'],
  ['edc-folding-metal-scissors-01',                   'WP-307-edc-folding-metal-scissors'],
  ['titanium-water-bottle-01',                        'WP-401-pure-titanium-vacuum-insulated-bottle'],
  ['pure-titanium-capsule-flask-150ml',               'WP-402-pure-titanium-capsule-flask-150ml'],
  ['minimalist-portable-stainless-steel-coffee-cup-01', 'WP-403-weighted-vacuum-insulated-office-tumbler'],
  ['stainless-steel-drink-cup-01',                    'WP-404-bamboo-groove-stainless-steel-mug'],
  ['ice-crystal-pure-titanium-egg-cup',               'WP-405-ice-crystal-pure-titanium-egg-cup'],
  ['pure-titanium-capsule-flask-200ml',               'WP-406-pure-titanium-capsule-flask-200ml'],
]

async function main() {
  for (const [oldId, newId] of migrations) {
    await sql`UPDATE products SET id = ${newId} WHERE id = ${oldId}`
    console.log(`✓ ${oldId} → ${newId}`)
  }
  console.log(`\n✅ ${migrations.length} product IDs migrated.`)
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

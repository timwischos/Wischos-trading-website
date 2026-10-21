/**
 * Shorten 7 over-length meta descriptions (>160 chars) and expand the WP-405 description.
 *
 * Dry run: npx tsx src/server/update-live-product-meta-405-2026-10.ts --dry-run
 * Apply:   npx tsx src/server/update-live-product-meta-405-2026-10.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const dryRun = process.argv.includes('--dry-run')

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const META: Record<string, string> = {
  'wp-213-solid-brass-tealight-holder':
    'Solid brass tealight holder, Ø60mm, 295g, lathe-turned. Recessed top doubles as a desk organiser. Laser-engravable on barrel or base. Inquire for pricing.',
  'wp-214-solid-brass-desk-ruler':
    'Engraved solid brass ruler with CNC-etched metric and inch scale, three sizes. For corporate desk and stationery gifting programs. Inquire for pricing.',
  'wp-106-solid-brass-clip-ballpoint':
    'Custom solid brass ballpoint pen for corporate gifting, with cylindrical metal clip, polished or matte finish, 0.5mm black refill and laser logo engraving.',
  'wp-108-solid-brass-bolt-action-pen':
    'Custom solid brass bolt-action pen for corporate gifting: approx. 75g brass body, stainless steel clip, 0.7mm black refill, finish options, gift box.',
  'wp-401-pure-titanium-vacuum-insulated-bottle':
    'Custom titanium vacuum bottle for corporate gifting: pure titanium liner, 316 stainless shell, integrated carry handle, insulation and logo marking.',
  'wp-311-aluminium-edc-torch':
    'Custom branded aluminium EDC torch, 400 lm CRI 90, IPX6, Type-C rechargeable 18650. For outdoor and safety corporate gift programs. Inquire for pricing.',
  'wp-408-titanium-tea-infuser-business-cup':
    'Titanium tea infuser business cup: pure titanium liner and infuser, 480ml, vacuum structure, engraved logo options for corporate gift sets.',
}

const WP405_ID = 'wp-405-ice-crystal-pure-titanium-egg-cup'
const WP405_DESCRIPTION =
  'A compact pure titanium cup with an egg-form profile and double-wall structure, 90mm high with a 260ml capacity and a net weight of about 81g. The top opening is 68mm in diameter and the base is 80mm. The double wall separates the drinking surface from hand contact. Logo marking is applied by production spec. It suits premium metal gift sets, executive desk drinkware, and client appreciation packages where a small custom cup with a distinct shape is wanted.'

async function main() {
  for (const [id, meta] of Object.entries(META)) {
    const [row] = await db.select({ m: products.metaDescription }).from(products).where(eq(products.id, id))
    if (!row) throw new Error(`Missing product ${id}`)
    console.log(`${id}\n  before (${row.m?.length ?? 0}): ${row.m}\n  after  (${meta.length}): ${meta}\n`)
    if (meta.length > 160) throw new Error(`${id} meta still over 160`)
    if (!dryRun) await db.update(products).set({ metaDescription: meta }).where(eq(products.id, id))
  }

  const [row405] = await db.select({ d: products.description }).from(products).where(eq(products.id, WP405_ID))
  if (!row405) throw new Error(`Missing product ${WP405_ID}`)
  console.log(`${WP405_ID}\n  before (${row405.d?.trim().split(/\s+/).length} words): ${row405.d}\n  after  (${WP405_DESCRIPTION.split(/\s+/).length} words): ${WP405_DESCRIPTION}\n`)
  if (!dryRun) await db.update(products).set({ description: WP405_DESCRIPTION }).where(eq(products.id, WP405_ID))

  console.log(dryRun ? 'DRY RUN: nothing written.' : '✓ 7 meta descriptions and WP-405 description updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

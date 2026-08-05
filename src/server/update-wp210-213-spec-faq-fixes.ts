/**
 * Run with: npx tsx src/server/update-wp210-213-spec-faq-fixes.ts
 * Fixes: remove MOQ rows from specifications; remove/rewrite MOQ-mentioning FAQ answers
 * for WP-210, WP-211, WP-212, WP-213.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { eq } from 'drizzle-orm'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  // ── WP-210 ─────────────────────────────────────────────────────────────────
  await db
    .update(products)
    .set({
      specifications: [
        { label: 'Material', value: 'Solid brass' },
        { label: 'Surface finish', value: 'Satin' },
        { label: 'Dimensions', value: 'Ø100mm × 4mm (100 × 100 × 4mm)' },
        { label: 'Weight', value: 'Approx. 118g' },
        { label: 'Packaging', value: 'Individual OPP bag, 100 × 100 × 4mm' },
        { label: 'Branding method', value: 'Laser engraving on flat face' },
      ],
      faqs: [
        {
          q: 'Can laser engraving be applied to the coaster surface?',
          a: 'Yes. Laser engraving is available on the flat face — logo, initials, or a date. Engraving is permanent and wear-resistant. Contact us with your artwork and quantity brief and we will advise on what is available for your order.',
        },
        {
          q: 'Can this coaster be included in a desk gift set?',
          a: 'Yes. The 100mm diameter and flat profile pair well with brass writing tools, pen holders, or other desk accessories in the WP-200 series. Reach out and we can advise on combinations based on your brief.',
        },
        {
          q: 'Does the brass surface tarnish over time?',
          a: 'Solid brass develops a natural patina with handling — surface colour deepens gradually. This is a characteristic of the material. The satin finish masks minor surface marks better than a mirror-polished finish would.',
        },
      ],
    })
    .where(eq(products.id, 'wp-210-weighted-brass-coaster'))
  console.log('✓ WP-210 specifications + faqs updated')

  // ── WP-211 ─────────────────────────────────────────────────────────────────
  await db
    .update(products)
    .set({
      specifications: [
        { label: 'Material', value: 'Solid brass' },
        { label: 'Surface finish', value: 'Satin' },
        { label: 'Dimensions (small)', value: '66mm × 66mm × 8mm' },
        { label: 'Dimensions (large)', value: '75mm × 75mm × 8mm' },
        { label: 'Weight (small)', value: 'Approx. 59g' },
        { label: 'Weight (large)', value: 'Approx. 79g' },
        { label: 'Packaging', value: 'Individual OPP bag' },
        { label: 'Branding method', value: 'Laser engraving on flat face' },
      ],
    })
    .where(eq(products.id, 'wp-211-reversible-brass-coaster'))
  console.log('✓ WP-211 specifications updated')

  // ── WP-212 ─────────────────────────────────────────────────────────────────
  await db
    .update(products)
    .set({
      specifications: [
        { label: 'Material', value: 'Brass frame + glass or resin inlay' },
        { label: 'Surface finish', value: 'Satin brass (frame)' },
        { label: 'Dimensions', value: 'Ø75mm × 8mm (75 × 75 × 8mm)' },
        { label: 'Weight', value: 'Approx. 80g' },
        { label: 'Packaging', value: 'Individual OPP bag or custom packaging' },
        { label: 'Branding method', value: 'Laser engraving on brass frame' },
        {
          label: 'Inlay variants',
          value: 'Clear glass (6078), marble resin (303001), stone-effect resin (DF034)',
        },
      ],
      faqs: [
        {
          q: 'Which inlay material is best for corporate desk programs?',
          a: 'Clear glass suits minimal or architectural desk aesthetics — the brass ring is the main element. Marble resin provides a warm stone-look finish common in premium hospitality environments. Stone-effect resin gives a similar texture with different colouring. Samples are available to confirm finish before bulk order.',
        },
        {
          q: 'Can the brass frame be engraved with a company logo?',
          a: 'Yes. Laser engraving on the brass outer ring is available. Logo, initials, or short brand text can be applied to the ring face. Engraving is permanent and wear-resistant.',
        },
        {
          q: 'Can the inlay colour or material be customised beyond the three standard options?',
          a: 'Custom inlay colours and materials are available with sufficient order quantity. The three standard options (glass, marble resin, stone-effect resin) are available at our standard minimum. Advise at inquiry for custom inlay requirements.',
        },
      ],
    })
    .where(eq(products.id, 'wp-212-brass-inlay-coaster'))
  console.log('✓ WP-212 specifications + faqs updated')

  // ── WP-213 ─────────────────────────────────────────────────────────────────
  await db
    .update(products)
    .set({
      specifications: [
        { label: 'Material', value: 'Solid brass' },
        { label: 'Surface finish', value: 'Lathe-turned, brushed' },
        { label: 'Dimensions', value: 'Ø60mm × 25mm' },
        { label: 'Weight', value: 'Approx. 295g' },
        { label: 'Tealight compatibility', value: 'Standard 38–40mm diameter tealights' },
        { label: 'Packaging', value: 'OPP bag + carton (7cm × 7cm × 3cm)' },
        { label: 'Branding method', value: 'Laser engraving on barrel or base' },
      ],
    })
    .where(eq(products.id, 'wp-213-solid-brass-tealight-holder'))
  console.log('✓ WP-213 specifications updated')

  await sql.end()
  console.log('\nAll done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

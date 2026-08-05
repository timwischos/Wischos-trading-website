/**
 * Run with: npx tsx src/server/update-wp210-213-copy-fixes.ts
 * Fixes: remove MOQ numbers from copy fields; fix SEO issues (meta, defensive language, keyword)
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
      metaDescription:
        'Weighted Brass Coaster — 100mm solid brass, 118g, satin finish. Laser-engravable logo. For corporate desk gifting programs.',
      quickAnswer:
        'The Weighted Brass Coaster is a 100mm solid brass desk coaster (118g, satin finish) designed for corporate gifting programs — laser-engravable with a company logo.',
      description:
        'The Weighted Brass Coaster is a 100mm solid brass desk coaster with a satin finish. At 118g, the weight is structural — machined from solid brass stock — giving it a desk presence that keeps it in place. The flat face laser-engraves cleanly, with enough area for a logo, initials, or a date. Suitable for desk gift programs, client welcome kits, and executive gifting where a branded object needs to hold its position on a working surface — a custom metal corporate gift built for the desk, not the drawer.',
      highlights: [
        'Solid brass construction — satin-finished, develops a natural patina with handling',
        '118g desk weight — noticeably heavier than standard coasters without exceeding desk footprint',
        'Ø100mm diameter — fits standard coffee mugs, water glasses, and tall desk cups',
        'Laser engraving on flat face — logo, initials, or date, permanent and wear-resistant',
        'Individual OPP bag packaging — protects the satin surface during shipping, stackable for bulk orders',
      ],
      customizationOptions: [
        'Laser engraving on flat face — logo, initials, or text; vector file required (AI, EPS, SVG)',
        'Custom colour box packaging with printed design',
      ],
      seoKeywords: [
        'weighted brass coaster corporate gift',
        'custom engraved brass coaster bulk order',
        'solid brass desk coaster wholesale',
        'branded metal coaster corporate gifting',
        'engraved brass coaster bulk',
        'custom metal corporate gift for desk',
      ],
    })
    .where(eq(products.id, 'wp-210-weighted-brass-coaster'))
  console.log('✓ WP-210 updated')

  // ── WP-211 ─────────────────────────────────────────────────────────────────
  await db
    .update(products)
    .set({
      description:
        'The Solid Brass Reversible Desk Coaster is an 8mm-thick solid brass coaster with both faces finished identically — either side faces up, either side accepts laser engraving. At 79g in the larger 75mm size, the weight comes entirely from solid brass. Both faces are identical satin-finished flat surfaces; no orientation required. Available in two diameters: 66mm × 66mm (59g) for cups and tea glasses, and 75mm × 75mm (79g) for standard coffee mugs and desk tumblers. Satin finish develops a natural brass patina with handling. Suitable for executive desk gift programs, branded welcome kits, and corporate gifting where a durable engraved coaster occupies a fixed position on a working surface.',
      customizationOptions: [
        'Laser engraving on flat face — logo, initials, or text; vector file required (AI, EPS, SVG)',
        'Custom colour box packaging',
        'Colour customisation (e.g. black anodised)',
      ],
    })
    .where(eq(products.id, 'wp-211-reversible-brass-coaster'))
  console.log('✓ WP-211 updated')

  // ── WP-212 ─────────────────────────────────────────────────────────────────
  await db
    .update(products)
    .set({
      metaDescription:
        'Brass frame desk coaster with glass or resin inlay, 75mm, approx. 80g, 8mm thick. Laser engraving on brass ring. Corporate desk gifting.',
      quickAnswer:
        'The Brass Frame Inlay Desk Coaster is a 75mm, 8mm-thick desk coaster with a satin brass outer ring and an inlay panel — available in clear glass, marble resin, or stone-effect resin. The brass frame is laser-engravable with a company logo.',
    })
    .where(eq(products.id, 'wp-212-brass-inlay-coaster'))
  console.log('✓ WP-212 updated')

  // ── WP-213 ─────────────────────────────────────────────────────────────────
  await db
    .update(products)
    .set({
      metaDescription:
        'Solid brass tealight holder, 60mm, 295g, lathe-turned finish. Laser-engravable on barrel or base. Corporate Q4 appreciation gifts.',
      quickAnswer:
        'The Solid Brass Tealight Holder is a 295g solid brass cylinder (Ø60mm × 25mm, lathe-turned) that holds a standard 38–40mm tealight. Laser-engravable on the barrel or base with a company logo. Positioned for Q4 corporate appreciation gifts and wellness-theme desk programs.',
    })
    .where(eq(products.id, 'wp-213-solid-brass-tealight-holder'))
  console.log('✓ WP-213 updated')

  await sql.end()
  console.log('\nAll done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

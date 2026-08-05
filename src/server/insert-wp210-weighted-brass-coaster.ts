/**
 * Run with: npx tsx src/server/insert-wp210-weighted-brass-coaster.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-210-weighted-brass-coaster'
const PREFIX = 'weighted-brass-coaster'

async function main() {
  await db.insert(products).values({
    id: 'wp-210-weighted-brass-coaster',
    sku: 'WP-210',
    name: 'Weighted Brass Coaster',
    tagline: 'Solid brass  |  Ø100mm × 4mm  |  118g  |  Satin finish',
    category: 'Desk Accessories',
    materials: ['Solid brass'],
    moq: 19,
    sortOrder: 53,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    metaDescription:
      'Solid brass desk coaster, 100mm, 118g, satin finish. Laser-engraved logo available. MOQ 19 units. For corporate desk gifting programs.',
    quickAnswer:
      'The Weighted Brass Coaster is a 100mm solid brass desk coaster (118g, satin finish) designed for corporate gifting programs — laser-engravable with a company logo, available from MOQ 19 units.',
    description:
      'The Weighted Brass Coaster is a 100mm solid brass desk coaster with a satin finish. At 118g, the weight comes entirely from the brass — no substrate, no filler — giving it a desk presence that keeps it in place. The flat face laser-engraves cleanly, with enough area for a logo, initials, or a date. Suitable for desk gift programs, client welcome kits, and executive gifting where a branded object needs to hold its position on a working surface — a custom metal corporate gift built for the desk, not the drawer.',
    highlights: [
      'Solid brass construction — satin-finished, develops a natural patina with handling',
      '118g desk weight — noticeably heavier than standard coasters without exceeding desk footprint',
      'Ø100mm diameter — fits standard coffee mugs, water glasses, and tall desk cups',
      'Laser engraving on flat face — logo, initials, or date, permanent and wear-resistant',
      'Low MOQ at 19 units — viable for small executive programs or gift-set sampling',
    ],
    customizationOptions: [
      'Laser engraving on flat face — logo, initials, or text; vector file required (AI, EPS, SVG); MOQ 200 units',
      'Custom color box packaging with printed design; available from MOQ 500 units',
    ],
    specifications: [
      { label: 'Material', value: 'Solid brass' },
      { label: 'Surface finish', value: 'Satin' },
      { label: 'Dimensions', value: 'Ø100mm × 4mm (100 × 100 × 4mm)' },
      { label: 'Weight', value: 'Approx. 118g' },
      { label: 'Packaging', value: 'Individual OPP bag, 100 × 100 × 4mm' },
      { label: 'Branding method', value: 'Laser engraving on flat face' },
      { label: 'MOQ (plain)', value: '19 units' },
      { label: 'MOQ (laser engraving)', value: '200 units' },
    ],
    faqs: [
      {
        q: 'What is the minimum order for laser engraving?',
        a: 'The standard MOQ for the coaster is 19 units. Laser engraving requires a minimum of 200 units. For orders between 19 and 199 units, the coaster ships with a plain satin surface.',
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
    sourcingNotes: [
      {
        title: '118g on a desk — what the weight signals',
        body: 'Corporate coasters typically run 40–80g. At 118g, this one stays put without sliding, including on glass and laminate surfaces. Weight in a desk object is a physical signal of material quality — recipients notice it when they first pick it up. For gifting programs targeting senior recipients, the mass does that work without additional finishing or packaging.',
      },
      {
        title: 'Satin finish and laser engraving legibility',
        body: 'The satin surface texture diffuses light evenly, reducing glare and making an engraved logo more legible than on a mirror-polished surface. Laser engraving on brass creates a contrasting darker mark at 0.1–0.2mm depth — permanent and resistant to washing and handling. Vector files (AI, EPS, SVG) are recommended for clean edge reproduction at this scale.',
      },
    ],
    keyInsight:
      'At 118g solid brass and Ø100mm, a desk coaster weighted for permanence and sized for standard mugs — laser-engravable with a logo that remains legible with daily handling.',
    seoKeywords: [
      'weighted brass coaster corporate gift',
      'custom engraved brass coaster bulk order',
      'solid brass desk coaster wholesale',
      'branded metal coaster corporate gifting',
      'engraved brass coaster bulk',
      'custom metal corporate gift desk',
    ],
  })

  console.log('✓ WP-210 Weighted Brass Coaster inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

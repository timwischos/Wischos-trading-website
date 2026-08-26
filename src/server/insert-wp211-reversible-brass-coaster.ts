/**
 * Run with: npx tsx src/server/insert-wp211-reversible-brass-coaster.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-211-reversible-brass-coaster'
const PREFIX = 'reversible-brass-coaster'

async function main() {
  await db.insert(products).values({
    id: 'wp-211-reversible-brass-coaster',
    sku: 'WP-211',
    name: 'Solid Brass Reversible Desk Coaster',
    tagline: 'Solid brass  |  75mm × 8mm  |  79g  |  Double-sided  |  Satin finish',
    category: 'Desk Accessories',
    materials: ['Solid brass'],
    moq: 100,
    sortOrder: 54,
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
      'Solid brass reversible desk coaster, 75mm, 79g, satin finish, 8mm thick. Both faces usable. Laser-engravable. Corporate desk gifting programs.',
    quickAnswer:
      'The Solid Brass Reversible Desk Coaster is a 75mm solid brass desk coaster (79g, 8mm thick, satin finish) with a double-sided flat surface — both faces usable and laser-engravable with a company logo. Available in two sizes: 66mm (59g) and 75mm (79g).',
    description:
      'The Solid Brass Reversible Desk Coaster is an 8mm-thick solid brass coaster with both faces finished identically — either side faces up, and either side accepts laser engraving. At 79g in the larger 75mm size, the weight comes entirely from solid brass. No rubber foot, no base material, no underside texture to manage orientation.\n\nAvailable in two diameters: 66mm × 66mm (59g) for cups and tea glasses, and 75mm × 75mm (79g) for standard coffee mugs and desk tumblers. Satin finish develops a natural brass patina with handling. Suitable for executive desk gift programs, branded welcome kits, and corporate gifting where a durable engraved coaster occupies a fixed position on a working surface.',
    highlights: [
      'Double-sided flat surface — both faces usable and engravable, no underside rubber or texture',
      '8mm solid brass thickness — structurally heavier than standard hospitality coasters (3–5mm)',
      'Two sizes: 66mm × 66mm (59g) for cups; 75mm × 75mm (79g) for standard coffee mugs',
      'Satin finish — develops natural brass patina with handling; diffuses light evenly',
      'Laser engraving on flat face — logo, initials, or date, permanent and wear-resistant',
    ],
    customizationOptions: [
      'Laser engraving on flat face — logo, initials, or text; vector file required (AI, EPS, SVG); MOQ 200 units',
      'Custom colour box packaging; available from MOQ 500 units',
      'Colour customisation (e.g. black anodised); MOQ 500 units',
    ],
    specifications: [
      { label: 'Material', value: 'Solid brass' },
      { label: 'Surface finish', value: 'Satin' },
      { label: 'Dimensions (small)', value: '66mm × 66mm × 8mm' },
      { label: 'Dimensions (large)', value: '75mm × 75mm × 8mm' },
      { label: 'Weight (small)', value: 'Approx. 59g' },
      { label: 'Weight (large)', value: 'Approx. 79g' },
      { label: 'Packaging', value: 'Individual OPP bag' },
      { label: 'Branding method', value: 'Laser engraving on flat face' },
      { label: 'MOQ (plain)', value: '30 units' },
      { label: 'MOQ (laser engraving)', value: '200 units' },
    ],
    faqs: [
      {
        q: 'What is the difference between the two sizes?',
        a: 'The smaller size is 66mm × 66mm (59g), designed for standard tea cups and espresso glasses. The larger 75mm × 75mm (79g) fits standard coffee mugs and tall desk tumblers. For mixed-size desk programs, most buyers specify the 75mm size.',
      },
      {
        q: 'What does "reversible" mean for this coaster?',
        a: 'Both faces are identical — the same satin-finished flat brass surface. Either side can face upward. There is no designated underside with rubber or texture, so the coaster has no wrong orientation. Both faces are also available for laser engraving.',
      },
      {
        q: 'Can this pair with the Weighted Brass Coaster (WP-210)?',
        a: 'Yes. Both are solid brass from the same supplier with matching satin finish. Patina development will be consistent across both. WP-210 is larger (100mm, 118g); WP-211 is 75mm (79g). Pairing them in a desk set works visually and materially.',
      },
    ],
    sourcingNotes: [
      {
        title: '8mm thickness as a structural signal',
        body: 'Standard hospitality coasters run 3–5mm. At 8mm, the thickness of this coaster reads as a material choice rather than a functional minimum. For desk gifting buyers who want a coaster that does not look like a bar accessory, the extra dimension carries that distinction without requiring a different material or finish.',
      },
      {
        title: 'Double-sided design for engraving consistency in volume orders',
        body: 'Because both faces are identical, assembly for a volume laser-engraving order carries no orientation check. Every coaster in the batch is symmetrical — either face can be engraved and either face can face up in the gift box. This reduces error rate in branded production runs where coaster orientation in packaging matters.',
      },
    ],
    keyInsight:
      'At 79g and 8mm solid brass with both faces identical, a desk coaster designed for orientation flexibility — either side engravable, either side visible, without a designated underside.',
    seoKeywords: [
      'solid brass desk coaster corporate gift',
      'reversible brass coaster engraved',
      'custom brass coaster bulk order',
      'branded metal coaster desk gift',
      'engraved brass coaster wholesale',
      'corporate gift desk accessories brass',
    ],
  })

  console.log('✓ WP-211 Solid Brass Reversible Desk Coaster inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

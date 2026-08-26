/**
 * Run with: npx tsx src/server/insert-wp215-solid-brass-measurement-set.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-215-brass-measurement-set'
const PREFIX = 'brass-measurement-set'

async function main() {
  await db.insert(products).values({
    id: 'wp-215-brass-measurement-set',
    sku: 'WP-215',
    name: 'Solid Brass Measurement Set',
    tagline: 'Solid H65 brass  |  Laser-etched scales  |  4-piece drafting set',
    metaDescription: 'Custom engraved solid brass measurement set — ruler, right triangle, isosceles triangle, protractor. For corporate desk gifting programs. Inquire for pricing.',
    quickAnswer: 'The Solid Brass Measurement Set (WP-215) is a four-piece H65 brass drafting instrument set — 15cm ruler, right-angle triangle, isosceles triangle, and semicircle protractor — with laser-etched scales and a hand-brushed vintage finish, available with custom logo engraving for corporate gifting programs.',
    category: 'Desk Accessories',
    materials: ['Solid H65 brass'],
    moq: 100,
    sortOrder: 58,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-4.avif`,
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    description: 'A four-piece brass drafting instrument set. Ruler, right-angle triangle, isosceles triangle, and semicircle protractor — each cut from solid H65 brass with a hand-brushed vintage finish and laser-etched scales. Scale markings are machine-cut into the brass surface, not printed. The four pieces cover the standard drafting operations: linear measurement, 45° angle work, 30–60° angle work, and arc and degree marking. At 23–58g per piece, each registers weight in hand without bulk. The flat faces accept laser engraving for company logos. Available as a custom metal corporate gift set with logo engraving and rigid gift box packaging.',
    highlights: [
      'Four-piece set — ruler (WP-215A), right-angle triangle (WP-215B), isosceles triangle (WP-215C), protractor (WP-215D)',
      'Solid H65 brass construction — develops natural patina with handling across all four pieces',
      'Laser-etched scales — machine-cut into brass surface, resistant to wear and fading',
      'Hand-brushed vintage finish — consistent across the full set from a single production batch',
      'Flat faces on all four pieces accept laser engraving for logos and text',
    ],
    specifications: [
      { label: 'Material', value: 'Solid H65 brass' },
      { label: 'Dimensions (WP-215A Ruler)', value: '165 × 17 mm' },
      { label: 'Weight (WP-215A Ruler)', value: '23g' },
      { label: 'Dimensions (WP-215B Right-Angle Triangle)', value: '120 × 140 × 70 mm (three sides)' },
      { label: 'Weight (WP-215B Right-Angle Triangle)', value: '56g' },
      { label: 'Dimensions (WP-215C Isosceles Triangle)', value: '90 × 90 × 125 mm (three sides)' },
      { label: 'Weight (WP-215C Isosceles Triangle)', value: '44g' },
      { label: 'Dimensions (WP-215D Protractor)', value: '120 × 57 mm' },
      { label: 'Weight (WP-215D Protractor)', value: '58g' },
      { label: 'Scale', value: 'Laser-etched into brass surface' },
      { label: 'Surface finish', value: 'Hand-brushed vintage' },
      { label: 'Branding method', value: 'Laser engraving' },
    ],
    customizationOptions: [
      'Laser engraving on flat face of any or all pieces (logo, text, or serial numbers)',
      'Individual piece selection: order all four (WP-215A/B/C/D) or specify components',
      'Custom gift box with foil stamping or printed interior liner',
      'Vegetable-tanned leather roll pouch as packaging upgrade',
    ],
    faqs: [
      {
        q: 'Can all four pieces carry the same logo?',
        a: 'Yes. Each piece has a flat face suitable for laser engraving — the ruler along its upper surface, both triangles on their larger flat face, and the protractor on its flat arc panel. The same vector artwork file (AI, EPS, SVG) applies across the set. Logo depth and placement vary slightly by piece geometry, but finish and line quality are consistent within a production batch.',
      },
      {
        q: 'Can we order individual pieces rather than the full set?',
        a: 'Yes. Each piece carries its own sub-SKU: WP-215A (ruler), WP-215B (right-angle triangle), WP-215C (isosceles triangle), WP-215D (protractor). Pieces can be ordered independently or in any combination. Minimum order quantity applies per sub-SKU — contact us to confirm quantities for mixed orders.',
      },
      {
        q: 'What packaging works for the four-piece set?',
        a: 'Standard option is a magnetic rigid gift box with EVA foam insert cut to hold all four pieces. Upgrade option is a vegetable-tanned leather roll pouch — three interior slots hold the ruler and both triangles flat, with the protractor seated in the fourth position. Both options support custom branding on the exterior.',
      },
      {
        q: 'Does the patina develop consistently across a batch?',
        a: 'Pieces from the same production batch share a consistent hand-brushed finish at delivery. Patina develops with individual handling over weeks and months and will differ between recipients depending on use. For gift programs, this is typically presented as part of the solid brass material story — each set becoming distinct over time.',
      },
      {
        q: 'What is the minimum order quantity?',
        a: "The standard minimum order quantity is 100 sets for the full four-piece configuration, or 100 units per sub-SKU (WP-215A through WP-215D) for individual piece orders. For mixed-component programs, reach out and we'll advise based on your brief.",
      },
    ],
    sourcingNotes: [
      {
        title: 'H65 brass vs plated alternatives',
        body: 'H65 is a free-cutting brass alloy with 63–68% copper content, standard for precision machined and stamped components. The difference between solid H65 and brass-plated zinc or aluminium is detectable in hand — the protractor at 58g and the right-angle triangle at 56g carry a density that lighter alloys cannot replicate. For corporate desk gift programs, solid brass signals material commitment in a way a coated base metal cannot.',
      },
      {
        title: 'Laser-etched scales vs printed',
        body: 'Scale markings on this set are laser-etched directly into the brass surface — not silk-screened or printed. Printed scales on lower-cost alternatives fade with contact and handling. Laser-etched marks are cut into the material and maintain legibility through regular use, relevant for items handled daily on a desk rather than stored.',
      },
      {
        title: 'Single-batch sourcing across four pieces',
        body: 'All four pieces ship from the same factory run with the same H65 material batch and surface treatment process. This ensures consistent patina starting point and finish tone across the set at delivery — relevant for gift programs where set cohesion matters.',
      },
    ],
    keyInsight: 'Four coordinated H65 brass drafting instruments from a single production batch — the primary B2B use case is design firm, architecture practice, or engineering team gifting where precision tool function and consistent material finish carry more gift value than decorative desk objects.',
    seoKeywords: [
      'solid brass measurement set',
      'brass drafting instruments corporate gift',
      'brass measurement kit',
      'brass ruler triangle protractor set',
      'custom metal stationery corporate gift',
      'engraved brass desk tools',
      'brass geometry set corporate gift',
      'corporate gift for architects and designers',
      'brass drafting tools custom logo engraving',
      'metal measurement set B2B gift',
    ],
  })

  console.log('✓ WP-215 Solid Brass Measurement Set inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

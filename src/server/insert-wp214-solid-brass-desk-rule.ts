/**
 * Run with: npx tsx src/server/insert-wp214-solid-brass-desk-rule.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-214-solid-brass-desk-ruler'
const PREFIX = 'solid-brass-desk-ruler'

async function main() {
  await db.insert(products).values({
    id: 'wp-214-solid-brass-desk-ruler',
    sku: 'WP-214',
    name: 'Solid Brass Ruler',
    tagline: 'Solid brass  |  CNC-etched dual scale  |  Beveled edge  |  15 / 20 / 30cm',
    metaDescription: 'Custom engraved solid brass ruler with CNC-etched metric and inch scale, available in three sizes. For corporate desk and stationery gifting programs. Inquire for pricing.',
    quickAnswer: 'The Solid Brass Ruler is CNC-machined from solid brass with an etched metric and inch dual scale, available in 15cm, 20cm, and 30cm for corporate desk accessory and custom gift programs.',
    category: 'Desk Accessories',
    materials: ['Solid brass'],
    moq: 100,
    sortOrder: 57,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    description: 'A solid brass desk ruler in three sizes. The body is CNC-machined from solid brass, finished with a brushed surface that develops natural patina with handling over time. The scale is machine-etched — not printed — with metric and inch markings on the same face. A trapezoidal cross-section creates a beveled lower edge that holds paper flat and keeps the scale line visible while drawing. At 125g for the 15cm and 245g for the 30cm, the weight registers as a desk object, not an office supply. The flat upper face accepts laser engraving for company logos and text.',
    highlights: [
      'Solid brass construction — develops natural patina with handling, not a plated finish',
      'CNC-etched dual scale — metric and inch on one face, machine-cut marks resist wear and fading',
      'Beveled trapezoidal cross-section — lower edge reduces ink spread when ruling lines',
      'Three sizes — 15cm (125g), 20cm (160g), 30cm (245g)',
      'Flat upper face accepts laser engraving for logos and text',
    ],
    specifications: [
      { label: 'Material', value: 'Solid brass' },
      { label: 'Dimensions (15cm)', value: '160 × 30 × 4.5mm' },
      { label: 'Dimensions (20cm)', value: '210 × 30 × 4.5mm' },
      { label: 'Dimensions (30cm)', value: '310 × 30 × 4.5mm' },
      { label: 'Weight', value: '15cm ~125g; 20cm ~160g; 30cm ~245g' },
      { label: 'Scale', value: 'Metric (cm) and inch, dual-face' },
      { label: 'Cross-section', value: 'Trapezoidal with beveled lower edge' },
      { label: 'Surface finish', value: 'Brushed' },
      { label: 'Branding method', value: 'Laser engraving' },
    ],
    customizationOptions: [
      'Laser engraving on the flat upper face (logo, text, or serial numbers)',
      'Custom gift box with foil stamping or screen print',
      'Single size selection for uniform gift set batches',
    ],
    faqs: [
      { q: 'What sizes are available, and which fits best in a gift set?', a: 'Three sizes — 15cm (160mm, 125g), 20cm (210mm, 160g), and 30cm (310mm, 245g). The 20cm is the most common choice for desk gift sets, balancing desk presence with practical storage. The 15cm suits compact EDC or stationery kits; the 30cm works in design, architecture, or senior executive contexts.' },
      { q: 'Can the engraving include a full company logo?', a: 'Yes. The flat upper face provides a consistent engraving area across all three sizes. We accept vector files (AI, EPS, SVG). The logo is laser-engraved into the brass — not printed. Artwork specifications and minimum order quantities apply.' },
      { q: 'Will the patina develop consistently across a batch?', a: 'Pieces from the same production batch have a consistent brushed finish at delivery. Patina develops with individual handling over weeks and months. For corporate gift programs, this is typically presented as part of the solid brass material story rather than a uniformity concern.' },
    ],
    sourcingNotes: [
      { title: 'Solid brass, not plated', body: 'The weight difference between solid brass and brass-plated alternatives is detectable immediately. The 15cm version runs ~125g; a brass-plated aluminium ruler of the same dimensions would be 30–40g. For corporate desk gifting, solid brass signals material commitment in a way a coating on base metal cannot. The CNC-etched scale lines are cut into the surface rather than printed, so they will not fade or peel with regular use — a relevant durability point for items carried or handled daily.' },
      { title: 'Beveled cross-section for functional use', body: 'The trapezoidal cross-section creates a lower beveled edge that contacts paper along a thin line rather than a flat face. This reduces ink spread under the edge when ruling lines — relevant for architects, designers, or executive stationery contexts where the ruler will be used, not only displayed. It also provides a visual grip cue without adding a separate texture treatment.' },
    ],
    keyInsight: 'Solid brass mass and CNC-etched scales make this a desk ruler that reads as a material object rather than office stationery — the primary B2B use case is design, architecture, or executive desk gifting where weight and patina development are part of the product story.',
    seoKeywords: [
      'solid brass ruler',
      'solid brass desk ruler',
      'custom engraved brass ruler',
      'brass desk ruler corporate gift',
      'CNC etched brass ruler',
      'engraved metal ruler corporate',
      'custom metal desk accessories',
      'solid brass office accessories',
      'corporate desk gift set metal',
      'metal ruler laser engraving',
      'brass stationery corporate gift',
    ],
  })

  console.log('✓ WP-214 Solid Brass Ruler inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

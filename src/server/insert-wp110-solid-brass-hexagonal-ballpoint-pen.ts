/**
 * Run with: npx tsx src/server/insert-wp110-solid-brass-hexagonal-ballpoint-pen.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-110-solid-brass-hexagonal-ballpoint-pen'
const PREFIX = 'solid-brass-hexagonal-ballpoint-pen'

async function main() {
  await db.insert(products).values({
    id: 'wp-110-solid-brass-hexagonal-ballpoint-pen',
    sku: 'WP-110',
    name: 'Solid Brass Hexagonal Ballpoint Pen',
    tagline: 'Solid brass  |  142mm × Ø8mm  |  32g  |  Twist or cap mechanism',
    category: 'Writing Instruments',
    materials: ['H62 solid brass', 'Brass internal mechanism', '0.5mm gel refill (standard, replaceable)'],
    moq: 100,
    sortOrder: 101,
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
    metaDescription:
      'Solid brass hexagonal ballpoint pen, 142mm, 32g. H62 brass, twist or cap mechanism, 0.5mm gel refill. Laser-engravable. MOQ 100 units. Send an inquiry.',
    quickAnswer:
      'The Solid Brass Hexagonal Ballpoint Pen is a 142mm, 32g H62 solid brass pen with a six-sided anti-roll barrel, twist or cap mechanism, and standard 0.5mm gel refill — flat hexagonal facets laser-engrave cleanly; MOQ 100 units, for corporate desk gift programs and promotional product distributors.',
    description:
      'A 142mm H62 solid brass pen with a six-sided barrel and twist-out or cap mechanism. The hexagonal cross-section eliminates desk roll and gives a flat face on each of the six sides for laser engraving. Weight is 32g — heavier than standard office pens at this barrel diameter. Unplated natural brass develops a warm patina with handling. Writes with a standard 0.5mm gel refill. A custom metal corporate gift built to stay on desks.',
    highlights: [
      'Six-sided H62 brass barrel — 32g hand weight, anti-roll geometry, machined to Ø8mm',
      'Twist or cap mechanism — no springs; brass-on-brass thread for twist variant, cap variant no moving parts',
      'Flat hexagonal facets — each face laser-engraves cleanly for logo or text',
      'Natural brushed brass — unplated, develops warm amber patina with daily handling',
      'Laser engraving on barrel facets — logo, text, or serial numbers; permanent, wear-resistant',
    ],
    customizationOptions: [
      'Laser engraving on any flat barrel facet (logo, text, or serial numbers); vector file required (AI, EPS, SVG)',
      'Mechanism: twist-out or cap — specify at order stage',
      'Gift box packaging on request',
    ],
    specifications: [
      { label: 'Material (body)', value: 'H62 solid brass' },
      { label: 'Surface finish', value: 'Natural brushed brass, unplated' },
      { label: 'Dimensions', value: '142mm × Ø8mm' },
      { label: 'Weight', value: 'Approx. 32g' },
      { label: 'Mechanism', value: 'Twist-out or cap (specify at order)' },
      { label: 'Tip', value: '0.5mm gel refill, standard replaceable format' },
      { label: 'Branding method', value: 'Laser engraving on barrel facets' },
      { label: 'MOQ', value: '100 units' },
    ],
    faqs: [
      {
        q: 'How does the hexagonal shape affect logo placement?',
        a: 'Each of the six flat faces provides a clean, flat engraving surface. Single-logo programs use one face. Programs requiring serial numbers or multi-line text can use adjacent faces. The flat geometry removes the curvature distortion common on round barrels.',
      },
      {
        q: 'Which gel refill does this pen take?',
        a: 'A standard 0.5mm gel refill in a common thread format. Compatible refills are widely available. For bulk programs, specify refill brand at order stage to confirm compatibility.',
      },
      {
        q: 'Will the brass surface change colour over time?',
        a: 'The natural brushed finish is unplated H62 brass — surface colour shifts from bright yellow to warm amber and bronze tones with regular handling. This is a material characteristic, not a defect.',
      },
      {
        q: 'Can this pen be part of a desk gift set?',
        a: 'Yes. The 32g weight and hexagonal geometry work as a practical anchor piece for desk gift programs. It pairs well with brass desk accessories — rulers, letter openers, coaster sets.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Hexagonal barrel in corporate pen programs',
        body: 'Six-sided brass pens hold a distinct position in corporate programs — the geometry reads as deliberate, and the anti-roll characteristic is a practical argument for desk placements where pens are left in shared spaces. At 32g and Ø8mm, this pen sits noticeably above standard branded pen weight, which typically runs 12–22g. For programs where the pen is a desk item rather than a pocket item, the weight and grip diameter are appropriate signals of quality without becoming burdensome in hand.',
      },
      {
        title: 'H62 brass: material behaviour in daily use',
        body: 'H62 is the standard brass alloy for precision pen manufacturing in China — it machines cleanly and holds tight tolerances on hex cross-sections. The natural brushed finish is uncoated, meaning the surface is the material itself rather than a finish over a base. Brass patina develops from contact with skin oils and heat — visible shift typically appears within 4–6 weeks of daily use, making each pen traceable to its user over time.',
      },
    ],
    keyInsight:
      '142mm H62 solid brass, 32g — six-sided anti-roll barrel, flat facets laser-engrave cleanly; natural brushed brass finish, twist or cap mechanism.',
    seoKeywords: [
      'solid brass hexagonal ballpoint pen corporate gift',
      'custom engraved brass pen bulk order',
      'hexagonal brass pen B2B wholesale',
      'anti-roll metal pen corporate gifting',
      'H62 brass pen laser engraving',
      'custom metal corporate gift writing instrument',
    ],
  })

  console.log('✓ WP-110 Solid Brass Hexagonal Ballpoint Pen inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/insert-wp109-solid-brass-inkless-pen.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-109-solid-brass-inkless-pen'
const PREFIX = 'solid-brass-inkless-pen'

async function main() {
  await db.insert(products).values({
    id: 'wp-109-solid-brass-inkless-pen',
    sku: 'WP-109',
    name: 'Solid Brass Inkless Pen',
    tagline: 'Solid brass  |  145mm × Ø8mm  |  27g  |  Metal alloy tip, inkless',
    category: 'Writing Instruments',
    materials: ['H62 solid brass', 'Metal alloy tip (replaceable)'],
    moq: 100,
    sortOrder: 100,
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
      'Solid brass inkless pen, 145mm, 27g. Metal alloy tip writes without ink. Replaceable tip, laser-engravable barrel. MOQ 100 units. Send an inquiry.',
    quickAnswer:
      'The Solid Brass Inkless Pen is a 145mm, 27g H62 brass pen with a replaceable metal alloy tip that writes without ink — silver-toned tip contrasts the brass barrel, laser-engravable, MOQ 100 units, for corporate desk gift programs.',
    description:
      'A 145mm solid brass inkless pen with a replaceable metal alloy tip. The silver-toned tip contrasts the brass barrel; contact with paper deposits metal particles, leaving a 0.5mm grey trace. When worn, the tip unscrews and replaces. H62 brass body, unplated — surface colour shifts from bright yellow to amber with daily handling. Vertical grip grooves are machined into the barrel. The tail ends in a flat brass cap, echoing a pencil\'s silhouette. A custom metal corporate gift that requires no refill and improves in appearance with use — laser-engravable with a company logo.',
    highlights: [
      'Metal alloy inkless tip — silver-toned, contrasts brass barrel; unscrews for replacement when worn',
      'H62 solid brass body — unplated, patina shifts from bright yellow to amber with daily handling',
      '27g hand weight — noticeably heavier than standard office pens at this barrel diameter',
      'Vertical grip grooves — machined into barrel for consistent hold',
      'Flat brass tail cap — echoes pencil silhouette; no clip, no mechanism',
      'Laser engraving on barrel — logo, text, or serial numbers; permanent, wear-resistant',
    ],
    customizationOptions: [
      'Laser engraving on barrel (logo, text, or serial numbers); vector file required (AI, EPS, SVG)',
      'Replacement tip sets available alongside main order on request',
      'Custom gift tube or individual box packaging with printed label',
    ],
    specifications: [
      { label: 'Material (body)', value: 'H62 solid brass' },
      { label: 'Material (tip)', value: 'Metal alloy, replaceable' },
      { label: 'Surface finish', value: 'Raw brass, no plating' },
      { label: 'Dimensions', value: '145mm × Ø8mm' },
      { label: 'Weight', value: 'Approx. 27g' },
      { label: 'Trace width', value: '0.5mm' },
      { label: 'Grip', value: 'Vertical machined grooves' },
      { label: 'Branding method', value: 'Laser engraving on barrel' },
      { label: 'MOQ', value: '100 units' },
    ],
    faqs: [
      {
        q: 'How does a metal alloy tip pen write without ink?',
        a: 'The metal alloy tip is dense enough that contact with paper transfers microscopic metal particles, leaving a 0.5mm grey trace similar in appearance to pencil. The mark is permanent on standard writing paper (A4, notebook). It does not work on coated or glossy surfaces.',
      },
      {
        q: 'When does the tip need replacing, and how does replacement work?',
        a: 'The tip unscrews by hand using a standard thread interface. For bulk corporate orders, we recommend including a spare tip set per 100 units in the initial order.',
      },
      {
        q: 'Can the barrel be engraved with a company logo?',
        a: 'Yes. The brass barrel laser-engraves cleanly. We accept vector files (AI, EPS, SVG). The mark is permanent and deepens in contrast as the surrounding brass develops its natural patina.',
      },
      {
        q: 'Will the brass surface tarnish over time?',
        a: 'H62 brass without plating develops a natural patina — surface colour deepens from bright yellow to amber with regular handling. This is a material characteristic, not a defect. Each pen develops a patina specific to its user.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Metal alloy tip — how inkless writing works in practice',
        body: 'The tip in these pens is a dense metal alloy hard enough that paper contact transfers microscopic particles, producing a 0.5mm grey trace — lighter in tone than ballpoint but permanent on standard paper. Most promotional inkless pens on the market use a sealed tip with no replacement option. This pen\'s screw-thread interface allows tip replacement, extending the useful life of the brass body indefinitely. For gift programs specifying low-waste or no-consumable briefs, that replaceability is the practical differentiator.',
      },
      {
        title: 'Unplated H62 brass in a corporate pen context',
        body: 'Most corporate pen programs use lacquered or chrome-plated brass to standardise surface appearance. An unplated H62 body ages differently — the surface shifts from bright yellow to amber and bronze tones with handling, making each pen traceable to its user over months of daily use. The silver-toned alloy tip creates a visible material contrast from day one. For executive gifting programs where the pen is kept rather than redistributed, the patina characteristic is an asset rather than a liability.',
      },
    ],
    keyInsight:
      '145mm solid brass, 27g — metal alloy tip writes without ink and unscrews for replacement; unplated H62 body develops a user-specific patina with daily handling.',
    seoKeywords: [
      'solid brass inkless pen corporate gift',
      'metal alloy tip inkless pen bulk order',
      'custom engraved brass inkless pen wholesale',
      'inkless pen corporate gifting B2B',
      'brass pen no ink laser engravable',
      'custom metal corporate gift writing instrument',
    ],
  })

  console.log('✓ WP-109 Solid Brass Inkless Pen inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

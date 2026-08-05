/**
 * Run with: npx tsx src/server/insert-wp213-solid-brass-tealight-holder.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-213-solid-brass-tealight-holder'
const PREFIX = 'solid-brass-tealight-holder'

async function main() {
  await db.insert(products).values({
    id: 'wp-213-solid-brass-tealight-holder',
    sku: 'WP-213',
    name: 'Solid Brass Tealight Holder',
    tagline: 'Solid brass  |  Ø60mm × 25mm  |  295g  |  Lathe-turned finish',
    category: 'Desk Accessories',
    materials: ['Solid brass'],
    moq: 100,
    sortOrder: 56,
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
      'Solid brass tealight holder, 60mm, 295g, lathe-turned finish. Laser-engravable on barrel or base. Corporate Q4 appreciation gifts. MOQ 100 units.',
    quickAnswer:
      'The Solid Brass Tealight Holder is a 295g solid brass cylinder (Ø60mm × 25mm, lathe-turned) that holds a standard 38–40mm tealight. Laser-engravable on the barrel or base with a company logo. Positioned for Q4 corporate appreciation gifts and wellness-theme desk programs. MOQ 100 units.',
    description:
      'The Solid Brass Tealight Holder is a 295g solid brass cylinder, lathe-turned with a brushed surface texture. At 60mm diameter and 25mm height, it holds a standard 38–40mm tealight candle and sits stably on a desk, shelf, or table without a base plate or tray. The recessed top accepts a standard tealight directly — no insert required.\n\nThe weight — 295g — comes entirely from solid brass. For year-end client gifting, wellness-theme desk programs, and Q4 appreciation gifts, the holder provides a branded object that occupies visible space passively. Laser engraving is available on the cylindrical barrel or the flat base. Suitable for individual gifting or pairing with desk drinkware in a curated desk set.',
    highlights: [
      '295g solid brass — the weight is from material, not ballast; communicates quality before the candle is lit',
      'Ø60mm × 25mm — accepts standard 38–40mm tealights directly, no insert required',
      'Lathe-turned brushed texture — machined surface detail, develops natural brass patina',
      'Laser engraving on barrel or base — logo, name, or short text, permanent',
      'Stable flat base — sits without rubber foot or tray on wood, glass, and stone surfaces',
    ],
    customizationOptions: [
      'Laser engraving on barrel (visible when in use) or base — logo, name, or short text; vector file required (AI, EPS, SVG)',
      'Custom packaging available by order brief',
    ],
    specifications: [
      { label: 'Material', value: 'Solid brass' },
      { label: 'Surface finish', value: 'Lathe-turned, brushed' },
      { label: 'Dimensions', value: 'Ø60mm × 25mm' },
      { label: 'Weight', value: 'Approx. 295g' },
      { label: 'Tealight compatibility', value: 'Standard 38–40mm diameter tealights' },
      { label: 'Packaging', value: 'OPP bag + carton (7cm × 7cm × 3cm)' },
      { label: 'Branding method', value: 'Laser engraving on barrel or base' },
      { label: 'MOQ', value: '100 units' },
    ],
    faqs: [
      {
        q: 'What tealight size fits this holder?',
        a: 'Standard tealights, 38–40mm diameter. This is the most common tealight size sold in supermarkets and catering suppliers. No insert or adapter is needed.',
      },
      {
        q: 'Is this suitable for executive desk gifting?',
        a: 'It suits wellness-theme desk programs and Q4 appreciation gifts more than senior executive desk sets. For recipients in fixed office locations — private offices or home desks — the holder is a practical object that stays visible when in use. For frequently travelling recipients, the tealight format may be less practical than a desk accessory.',
      },
      {
        q: 'Should the engraving go on the barrel or the base?',
        a: 'Barrel engraving keeps the brand mark visible when the holder is in use. Base engraving is less visible during use but cleaner aesthetically on the visible surface. For corporate gifting programs, barrel placement is more common.',
      },
    ],
    sourcingNotes: [
      {
        title: '295g in a tealight holder — the case for brass over ceramic or glass',
        body: 'Most tealight holders weigh under 100g — ceramic or glass construction with thin walls. At 295g, the brass version communicates material quality before the candle is lit. For year-end gifting programs where the object needs to earn a position on a recipient\'s desk, the mass does that work. Recipients who are not regular candle users still keep the holder because it reads as an object worth keeping.',
      },
      {
        title: 'Q4 timing and branded gifting objects',
        body: 'Tealight holders carry a seasonal association — end-of-year periods, office events, and hospitality settings. This makes them appropriate for Q4 appreciation gifts without requiring the recipient to use the object for a specific work task. Unlike a pen or desk accessory, a candle holder occupies visible space passively, keeping the brand mark in view on a desk or shelf regardless of work activity.',
      },
    ],
    keyInsight:
      'At 295g solid brass and Ø60mm, a desk tealight holder weighted for permanence — laser-engravable on the barrel or base, positioned for Q4 corporate appreciation gifts where a non-electronic branded object is wanted.',
    seoKeywords: [
      'solid brass tealight holder corporate gift',
      'engraved brass candle holder bulk order',
      'branded metal tealight holder wholesale',
      'custom brass desk gift Q4',
      'corporate appreciation gift brass',
      'engraved tealight holder B2B',
    ],
  })

  console.log('✓ WP-213 Solid Brass Tealight Holder inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

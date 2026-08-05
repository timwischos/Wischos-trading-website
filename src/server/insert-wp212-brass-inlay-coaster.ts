/**
 * Run with: npx tsx src/server/insert-wp212-brass-inlay-coaster.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-212-brass-inlay-coaster'
const PREFIX = 'brass-inlay-coaster'

async function main() {
  await db.insert(products).values({
    id: 'wp-212-brass-inlay-coaster',
    sku: 'WP-212',
    name: 'Brass Frame Inlay Desk Coaster',
    tagline: 'Brass frame + inlay  |  Ø75mm × 8mm  |  ~80g  |  Glass or resin variants',
    category: 'Desk Accessories',
    materials: ['Brass', 'Glass or resin inlay'],
    moq: 100,
    sortOrder: 55,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-4.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-5.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-6.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-7.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-8.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-9.avif`,
    ],
    metaDescription:
      'Brass frame desk coaster with glass or resin inlay, 75mm, ~80g, 8mm thick. Laser engraving on brass ring. Corporate desk gifting. MOQ 100 units.',
    quickAnswer:
      'The Brass Frame Inlay Desk Coaster is a 75mm, 8mm-thick desk coaster with a satin brass outer ring and an inlay panel — available in clear glass, marble resin, or stone-effect resin. The brass frame is laser-engravable with a company logo. MOQ 100 units.',
    description:
      'The Brass Frame Inlay Desk Coaster combines a satin-finished brass outer ring with an inlay panel available in three materials: clear glass, marble-effect resin, or stone-effect resin. The brass frame provides structural weight and heat resistance; the inlay adds visual contrast between the metal ring and the centre panel.\n\nAt 75mm diameter and 8mm thickness, the coaster fits standard coffee mugs and desk cups. All three inlay variants accept laser engraving on the brass frame — logo, brand initials, or short text. Suitable for executive desk gift programs, premium client gifting, and hotel or hospitality desk placements where a two-material coaster is preferred over a plain metal surface.',
    highlights: [
      'Brass outer frame with inlay panel — clear glass, marble resin, or stone-effect resin variants',
      '8mm thick, 75mm diameter — heat-resistant, fits standard coffee mugs and desk cups',
      'Laser engraving on brass frame — logo, initials, or brand text, permanent and wear-resistant',
      'Three inlay options — glass (transparent), marble resin, stone-effect resin (opaque)',
      'Satin brass finish on ring — consistent with solid brass desk accessory range',
    ],
    customizationOptions: [
      'Laser engraving on brass frame — logo, initials, or text; vector file required (AI, EPS, SVG)',
      'Inlay material selection: clear glass, marble resin, or stone-effect resin',
      'Custom inlay colour available with sufficient order quantity',
      'Custom packaging available by order brief',
    ],
    specifications: [
      { label: 'Material', value: 'Brass frame + glass or resin inlay' },
      { label: 'Surface finish', value: 'Satin brass (frame)' },
      { label: 'Dimensions', value: 'Ø75mm × 8mm (75 × 75 × 8mm)' },
      { label: 'Weight', value: 'Approx. 80g' },
      { label: 'Packaging', value: 'Individual OPP bag or custom packaging' },
      { label: 'Branding method', value: 'Laser engraving on brass frame' },
      { label: 'MOQ', value: '100 units' },
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
        a: 'Custom inlay colours and materials are available with sufficient order quantity. The three standard options (glass, marble resin, stone-effect resin) are available from MOQ 100 units. Advise at inquiry for custom inlay requirements.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Two-material composition in a desk coaster',
        body: 'The brass frame provides structural weight and heat resistance at the rim; the inlay provides visual contrast at the centre. This two-material approach allows the coaster to carry a different aesthetic than a plain metal disc while maintaining the same functional role. For buyers serving design-led environments or mixed executive gifting programs, the composition reads as a design choice rather than a cost variation.',
      },
      {
        title: 'Resin inlay finishes and hospitality positioning',
        body: 'Marble and stone-effect resin finishes are associated with premium hospitality table settings. For corporate gifting programs targeting senior recipients or hotel-environment placements, these finishes offer an alternative to the traditional satin-metal look without adding significant cost over the plain brass variants.',
      },
    ],
    keyInsight:
      'Brass outer ring with glass or resin inlay at Ø75mm and ~80g — a two-material desk coaster with a laser-engravable brass frame, positioned for executive gift programs where visual contrast is preferred over a plain metal surface.',
    seoKeywords: [
      'brass frame coaster corporate gift',
      'brass and glass coaster engraved',
      'custom brass inlay coaster bulk',
      'corporate desk coaster branded',
      'brass resin coaster wholesale',
      'engraved metal coaster executive gift',
    ],
  })

  console.log('✓ WP-212 Brass Frame Inlay Desk Coaster inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

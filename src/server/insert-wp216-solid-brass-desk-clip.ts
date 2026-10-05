/**
 * Run with: npx tsx src/server/insert-wp216-solid-brass-desk-clip.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-216-solid-brass-desk-clip'
const PREFIX = 'solid-brass-desk-clip'

async function main() {
  await db.insert(products).values({
    id: 'wp-216-solid-brass-desk-clip',
    sku: 'WP-216',
    name: 'Solid Brass Desk Clip',
    tagline: 'Solid H62 brass  |  60mm  |  Approx. 51g  |  Spring clip',
    metaDescription:
      'Custom engraved solid brass desk clip, CNC-machined from H62 brass with a spring mechanism. For corporate desk and stationery gift programs.',
    quickAnswer:
      'The Solid Brass Desk Clip (WP-216) is a 60mm spring clip machined from H62 brass. It weighs approximately 51g, comes in smooth-jaw and grip-jaw versions, and can be laser engraved on its flat side faces for corporate desk gifts.',
    category: 'Desk Accessories',
    materials: ['Solid H62 brass', 'Metal coil spring'],
    moq: 100,
    sortOrder: 59,
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
    description:
      'Machined from solid H62 brass, this 60mm desk clip gives a familiar spring mechanism a more substantial feel. It weighs approximately 51g and can hold notes, cards, receipts, and small stacks of paper. Choose a smooth jaw for everyday paper use or a grip jaw when more hold is needed. The flat outer faces can be laser engraved with a logo or short message. It works as a standalone desk gift or alongside a brass pen or ruler.',
    highlights: [
      'CNC-machined H62 brass body — solid construction with flat external branding faces',
      'Approx. 51g — gives the compact clip noticeable weight in hand',
      'Coil-spring mechanism — opens by hand and returns to a closed holding position',
      'Two jaw options — smooth jaw for paper and cards; grip jaw for firmer contact',
      'Flat side faces — suitable for laser-engraved logos, names, or short text',
    ],
    specifications: [
      { label: 'Material', value: 'Solid H62 brass body' },
      { label: 'Dimensions', value: '60 × 12 × 12 mm' },
      { label: 'Weight', value: 'Approx. 51g' },
      { label: 'Mechanism', value: 'Coil-spring clip' },
      { label: 'Jaw options', value: 'Smooth jaw / grip jaw' },
      { label: 'Branding method', value: 'Laser engraving on flat side face' },
    ],
    customizationOptions: [
      'Laser engraving on one or both flat side faces (logo, name, short text, or serial number)',
      'Smooth-jaw or grip-jaw configuration selected by intended use',
      'Custom box packaging and branded insert based on order brief and quantity',
    ],
    faqs: [
      {
        q: 'Is the clip made from solid brass or brass-plated metal?',
        a: 'The two main body pieces are CNC-machined from solid H62 brass rather than a brass-plated base metal. The coil spring is a separate metal component. The final surface finish and any protective coating are confirmed with the order specification.',
      },
      {
        q: 'What is the difference between the smooth-jaw and grip-jaw versions?',
        a: 'The smooth-jaw version uses flat internal faces for notes, cards, receipts, and paper. The grip-jaw version uses profiled internal faces for firmer contact. Actual marking depends on the spring tension, paper thickness, and time held, so the intended material should be checked during sampling.',
      },
      {
        q: 'Can a company logo be engraved on the clip?',
        a: 'Yes. The long, flat side faces provide a consistent area for laser engraving. A company logo, name, short message, or serial number can be applied after artwork and placement are confirmed during sampling.',
      },
      {
        q: 'What is the minimum order quantity?',
        a: 'Minimum order quantity depends on the jaw configuration, engraving coverage, and packaging specification. Send the required quantity, logo artwork, and intended use, and the available production route can be confirmed with the quotation.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Choosing between the two jaws',
        body: 'The smooth jaw is intended for notes, cards, receipts, and other flat paper items. The grip jaw is intended for thicker stacks or materials that need more contact. The final choice should be checked against the intended material during sampling, since spring tension, thickness, surface texture, and holding time all affect the result.',
      },
    ],
    keyInsight:
      'At 60mm and approximately 51g, the Solid Brass Desk Clip is compact enough for a desk set while providing two flat faces for visible logo engraving. It pairs naturally with brass pens, rulers, and other desk tools.',
    seoKeywords: [
      'solid brass desk clip',
      'custom engraved brass paper clip',
      'brass clothespin clip',
      'brass binder clip corporate gift',
      'solid brass note clip',
      'engraved brass desk accessory',
      'custom metal corporate gift',
      'brass stationery corporate gift',
      'logo engraved desk clip',
      'bulk brass paper clip',
    ],
  })

  console.log('✓ WP-216 Solid Brass Desk Clip inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

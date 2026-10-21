/**
 * Run with: npx tsx src/server/insert-wp315-solid-brass-slide-lock-key-hook.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-315-solid-brass-slide-lock-key-hook'
const PREFIX = 'solid-brass-slide-lock-key-hook'

async function main() {
  await db.insert(products).values({
    id: 'wp-315-solid-brass-slide-lock-key-hook',
    sku: 'WP-315',
    name: 'Solid Brass Slide-Lock Key Hook',
    tagline: 'Solid brass | 5mm solid wire | Press-and-slide lock | Three styles + 3-in-1 set',
    category: 'EDC Accessories',
    materials: ['Solid brass (CNC-machined sleeve and 5mm wire frame)', 'Internal spring and press-lock pin'],
    moq: 100,
    sortOrder: 137,
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
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    metaDescription:
      'Engraved solid brass slide-lock key hook, 5mm solid wire, three styles plus 3-in-1 set. Custom metal corporate gift for EDC key carry. Inquire for pricing.',
    quickAnswer:
      'The Solid Brass Slide-Lock Key Hook is a key hook with a CNC-machined sleeve and a 5mm solid brass wire frame, offered in square, cylindrical, and wide styles (58.5–61mm long) and a 3-in-1 set, that opens with a press-and-slide button and locks when released.',
    description:
      'A key hook with a CNC-machined sleeve and a frame bent from 5mm solid brass wire, hand-polished, uncoated. Pressing and sliding the mechanical button opens the hook, and an internal spring and press-lock pin lock it again on release. It comes in square, cylindrical, and wide cylindrical styles, 58.5–61mm long, and a 3-in-1 set with a 10mm swivel clasp and 8mm horseshoe clasp. The brass develops a patina with handling, and the slide mechanism takes its cue from the Luban lock, a traditional Chinese interlocking puzzle. It is an engraved custom metal corporate gift for EDC and key-carry programs.',
    highlights: [
      '5mm solid brass wire frame — solid section resists flexing under daily key weight',
      'Press-and-slide lock — mechanical button with an internal spring and press-lock pin',
      'Four formats — square, cylindrical, wide cylindrical, and a 3-in-1 set',
      'Hand-polished, uncoated brass — no plating, develops natural patina with handling',
      'Laser engravable — logo applied to the slide button or a flat edge',
    ],
    customizationOptions: [
      'Laser engraving of a company logo or text on the slide button or a flat edge, with placement confirmed against supplied artwork',
      'Choice of style: square collar, cylindrical, wide cylindrical, or 3-in-1 set',
      'Custom packaging, subject to order quantity and confirmation',
    ],
    specifications: [
      { label: 'Material', value: 'Solid brass, uncoated, no plating; internal spring and press-lock pin' },
      { label: 'Wire Diameter', value: '5.0mm, solid brass wire' },
      { label: 'Dimensions (Square Collar)', value: '58.5mm L × 22.5mm W; slot width 32.5mm' },
      { label: 'Dimensions (Cylindrical)', value: '59.0mm L × 22.0mm W; slot width 33.0mm' },
      { label: 'Dimensions (Wide Cylindrical)', value: '61.0mm L × 30.0mm W; slot width 39.7mm' },
      { label: '3-in-1 Set', value: 'Slide-lock hook + 10mm swivel clasp + 8mm horseshoe clasp; about 115–120mm combined length' },
      { label: 'Weight', value: 'About 20–40g per piece, depending on style' },
      { label: 'Process', value: 'CNC-machined sleeve, bent solid brass wire frame, mechanical assembly' },
      { label: 'Surface Finish', value: 'Hand-polished natural brass, no plating' },
      { label: 'Mechanism', value: 'Press-and-slide button lock' },
      { label: 'Branding Method', value: 'Laser engraving on the slide button or a flat edge' },
    ],
    faqs: [
      {
        q: 'How does the hook open?',
        a: 'Press and hold the mechanical button, then slide it to open the hook. Releasing the button closes and locks it, with an internal spring and press-lock pin holding the lock.',
      },
      {
        q: 'What is a Luban lock?',
        a: 'A Luban lock is a traditional Chinese interlocking puzzle, made of notched pieces that fit together without fasteners. The hook borrows that idea of a mechanism that locks and releases by sliding.',
      },
      {
        q: 'Can a company logo be engraved on the hook?',
        a: 'Yes. Laser engraving applies a logo or text to the slide button or a flat edge. Placement and artwork requirements are confirmed with the quotation.',
      },
      {
        q: 'Is the hook rated for climbing or heavy loads?',
        a: 'No. It is a key-carry hook and is not rated for climbing, rigging, or other load-bearing use.',
      },
    ],
    sourcingNotes: [
      {
        title: 'A machined sleeve on a bent solid-wire frame',
        body: 'The sleeve that houses the lock is CNC machined, and the frame is bent from 5mm solid brass wire. A solid section holds its shape under the weight of a key bunch better than a thin wire form, and the internal spring and press-lock pin return the button after each slide.',
      },
      {
        title: 'Four formats from one mechanism',
        body: 'The same press-and-slide lock comes in three body shapes and a 3-in-1 set. Programs usually pick one style for a whole recipient group so the engraved mark stays consistent; the wide cylindrical body suits thick vehicle keys.',
      },
      {
        title: 'A mechanism with a story',
        body: 'The press-and-slide action gives the hook a visible moving part and a cultural reference in the Luban lock. Both suit gift programs for engineering, design, and technology teams.',
      },
    ],
    comparisonTable: {
      columns: ['Style', 'Best fit', 'Buyer note'],
      rows: [
        ['Square Collar', 'Classic EDC belt carry with a sharp-edged look', '58.5 × 22.5mm; slot width 32.5mm'],
        ['Cylindrical', 'Daily key carry with a rounded feel and smooth slide', '59.0 × 22.0mm; slot width 33.0mm'],
        ['Wide Cylindrical', 'Thick vehicle keys and multiple attachments', '61.0 × 30.0mm; slot width 39.7mm; larger internal cavity per factory sheet'],
        ['3-in-1 Set', 'One lock with a swivel clasp and a horseshoe clasp', 'About 115–120mm combined length'],
      ],
    },
    keyInsight:
      'The strongest B2B use case is a mechanical brass key accessory for EDC gift sets and recognition programs, offered in three body shapes and a 3-in-1 set, where the solid 5mm wire and slide-lock action carry the perceived value.',
    seoKeywords: [
      'solid brass key hook',
      'brass slide lock keychain',
      'Luban lock keychain',
      'engraved brass key hook',
      'custom brass EDC keychain',
      'brass quick release key hook',
      'brass quick release key clip',
      'mechanical EDC key hook',
      'custom metal corporate gift',
      'corporate EDC gift',
      'engraved brass keychain',
      'brass fidget key hook',
    ],
  })

  console.log('✓ WP-315 Solid Brass Slide-Lock Key Hook inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/insert-wp312-titanium-bolt-action-inkless-pencil.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-312-titanium-bolt-action-inkless-pencil'
const PREFIX = 'titanium-bolt-action-inkless-pencil'

async function main() {
  await db.insert(products).values({
    id: 'wp-312-titanium-bolt-action-inkless-pencil',
    sku: 'WP-312',
    name: 'Titanium Bolt-Action Inkless Pencil',
    tagline: 'TC4 titanium · Brass bolt-action  |  59mm extended / 45mm closed  |  7g  |  Graphite alloy tip, inkless',
    category: 'EDC Tools',
    materials: ['TC4 titanium alloy (body)', 'Brass (bolt-action mechanism)', 'Graphite alloy (inkless tip, replaceable)'],
    moq: 100,
    sortOrder: 312,
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
      'TC4 titanium bolt-action inkless pencil, 7g, 45mm closed. Brass mechanism, graphite alloy tip, keychain loop. Laser-engravable. MOQ 100 units.',
    quickAnswer:
      'The Titanium Bolt-Action Inkless Pencil is a 7g, 45mm closed TC4 titanium writing tool with a brass bolt-action mechanism, graphite alloy inkless tip, and integrated keychain loop — laser-engravable barrel, 2 spare tips included, MOQ 100 units, for EDC corporate gift sets and compact travel programs.',
    description:
      'A compact EDC writing tool — TC4 titanium body, 45mm closed, 59mm extended, 7g. Push the brass bolt-action button to extend the graphite alloy tip; pull back to retract. The tip writes without ink: contact with paper transfers graphite particles, leaving a permanent grey line on standard uncoated surfaces. Two spare tips ship with each unit. An integrated lanyard loop at the tail mounts to keychains, carabiners, or zipper pulls. Titanium barrel laser-engraves for logo or text. For EDC corporate gift sets and field-use programs where a desk pen is too large.',
    highlights: [
      'TC4 titanium body — 7g, sandblasted matte finish, corrosion-resistant without plating',
      'Brass bolt-action mechanism — push to extend, pull to retract; audible mechanical click',
      'Graphite alloy inkless tip — permanent grey trace on uncoated paper; no ink, no refill cartridge',
      '45mm closed — integrated lanyard loop at tail; mounts to keychain ring or carabiner',
      '2 spare tips per unit — screw-thread interface, tip replaces without tools',
      'Laser engraving on titanium barrel — logo or text; vector file required',
    ],
    customizationOptions: [
      'Laser engraving on titanium barrel (logo, text, or serial numbers); vector file required (AI, EPS, SVG)',
      'Additional spare tip sets available for inclusion in bulk shipment on request',
      'Custom small-box or EDC pouch packaging on request',
    ],
    specifications: [
      { label: 'Material (body)', value: 'TC4 titanium alloy' },
      { label: 'Material (mechanism)', value: 'Brass' },
      { label: 'Surface finish', value: 'Sandblasted matte' },
      { label: 'Dimensions', value: '59mm × Ø7.8mm (extended); 45mm (closed)' },
      { label: 'Weight', value: 'Approx. 7g' },
      { label: 'Tip', value: 'Graphite alloy, inkless (replaceable)' },
      { label: 'Accessories', value: '2 spare tips included per unit' },
      { label: 'Attachment', value: 'Integrated lanyard loop' },
      { label: 'Branding method', value: 'Laser engraving on barrel' },
      { label: 'MOQ', value: '100 units' },
    ],
    faqs: [
      {
        q: 'How does the graphite alloy tip write without ink?',
        a: 'The graphite alloy tip is dense enough that paper contact transfers microscopic particles, producing a permanent grey line on standard uncoated paper (notebook, A4, kraft). Mark intensity is lighter than ballpoint but permanent — does not smudge once deposited. Does not perform on coated or glossy surfaces.',
      },
      {
        q: 'Can this mount on a standard keychain?',
        a: 'Yes. An integrated lanyard loop sits at the tail. Closed length is 45mm, compatible with standard keychain rings and carabiners. At 7g, it adds negligible load to an EDC carry.',
      },
      {
        q: 'What happens when the graphite tip wears down?',
        a: 'The tip unscrews from the nose using a standard thread interface. Each unit ships with 2 spare tips. For bulk orders, additional tip sets can be included in the initial shipment on request.',
      },
      {
        q: 'Is this appropriate for desk gift programs?',
        a: 'At 45mm and 7g, this pencil is sized for EDC and field programs rather than desk gifting. It pairs with compact tool kits, travel pouches, and outdoor or field-use corporate sets. For desk programs, the WP-109 Solid Brass Inkless Pen or WP-110 Solid Brass Hexagonal Ballpoint Pen are a closer fit.',
      },
    ],
    sourcingNotes: [
      {
        title: 'TC4 titanium in compact EDC writing tools',
        body: 'TC4 (grade 5) titanium is the standard alloy for EDC writing tools in Chinese precision manufacturing — lighter than stainless steel at comparable strength, corrosion-resistant without plating, and holds laser engraving cleanly. At 7g, this pencil carries indefinitely on a keychain without noticeable load. The brass bolt-action mechanism adds visible material contrast against the sandblasted grey titanium body, and the mechanical action is more reliable than clip-cap designs at this scale.',
      },
      {
        title: 'Graphite alloy inkless tips: practical parameters for corporate programs',
        body: 'Graphite alloy tips leave a permanent trace on uncoated paper at a grey tone comparable to a 2H pencil. The mark is not erasable. Tips wear to a rounded profile with use; two tips per unit covers typical corporate program duration without reorder. For extended-use programs, including additional tip sets in the initial shipment avoids procurement friction later. The inkless format is a practical argument for briefs specifying no-consumable or low-maintenance writing tools.',
      },
    ],
    keyInsight:
      '7g, 45mm closed — TC4 titanium body, brass bolt-action mechanism, graphite alloy inkless tip with 2 spare tips; keychain loop; laser-engravable barrel.',
    seoKeywords: [
      'titanium bolt action inkless pencil corporate gift',
      'EDC inkless pencil keychain custom engraved',
      'TC4 titanium mini pencil bulk order',
      'graphite tip inkless pencil wholesale B2B',
      'compact EDC writing tool corporate gifting',
      'custom metal corporate gift EDC set',
    ],
  })

  console.log('✓ WP-312 Titanium Bolt-Action Inkless Pencil inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

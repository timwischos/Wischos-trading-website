/**
 * Run with: npx tsx src/server/insert-wp217-solid-brass-round-storage-canister.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-217-solid-brass-round-storage-canister'
const PREFIX = 'solid-brass-round-storage-canister'

async function main() {
  await db.insert(products).values({
    id: 'wp-217-solid-brass-round-storage-canister',
    sku: 'WP-217',
    name: 'Solid Brass Round Storage Canister',
    tagline: 'Solid brass | Four sizes, 39–78mm | Up to 4mm walls | 113–238g',
    category: 'Desk Accessories',
    materials: ['Solid brass', 'Rubber O-ring (lid seal)'],
    moq: 100,
    sortOrder: 60,
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
      'Engraved solid brass storage canister, four sizes, up to 4mm walls, 113–238g. Desk paperweight, EDC storage, custom metal corporate gift. Inquire for pricing.',
    quickAnswer:
      'The Solid Brass Round Storage Canister is a machined solid brass lidded canister in four sizes, from 39mm to 78mm in diameter and 113g to 238g, with 3–4mm body walls, used as a desk paperweight and EDC storage for small dry items.',
    description:
      'A lidded storage canister machined from solid brass in four sizes, 39mm to 78mm in diameter. Body walls are 4mm thick on the three smaller sizes and 3mm on the largest, with a 2mm lid. A rubber O-ring on the machined lid limits dust and moisture reaching dry contents such as tablets, tea, or jewellery. The brushed brass is uncoated and darkens with handling, and laser engraving applies a logo or text to the lid or a flat side area. It works as a desk paperweight and as an engraved custom metal corporate gift for onboarding and recognition programs.',
    highlights: [
      'Machined from solid brass — walls up to 4mm, lid 2mm',
      'Four sizes — 39mm, 49mm, 59mm, and 78mm diameter',
      'Machined lid with rubber O-ring — limits dust and moisture reaching dry contents',
      'Brushed, uncoated finish — no plating, develops natural patina with handling',
      'Laser engravable lid and side — logo, text, or a custom emblem',
    ],
    customizationOptions: [
      'Laser engraving of a company logo or text on the lid or a flat side area, with placement confirmed against supplied artwork',
      'Plain unmarked finish, or a custom emblem or motif',
      'Custom packaging, subject to order quantity and confirmation',
    ],
    specifications: [
      { label: 'Material', value: 'Solid brass, uncoated, no chemical plating' },
      { label: 'Dimensions (Small)', value: '39mm OD × 30mm H; 31mm ID' },
      { label: 'Dimensions (Medium)', value: '49mm OD × 32mm H; 41mm ID' },
      { label: 'Dimensions (Large)', value: '59mm OD × 33mm H; 51mm ID' },
      { label: 'Dimensions (Extra Large)', value: '78mm OD × 30mm H; 72mm ID' },
      { label: 'Weight', value: 'Small 113–119g; Medium 157–172g; Large 213–225g; Extra Large 235–238g' },
      { label: 'Wall Thickness', value: 'Lid 2.0mm; body 4.0mm (Small, Medium, Large), 3.0mm (Extra Large)' },
      { label: 'Lid Seal', value: 'Rubber O-ring at the lid seam' },
      { label: 'Process', value: 'Precision machining from solid brass' },
      { label: 'Surface Finish', value: 'Brushed natural brass' },
      { label: 'Branding Method', value: 'Laser engraving on lid and flat side area' },
    ],
    faqs: [
      {
        q: 'Is the canister waterproof?',
        a: 'A rubber O-ring at the lid seam limits dust and moisture, but no waterproof or submersion rating is stated. It suits dry contents carried in a bag or kept on a desk.',
      },
      {
        q: 'Can it be used for tea, mints, or medication?',
        a: 'It holds dry small items. Brass is not treated as a food-contact surface by default, so loose food or tablets are best kept in an inner pouch or wrapper. A food-contact test report can be arranged on request for specific markets.',
      },
      {
        q: 'Can a company logo be engraved on the canister?',
        a: 'Yes. Laser engraving applies a logo or text to the lid or a flat side area. Placement and artwork requirements are confirmed with the quotation.',
      },
      {
        q: 'Which size suits a corporate gifting program?',
        a: 'Medium, at 49mm, is the most versatile: heavy enough to hold paper in place, small enough for a desk. Small suits EDC carry kits. Extra Large suits a shallow desk tray role.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Wall thickness sets the weight',
        body: 'Walls of 4mm on the three smaller sizes and a 2mm lid make the canister a heavy, solid machined object. Brass has a density of about 8.5 g/cm³, so the 49mm Medium reaches 157–172g. From Medium upward the mass is enough to hold loose paper in place, and Small, at 113–119g, is better suited to carry.',
      },
      {
        title: 'Uncoated brass keeps the engraved mark in bare metal',
        body: 'There is no plating on the surface, so laser engraving cuts into brass with no coating to wear through. The brushed finish darkens with handling, and each canister ages differently depending on use and storage.',
      },
      {
        title: 'One shape, four roles',
        body: 'The same canister works as a desk paperweight, a trinket or stamp-pad box, a tea caddy for dry leaf, and a pocket pill case, depending on size. Programs that mix roles usually pick one size per recipient tier and keep the engraving consistent.',
      },
    ],
    comparisonTable: {
      columns: ['Canister size', 'Best fit', 'Buyer note'],
      rows: [
        ['Small, 39mm', 'Pocket or bag carry of tablets and small items', '113–119g; lightest of the range'],
        ['Medium, 49mm', 'Desk paperweight and tea or jewellery storage', '157–172g; most versatile for gifting programs'],
        ['Large, 59mm', 'Larger desk objects and stamp pads', '213–225g; 33mm high, tallest of the range'],
        ['Extra Large, 78mm', 'Shallow desk catch-all for clips and small items', '235–238g; 3mm body walls, 30mm height'],
      ],
    },
    keyInsight:
      'The strongest B2B use case is a desk-side brass object for onboarding and recognition programs, where the weight and uncoated finish carry the material story and one engraved lid carries the brand.',
    seoKeywords: [
      'solid brass storage canister',
      'engraved brass paperweight',
      'brass EDC canister',
      'brass desk canister',
      'brass trinket box',
      'brass tea caddy',
      'custom brass pill box',
      'custom metal corporate gift',
      'corporate desk gift',
      'engraved brass canister',
      'solid brass round box',
    ],
  })

  console.log('✓ WP-217 Solid Brass Round Storage Canister inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

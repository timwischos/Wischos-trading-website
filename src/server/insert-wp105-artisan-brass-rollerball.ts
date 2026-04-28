/**
 * Run with: npx tsx src/server/insert-wp105-artisan-brass-rollerball.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-105-artisan-brass-rollerball'
const PREFIX = 'artisan-brass-rollerball'

async function main() {
  await db.insert(products).values({
    id: 'wp-105-artisan-brass-rollerball',
    sku: 'WP-105',
    name: 'Artisan Brass Rollerball',
    tagline: 'Brass Body + Stainless Steel Nib | 7 Surface Finishes | Twist-Cap | 30g',
    category: 'Writing Instruments',
    materials: ['Brass', 'Stainless steel'],
    moq: 100,
    sortOrder: 95,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-cover-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
    ],
    highlights: [
      'Twist-cap with hard stops — reliable in a bag or a pocket: quarter-turn open/close, mechanical stop at both ends, no accidental deployment.',
      'Three refill options, all 424-format: Ballpoint 1.0mm (~300m) / Gel 0.5mm (~800m, two variants). Factory default is ballpoint 1.0mm; gel can be specified at order. No tools needed to replace.',
      'Seven finishes: brushed silver, bare brass, gold, rose gold, brushed rose gold, champagne gold, matte black — same brass blank, identical balance across all colours.',
      'Eight customisation processes: laser engraving, embossing, electroplate-base laser, resin fill, screen print, gradient print, heat transfer, hot stamping.',
      'Laser engraving on brushed silver: the laser removes the surface layer to expose the warm brass tone beneath — sharp two-tone logo, no added colour needed.',
    ],
    customizationOptions: [
      'Laser engraving on barrel (logo or company name)',
      'Embossing / debossing',
      'Electroplate-base laser (two-tone contrast)',
      'Screen printing (colour logos)',
      'Gradient / ombre print',
      'Heat transfer print',
      'Resin fill (enamel-style colour fill)',
      'Hot stamping',
      'Finish: brushed silver / bare brass / gold / rose gold / brushed rose gold / champagne gold / matte black',
    ],
    description:
      'Solid brass body, twist-cap, 30g. The weight is structural — the barrel is machined from brass stock, not weighted after the fact. Centre of gravity sits at the grip, so the pen holds a writing position without pressure from the hand.\n\nSeven surface finishes are applied to the same blank, so every colour in a mixed order has identical balance and feel. Eight customisation processes available; laser engraving on brushed silver gives the sharpest logo contrast.\n\nSuitable for employee recognition gifts, year-end corporate sets, and branded bulk orders from 100 units.',
    specifications: [
      { label: 'Material', value: 'Brass body, stainless steel nib housing' },
      { label: 'Length', value: '140mm' },
      { label: 'Diameter', value: '9mm' },
      { label: 'Weight', value: '30g' },
      { label: 'Cap mechanism', value: 'Twist-cap, quarter-turn, hard stops at both ends' },
      { label: 'Refill format', value: '424-standard (not Parker-compatible)' },
      { label: 'Refill options', value: 'Ballpoint 1.0mm (~300m) / Gel 0.5mm (~800m)' },
      { label: 'Finishes', value: '7 options' },
      { label: 'Customisation', value: '8 processes' },
      { label: 'MOQ', value: '100 pcs' },
    ],
    faqs: [
      {
        q: 'Are the refills compatible with Parker or G2 cartridges?',
        a: 'No. WP-105 takes 424-format refills, not Parker. Three options available from the factory: ballpoint 1.0mm (~300m) and two gel 0.5mm variants (~800m each). 424-format refills are also available from third-party suppliers.',
      },
      {
        q: 'Which finish gives the best result for laser engraving?',
        a: 'Brushed silver gives the highest contrast — the laser removes the surface layer to expose the warm brass tone beneath, producing a clean two-tone logo without additional ink or filling. Matte black also engraves cleanly. Bare brass and gold can be engraved but with lower contrast.',
      },
      {
        q: 'Can one order be split across different finishes?',
        a: 'Yes, within a minimum of 100 units. Typically 50 pcs minimum per finish — confirm at inquiry for smaller splits.',
      },
      {
        q: 'What is the production lead time for a branded order?',
        a: 'Standard production lead time is 25–35 working days from artwork approval, including customisation. For orders ahead of major holidays or for first-time sample runs, advise at inquiry and we will confirm the timeline.',
      },
    ],
    expertNotes: [
      {
        title: 'Why brass over aluminium for a desk pen',
        body: 'Aluminium pens are light and cold to the touch — they work as utility items but don\'t carry much physical presence. Brass warms to body temperature slowly and holds weight at the grip. For a desk gift set where the pen is the most-used object, the material choice determines whether the pen stays on the desk or ends up in a drawer. Brass stays on the desk.',
      },
      {
        title: 'The pen anchors daily use of the whole set',
        body: 'In a three-piece desk set, the pen is the object picked up most often. If it writes well and feels right in the hand, that association extends to the set. If it doesn\'t, the whole set gets put aside. Choosing the right pen is less about specification matching and more about ensuring the set earns its place on the desk every day.',
      },
    ],
    seoKeywords: [
      'custom brass rollerball pen corporate gift',
      'engraved metal pen bulk order',
      'twist cap brass pen B2B',
      'branded rollerball pen wholesale',
      'premium metal pen logo engraving',
      'artisan brass pen corporate gifting',
    ],
  })

  console.log('✓ WP-105 Artisan Brass Rollerball inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

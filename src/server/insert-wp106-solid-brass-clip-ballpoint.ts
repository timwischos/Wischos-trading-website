/**
 * Run with: npx tsx src/server/insert-wp106-solid-brass-clip-ballpoint.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-106-brass-clip-pen'
const PREFIX = 'solid-brass-ballpoint-pen'

async function main() {
  await db.insert(products).values({
    id: 'wp-106-solid-brass-clip-ballpoint',
    sku: 'WP-106',
    name: 'Solid Brass Ballpoint Pen',
    tagline: 'Solid brass body | Cylindrical clip | Polished mirror or matte brushed finish',
    metaDescription: 'Custom solid brass ballpoint pen for corporate gifting, with cylindrical metal clip, polished or matte finish options, 0.5mm black refill and laser logo engraving.',
    quickAnswer: 'Solid Brass Ballpoint Pen is a custom engraved brass writing instrument for corporate desk and meeting use, built around a full brass body, cylindrical clip, 0.5mm black ballpoint refill, and polished mirror or matte brushed finish options.',
    category: 'Writing Instruments',
    materials: ['Solid brass', 'Stainless steel writing tip', 'Ballpoint refill'],
    moq: 100,
    sortOrder: 97,
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
    description: 'A solid brass ballpoint pen built for desk writing, meetings, and document signing. The full brass body gives the pen an approx. 50g hand weight, with a cylindrical clip for jacket pockets, notebook loops, and folio carry. The 0.5mm black ballpoint refill supports daily office writing and signature use.\n\nAvailable in polished mirror finish or matte brushed finish. The barrel supports laser engraving for a company logo, short brand line, or individual name. Suitable for executive desk sets, client gifts, conference writing instruments, and onboarding kits where the buyer wants a custom engraved brass pen with visible material weight.',
    highlights: [
      'Solid brass body - approx. 50g hand weight for desk and meeting use',
      'Cylindrical clip - supports jacket pocket, notebook loop, or folio carry',
      '0.5mm black ballpoint refill - suited to daily notes and document signing',
      'Two finish options - polished mirror or matte brushed surface',
      'Laser engraving area - barrel accepts company logo, short text, or name marking',
    ],
    specifications: [
      { label: 'Material', value: 'Solid brass body, stainless steel writing tip' },
      { label: 'Length', value: 'Approx. 156mm, confirm by sample or supplier spec' },
      { label: 'Diameter', value: 'Approx. 7mm' },
      { label: 'Weight', value: 'Approx. 50g; source data ranges 48g–58g by measurement reference' },
      { label: 'Refill', value: '0.5mm black ballpoint refill, exact replacement format to confirm' },
      { label: 'Clip', value: 'Cylindrical metal clip' },
      { label: 'Finish Options', value: 'Polished mirror / Matte brushed' },
      { label: 'Branding Method', value: 'Laser engraving on barrel' },
    ],
    customizationOptions: [
      'Laser engraving on barrel',
      'Logo, company name, short brand line, or individual name marking',
      'Finish selection: polished mirror or matte brushed',
      'Custom packaging for desk gifts, conference sets, or onboarding kits',
    ],
    faqs: [
      { q: 'Can the barrel be engraved with a company logo?', a: 'Yes. The brass barrel supports laser engraving for a company logo, short brand line, or individual name. Artwork should be checked against the available barrel area and selected finish before production.' },
      { q: 'Which finish works better for corporate orders?', a: 'Polished mirror gives a brighter and more formal surface. Matte brushed reduces visible fingerprints and gives a quieter office profile. Both finishes can support laser engraving.' },
      { q: 'Is the refill easy to replace?', a: 'The product uses a 0.5mm black ballpoint refill. Exact replacement format should be confirmed with the supplier or sample before finalizing a branded order.' },
      { q: 'Is the weight suitable for daily writing?', a: 'The pen is approx. 50g, so it feels heavier than standard aluminium or plastic office pens. Buyers should confirm sample feel when ordering for teams that write for long periods.' },
    ],
    sourcingNotes: [
      { title: 'Brass body weight and writing feel', body: 'At approx. 50g, this pen sits noticeably heavier than standard aluminium desk pens, which typically run 20–30g. The weight gives the pen a controlled desk-writing feel and should be reviewed by sample when the order is intended for long writing sessions.' },
      { title: 'Finish selection by gifting context', body: 'The polished mirror finish reflects light clearly and suits formal client, finance, legal, and executive gifting contexts. The matte brushed finish holds fingerprints less visibly and has a more restrained everyday profile for onboarding kits, internal office programs, and operational team gifts.' },
      { title: 'Cylindrical clip and carry use', body: 'The cylindrical clip supports jacket pockets, notebook loops, and folio carry. For recipients who move between desk and meetings, the clip gives the pen a carry role while keeping it within a writing-led desk gift category.' },
    ],
    comparisonTable: {
      columns: ['Pen option', 'Best for', 'Buyer note'],
      rows: [
        ['Solid Brass Ballpoint Pen', 'Desk writing, meetings, and signatures', 'Full brass body with cylindrical clip'],
        ['Artisan Brass Rollerball', 'Smoother writing feel and client desk sets', 'Rollerball format with brass body'],
        ['Brass Crown Bolt-Action Pen', 'Visible mechanical action', 'Bolt-action mechanism and mixed-metal body'],
      ],
    },
    keyInsight: 'WP-106 is strongest as a full-brass corporate ballpoint when the buyer wants material weight, a formal writing profile, and a barrel logo surface in one desk-ready pen.',
    seoKeywords: [
      'solid brass ballpoint pen',
      'custom brass ballpoint pen',
      'engraved brass pen',
      'corporate pen gift',
      'branded brass pen with logo',
      'brass business pen',
      'executive desk pen',
      'conference writing instrument',
      'custom logo metal pen',
      'brass pen bulk order',
    ],
  })

  console.log('✓ WP-106 Solid Brass Ballpoint Pen inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

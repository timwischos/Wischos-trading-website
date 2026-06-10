/**
 * Run with:
 *   npx tsx src/server/upsert-wp107-wp108-writing-instruments.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const wp107Folder = 'WP-107-hexagonal-brass-click-pen'
const wp107Prefix = 'hexagonal-brass-click-pen'
const wp108Folder = 'WP-108-solid-brass-bolt-action-pen'
const wp108Prefix = 'solid-brass-bolt-action-pen'

const productRows = [
  {
    id: 'wp-107-hexagonal-brass-click-pen',
    sku: 'WP-107',
    name: 'Hexagonal Brass Click Pen',
    tagline: 'Hexagonal brass body | Click action | 50g desk weight',
    metaDescription:
      'Custom hexagonal brass click pen for corporate gifts, with approx. 50g hand weight, 1.0mm black ballpoint refill, stainless steel tip and logo marking options.',
    quickAnswer:
      'Hexagonal Brass Click Pen is a custom brass writing instrument for corporate desk use, built around a six-sided brass body, click-action mechanism, 1.0mm black ballpoint refill, and approx. 50g hand weight.',
    category: 'Writing Instruments',
    materials: ['Brass body', 'Stainless steel writing tip', 'Black ballpoint refill'],
    moq: 100,
    sortOrder: 98,
    active: true,
    heroImage: `/products/${wp107Folder}/${wp107Prefix}-cover.avif`,
    images: [
      `/products/${wp107Folder}/${wp107Prefix}-cover.avif`,
      `/products/${wp107Folder}/${wp107Prefix}-hover.avif`,
      `/products/${wp107Folder}/${wp107Prefix}-detail-1.avif`,
      `/products/${wp107Folder}/${wp107Prefix}-detail-2.avif`,
      `/products/${wp107Folder}/${wp107Prefix}-detail-3.avif`,
      `/products/${wp107Folder}/${wp107Prefix}-detail-4.avif`,
      `/products/${wp107Folder}/${wp107Prefix}-lifestyle.avif`,
    ],
    description:
      'A hexagonal brass click pen built for daily office writing, meetings, and branded desk programs. The six-sided body gives the pen a flat-sided grip profile and a stable visual line on the desk, while the click-action mechanism keeps it ready for quick notes without a cap.\n\nAt approx. 50g, the pen feels heavier than standard aluminium or plastic office pens while staying within a practical desk-writing category. The brass body provides a warm metal surface for logo marking, and the 1.0mm black ballpoint refill suits general writing, meeting notes, forms, and document signing.',
    highlights: [
      'Hexagonal brass body - flat-sided profile with visible metal weight',
      'Click-action mechanism - one-handed writing without a removable cap',
      'Approx. 50g hand weight - heavier than standard office pens',
      '1.0mm black ballpoint refill - suited to notes, forms, and signatures',
      'Logo marking area - supports company mark, short brand line, or name marking',
    ],
    specifications: [
      { label: 'SKU', value: 'WP-107' },
      { label: 'Body Material', value: 'Brass' },
      { label: 'Writing Tip Material', value: 'Stainless steel' },
      { label: 'Refill', value: '1.0mm black ballpoint refill' },
      { label: 'Mechanism', value: 'Click-action' },
      { label: 'Length', value: 'Approx. 138mm' },
      { label: 'Diameter', value: 'Approx. 10mm' },
      { label: 'Weight', value: 'Approx. 50g' },
      { label: 'Packaging', value: 'Custom packaging available by project' },
      { label: 'Branding Method', value: 'Laser marking by final production spec' },
    ],
    customizationOptions: [
      'Logo marking on brass body',
      'Company name, short brand line, or individual name marking',
      'Custom packaging for meeting gifts, client gifts, or onboarding kits',
      'Refill and finish confirmation by sample',
    ],
    comparisonTable: {
      columns: ['Pen option', 'Best fit', 'Buyer note'] as [string, string, string],
      rows: [
        ['Hexagonal Brass Click Pen', 'Daily office writing and meeting gifts', 'Six-sided brass body with simple click action'],
        ['Solid Brass Ballpoint Pen', 'Formal desk writing and signatures', 'Full brass body with a cleaner cylindrical profile'],
        ['Brass Crown Bolt-Action Pen', 'Mechanical interaction and executive gifts', 'Bolt-action mechanism with stronger visual movement'],
      ] as [string, string, string][],
    },
    faqs: [
      {
        q: 'Can the pen be branded with a company logo?',
        a: 'Yes. The brass body can support logo marking, short brand text, or individual name marking. Final placement should be checked against the flat-sided barrel area and selected marking method.',
      },
      {
        q: 'Is this pen suitable for daily office writing?',
        a: 'Yes. It uses a 1.0mm black ballpoint refill and a click-action mechanism, making it suitable for meetings, notes, forms, and general desk writing.',
      },
      {
        q: 'How heavy is the pen?',
        a: 'The source specification lists approx. 50g per pen. That gives it more hand weight than standard office pens while keeping it within a practical desk-writing category.',
      },
      {
        q: 'What packaging should be used for corporate gifting?',
        a: 'Custom gift packaging should be selected based on the order brief, recipient group, and presentation requirements.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Hexagonal body and logo placement',
        body: 'The six-sided body gives the pen clear flat areas for logo marking. This can help artwork sit more predictably than on a fully round barrel, especially for short brand lines or individual name marking.',
      },
      {
        title: 'Click-action format for office programs',
        body: 'Click pens are easy to use in meetings, onboarding kits, and conference writing programs because there is no separate cap to remove or lose. This makes the format practical for larger team orders.',
      },
      {
        title: 'Brass weight in a lower-complexity pen',
        body: 'At approx. 50g, this product offers brass hand weight in a simple click-pen format. It is a useful option when buyers want a metal writing gift without the stronger mechanical profile of heavier bolt-action pens.',
      },
    ],
    keyInsight:
      'WP-107 is strongest as a practical brass office pen when the buyer wants material weight, simple click use, and a flat-sided logo surface in one corporate writing gift.',
    seoKeywords: [
      'hexagonal brass click pen',
      'custom brass click pen',
      'engraved brass pen',
      'corporate pen gift',
      'branded metal pen',
      'brass ballpoint pen',
      'custom logo brass pen',
      'office writing gift',
      'meeting gift pen',
      'brass pen bulk order',
    ],
  },
  {
    id: 'wp-108-solid-brass-bolt-action-pen',
    sku: 'WP-108',
    name: 'Solid Brass Bolt-Action Pen',
    tagline: 'Solid brass body | Bolt-action mechanism | 75g mechanical profile',
    metaDescription:
      'Custom solid brass bolt-action pen for corporate gifting, with approx. 75g brass body, stainless steel clip, 0.7mm black refill, finish options and gift box packaging.',
    quickAnswer:
      'Solid Brass Bolt-Action Pen is a custom branded brass writing instrument with a bolt-action mechanism, approx. 75g net weight, stainless steel clip, 0.7mm black refill, and natural brass or vintage black finish options.',
    category: 'Writing Instruments',
    materials: ['Solid brass body', 'Stainless steel clip', 'Black ballpoint refill'],
    moq: 100,
    sortOrder: 99,
    active: true,
    heroImage: `/products/${wp108Folder}/${wp108Prefix}-cover.avif`,
    images: [
      `/products/${wp108Folder}/${wp108Prefix}-cover.avif`,
      `/products/${wp108Folder}/${wp108Prefix}-hover.avif`,
      `/products/${wp108Folder}/${wp108Prefix}-detail-1.avif`,
      `/products/${wp108Folder}/${wp108Prefix}-detail-2.avif`,
      `/products/${wp108Folder}/${wp108Prefix}-detail-3.avif`,
      `/products/${wp108Folder}/${wp108Prefix}-detail-4.avif`,
      `/products/${wp108Folder}/${wp108Prefix}-detail-5.avif`,
      `/products/${wp108Folder}/${wp108Prefix}-lifestyle.avif`,
    ],
    description:
      'A solid brass bolt-action pen built for buyers who want a heavier writing tool with a clear mechanical interaction. The side bolt mechanism deploys and retracts the refill with a deliberate hand movement, giving the pen a more tactile profile than a standard click pen.\n\nThe brass body has an approx. 75g net weight, a 12mm diameter, and a 142mm length. A stainless steel clip supports notebook, pocket, or folio carry. The product is available in natural brass and vintage black finishes, with black gift box packaging listed in the source specification.',
    highlights: [
      'Solid brass body - approx. 75g net weight for a substantial writing feel',
      'Bolt-action mechanism - side action deploys and retracts the refill',
      'Stainless steel clip - supports notebook, pocket, or folio carry',
      '0.7mm black refill - suitable for daily notes and business writing',
      'Two finish options - natural brass or vintage black',
    ],
    specifications: [
      { label: 'SKU', value: 'WP-108' },
      { label: 'Body Material', value: 'Brass' },
      { label: 'Clip Material', value: 'Stainless steel' },
      { label: 'Refill', value: '0.7mm black oil-based ballpoint refill' },
      { label: 'Refill Format', value: 'G2-style metal refill; Parker-style compatibility maintained from source note and confirmed during sampling' },
      { label: 'Mechanism', value: 'Bolt-action' },
      { label: 'Length', value: 'Approx. 142mm' },
      { label: 'Diameter', value: 'Approx. 12mm' },
      { label: 'Net Weight', value: 'Approx. 75g' },
      { label: 'Packed Weight', value: 'Approx. 111g with black paper box' },
      { label: 'Finish Options', value: 'Natural brass / Vintage black' },
      { label: 'Packaging', value: 'Black gift box by source spec' },
      { label: 'Branding Method', value: 'Logo marking by final production spec' },
    ],
    customizationOptions: [
      'Logo marking on brass body',
      'Finish selection: natural brass or vintage black',
      'Custom text or name marking by project brief',
      'Gift box presentation for client gifts, desk gifts, or field-facing teams',
      'Refill confirmation by sample before bulk order',
    ],
    comparisonTable: {
      columns: ['Pen option', 'Best fit', 'Buyer note'] as [string, string, string],
      rows: [
        ['Solid Brass Bolt-Action Pen', 'Heavy writing gift with mechanical action', '75g brass body and heavier mechanical profile'],
        ['Hexagonal Brass Click Pen', 'Simpler daily office writing', 'Lighter click-action format with flat-sided body'],
        ['Brass Crown Bolt-Action Pen', 'Executive mechanical pen programs', 'Bolt-action feel with a more refined corporate profile'],
      ] as [string, string, string][],
    },
    faqs: [
      {
        q: 'Is this a writing pen or a multi-tool?',
        a: 'It is a writing pen with a bolt-action mechanism and heavier brass writing profile. The source information supports writing use, brass body construction, and gift positioning.',
      },
      {
        q: 'Can the pen be branded?',
        a: 'Yes. The source information states that logo printing or custom processing is available. Final marking placement should be checked against the bolt slot, clip position, and selected finish.',
      },
      {
        q: 'How heavy is the pen?',
        a: 'The source specification lists approx. 75g net weight for the brass pen and approx. 111g packed weight with the black paper box. Buyers should confirm hand feel by sample before team-wide orders.',
      },
      {
        q: 'Which finish is better for corporate gifting?',
        a: 'Natural brass gives a warmer visible-metal look. Vintage black gives a darker field-style profile. The better option depends on the recipient group, brand tone, and marking contrast.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Bolt-action mechanism and recipient fit',
        body: 'Bolt-action pens work well when the buyer wants the writing tool itself to feel interactive. The side action creates a visible mechanical moment, which suits engineering, field-facing, outdoor, and utility-led gift programs.',
      },
      {
        title: 'Weight and writing expectation',
        body: 'At approx. 75g, this pen is substantially heavier than standard office pens. That weight supports a strong gift impression, but sample review is useful when the order is intended for long writing sessions.',
      },
      {
        title: 'Finish selection and brand tone',
        body: 'Natural brass makes the material story more visible and will show handling character over time. Vintage black gives the product a more field-style appearance and may suit field teams, outdoor campaigns, and darker brand palettes.',
      },
    ],
    keyInsight:
      'WP-108 is strongest as a heavier brass bolt-action writing gift for buyers who want mechanical interaction, visible metal weight, and a stronger mechanical profile without moving into a multi-tool pen category.',
    seoKeywords: [
      'solid brass bolt-action pen',
      'brass bolt action pen',
      'custom bolt action pen',
      'engraved brass bolt-action pen',
      'corporate bolt-action pen gift',
      'heavy brass pen',
      'branded metal pen',
      'custom logo brass pen',
      'executive bolt action pen',
      'brass pen bulk order',
    ],
  },
]

async function main() {
  for (const row of productRows) {
    await db.insert(products).values(row).onConflictDoUpdate({
      target: products.id,
      set: row,
    })
    console.log(`✓ Upserted ${row.sku} ${row.name}`)
  }

  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


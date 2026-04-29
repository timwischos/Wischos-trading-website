/**
 * Run with: npx tsx src/server/insert-wp407-double-wall-stainless-steel-desk-cup.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-407-double-wall-stainless-steel-desk-cup'
const PREFIX = 'double-wall-stainless-steel-desk-cup'

async function main() {
  await db.insert(products).values({
    id: 'wp-407-double-wall-stainless-steel-desk-cup',
    sku: 'WP-407',
    name: 'Double-Wall Stainless Steel Desk Cup',
    tagline: '304 Stainless Steel | Double-Wall | 300ml | No-Handle Cylinder',
    category: 'Drinkware',
    materials: ['304 Stainless steel'],
    moq: 100,
    sortOrder: 270,
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
    highlights: [
      'Material grade: 304 food-grade steel, not 201. 304 contains 18% chromium and 8% nickel, giving higher corrosion resistance and food safety rating with no metallic taste over time.',
      'Double-wall insulation: The outer surface stays close to room temperature; hot drinks won\'t burn the hand, cold drinks won\'t sweat onto the desk. No rings left on a desk or document.',
      'No-handle cylinder: Minimal desk footprint, clean visual form, and efficient use of gift box space. No handle cutout required in packaging.',
      'Three finishes: Bare brushed steel, gold, and rose gold. Same construction across all, and colour can be matched to a gift set palette or corporate brand.',
      'Laser engraving area: Exterior barrel. Bare brushed steel gives the sharpest contrast; permanent mark with no fading or peeling.',
    ],
    customizationOptions: [
      'Laser engraving on exterior barrel',
      'Screen printing (full-colour logos or complex artwork)',
      'Heat transfer (recommended for gold and rose gold finishes)',
      'Finish: bare brushed steel / gold / rose gold',
    ],
    description:
      '304 food-grade stainless steel, double-wall construction, no handle, straight cylinder, 300ml.\n\nThe double-wall does two things: hot drinks don\'t heat the exterior, cold drinks don\'t condense on the outer surface. The cup leaves no ring on a desk, a notebook, or a document.\n\nNo handle means no fixed orientation — the cup can sit anywhere on a desk without needing to face a particular direction. A mug\'s handle defines its front; this cup has no front. As a cylinder, it sits beside a pen and a brass spinning top without competing for visual attention.\n\nMouth diameter 82mm, height 98mm, weight 200g. Three finishes: bare brushed steel, gold, rose gold. The exterior barrel accepts laser engraving; bare brushed steel gives the best contrast.\n\nSuitable for corporate gift sets, employee onboarding kits, and client appreciation orders from 100 units.',
    specifications: [
      { label: 'Material', value: '304 food-grade stainless steel' },
      { label: 'Construction', value: 'Double-wall hollow insulation' },
      { label: 'Capacity', value: '300ml' },
      { label: 'Mouth diameter', value: '82mm' },
      { label: 'Height', value: '98mm' },
      { label: 'Base diameter', value: '60mm' },
      { label: 'Weight', value: '200g' },
      { label: 'Finishes', value: 'Bare brushed steel / Gold / Rose gold' },
      { label: 'Customisation', value: 'Laser engraving on exterior barrel' },
      { label: 'MOQ', value: '100 pcs' },
    ],
    faqs: [
      {
        q: 'Is this 304 or 201 stainless steel?',
        a: '304 food-grade stainless steel. 201 stainless has higher manganese and minimal nickel content, which can affect taste over time with acidic drinks. 304 (18/8) meets food-contact safety standards and is the correct material for corporate gifting and tableware applications.',
      },
      {
        q: 'How long does the double-wall insulation keep drinks warm?',
        a: 'The double-wall provides thermal insulation but this is not a vacuum flask — there is no evacuated layer, so it does not retain temperature for extended periods. The practical effect is that the outer surface stays close to room temperature: hot drinks won\'t burn the hand, cold drinks won\'t sweat onto the desk. Suitable for drinks consumed within 30–60 minutes at a desk, not as a replacement for a vacuum bottle.',
      },
      {
        q: 'Can the exterior be colour-printed rather than engraved?',
        a: 'Yes. Screen printing and heat transfer are available in addition to laser engraving, suitable for full-colour logos or complex artwork. Laser engraving is recommended on bare brushed steel; screen print or heat transfer works better on gold and rose gold to preserve the base colour. Specify at inquiry.',
      },
      {
        q: 'What is the production lead time for a branded order?',
        a: 'Standard production lead time is 25–35 working days from artwork approval, including customisation. For orders ahead of major holidays or for first-time sample runs, advise at inquiry and we will confirm the timeline.',
      },
    ],
    sourcingNotes: [
      {
        title: 'A desk cup, not a travel mug',
        body: 'Travel mugs have lids, handles, and a shape that reads as "practical commuter item." A no-handle cylinder reads differently — it belongs on a desk alongside precision objects, not in a bag or a cupholder. The form signals that this cup was chosen for a specific context, which is part of what makes a curated gift set feel considered rather than assembled.',
      },
      {
        title: 'Logo visibility on a cylinder vs. a mug',
        body: 'A mug\'s handle defines its orientation — the logo faces one direction and is invisible from the other. A cylinder has no fixed facing: however it is placed on a desk, the engraving is visible. For buyers who want consistent brand exposure across a gifting programme, the geometry of a no-handle cup is a practical advantage, not just an aesthetic one.',
      },
    ],
    seoKeywords: [
      'custom stainless steel desk cup corporate gift',
      'double wall steel cup bulk order',
      'branded metal cup no handle',
      '304 stainless steel cup logo engraving',
      'corporate drinkware gift wholesale',
      'stainless steel office cup bulk order',
    ],
  })

  console.log('✓ WP-407 Double-Wall Stainless Steel Desk Cup inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

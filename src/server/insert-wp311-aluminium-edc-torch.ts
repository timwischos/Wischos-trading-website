/**
 * Run with: npx tsx src/server/insert-wp311-aluminium-edc-torch.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-311-aluminium-edc-torch'
const PREFIX = 'aluminium-edc-torch'

async function main() {
  await db.insert(products).values({
    id: 'wp-311-aluminium-edc-torch',
    sku: 'WP-311',
    name: 'Aluminium EDC Torch',
    tagline: 'Anodised aluminium alloy  |  400 lm / CRI 90  |  IPX6  |  Type-C rechargeable',
    metaDescription: 'Custom branded aluminium EDC torch, 400 lm CRI 90, IPX6 waterproof, Type-C rechargeable 18650. For outdoor and safety corporate gift programs. Inquire for pricing.',
    quickAnswer: 'The Aluminium EDC Torch is an anodised aluminium alloy rechargeable flashlight with a P50 LED at 400 lumens and CRI 90, IPX6 waterproof rating, Type-C rechargeable 18650 battery (10–12h runtime), and a recessed tungsten steel glass breaker in the tail cap, measuring 156×38mm and weighing 135g, for outdoor, safety, and EDC corporate gift programs.',
    category: 'EDC Accessories',
    materials: ['Anodised aluminium alloy'],
    moq: 100,
    sortOrder: 134,
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
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    description: 'An anodised aluminium alloy rechargeable torch for everyday carry. The P50 LED delivers 400 lumens at 5000K daylight colour temperature with CRI 90 — colour-accurate in low light. An IPX6-rated sealed body handles rain and direct water spray. The 18650 battery charges via Type-C in 2.5–3 hours and runs 10–12 hours; a power ring around the side switch shows remaining charge. The tail cap integrates a recessed tungsten steel glass breaker with no exposed sharp edge. At 135g and 156mm, it fits a jacket pocket without adding bulk. The anodised body accepts laser engraving for company logos.',
    highlights: [
      'Anodised hard oxide aluminium alloy body — IPX6 waterproof, sealed against rain and direct water spray',
      'P50 LED, 400 lumens, CRI 90, 5000K daylight — colour-accurate illumination in low light',
      'Type-C rechargeable 18650 battery — 2.5–3h charge, 10–12h runtime',
      'Power ring indicator around side switch — battery status visible at a glance',
      'Hidden tungsten steel glass breaker in tail cap — recessed, no exposed sharp edge',
      'Laser engravable anodised body for company logos and text',
    ],
    specifications: [
      { label: 'Material', value: 'Anodised hard oxide aluminium alloy' },
      { label: 'Dimensions', value: '156mm length × 38mm head diameter × 25mm body diameter' },
      { label: 'Weight', value: '135g' },
      { label: 'LED', value: 'P50 LED' },
      { label: 'Output', value: '400 lumens' },
      { label: 'Colour temperature', value: '5000K (daylight)' },
      { label: 'CRI', value: '≥90' },
      { label: 'LED lifespan', value: 'Up to 50,000 hours' },
      { label: 'Waterproof rating', value: 'IPX6' },
      { label: 'Battery', value: '18650 removable rechargeable lithium' },
      { label: 'Charging', value: 'Type-C USB' },
      { label: 'Charge time', value: '2.5–3 hours' },
      { label: 'Runtime', value: '10–12 hours' },
      { label: 'Glass breaker', value: 'Tungsten steel, integrated in tail cap' },
      { label: 'Branding method', value: 'Laser engraving' },
    ],
    customizationOptions: [
      'Laser engraving on the aluminium body (logo, text, or serial numbers)',
      'Custom gift box with company branding',
      'OEM colour and circuit customisation available at volume — contact for specifications',
    ],
    faqs: [
      { q: 'Is the glass breaker exposed during normal carry?', a: 'No. The tungsten steel glass breaker is integrated into the tail cap and recessed behind the cap ring. It does not protrude during normal carry or handling. Activation requires deliberate direct pressure against a hard surface.' },
      { q: 'Can the engraving withstand outdoor use?', a: 'The body is hard-oxide anodised aluminium, and the laser engraving is cut directly into the surface — not printed. The mark remains readable through rain, dust, and regular field handling.' },
      { q: 'Is the 18650 battery user-replaceable?', a: 'Yes. The 18650 is a standard removable rechargeable lithium cell. It can be charged in-body via Type-C or removed and charged externally, which extends the product lifespan beyond the first charge cycle.' },
      { q: 'What gifting contexts work best for this product?', a: 'Outdoor industry accounts, construction or site teams, corporate safety kits, and welcome packs for field roles. The IPX6 rating, 10–12h runtime, and glass breaker give the item a clear functional story in those contexts.' },
    ],
    sourcingNotes: [
      { title: 'IPX6 and runtime differentiate this from decorative torches', body: 'Most promotional torches lack a certified waterproof rating. IPX6 requires the body to withstand 12.5 litres of water per minute for three minutes — a meaningful standard for construction, security, or outdoor industry accounts. The 10–12 hour runtime on a single 18650 charge, combined with Type-C top-up, makes this a working torch rather than an emergency novelty.' },
      { title: 'CRI 90 at 5000K is a buyer-facing specification', body: 'CRI measures how accurately a light source renders colour compared with natural daylight (100 = perfect). CRI 90 at 5000K is in the professional lighting range — above typical promotional flashlights, which usually run CRI 70–80 at a warmer colour temperature. For buyers supplying site inspection teams, medical staff, or hospitality security, colour accuracy is a functional requirement worth stating in procurement briefs.' },
    ],
    keyInsight: 'The combination of IPX6 waterproofing, CRI 90 output, and a hidden glass breaker makes this a functional field tool, not a novelty light — the primary B2B use case is corporate gifting for outdoor, construction, or security accounts where the recipient will rely on the torch in real conditions.',
    seoKeywords: [
      'aluminium EDC torch corporate gift',
      'custom engraved rechargeable flashlight',
      'IPX6 waterproof torch corporate gift',
      'anodised aluminium flashlight',
      'tactical torch corporate gift',
      'engraved metal torch corporate',
      'Type-C rechargeable EDC torch',
      'custom branded flashlight outdoor',
      'CRI 90 torch corporate gift',
      'EDC torch laser engraving',
    ],
  })

  console.log('✓ WP-311 Aluminium EDC Torch inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/update-titanium-capsule-bottle.ts
 * Updates Pure Titanium Capsule Bottle — 150ml and 200ml.
 * 150ml: adds shirt-pocket sizing + PP cap detail.
 * 200ml: keeps the product active and uses bottle image paths.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { eq } from 'drizzle-orm'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const sharedHighlights = [
  'Pure Titanium Liner: Non-reactive with coffee or acidic drinks — zero metallic odor, zero flavor contamination. Unlike stainless steel, pure titanium contains no nickel and is fully biocompatible for long-term daily use.',
  'Shirt-Pocket Form Factor: At 150ml, this capsule bottle is explicitly sized to fit a standard shirt pocket — the most friction-free carry format for professionals who want a discreet hydration option at meetings, in transit, or at the desk without a bag.',
  'Condensation-Free Vacuum Insulation: The double-wall vacuum structure prevents external condensation, protecting documents, electronics, and desk surfaces from moisture damage during long working sessions.',
]

const sharedDescription =
  'This Pure Titanium Capsule Bottle prioritizes material integrity and functional efficiency for the modern workspace. By utilizing pure titanium, we offer a bottle that is chemically stable and resistant to the lingering odors often found in traditional metal containers. The 150ml capsule form is sized explicitly for shirt-pocket carry — the optimal capacity for a focused espresso, green tea, or tincture without adding bulk to a briefcase or jacket.\n\nThe food-grade PP (polypropylene) cap seals the bottle securely without imparting taste or odor, complementing the inert titanium liner for a fully neutral drinking experience. The compact capsule silhouette projects a sense of reliability and modern professionalism — making it a solid choice for corporate gifting programs targeting executives, frequent travelers, and professionals who carry their standards with them.'

const sharedFaqs = [
  {
    q: 'How does pure titanium hold up for long-term daily use?',
    a: 'Pure titanium is exceptionally resistant to corrosion. Unlike steel, this capsule bottle will not rust or degrade when exposed to acidic beverages over time, ensuring a reliable, long-lasting bottle for intense daily use.',
  },
  {
    q: 'What material is the cap and does it affect taste?',
    a: 'The cap is made from food-grade PP (polypropylene) — a material chosen specifically for its neutral taste and odor profile. Combined with the inert titanium body, the entire drinking system remains fully taste-neutral, even with acidic or aromatic beverages like espresso or green tea.',
  },
  {
    q: 'Does the 150ml size fit in a shirt pocket?',
    a: 'Yes — the 150ml capsule is explicitly sized for standard shirt pocket carry. The compact capsule geometry minimizes protrusion, making it a discreet and professional option for meetings, commutes, or desk use without requiring a bag.',
  },
  {
    q: 'What are the options for bulk logo customization?',
    a: 'We recommend Laser Engraving. This process creates a sharp, high-contrast permanent mark on the titanium surface that is resistant to wear and peeling, ensuring consistent brand visibility throughout the product lifespan.',
  },
  {
    q: 'Does pure titanium affect the taste of coffee or tea?',
        a: 'No. Pure titanium is chemically inert and non-reactive with acidic beverages, coffee, and tea. It leaves zero metallic taste or odor — a key advantage over standard stainless steel bottles, which can impart subtle metallic notes over time.',
  },
]

const sharedSeoKeywords = [
  // SEO — core product
  'pure titanium bottle',
  'titanium capsule bottle',
  'mini titanium thermos',
  'pure titanium vacuum bottle',
  // SEO — B2B / corporate
  'corporate gift titanium bottle bulk',
  'custom logo titanium bottle wholesale',
  'branded titanium bottle bulk order',
  // Material / craft
  'laser engraved titanium bottle',
  'titanium no metallic taste bottle',
  'food grade pure titanium bottle',
  // SIO — social intent
  'EDC titanium capsule bottle',
  'shirt pocket titanium bottle',
  'aesthetic titanium capsule carry',
  // GEO — AI natural language
  'best pure titanium bottle for office use',
  'shirt pocket titanium capsule bottle corporate gift',
  'pure titanium bottle zero metallic odor PP cap',
  // Long-tail
  'pure titanium capsule bottle bulk order',
  'titanium vacuum bottle no metallic taste corporate gift',
  'mini titanium bottle laser engraving wholesale',
]

const sharedCustomizationOptions = [
  'Laser Engraving on Titanium Body',
  'Custom Packaging',
]

async function main() {
  // ── 150ml — UPDATE ─────────────────────────────────────────────────────────
  const BASE_150 = '/products/WP-402-pure-titanium-capsule-bottle-150ml'
  await db.update(products).set({
    sku: 'WP-402',
    name: 'Pure Titanium Capsule Bottle',
    tagline: 'Pure Titanium | 150ml Shirt-Pocket Size | Double-Wall Vacuum | Food-Grade PP Cap | Zero Metallic Odor',
    category: 'Drinkware',
    materials: ['Pure Titanium', 'Food-Grade PP'],
    heroImage: `${BASE_150}/pure-titanium-capsule-bottle-150ml-cover.avif`,
    images: [
      `${BASE_150}/pure-titanium-capsule-bottle-150ml-cover.avif`,
      `${BASE_150}/pure-titanium-capsule-bottle-150ml-hover.avif`,
      `${BASE_150}/pure-titanium-capsule-bottle-150ml-detail-1.avif`,
      `${BASE_150}/pure-titanium-capsule-bottle-150ml-detail-2.avif`,
      `${BASE_150}/pure-titanium-capsule-bottle-150ml-detail-3.avif`,
      `${BASE_150}/pure-titanium-capsule-bottle-150ml-detail-4.avif`,
      `${BASE_150}/pure-titanium-capsule-bottle-150ml-detail-5.avif`,
    ],
    moq: 100,
    customizationOptions: sharedCustomizationOptions,
    highlights: sharedHighlights,
    description: sharedDescription,
    specifications: [
      { label: 'Capacity', value: '150ml (5 oz)' },
      { label: 'Dimensions', value: 'Ø51mm × 128mm (Ø2.0" × 5.0")' },
      { label: 'Net Weight', value: '107g (3.8 oz)' },
      { label: 'Material', value: 'Pure Titanium Body; Food-Grade PP Cap' },
      { label: 'Thermal Performance', value: 'Double-Wall Vacuum; 6+ Hours Retention' },
      { label: 'Packaging', value: 'Standard Color Box' },
    ],
    faqs: sharedFaqs,
    seoKeywords: [
      ...sharedSeoKeywords,
      '150ml titanium bottle',
      '150ml pure titanium capsule bottle',
      'mini 150ml titanium vacuum bottle shirt pocket',
    ],
    sortOrder: 240,
    active: true,
  }).where(eq(products.id, 'wp-402-pure-titanium-capsule-bottle-150ml'))
  console.log('✓ Pure Titanium Capsule Bottle 150ml updated.')

  // ── 200ml — UPDATE ─────────────────────────────────────────────────────────
  const BASE_200 = '/products/WP-406-pure-titanium-capsule-bottle-200ml'
  await db.update(products).set({
    sku: 'WP-406',
    name: 'Pure Titanium Capsule Bottle',
    heroImage: `${BASE_200}/pure-titanium-capsule-bottle-200ml-cover.avif`,
    images: [
      `${BASE_200}/pure-titanium-capsule-bottle-200ml-cover.avif`,
      `${BASE_200}/pure-titanium-capsule-bottle-200ml-hover.avif`,
      `${BASE_200}/pure-titanium-capsule-bottle-200ml-detail-1.avif`,
      `${BASE_200}/pure-titanium-capsule-bottle-200ml-detail-2.avif`,
      `${BASE_200}/pure-titanium-capsule-bottle-200ml-detail-3.avif`,
      `${BASE_200}/pure-titanium-capsule-bottle-200ml-detail-4.avif`,
      `${BASE_200}/pure-titanium-capsule-bottle-200ml-detail-5.avif`,
      `${BASE_200}/pure-titanium-capsule-bottle-200ml-detail-6.avif`,
      `${BASE_200}/pure-titanium-capsule-bottle-200ml-detail-7.avif`,
    ],
    active: true,
  }).where(eq(products.id, 'wp-406-pure-titanium-capsule-bottle-200ml'))
  console.log('✓ Pure Titanium Capsule Bottle 200ml updated.')

  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

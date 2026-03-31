/**
 * Run with: npx tsx src/server/update-titanium-egg-cup.ts
 * Inserts the Ice-Crystal Pure Titanium Egg Cup (new product).
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const BASE = '/products/Titanium-Double-Layer-Insulated-Anti-Scalding-Water-Cup-01'

async function main() {
  await db.insert(products).values({
    id: 'ice-crystal-pure-titanium-egg-cup',
    name: 'Ice-Crystal Pure Titanium Egg Cup',
    tagline: 'Pure Titanium | Egg-Form Profile | Ice-Crystal Finish | Double-Wall Anti-Scald',
    category: 'Drinkware',
    materials: ['Pure Titanium'],
    heroImage: `${BASE}/Titanium-Double-Layer-Insulated-Anti-Scalding-Water-Cup-01-cover.avif`,
    images: [
      `${BASE}/Titanium-Double-Layer-Insulated-Anti-Scalding-Water-Cup-01-cover.avif`,
      `${BASE}/Titanium-Double-Layer-Insulated-Anti-Scalding-Water-Cup-01-hover.avif`,
      `${BASE}/Titanium-Double-Layer-Insulated-Anti-Scalding-Water-Cup-01-detail-6.avif`,
      `${BASE}/Titanium-Double-Layer-Insulated-Anti-Scalding-Water-Cup-01-detail-7.avif`,
      `${BASE}/Titanium-Double-Layer-Insulated-Anti-Scalding-Water-Cup-01-detail-8.avif`,
      `${BASE}/Titanium-Double-Layer-Insulated-Anti-Scalding-Water-Cup-01-detail-9.avif`,
    ],
    moq: 50,
    customizationOptions: [
      'Laser Engraving on Titanium Body',
      'Ice-Crystal Surface Treatment',
      'Sandblasted Finish',
      'Anodized Color Options',
      'Polished Finish',
      'Custom Packaging',
    ],
    highlights: [
      'Ice-Crystal & Multi-Finish Surface: Available in ice-crystal, sandblasted, polished, and anodized color variants — each finish is engineered for smudge resistance and long-term visual integrity under frequent daily handling.',
      'Egg-Form Ergonomic Profile: The curved egg-shaped body is precision-designed for a natural, secure grip — eliminating pressure points and providing balanced weight distribution whether used for hot coffee or cold beverages.',
      'Ultra-Lightweight 55g Pure Titanium: At just 55g, this egg cup is 40% lighter than stainless steel equivalents, delivering a high strength-to-weight ratio that sets a new standard for premium portable drinkware.',
    ],
    description:
      'The Ice-Crystal Pure Titanium Egg Cup features a double-wall structure that provides a reliable temperature barrier, ensuring comfort whether holding hot coffee or cold beverages. At only 55g, its lightweight egg-form profile makes it an effortless companion for daily hydration or professional travel. The ergonomic curves fit naturally in the hand, while the precision-engineered finishes — including ice-crystal and sandblasted — maintain a clean, smudge-resistant appearance under frequent use.\n\nThe pure titanium build is naturally biocompatible and highly resistant to corrosion, ensuring no metallic odors or environmental degradation over time. Available in a range of specialized surface treatments, this egg cup is designed for those who value material integrity and reliable performance in a compact, portable format.',
    specifications: [
      { label: 'Capacity Options', value: '120ml / 260ml / 400ml' },
      { label: 'Net Weight', value: '55g – 105g (Depending on Size)' },
      { label: 'Material', value: 'Food-Grade Pure Titanium (Biocompatible)' },
      { label: 'Dimensions (260ml)', value: '8cm × 8cm × 9.5cm' },
      { label: 'Finishes', value: 'Ice-Crystal / Sandblasted / Polished / Anodized Colors' },
    ],
    faqs: [
      {
        q: 'What are the durability advantages of the pure titanium body?',
        a: 'Titanium is exceptionally resistant to rust, acids, and alkalis. Unlike aluminum or plastic, this egg cup maintains its structural integrity across a wide temperature range and will not impart any metallic taste to drinks. It is a long-term, low-maintenance hardware solution.',
      },
      {
        q: 'How does logo customization hold up on the titanium surface?',
        a: 'Highly permanent. Titanium provides an excellent substrate for laser engraving. The resulting logo is etched directly into the metal, creating a high-contrast, professional mark that will not fade, peel, or wear off even with heavy daily handling.',
      },
      {
        q: 'What is the difference between the ice-crystal and sandblasted finishes?',
        a: 'The ice-crystal finish creates a distinctive crystalline texture through a specialized heat treatment process, producing a visually unique surface with subtle light refraction. The sandblasted finish applies a uniform matte texture for a more understated, anti-fingerprint appearance. Both are highly durable and suitable for laser engraving.',
      },
      {
        q: 'Can different capacities be combined in a single bulk order?',
        a: 'Yes. The 120ml, 260ml, and 400ml variants can be mixed within a single order. This flexibility makes the Ice-Crystal Pure Titanium Egg Cup suitable for tiered gifting programs — for example, pairing the compact 120ml as a desk accent piece with the 400ml for a primary drinkware gift.',
      },
    ],
    seoKeywords: [
      // SEO — core product
      'ice crystal titanium cup',
      'pure titanium egg cup',
      'titanium double wall cup',
      'egg shaped titanium cup',
      'pure titanium insulated cup',
      // SEO — B2B / corporate
      'corporate gift titanium cup bulk',
      'custom logo titanium cup wholesale',
      'branded titanium drinkware bulk order',
      // Material / craft
      'laser engraved titanium cup',
      'anodized titanium cup custom',
      'sandblasted pure titanium cup',
      // SIO — social intent
      'ice crystal titanium EDC cup',
      'aesthetic titanium egg cup',
      'ultralight titanium cup minimalist',
      // GEO — AI natural language
      'best pure titanium double wall cup office outdoor',
      'lightweight titanium cup with ice crystal finish corporate gift',
      'biocompatible titanium insulated egg cup',
      // Long-tail
      'ice crystal pure titanium egg cup bulk order',
      'pure titanium anti-scald cup laser engraving wholesale',
      'egg shaped titanium cup 120ml 260ml 400ml corporate gift',
    ],
    sortOrder: 260,
    active: true,
  })

  console.log('✓ Ice-Crystal Pure Titanium Egg Cup inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

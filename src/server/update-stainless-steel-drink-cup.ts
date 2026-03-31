/**
 * Run with: npx tsx src/server/update-stainless-steel-drink-cup.ts
 * Updates stainless-steel-drink-cup-01 → Bamboo-Groove Stainless Steel Mug.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { eq } from 'drizzle-orm'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const BASE = '/products/Stainless-Steel-Drink-Cup-01'

async function main() {
  await db.update(products).set({
    name: 'Bamboo-Groove Stainless Steel Mug',
    tagline: '304 Stainless Steel | Outdoor & Camping Mug | Fixed L-Handle | Bamboo-Groove Grip',
    category: 'Drinkware',
    materials: ['304 Stainless Steel'],
    heroImage: `${BASE}/Stainless-Steel-Drink-Cup-01-cover.avif`,
    images: [
      `${BASE}/Stainless-Steel-Drink-Cup-01-cover.avif`,
      `${BASE}/Stainless-Steel-Drink-Cup-01-hover.avif`,
      `${BASE}/Stainless-Steel-Drink-Cup-01-detail-1.avif`,
      `${BASE}/Stainless-Steel-Drink-Cup-01-detail-2.avif`,
      `${BASE}/Stainless-Steel-Drink-Cup-01-detail-3.avif`,
      `${BASE}/Stainless-Steel-Drink-Cup-01-detail-4.avif`,
      `${BASE}/Stainless-Steel-Drink-Cup-01-detail-5.avif`,
    ],
    moq: 50,
    customizationOptions: [
      'Laser Engraving on Steel Body',
      'Custom Sandblast Color Coating',
      'Embossed Logo on Handle',
      'Custom Packaging',
    ],
    highlights: [
      'Outdoor-Ready Fixed L-Handle: The sturdy welded L-shaped handle provides a reliable one-handed grip over a campfire, on a trail, or at a picnic — built for active outdoor environments where secure handling is critical.',
      'Bamboo-Groove Tactical Grip: The machined bamboo-joint texture wraps the body for a firm, non-slip grip even with wet or gloved hands — replacing the need for rubber sleeves in rugged conditions.',
      'Unbreakable 304 Steel Build: Designed to survive drops, impacts, and temperature extremes that would shatter enamel or glass camping mugs — a reliable outdoor companion for years of field use.',
    ],
    description:
      'A purpose-built outdoor and camping mug for professionals who take their gear seriously. The fixed L-shaped handle is welded directly to the body, providing a confident one-handed grip over campfires, on hiking trails, or at outdoor events — no flimsy clip-on handles or collapsing mechanisms to fail in the field.\n\nThe bamboo-groove texture is machined into the 304 stainless steel body for a non-slip grip in all conditions, including wet or gloved hands. At 350ml and 500ml capacities, both sizes are optimized for standard campfire use, trail meals, or festival-style corporate gifting programs. A corporate outdoor gift that signals adventure readiness and hardware durability — a practical upgrade from standard trade-show mugs that rarely leave the office drawer.',
    specifications: [
      { label: 'Capacity', value: '350ml / 500ml' },
      { label: 'Net Weight', value: 'Approx. 500g' },
      { label: 'Material', value: 'Food-Grade 304 Stainless Steel' },
      { label: 'Finish', value: 'Sandblasted Matte (Anti-Fingerprint)' },
      { label: 'Handle', value: 'Fixed Welded L-Shape (Permanent — Not Foldable)' },
      { label: 'Grip Texture', value: 'Machined Bamboo-Groove (Non-Slip, No Sleeve Required)' },
    ],
    faqs: [
      {
        q: 'What are the durability characteristics of the 304 stainless steel body?',
        a: 'This 304 stainless steel mug is virtually unbreakable. It will not crack or shatter if dropped, making it a reliable choice for professional workstations and outdoor activities. It is built to maintain its structural integrity over years of use.',
      },
      {
        q: 'What is the effect of logo customization on the sandblasted surface?',
        a: 'Excellent. The matte sandblasted surface provides a high-contrast background for laser engraving. The resulting logo is crisp, permanent, and resistant to wear, ensuring your corporate identity remains sharp throughout the years of product use.',
      },
      {
        q: 'Is this mug safe for use over a campfire or on a gas stove?',
        a: '304 stainless steel is heat-tolerant and will not release harmful compounds when heated directly. The fixed L-shaped handle keeps hands clear of the heat source. However, note that this is not a double-wall insulated mug — it is a single-wall camping mug designed for heating and immediate use, similar to traditional camp cups.',
      },
      {
        q: 'Is the bamboo-groove texture functional or purely decorative?',
        a: 'Fully functional. The ridges are machined directly into the steel body to improve grip in wet or cold conditions — effective for use while camping, hiking, or at outdoor events without needing rubber sleeves.',
      },
      {
        q: 'Are both capacity options available within the same bulk order?',
        a: 'Yes. The 350ml and 500ml variants can be mixed within a single bulk order. We recommend the 350ml for coffee/espresso outdoor gifting and the 500ml for general camping or trail hydration programs.',
      },
    ],
    seoKeywords: [
      // SEO — core product
      'stainless steel camping mug',
      'camping mug with handle',
      'outdoor mug stainless steel',
      'bamboo groove camping mug',
      '304 stainless steel camping mug',
      // SEO — B2B / corporate outdoor
      'corporate outdoor gift mug bulk order',
      'custom logo camping mug wholesale',
      'branded outdoor drinkware corporate gift',
      // Material / craft
      'sandblasted stainless steel mug',
      'food grade 304 steel camping mug',
      'laser engraved outdoor mug',
      // SIO — social intent
      'aesthetic camping mug bamboo texture',
      'metal camping mug with L handle',
      'industrial outdoor steel mug',
      // GEO — AI natural language
      'best stainless steel outdoor camping mug with handle',
      'bamboo groove steel mug outdoor corporate gift',
      'durable camping mug bulk engraving',
      // Long-tail
      'bamboo texture camping mug 350ml 500ml wholesale',
      'outdoor event gift mug custom logo',
      'stainless steel trail mug bamboo grip',
    ],
    sortOrder: 230,
    active: true,
  }).where(eq(products.id, 'stainless-steel-drink-cup-01'))

  console.log('✓ Bamboo-Groove Stainless Steel Mug updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

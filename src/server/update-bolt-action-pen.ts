/**
 * Run with: npx tsx src/server/update-bolt-action-pen.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  await db
    .update(products)
    .set({
      name: 'Brass Crown Bolt-Action Pen',
      tagline: 'Brass, Aluminum & Steel Build | Forest Green & Matte Black | G2 Refill | 28g',
      highlights: [
        'Two Color Editions: Available in Forest Green and Matte Black — two distinct colorways that suit different corporate aesthetics, from natural executive to tactical industrial.',
        'Mechanical Reliability: Unique bolt-action deployment for a smooth, satisfying one-handed operation.',
        'Universal Compatibility: Uses standard G2 refills (Parker style), ensuring easy maintenance worldwide.',
        'Hybrid Metal Build: A balanced combination of Brass, Aluminum, and Stainless Steel for long-term durability.',
      ],
      description:
        'Upgrade your corporate gifting from disposable plastic to a tool built for the long haul. This bolt-action pen is available in two distinct colorways — Forest Green for a refined, natural executive aesthetic, and Matte Black for a tactical, industrial edge. The mechanical slide provides a satisfying, reliable engagement that makes it more than just a writing instrument — it\'s a modern desk essential that signals professional readiness.\n\nDesigned for the rigors of daily use, the multi-metal construction resists wear and deformation that typically plague office stationery. Its weight and balance are engineered to provide a steady writing experience, while the rugged aesthetic fits perfectly in an industrial or high-tech business environment. This is a dependable asset for any professional workspace.',
      specifications: [
        { label: 'Length', value: '138mm' },
        { label: 'Diameter', value: '≈10mm' },
        { label: 'Net Weight', value: '28g' },
        { label: 'Gross Weight', value: '63g (including gift box)' },
        { label: 'Color Options', value: 'Forest Green / Matte Black' },
        { label: 'Materials', value: 'Brass (Tip, Bolt Slot, Tail Crown), Aluminum Alloy (Body), Stainless Steel (Clip)' },
        { label: 'Refill', value: '0.5mm G2 Universal Refill' },
      ],
      faqs: [
        {
          q: 'How does the metal surface hold up to daily handling?',
          a: 'The metal body is resistant to cracking and aging. Unlike plastic pens that yellow or become brittle, this pen maintains its structural integrity and can be easily cleaned with a simple wipe.',
        },
        {
          q: 'Where can our company logo be placed?',
          a: 'We offer high-precision laser engraving on the pen body, the clip, and the crown tail, providing versatile branding options for corporate identity.',
        },
      ],
      seoKeywords: [
        // Core product
        'brass bolt action pen',
        'bolt action pen',
        'bolt action ballpoint pen',
        // B2B / corporate gifting
        'custom bolt action pen bulk order',
        'corporate pen gift set',
        'engraved bolt action pen',
        'promotional metal pen',
        // Material / craft
        'brass aluminum pen',
        'multi-metal bolt action pen',
        'G2 refill bolt action pen',
        // Niche / long-tail
        'tactical EDC writing pen',
        'heavy duty office pen',
        'CNC machined bolt action pen',
        'executive metal pen gift',
      ],
    })
    .where(eq(products.id, 'bolt-action-pen-01'))

  console.log('✓ Brass Crown Bolt-Action Pen updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

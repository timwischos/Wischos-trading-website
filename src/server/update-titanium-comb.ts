/**
 * Run with: npx tsx src/server/update-titanium-comb.ts
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
      name: 'Titanium Anti-Static Beard & EDC Comb Multi-Tool',
      tagline: 'Anti-Static Beard & Hair Comb | Bottle Opener | 100mm or 150mm',
      highlights: [
        'Two Size Options: 100mm Compact (beard comb / travel size — fits shirt pocket) and 150mm Standard (full hair comb / desk grooming tool) — both with integrated bottle opener.',
        'Optimized for Beard Grooming: The 100mm compact size aligns perfectly with beard comb dimensions, detangling and styling facial hair without snagging — a sought-after premium grooming gift.',
        'Anti-Static Metal: The titanium alloy naturally dissipates static charge during grooming, reducing flyaway hair more effectively than plastic combs in dry office environments.',
        'Superior Durability: High-strength titanium alloy construction resists corrosion, rust, and deformation for a lifetime of daily carry.',
      ],
      description:
        'Designed for the modern professional, this tool combines grooming efficiency with everyday utility. The metallic structure naturally reduces static, providing a smoother experience than conventional alternatives. It is a reliable, long-term asset that maintains its clean edges and structural integrity even in demanding travel or field environments.\n\nBeyond its grooming function, the integrated bottle opener adds a layer of practical utility, making it a versatile companion for both office and social settings. The solid sandblasted or tumbled finish provides a refined aesthetic that reflects a commitment to quality and organization — a modern, high-performance replacement for low-quality personal care items.',
      specifications: [
        { label: 'Length Options', value: '100mm Compact (Beard / Travel) | 150mm Standard (Hair / Desk)' },
        { label: 'Net Weight', value: '60g' },
        { label: 'Material', value: 'Titanium Alloy' },
        { label: 'Finish Options', value: 'Sandblasted / Tumbled (Scratch-resistant)' },
      ],
      faqs: [
        {
          q: 'How does the titanium surface react to hair products or water?',
          a: 'Titanium alloy is highly non-porous and corrosion-resistant. It will not absorb oils, waxes, or moisture, and can be cleaned instantly with a simple rinse, preventing the hygiene issues common with wooden or plastic combs.',
        },
        {
          q: 'Is corporate logo customization supported?',
          a: 'Yes. We support logo customization on the flat surfaces of the comb body. Please contact our team to discuss the best branding options for your corporate gift requirements.',
        },
        {
          q: 'Does it actually reduce static?',
          a: 'Yes. The metallic properties of the alloy help dissipate the electrical charge that causes static during grooming, making it significantly more effective than plastic combs in dry office environments.',
        },
      ],
      seoKeywords: [
        // Core product
        'titanium beard comb',
        'titanium multi-tool comb',
        'EDC titanium comb',
        'anti-static titanium comb',
        'titanium bottle opener multi-tool',
        'titanium alloy comb EDC',
        // B2B / corporate gift
        'custom titanium comb corporate gift',
        'titanium multi-tool bulk order',
        'branded titanium bottle opener',
        'corporate EDC gift set',
        // Long-tail
        'titanium comb bottle opener everyday carry',
        'portable titanium grooming tool',
        'metal comb anti-static',
        'EDC multi-tool compact pocket',
        'scratch resistant titanium comb',
      ],
    })
    .where(eq(products.id, 'titanium-anti-static-comb-01'))

  console.log('✓ Titanium Anti-Static Comb updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

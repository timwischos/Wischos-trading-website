/**
 * Run with: npx tsx src/server/update-folding-scissors.ts
 * Updates the EDC Folding Metal Scissors — Natural Silver finish + Built-In Ruler Scale.
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
      name: 'EDC Folding Metal Scissors',
      tagline: '2CR13 Stainless Steel | Natural Silver | Built-In Ruler Scale | 9cm Pocket-Ready',
      highlights: [
        'Built-In Ruler Scale: Millimeter graduation marks etched directly onto the blade provide quick measurements without reaching for a separate ruler — a practical field feature for packaging, crafts, or office work.',
        'Compact Foldable Design: Retracts to 9cm for secure storage in desk drawers or tool kits — blades fully protected, no damage to surrounding gear.',
        'Hardened 2CR13 Steel Blades: Precision-ground for lasting sharpness and corrosion resistance, significantly more durable than standard carbon steel office scissors.',
        'Heavy-Duty 41.9g Build: Solid all-metal construction with a stable riveted pivot provides the cutting stability that lightweight plastic alternatives cannot deliver.',
      ],
      description:
        'Precision-ground 2CR13 stainless steel blades in a natural satin silver finish — these scissors maintain excellent rust and wear resistance even in moist environments or with high-frequency use. The blade features millimeter ruler markings etched along its length, providing a quick measurement reference without requiring a separate tool. The stable riveted pivot ensures smooth operation and cutting stability, making these a reliable assistant for unboxing, cutting heavy thread, or general office maintenance.\n\nDesigned for professionals who value efficiency and organization, the folding structure not only protects the blades but also prevents damage to other gear while being carried. This is a solid, functional tool that replaces unreliable office disposables with a permanent hardware asset — a practical corporate gift that earns its place in every desk drawer or EDC kit.',
      specifications: [
        { label: 'Open Length', value: '145mm' },
        { label: 'Closed Length', value: '90mm (Pocket-ready)' },
        { label: 'Net Weight', value: '41.9g' },
        { label: 'Blade Material', value: '2CR13 Stainless Steel' },
        { label: 'Finish', value: 'Natural Satin Silver (Passivated)' },
        { label: 'Ruler Scale', value: 'Millimeter Graduations on Blade' },
        { label: 'Pivot', value: 'Stable Riveted Mechanism' },
      ],
      faqs: [
        {
          q: 'How does 2CR13 steel compare to standard office scissors in terms of rust resistance?',
          a: '2CR13 is a martensitic stainless steel specifically chosen for its hardness and anti-corrosive properties. The natural satin silver surface is passivated to maximize corrosion resistance — significantly more resistant to moisture and environmental oxidation than common carbon steel used in standard office scissors.',
        },
        {
          q: 'Is logo customization possible on the natural silver surface?',
          a: 'Yes. The satin silver stainless steel surface provides a clean background for laser engraving. The branding is etched directly into the steel, ensuring a permanent, professional mark that will not fade or peel under daily handling.',
        },
        {
          q: 'How accurate are the built-in ruler markings?',
          a: 'The millimeter graduations are precision-etched onto the blade surface and calibrated for accurate quick measurements. They are suitable for general cutting, packaging, and field reference use.',
        },
        {
          q: 'How sturdy is the folding mechanism under repeated daily use?',
          a: 'The riveted pivot is precision-set to maintain consistent tension and blade alignment through thousands of open-close cycles. Unlike spring-loaded or clip-style mechanisms, the riveted design does not loosen over time, ensuring long-term cutting accuracy.',
        },
      ],
      seoKeywords: [
        // Core product
        'EDC folding scissors',
        'folding metal scissors',
        'compact folding scissors',
        'mini EDC scissors',
        'pocket metal scissors',
        // B2B / corporate gifting
        'EDC scissors corporate gift bulk',
        'custom logo folding scissors',
        'metal scissors wholesale',
        'branded EDC tool gift set',
        // Material / craft
        '2CR13 stainless steel scissors',
        'natural silver folding scissors',
        'heavy duty folding scissors',
        'precision blade folding scissors',
        // Long-tail
        'folding scissors with ruler scale',
        'compact metal scissors bulk order',
        'durable folding scissors corporate gift',
        'portable steel scissors everyday carry',
      ],
    })
    .where(eq(products.id, 'edc-folding-metal-scissors-01'))

  console.log('✓ EDC Folding Metal Scissors updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

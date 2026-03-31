/**
 * Run with: npx tsx src/server/update-fidget-sticks.ts
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
      name: 'Carbon Fiber Magnetic Fidget Stick',
      tagline: 'Multi-Axis Magnetic Rotation | Metal & Carbon Fiber | 42g Pocket-Ready',
      highlights: [
        'Silent Magnetic Operation: Brass-reinforced magnetic joints produce no audible clicking or snapping — engineered for quiet open-plan offices, meetings, and conference calls without disrupting colleagues.',
        'Brass Joint Construction: Precision brass magnetic joints deliver a weighty, satisfying resistance that plastic or cheap metal joints cannot replicate — each flip and rotation has a deliberate, mechanical feel.',
        'Modern Material Blend: High-strength metal and carbon fiber construction for a professional industrial aesthetic.',
        'Pocket-Ready Utility: Compact, lightweight design for discreet use during commutes or long desk sessions.',
      ],
      description:
        'This magnetic fidget stick is engineered for the modern professional who values both focus and tactile feedback. Its multi-section magnetic structure offers a "smart" mechanical response, making it a reliable desk companion that helps channel restless energy into productive focus.\n\nDesigned for high-frequency daily handling, the combination of metal and carbon fiber ensures this isn\'t just a toy, but a durable professional accessory. It fits seamlessly into a modern workspace, offering a sophisticated alternative to cheap foam or plastic stress balls. Whether as a standalone item or part of a curated corporate gift set, its solid presence makes a lasting impression.',
      specifications: [
        { label: 'Dimensions', value: '65mm × 15mm × 65mm' },
        { label: 'Net Weight', value: '42g' },
        { label: 'Materials', value: 'Carbon Fiber (Body), Brass (Magnetic Joints), Metal' },
        { label: 'Function', value: 'Multi-axis magnetic rotation and flipping' },
      ],
      faqs: [
        {
          q: 'How does this compare to plastic fidget toys?',
          a: 'Unlike plastic alternatives that become brittle or lose tension, the metal and carbon fiber build is resistant to aging and wear. The surface is non-porous and easy to keep clean with a simple wipe.',
        },
        {
          q: 'Is corporate logo customization supported?',
          a: 'Yes, we support corporate logo customization. Please contact our team with your branding requirements for specific options and lead times.',
        },
        {
          q: 'Is it suitable for a professional office environment?',
          a: 'Absolutely. The industrial design and muted color palette are specifically chosen to look like a professional tool rather than a child\'s toy, maintaining the user\'s professional image.',
        },
      ],
      seoKeywords: [
        // Core product
        'carbon fiber magnetic fidget stick',
        'magnetic fidget stick',
        'EDC fidget toy',
        // B2B / corporate gifting
        'fidget toy corporate gift bulk',
        'custom EDC desk toy',
        'promotional stress relief toy',
        'executive desk fidget gift',
        // Material / craft
        'carbon fiber fidget toy',
        'metal magnetic fidget',
        'tri-section magnetic stick',
        // Niche / long-tail
        'fidget toys for adults office',
        'stress relief desk toy',
        'ADHD focus fidget tool',
        'magnetic EDC accessory bulk',
      ],
    })
    .where(eq(products.id, 'edc-carbon-fibre-magnetic-fidget-sticks-01'))

  console.log('✓ Carbon Fiber Magnetic Fidget Stick updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

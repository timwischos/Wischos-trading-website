/**
 * Run with: npx tsx src/server/update-mouse-pad.ts
 * Updates the aluminium mouse pad product with new copy, specs, and FAQs.
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
      name: 'Professional Aluminum Mouse Pad',
      tagline: 'Ideal for B2B Corporate Gifting | Minimalist, Durable, Easy-to-Clean',
      highlights: [
        'CNC Smooth Chamfer: Machined edges ensure a flat, burr-free finish for long-term comfort.',
        'Practical Dual-Sided Design: Anodized 5052 aluminum for precision; non-slip PU leather for stability.',
        'Built to Last: 2.5mm profile—no warping, no fraying, and sweat-resistant. Designed for high-frequency use.',
      ],
      description:
        'A Cleaner, More Professional Setup. In a high-paced office environment, reliability is key. This aluminum mouse pad is built with proven industrial processes, machined from 5052 aluminum plates to eliminate the common issues of fraying and staining found in traditional pads.\n\nFeaturing a sandblasted and anodized finish, the surface provides a fine matte texture that complements modern laptops. The polished edges provide a clean visual accent while ensuring a smooth tactile experience. This is a practical desktop essential that upgrades the "standard" through better materials, offering a high-perceived value for corporate gift programs without the premium price tag.',
      specifications: [
        { label: 'Materials', value: '5052 Series Aluminum (Front) + Non-slip PU Leather (Back)' },
        { label: 'Craftsmanship', value: 'CNC Edge Chamfering + Sandblasting + Anodization' },
        { label: 'Thickness', value: '2.5mm (Ultra-slim to minimize wrist fatigue)' },
        { label: 'Weight', value: 'Approx. 11.3 oz (320g) (Provides a solid, planted feel)' },
        { label: 'Dimensions', value: '240mm x 200mm (Standard)' },
      ],
      faqs: [
        {
          q: 'How durable is it for daily use?',
          a: "The aluminum construction provides excellent physical strength. Unlike cloth pads, it won't wear down or deform over time. It is a true \"one-time purchase\" office tool.",
        },
        {
          q: 'Is the surface easy to maintain?',
          a: 'Yes. The anodized layer is resistant to stains. Dust or liquid spills can be easily wiped away with a cloth, keeping your desktop looking pristine.',
        },
        {
          q: 'What is the best way to add a corporate Logo?',
          a: 'We recommend Laser Etching. The logo appears in a clean, silver-white metallic tone, providing a subtle yet professional contrast against the matte surface.',
        },
      ],
    })
    .where(eq(products.id, 'aluminium-double-sided-mouse-pad'))

  console.log('✓ Mouse pad updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/update-letter-opener-02.ts
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
      name: 'Propeller Spinning Letter Opener',
      tagline: 'Bearing Propeller Mechanism | 85g Zinc Alloy | Matte Brushed Finish',
      highlights: [
        'Mechanical Interaction: Features a functional rotating propeller with integrated bearings for a satisfying tactile experience.',
        'Solid Weight: 85g zinc alloy construction provides a steady, heavy-duty feel during use.',
        'Sustainable Utility: A permanent professional tool that replaces disposable plastic cutters and fragile blades.',
      ],
      description:
        'Bring precision to your daily document management with this aircraft-inspired letter opener. Designed for the modern executive desk, this tool combines a solid, weighted presence with a clever mechanical twist. The integrated bearing propeller is a high-quality interaction point that reflects a professional and organized workspace — not just a design choice, but a genuinely satisfying mechanism.\n\nUnlike flimsy plastic openers or thin sheet-metal blades, this zinc alloy tool is built for long-term reliability. The matte brushed electroplated surface provides a refined, fingerprint-resistant texture that complements modern office aesthetics — understated and professional without the glare of high-gloss alternatives. A reliable replacement for office disposables, perfect for professionals who value both form and function.',
      specifications: [
        { label: 'Dimensions', value: '187mm × 19mm × 4mm' },
        { label: 'Net Weight', value: '85g' },
        { label: 'Material', value: 'Zinc Alloy' },
        { label: 'Surface Finish', value: 'Matte Brushed Electroplating (Silver)' },
      ],
      faqs: [
        {
          q: 'Is the rotating mechanism durable enough for high-frequency use?',
          a: 'Yes. The propeller uses integrated bearings designed for smooth, repetitive rotation. The zinc alloy structure ensures the mechanism remains stable and functional over years of use.',
        },
        {
          q: 'Is corporate logo customization supported?',
          a: 'Yes. The flat surfaces of the blade and the propeller area are ideal for high-precision branding. We support logo customization to align with your corporate identity for bulk gift orders.',
        },
        {
          q: 'How do we maintain the matte brushed finish?',
          a: 'The electroplated matte surface is highly resistant to rust, stains, and fingerprints. Simply wipe with a soft, dry cloth to keep it clean. The brushed texture naturally disguises minor handling marks, maintaining a professional appearance with minimal effort.',
        },
      ],
      seoKeywords: [
        // Core product
        'spinning letter opener',
        'propeller letter opener',
        'metal letter opener',
        'rotating desk opener',
        'zinc alloy mail opener',
        // B2B / corporate gifting
        'custom letter opener bulk',
        'promotional metal opener',
        'corporate desk accessory gift',
        'business gift letter opener',
        'executive desk toy',
        // Material / craft
        'matte brushed letter opener',
        'electroplated zinc letter opener',
        'precision spinning desk tool',
        // Niche / long-tail
        'aviation desk accessory',
        'aircraft-inspired letter opener',
      ],
    })
    .where(eq(products.id, 'letter-opener-02'))

  console.log('✓ Letter Opener 02 updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

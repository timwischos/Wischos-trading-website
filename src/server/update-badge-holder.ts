/**
 * Run with: npx tsx src/server/update-badge-holder.ts
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
      name: 'RFID Aluminum Wallet & Badge Holder',
      tagline: 'RFID Blocking | Card + Badge + Money Clip | 10.5mm Slim | Silver & Gunmetal',
      highlights: [
        'Triple-Function Design: Serves as card wallet, badge/ID holder, and money clip — a complete everyday carry solution in one slim accessory.',
        'RFID Data Security: Integrated blocking technology protects up to 12 cards from digital theft during daily carry.',
        'Built to Last: Anodized aluminum and carbon fiber construction resists fingerprints, scratches, and daily wear.',
      ],
      description:
        'This precision-engineered 3-in-1 wallet is designed for the modern professional who demands efficiency without compromise. The RFID-blocking aluminum shell secures up to 12 cards against digital theft, the integrated metal clip organizes cash, and the clip attachment doubles as a secure badge and ID holder — delivering the function of three accessories in one slim 10.5mm profile.\n\nIn a corporate environment where every detail matters, a wallet that replaces three separate carry items sends a clear message about quality and organization. Available in Silver and Gunmetal finishes to suit different corporate color palettes — both with the same anodized sandblast surface that resists fingerprints and scratches. Whether clipped to a lanyard, slipped into a front pocket, or placed on a desk, it maintains the sharp industrial aesthetic expected of executive-grade tools. An ideal standalone gift or centrepiece for a curated EDC corporate gift set.',
      specifications: [
        { label: 'Dimensions', value: '95.0mm × 60.0mm × 10.5mm' },
        { label: 'Weight', value: '83g' },
        { label: 'Material', value: 'Aluminum Alloy / Carbon Fiber Composite' },
        { label: 'Color Options', value: 'Silver / Gunmetal' },
        { label: 'Finish', value: 'Anodized Sandblast (Fingerprint & Scratch Resistant)' },
        { label: 'Capacity', value: 'Up to 12 cards + cash' },
        { label: 'RFID Blocking', value: 'Yes' },
      ],
      faqs: [
        {
          q: 'How durable is the finish?',
          a: 'We use industrial-grade anodization. The finish is chemically bonded to the metal, making it highly resistant to peeling, sweat, and daily abrasion.',
        },
        {
          q: 'What is the quality of logo customization?',
          a: 'We utilize high-precision laser engraving. The resulting logo is permanent, crisp, and will not fade over time.',
        },
        {
          q: 'Maintenance & Cleaning?',
          a: 'The non-porous metal surface is easy to maintain. Simply wipe with a damp microfiber cloth to remove oils or dust.',
        },
      ],
      seoKeywords: [
        // Core product
        'RFID aluminum wallet',
        'aluminum card holder wallet',
        'RFID blocking wallet',
        // B2B / corporate gifting
        'custom RFID wallet bulk order',
        'corporate wallet gift set',
        'engraved aluminum wallet',
        'promotional metal wallet',
        // Material / craft
        'anodized aluminum wallet',
        'carbon fiber metal wallet',
        'slim minimalist metal wallet',
        // Niche / long-tail
        'RFID wallet badge holder',
        'aluminum wallet money clip',
        'slim RFID card holder men',
        'executive EDC wallet gift',
      ],
    })
    .where(eq(products.id, 'badge-holder-card-holder-with-metal-clip'))

  console.log('✓ RFID Aluminum Wallet & Badge Holder updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

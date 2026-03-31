/**
 * Run with: npx tsx src/server/update-letter-opener-01.ts
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
      name: 'Executive Zinc Alloy Letter Opener',
      tagline: 'High-Gloss Electroplating | 74g Zinc Alloy | Silver / Gold / Rose Gold',
      highlights: [
        'Three-Color Set: Available in Silver, Gold, and Rose Gold — order as a matching trio for a premium corporate gifting set that offers recipients a choice of tone.',
        'Teardrop Ergonomic Handle: The distinctively shaped teardrop grip fills the palm naturally, reducing hand fatigue during high-volume document processing.',
        'Precision Efficiency: Engineered for clean, effortless opening of envelopes and documents.',
        'Balanced Weight: 74g solid construction provides steady control and a high-end tactile feel.',
      ],
      description:
        'Enhance the efficiency of your daily administrative tasks with a tool built for the modern professional. This zinc alloy letter opener moves beyond the limitations of flimsy plastic alternatives, offering a solid, weighted presence on any executive desk. The teardrop-shaped handle fills the palm naturally for a comfortable, fatigue-free grip during high-volume document processing.\n\nAvailable in Silver, Gold, and Rose Gold electroplated finishes, these three color options can be combined as a matching trio gift set — giving recipients a tone choice while maintaining a cohesive, premium gifting presentation. The high-gloss electroplated surface is resistant to aging and corrosion, ensuring that this opener remains a functional part of the office workflow for years. Whether as a standalone gift or as a coordinated three-piece stationery set, its refined metallic finish conveys a sense of stability and professional readiness.',
      specifications: [
        { label: 'Total Length', value: '230mm' },
        { label: 'Net Weight', value: '74g' },
        { label: 'Material', value: 'Zinc Alloy' },
        { label: 'Surface Finish', value: 'High-Gloss Electroplating (Silver, Gold, Rose Gold)' },
      ],
      faqs: [
        {
          q: 'How does the electroplated finish hold up to daily use?',
          a: 'Our electroplating process is designed for industrial durability. It is highly resistant to abrasion and scratching, ensuring the mirror-like finish remains intact without peeling or fading.',
        },
        {
          q: 'Is corporate logo customization supported?',
          a: 'Yes. The flat surface of the handle is an ideal location for high-precision laser engraving or silk-screen printing. These methods ensure your corporate branding remains crisp and permanent.',
        },
        {
          q: 'Maintenance & Cleaning?',
          a: 'The non-porous metal surface is naturally stain-resistant. Fingerprints or dust can be easily removed with a simple wipe from a soft cloth, keeping the tool looking sharp and professional.',
        },
      ],
      seoKeywords: [
        // Core product
        'zinc alloy letter opener',
        'metal letter opener',
        'professional letter opener',
        // B2B / corporate gifting
        'corporate letter opener bulk order',
        'custom logo letter opener',
        'executive desk gift set',
        'promotional letter opener',
        // Material / craft
        'electroplated letter opener',
        'mirror finish letter opener',
        'high gloss zinc letter opener',
        // Niche / long-tail
        'heavy duty metal letter opener',
        'office desk document opener',
        'stationery gift bulk order',
        'executive desk accessory',
      ],
    })
    .where(eq(products.id, 'letter-opener-01'))

  console.log('✓ Letter Opener 01 updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

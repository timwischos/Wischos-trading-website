/**
 * Run with: npx tsx src/server/update-nail-clipper.ts
 * Updates the Executive Zinc Alloy Nail Clipper with Keychain.
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
      name: 'Executive Zinc Alloy Nail Clipper with Keychain',
      tagline: 'Zinc Alloy Shell | 3cr13 Precision Blade | Keychain Ring | Self-Contained Folding Design',
      highlights: [
        'Keychain-Ready EDC: The integrated keychain ring means this clipper travels with you daily — attached to keys, a bag, or a carabiner — ensuring it is always on hand when needed.',
        'Self-Contained Design: Folding box structure secures the blade within a solid zinc alloy housing — no loose tools in drawers or travel bags.',
        'Industrial-Grade 3cr13 Blade: Precision-ground stainless steel engineered for long-term sharpness and clean cuts without crushing or tearing.',
        'Weighted Professional Feel: Solid zinc alloy shell at 30g provides substantial tactile feedback that plastic alternatives simply cannot replicate.',
      ],
      description:
        'Eliminate the clutter of loose grooming tools with this integrated boxed nail clipper with keychain attachment. The clever folding mechanism secures the cutting edges within a solid zinc alloy housing, while the built-in keychain ring ensures this tool is always within reach — attached to your keys, bag clip, or EDC carry setup. This is a practical everyday carry solution that promotes desk organization and personal readiness.\n\nBuilt with industrial-grade 3cr13 stainless steel, the blade is engineered for high-frequency use and corrosion resistance. The electroplated metal exterior is finished to resist fingerprints and daily wear, maintaining its sharp, modern appearance over years of handling. Available in Silver, Gold, and Gunmetal finishes to align with your corporate identity.',
      specifications: [
        { label: 'Dimensions (Folded)', value: '75mm × 30mm × 15mm' },
        { label: 'Net Weight', value: 'Approx. 30g' },
        { label: 'Blade Material', value: '3cr13 Stainless Steel' },
        { label: 'Housing Material', value: 'Zinc Alloy' },
        { label: 'Keychain', value: 'Integrated Keychain Ring' },
        { label: 'Finish Options', value: 'Silver / Gold / Gunmetal (Industrial Electroplating)' },
      ],
      faqs: [
        {
          q: 'How durable is the cutting edge for long-term use?',
          a: 'We use 3cr13 stainless steel, which is significantly harder than standard office-grade steel. The blades are precision-ground to maintain a sharp edge through years of use without crushing or tearing.',
        },
        {
          q: 'Is corporate logo customization permanent on the metal shell?',
          a: 'Yes. The flat zinc alloy surface is ideal for high-precision laser engraving. The logo is etched directly into the metal, ensuring it remains permanent, crisp, and will not fade or peel off under daily handling.',
        },
        {
          q: 'How sturdy is the keychain ring?',
          a: 'The keychain ring is manufactured from the same zinc alloy as the housing — solid and rated for daily key-ring use. It will not deform or snap under normal carry loads.',
        },
        {
          q: 'Does the box structure contain nail clippings?',
          a: 'Yes. The enclosed housing captures clippings inside the case during use, keeping desks and surfaces clean. Simply open the case after use and dispose of the contents — a practical feature for office environments.',
        },
      ],
      seoKeywords: [
        // Core product
        'keychain nail clipper',
        'zinc alloy nail clipper',
        'metal nail clipper with keychain',
        'executive nail clipper',
        'folding nail clipper case',
        // B2B / corporate gifting
        'corporate nail clipper bulk order',
        'custom logo nail clipper',
        'professional nail clipper gift set',
        'branded grooming tool wholesale',
        // Material / craft
        '3cr13 stainless steel nail clipper',
        'electroplated metal nail clipper',
        'heavy duty nail clipper zinc alloy',
        // Long-tail
        'keychain nail clipper EDC gift',
        'nail clipper with case corporate gift',
        'premium nail clipper bulk customization',
        'professional grooming tool executive gift',
      ],
    })
    .where(eq(products.id, 'integrated-boxed-nail-clipper-01'))

  console.log('✓ Executive Zinc Alloy Nail Clipper with Keychain updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

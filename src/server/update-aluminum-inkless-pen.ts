/**
 * Run with: npx tsx src/server/update-aluminum-inkless-pen.ts
 * Updates the Executive Dual-Head Metal Pen — eternal pencil, 20,000m, ESG angle.
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
      name: 'Executive Dual-Head Metal Pen',
      tagline: 'Gunmetal Metal Body | 0.5mm Rollerball + Eternal Pencil Tip | 20,000m Writing Life',
      highlights: [
        'Eternal Pencil Technology: The permanent alloy tip deposits a metallic trace without ink or graphite — industry-termed an "eternal pencil" or "inkless pencil". No sharpening, no lead refills, no ink cartridges. Equivalent writing life of 20,000m (approx. 100+ standard wood pencils).',
        'Hybrid Efficiency: One end is a precision 0.5mm black rollerball for official signatures; the other is a permanent inkless tip for drafts and annotations — two tools in one solid metal body, zero desktop clutter.',
        'ESG-Aligned Gift: Zero ink, zero lead, zero disposable components. The eternal pencil tip reduces consumable waste over the product\'s lifespan — a compelling sustainability story for CSR-focused corporate gifting programs.',
        'Professional Gunmetal Finish: Heavy-duty electroplated surface engineered for daily use — resistant to fingerprints, abrasion, and corrosion.',
      ],
      description:
        'This dual-head pen combines a precision rollerball for official signatures with an eternal pencil tip for drafting and annotations. The permanent alloy tip — an "eternal pencil" in industry terminology — works through friction, depositing a fine metallic trace on paper without ink, lead, or sharpening. A single tip replaces over 100 standard wood pencils and offers a writing life equivalent to 20,000m, eliminating consumable waste and desktop clutter entirely.\n\nBuilt with a weighted metal frame, this pen provides a stable tactile experience that lightweight plastic alternatives cannot match. The gunmetal electroplated surface is engineered for daily professional use, offering superior resistance to fingerprints and abrasion. For organizations with ESG or sustainability commitments, this pen presents a compelling zero-waste story: no ink cartridges, no lead, no disposable parts — a genuinely sustainable writing instrument for long-term office use.',
      specifications: [
        { label: 'Dimensions', value: '144mm × 10mm' },
        { label: 'Net Weight', value: '23.3g' },
        { label: 'Material', value: 'Metal Body' },
        { label: 'Finish', value: 'Gunmetal Electroplating (Anti-smudge & Wear-resistant)' },
        { label: 'Rollerball Tip', value: '0.5mm Black Rollerball Refill' },
        { label: 'Inkless Tip', value: 'Permanent Alloy Eternal Pencil — ~20,000m Writing Life' },
      ],
      faqs: [
        {
          q: 'How does the metal body hold up compared to standard office pens?',
          a: 'The all-metal construction is designed to withstand drops and heavy use without cracking or deforming. Unlike plastic pens that age and become brittle, this pen maintains its structural integrity for years of service.',
        },
        {
          q: 'What exactly is an "eternal pencil" tip and how does it work?',
          a: 'An eternal pencil (also called an inkless pencil or everlasting pencil) uses a specially formulated metal alloy tip. When pressed onto paper, the tip deposits a fine metallic trace through friction — similar in appearance to an HB pencil. It requires no sharpening, no refills, and will not run dry. Industry estimates put the writing life at approximately 20,000m — equivalent to over 100 standard wood pencils.',
        },
        {
          q: 'Is this pen suitable for ESG or sustainability-focused gifting programs?',
          a: 'Yes. The eternal pencil tip produces zero ink waste, zero lead waste, and zero disposable components over its lifespan. Paired with the refillable rollerball, this is one of the most waste-minimizing writing instruments available — a genuine sustainability credential for CSR-aligned corporate gifting.',
        },
        {
          q: 'What is the quality of bulk logo customization?',
          a: 'We support high-precision laser engraving and multi-color printing on the pen body and clip. Laser engraving provides a permanent, crisp mark that will not fade or peel, ensuring your corporate identity remains clear throughout the product\'s lifespan.',
        },
      ],
      seoKeywords: [
        // Core product
        'eternal pencil pen',
        'inkless pencil pen',
        'dual head metal pen',
        'rollerball inkless pen combo',
        'everlasting pencil metal pen',
        // B2B / corporate gifting
        'corporate dual pen bulk order',
        'custom logo metal writing pen',
        'executive pen set wholesale',
        'sustainable pen corporate gift',
        // ESG / sustainability
        'zero waste writing pen',
        'sustainable inkless pen',
        'eco friendly metal pen corporate gift',
        // Material / craft
        'gunmetal electroplated pen',
        'heavy metal office pen',
        // Long-tail
        '20000m writing life eternal pencil',
        'pen with built-in inkless pencil',
        'dual function writing pen corporate gift',
        'rollerball eternal pencil hybrid pen bulk',
      ],
    })
    .where(eq(products.id, 'aluminum-inkless-pen-01'))

  console.log('✓ Executive Dual-Head Metal Pen updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/update-pen-holder.ts
 * Updates the aluminium pen holder product with new copy, specs, FAQs, and SEO keywords.
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
      name: 'Industrial Precision Aluminum Pen Holder',
      tagline: 'Ideal for B2B Corporate Sourcing | Solid, Minimalist, Permanent',
      highlights: [
        '500g Substantial Weight: Significantly heavier than market standards, providing a rock-solid foundation that won\'t tip over, even with heavy tools.',
        'Precision Chamfered Edges: Machined to a smooth, burr-free finish for a refined tactile experience and daily safety.',
        'Heavy-Duty Build: 2.5mm wall thickness—resistant to drops, warping, and wear. A reliable choice for corporate office setups and premium kits.',
      ],
      description:
        'Building a more professional desktop. Reliability is the foundation of an organized workspace. Machined from high-strength aluminum alloy, this pen holder features a refined sandblasted and anodized finish, offering a matte metallic aesthetic that complements modern office environments.\n\nUnlike plastic or fabric organizers that fray, stain, or age over time, the all-metal construction ensures an indefinite lifespan. The dense oxide surface is resistant to dust and ink, allowing it to look brand new with just a simple wipe. This is a practical, industrial-grade essential that upgrades the "standard" through better materials, providing high perceived value for corporate gifting without the premium price tag.',
      specifications: [
        { label: 'Material', value: 'Industrial-Grade Aluminum Alloy (6000 Series)' },
        { label: 'Base Material', value: 'Non-slip PU Leather / Anodized Aluminum' },
        { label: 'Finish', value: 'Anodized + Fine Sandblasting (Matte Finish)' },
        { label: 'Dimensions', value: 'Φ100mm × 80mm' },
        { label: 'Weight', value: 'Approx. 500g (1.1 lbs)' },
        { label: 'Wall Thickness', value: '2.5mm' },
      ],
      faqs: [
        {
          q: 'How stable is it for daily use?',
          a: 'Weighing approximately 500g, this holder is multiple times heavier than standard organizers. The substantial weight ensures it stays firmly planted on the desk, even when filled with tall or heavy tools like metal scissors and rulers.',
        },
        {
          q: 'How is the corporate Logo applied for bulk orders?',
          a: 'We recommend Laser Etching on the exterior wall. The logo reveals a clean, permanent silver-white metallic finish. The wide vertical surface provides an excellent display area that is both understated and permanent.',
        },
        {
          q: 'Is the surface easy to clean or prone to scratches?',
          a: 'The anodized layer provides high surface hardness and excellent scratch resistance. Its non-porous nature means ink or dust can be wiped away with a damp cloth, making it incredibly easy to maintain a professional appearance.',
        },
      ],
      seoKeywords: [
        // Core product terms
        'aluminum pen holder',
        'metal pen holder',
        'anodized aluminum desk organizer',
        // B2B / corporate gifting
        'corporate pen holder bulk order',
        'custom logo pen holder',
        'branded desk accessories',
        'executive desk organizer',
        // Material / craft
        'CNC machined pen holder',
        '6061 aluminum pen cup',
        'heavy duty metal pen holder',
        // Use-case long-tail
        'office desk pen organizer',
        'premium pen cup gift set',
        'industrial desk organizer',
        'scratch resistant pen holder',
      ],
    })
    .where(eq(products.id, 'aluminium-metal-pen-holder-01'))

  console.log('✓ Pen holder updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

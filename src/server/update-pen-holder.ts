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
      name: 'Precision Aluminum Pen Holder',
      tagline: '6061-T6 Aluminum | Interior-Anodized | Solid, Minimalist, Permanent',
      highlights: [
        '500g Substantial Weight: Significantly heavier than market standards, providing a rock-solid foundation that won\'t tip over, even with heavy tools.',
        'Precision Chamfered Edges: Machined to a smooth, burr-free finish for a refined tactile experience and daily safety.',
        'Heavy-Duty Build: 2.5mm wall thickness—resistant to drops, warping, and wear. A reliable choice for corporate office setups and premium kits.',
      ],
      description:
        'Building a more professional desktop. Reliability is the foundation of an organized workspace. Machined from 6061-T6 aluminum alloy — the same aerospace-grade specification used in precision engineering — this pen holder features a refined sandblasted and anodized finish, offering a matte metallic aesthetic that complements modern office environments.\n\nThe interior is independently anodized to create a smooth, non-porous lining that resists ink transfer and staining from pens, markers, and metal tools. Unlike plastic or fabric organizers that fray, stain, or age over time, the all-metal construction ensures an indefinite lifespan. This is a practical, industrial-grade essential that upgrades the "standard" through better materials, providing high perceived value for corporate gifting without the premium price tag.',
      specifications: [
        { label: 'Material', value: '6061-T6 Aluminum Alloy (High-Strength)' },
        { label: 'Base Material', value: 'Non-slip PU Leather / Anodized Aluminum' },
        { label: 'Finish', value: 'Exterior Sandblasted + Anodized; Interior Anodized (Stain-Resistant Lining)' },
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

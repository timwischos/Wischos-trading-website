/**
 * Run with: npx tsx src/server/update-key-chain-organizer.ts
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
      name: 'Industrial Brass Key Organizer',
      tagline: 'Solid Brass Construction | 11–18g Per Piece | Polished Industrial Finish',
      highlights: [
        'Heavy-Duty Reliability: High-density brass construction resists rust and structural deformation.',
        'Modular Utility: Features a secure U-bolt or classic geometric designs for versatile key and gear organization.',
        'Long-Term Asset: A durable alternative to thin iron rings and fragile plastic clips.',
      ],
      description:
        'Eliminate the weakness of standard zinc-alloy or iron hardware. This solid brass keychain series is designed for those who value industrial-grade durability and a substantial tactile presence. The warm, natural luster of polished brass provides a professional aesthetic that fits seamlessly into both office and field environments, ensuring your keys stay organized and secure.\n\nUnlike plated hardware that peels or corrodes over time, these brass components are built to last. The material is naturally resistant to the elements, maintaining its structural integrity through years of daily use. Whether used as a standalone professional accessory or as a functional component for custom EDC kits, this hardware reflects a commitment to quality and reliable performance.',
      specifications: [
        { label: 'Material', value: 'Solid Brass' },
        { label: 'Weight', value: '11g – 18g per piece' },
        { label: 'Line Diameter', value: '3.0mm (Reinforced)' },
        { label: 'Available Sizes', value: 'Heights 60mm–87mm; Rings 25mm / 30mm' },
        { label: 'Surface Finish', value: 'Polished Brass (Modern Industrial Luster)' },
      ],
      faqs: [
        {
          q: 'Does brass rust or change color in humid environments?',
          a: 'Pure brass does not rust. While it may develop a natural patina over time (a characteristic of the metal), it remains structurally sound and can be easily restored to its original luster with a simple polish.',
        },
        {
          q: 'Is corporate logo customization supported?',
          a: 'Yes, we support corporate logo customization. Please contact us to discuss your branding requirements and we will provide the best solution for your order volume.',
        },
        {
          q: 'How do these compare to standard iron or plastic keychains?',
          a: 'Our brass hardware is significantly more resistant to bending and snapping. The non-porous surface is easy to clean with a damp cloth and will not chip or flake like painted or plated alternatives.',
        },
      ],
      seoKeywords: [
        // Core product
        'brass key organizer',
        'solid brass keychain',
        'EDC key organizer',
        // B2B / corporate gifting
        'custom brass keychain bulk order',
        'corporate keychain gift',
        'promotional EDC keychain',
        'branded keychain hardware',
        // Material / craft
        'heavy duty brass keychain',
        'polished brass key ring',
        'industrial brass hardware',
        // Niche / long-tail
        'U-bolt brass key ring',
        'modular key organizer bulk',
        'rust resistant brass keychain',
        'EDC brass gear organizer',
      ],
    })
    .where(eq(products.id, 'key-chain-organizer-holder-01'))

  console.log('✓ Key Chain Organizer updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

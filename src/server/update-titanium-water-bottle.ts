/**
 * Run with: npx tsx src/server/update-titanium-water-bottle.ts
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
      name: 'Pure Titanium Vacuum Insulated Bottle',
      tagline: 'Pure Titanium Liner | Zero Aftertaste | 12–24 Hour Insulation',
      highlights: [
        'Pure Titanium Liner: Naturally bacteriostatic and odorless; maintains the original flavor of coffee or tea.',
        'Dual-Layer Insulation: High-performance vacuum sealing provides 12–24 hours of thermal retention.',
        'Integrated Carry Handle: Built-in loop handle allows one-handed carry or carabiner attachment — no separate handle clip required.',
        'Reinforced 316 Exterior: Impact-resistant 316 stainless steel shell designed for heavy-duty office and outdoor use.',
      ],
      description:
        'Move beyond fragile glass and low-grade plastic with a hydration tool engineered for the long haul. This vacuum bottle features a pure titanium interior, a material renowned for its exceptional corrosion resistance and health-neutral properties. Unlike standard stainless steel, the titanium liner ensures no metallic aftertaste and no staining from acidic beverages. It is a solid, reliable asset for professionals who prioritize health and functional durability in their daily routine.\n\nThe bottle\'s exterior is finished with a specialized sandblasted or crystal coating, providing a slip-resistant, industrial texture that withstands scratches and abrasion. Whether positioned on a modern executive desk or stored in a vehicle for transit, its substantial 600g build reflects a commitment to structural integrity. It is an ideal, sustainable replacement for office disposables, offering a professional aesthetic that aligns with high-performance corporate environments.',
      specifications: [
        { label: 'Capacity Options', value: '500ml / 600ml / 750ml' },
        { label: 'Net Weight', value: '600g' },
        { label: 'Liner Material', value: 'Pure Titanium' },
        { label: 'Shell Material', value: '316 Stainless Steel' },
        { label: 'Handle', value: 'Integrated Carry Handle (carabiner-ready)' },
        { label: 'Finish Options', value: 'Industrial Sandblasted / Structural Crystal' },
      ],
      faqs: [
        {
          q: 'How does the titanium liner compare to standard 304 stainless steel?',
          a: 'Pure titanium is significantly more resistant to acid and alkali corrosion. It does not absorb odors or stains (like coffee or tea oils), making it much easier to clean and maintain over years of use compared to standard steel or plastic.',
        },
        {
          q: 'Is the exterior finish prone to peeling or scratching?',
          a: 'No. We utilize industrial-grade sandblasting and crystal processing. These finishes are integrated into the surface profile, making them highly resistant to the daily wear, drops, and friction common in professional and outdoor settings.',
        },
        {
          q: 'What customization options are available for corporate branding?',
          a: 'We support multiple customization methods. For high-precision branding, we recommend laser engraving on the main body or the lid. Silk-screen and 3D printing are also available for bulk orders to ensure your corporate logo remains permanent and clear.',
        },
      ],
      seoKeywords: [
        // Core product terms
        'titanium water bottle',
        'pure titanium vacuum flask',
        'titanium insulated bottle',
        // B2B / corporate gifting
        'corporate water bottle bulk order',
        'custom logo titanium bottle',
        'branded executive water bottle',
        'premium corporate hydration gift',
        // Material / craft
        'titanium liner bottle',
        '316 stainless steel exterior',
        'sandblasted titanium flask',
        'titanium bottle with carry handle',
        // Use-case long-tail
        'office desk water bottle gift set',
        'health conscious water bottle no metallic taste',
        'professional titanium thermos',
        'odorless titanium drink bottle',
      ],
    })
    .where(eq(products.id, 'titanium-water-bottle-01'))

  console.log('✓ Titanium Water Bottle updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/update-metal-bookmark.ts
 * Updates the Precision Custom Metal Bookmark — adds sample branding disclaimer.
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
      name: 'Precision Custom Metal Bookmark',
      tagline: 'Brass or Stainless Steel | Chemical Etching & Laser-Cut | Fully Custom Profile',
      highlights: [
        'Full Design Flexibility: Dimensions and profiles can be fully customized to align with your corporate visual identity — any shape, any size.',
        'Permanent Brand Integration: Complex logos are precision-etched or laser-cut directly into the metal substrate, ensuring they never fade, peel, or wear away.',
        'Structural Integrity: Solid Brass or Stainless Steel resists deformation and aging even with high-frequency daily use in heavy books or document files.',
      ],
      description:
        'Note: Product images show samples featuring Wischos branding for illustration purposes. All bulk orders are produced with your company\'s logo, name, or custom design — no Wischos branding will appear on delivered products.\n\nOur custom metal bookmarks offer complete freedom in specification, allowing shapes and sizes to be tailored specifically to your corporate visual identity. The substantial weight of the metal ensures a firm physical presence between pages, providing a stable and reliable feel that paper or plastic alternatives cannot match. Whether you choose the grounded tone of brass or the clean look of stainless steel, these tools are built to withstand years of professional handling without deforming.\n\nThrough precision chemical etching and laser-cutting processes, even the most intricate brand designs are permanently integrated into the metal substrate. This ensures that your corporate identity remains crisp and intact, resisting damage from friction or environmental wear. It is a durable, low-maintenance hardware solution for long-term brand representation.',
      specifications: [
        { label: 'Material Options', value: 'Brass / Stainless Steel / Zinc Alloy' },
        { label: 'Standard Weight', value: '~20g' },
        { label: 'Size Range', value: '120mm – 150mm (Fully customizable profile)' },
        { label: 'Processing', value: 'Chemical Etching / Laser Cutting / Electroplating' },
        { label: 'Finish Options', value: 'Mirror Polished / Matte Tumbled' },
      ],
      faqs: [
        {
          q: 'The product image shows a branded bookmark — will our order look like that?',
          a: 'The images show sample bookmarks produced with Wischos branding for reference only. Your bulk order will feature your company logo, text, or custom design. We work from your vector artwork to produce a completely custom branded product.',
        },
        {
          q: 'How does the metal body hold up over years of professional use?',
          a: 'Unlike paper or plastic markers, these metal bookmarks are built for longevity. The high-tension brass and steel maintain their structural memory, ensuring they will not bend or snap in heavy books. The electroplated or polished surface is engineered to resist oxidation and daily wear.',
        },
        {
          q: 'Can you handle high-detail logos and unique geometric shapes?',
          a: 'Yes. Our chemical etching process allows for extreme detail that traditional stamping cannot achieve. We can reproduce complex corporate logos and custom silhouettes with permanent, sharp edges that remain legible throughout the product\'s entire lifespan.',
        },
        {
          q: 'What is the difference between chemical etching and laser cutting for logos?',
          a: 'Chemical etching recesses the logo into the metal surface, creating a tactile, engraved effect with high durability. Laser cutting physically cuts through or deeply scores the metal for sharp, precise outlines. Both methods are permanent — the choice depends on your design complexity and desired aesthetic.',
        },
      ],
      seoKeywords: [
        // Core product
        'custom metal bookmark',
        'precision metal bookmark',
        'metal bookmark bulk',
        'engraved metal bookmark',
        'laser cut metal bookmark',
        // B2B / corporate gifting
        'corporate branded metal bookmark',
        'custom logo bookmark wholesale',
        'branded bookmark corporate gift',
        'metal bookmark bulk order',
        // Material / craft
        'brass bookmark custom',
        'stainless steel bookmark engraved',
        'chemical etching bookmark',
        'laser engraved brass bookmark',
        // Long-tail
        'personalized metal bookmark corporate gift',
        'custom shape metal bookmark B2B',
        'permanent logo metal bookmark bulk',
        'precision engraved bookmark wholesale',
      ],
    })
    .where(eq(products.id, 'metal-bookmark-01'))

  console.log('✓ Precision Custom Metal Bookmark updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

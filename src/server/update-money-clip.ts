/**
 * Run with: npx tsx src/server/update-money-clip.ts
 * Inserts the Stainless Steel Money Clip product into the DB.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  await db
    .insert(products)
    .values({
      id: 'stainless-steel-money-clip-01',
      name: 'Industrial Stainless Steel Money Clip',
      tagline: 'Slim 8mm Profile | High-Tension Steel | Silver / Brushed / Gold / Gunmetal',
      category: 'EDC Accessories',
      materials: ['Stainless Steel'],
      heroImage: '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-cover.avif',
      images: [
        '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-cover.avif',
        '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-hover.avif',
        '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-detail-1.avif',
        '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-detail-2.avif',
        '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-detail-3.avif',
        '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-detail-4.avif',
      ],
      moq: 50,
      customizationOptions: ['Laser Engraving', 'Mirror Polish', 'Matte Electroplating', 'PVD Gold Finish'],
      highlights: [
        'Slim-Profile Efficiency: 8mm high-tension design ensures a secure hold for up to 8 cards or a stack of currency.',
        'Rapid Access: Engineered for effortless single-handed operation in fast-paced professional environments.',
        'Steel Resilience: Precision-tempered stainless steel with structural memory for a permanent, reliable grip.',
      ],
      description:
        'Streamline your daily carry with a tool designed for minimalist precision. This money clip is built for the professional who values a lean, industrial aesthetic and high-performance hardware. The high-tension steel body automatically adjusts to your carry volume, providing a solid and dependable solution for managing both cash and credentials without the bulk of traditional carriers.\n\nIn a corporate landscape where every detail reflects your professional standards, this clip stands as a durable, high-quality asset. Its non-fading, wear-resistant surface maintains a sharp, modern appearance throughout years of high-frequency use. It is a reliable, industrial-grade tool that reflects a commitment to structural integrity and an organized, efficient workspace.',
      specifications: [
        { label: 'Thickness', value: '8.0mm (Slim industrial profile)' },
        { label: 'Capacity', value: 'Securely holds 8 cards or a stack of currency notes' },
        { label: 'Material', value: 'Industrial Grade Stainless Steel' },
        { label: 'Finish', value: 'Mirror Polished / Matte Electroplated / PVD Gold' },
        { label: 'Weight', value: '~20g (Solid metallic presence)' },
      ],
      faqs: [
        {
          q: 'Does the money clip lose its tension after holding cards?',
          a: 'No. We use high-grade stainless steel with reinforced tension memory. The clip is engineered to return to its original shape even after holding its maximum capacity, ensuring a consistent, firm grip for years.',
        },
        {
          q: 'Is corporate Logo customization supported?',
          a: 'Yes. We provide high-precision laser engraving. The Logo is etched directly into the steel surface, ensuring it remains permanent, crisp, and will not fade or peel off over time.',
        },
        {
          q: 'How should the surface be maintained?',
          a: 'The dense stainless steel is naturally resistant to stains and daily abrasion. Fingerprints can be instantly removed with a simple wipe from a soft cloth, maintaining its professional industrial luster.',
        },
      ],
      seoKeywords: [
        // Core product terms
        'stainless steel money clip',
        'metal money clip',
        'slim money clip',
        // B2B / corporate gifting
        'custom logo money clip bulk',
        'corporate money clip gift',
        'engraved money clip wholesale',
        'promotional metal money clip',
        // Material / craft
        'tempered steel money clip',
        'mirror polish money clip',
        'PVD gold money clip',
        // Use-case long-tail
        'minimalist money clip for men',
        'high tension card money clip',
        'industrial EDC money clip',
        'slim wallet alternative',
      ],
      sortOrder: 14,
      active: true,
    })
    .onConflictDoUpdate({
      target: products.id,
      set: {
        name: 'Industrial Stainless Steel Money Clip',
        tagline: 'Slim 8mm Profile | High-Tension Steel | Silver / Brushed / Gold / Gunmetal',
        category: 'EDC Accessories',
        materials: ['Stainless Steel'],
        heroImage: '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-cover.avif',
        images: [
          '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-cover.avif',
          '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-hover.avif',
          '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-detail-1.avif',
          '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-detail-2.avif',
          '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-detail-3.avif',
          '/products/Stainless-Steel money-clip-01/Stainless-Steel money-clip-01-detail-4.avif',
        ],
        customizationOptions: ['Laser Engraving', 'Mirror Polish', 'Matte Electroplating', 'PVD Gold Finish'],
        highlights: [
          'Custom Laser Engraving: The flat steel surface is precision-etched with corporate logos — permanently crisp, never fading or peeling, making this an ideal premium engraved gift.',
          'Four Finish Options: Available in Silver (mirror), Brushed Matte, PVD Gold, and Gunmetal — covering the full range of corporate aesthetics from classic to tactical.',
          'Slim-Profile Efficiency: 8mm high-tension design ensures a secure hold for up to 8 cards or a stack of currency.',
          'Steel Resilience: Precision-tempered stainless steel with structural memory for a permanent, reliable grip.',
        ],
        description:
          'Streamline your daily carry with a tool designed for minimalist precision. Available in four distinct finishes — Silver (mirror polish), Brushed Matte, PVD Gold, and Gunmetal — this money clip covers the full range of corporate aesthetics. The high-tension steel body automatically adjusts to your carry volume, providing a solid and dependable solution for managing both cash and credentials without the bulk of traditional carriers.\n\nThe flat steel surface is ideal for laser engraving — corporate logos are permanently etched with crisp, permanent precision, making this an executive-grade branded gift. Its non-fading, wear-resistant surface maintains a sharp, modern appearance throughout years of high-frequency use.',
        specifications: [
          { label: 'Thickness', value: '8.0mm (Slim industrial profile)' },
          { label: 'Capacity', value: 'Securely holds 8 cards or a stack of currency notes' },
          { label: 'Material', value: 'Industrial Grade Stainless Steel' },
          { label: 'Finish Options', value: 'Silver (Mirror) / Brushed Matte / PVD Gold / Gunmetal' },
          { label: 'Weight', value: '~20g (Solid metallic presence)' },
        ],
        faqs: [
          {
            q: 'Does the money clip lose its tension after holding cards?',
            a: 'No. We use high-grade stainless steel with reinforced tension memory. The clip is engineered to return to its original shape even after holding its maximum capacity, ensuring a consistent, firm grip for years.',
          },
          {
            q: 'Is corporate Logo customization supported?',
            a: 'Yes. We provide high-precision laser engraving. The Logo is etched directly into the steel surface, ensuring it remains permanent, crisp, and will not fade or peel off over time.',
          },
          {
            q: 'How should the surface be maintained?',
            a: 'The dense stainless steel is naturally resistant to stains and daily abrasion. Fingerprints can be instantly removed with a simple wipe from a soft cloth, maintaining its professional industrial luster.',
          },
        ],
        seoKeywords: [
          'stainless steel money clip',
          'metal money clip',
          'slim money clip',
          'custom logo money clip bulk',
          'corporate money clip gift',
          'engraved money clip wholesale',
          'promotional metal money clip',
          'tempered steel money clip',
          'mirror polish money clip',
          'PVD gold money clip',
          'minimalist money clip for men',
          'high tension card money clip',
          'industrial EDC money clip',
          'slim wallet alternative',
        ],
        sortOrder: 14,
        active: true,
      },
    })

  console.log('✓ Industrial Stainless Steel Money Clip inserted/updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

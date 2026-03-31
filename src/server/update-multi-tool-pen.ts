/**
 * Run with: npx tsx src/server/update-multi-tool-pen.ts
 * Updates the 6-in-1 multi-tool pen with new copy, specs, FAQs, and SEO keywords.
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
      name: '6-in-1 Precision Metal Tool Pen',
      tagline: 'Silver & Black Colorways | Spirit Level | 10cm Ruler | 6-Tool Pocket Kit',
      highlights: [
        '6-Way Integration: Ballpoint pen, stylus, spirit level, 10cm ruler scale, and double-ended screwdriver bit — a complete pocket engineering toolkit in one instrument.',
        'Precision Spirit Level: The integrated spirit level window provides a quick, accurate horizontal reference for field work, installation tasks, or presentations — more professional and accurate terminology than a basic "bubble level".',
        'Two Color Editions: Available in Silver and Black lacquer finishes — order both for a premium dual-tone gift set or choose the colorway that best matches your corporate palette.',
        'Solid Metal Build: Zinc/aluminum alloy construction with weighted feel and durability far superior to standard plastic alternatives.',
      ],
      description:
        'Pragmatic tools for professional efficiency.\n\nAvailable in Silver and Black lacquer finishes, this 6-in-1 precision metal tool pen covers both classic and modern corporate aesthetics. The integrated spirit level window provides an accurate horizontal reference for installation, presentations, or precision field work — a technically correct and more professional term than "bubble level" in engineering and construction contexts.\n\nThe 10cm ruler scale etched on the barrel handles quick measurements without reaching for additional tools. Whether for touchscreen interaction, minor mechanical adjustments, or leveling tasks, it provides immediate functional support. A functional essential that prioritizes reliability and utility, offering a cost-effective solution with high perceived value for corporate gifting.',
      specifications: [
        { label: 'Material', value: 'Industrial-Grade Metal Alloy (Zinc/Aluminum)' },
        { label: 'Finish', value: 'Lacquer Finish' },
        { label: 'Color Options', value: 'Silver / Black (Lacquer Finish)' },
        { label: 'Integrated Tools', value: 'Ballpoint Pen, Stylus, Spirit Level, 10cm Ruler Scale, Flat + Phillips Screwdriver' },
        { label: 'Dimensions', value: '149mm × 10mm' },
        { label: 'Weight', value: 'Approx. 30g (Solid weighted feel)' },
        { label: 'Durability', value: 'Corrosion-resistant, Rigid structure, High coating adhesion' },
      ],
      faqs: [
        {
          q: 'What is the recommended method for corporate branding?',
          a: 'For the lacquer finish, we recommend Laser Etching. The laser removes the coating to reveal the natural metallic tone underneath, creating a clear contrast with the pen body for a clean, permanent brand mark.',
        },
        {
          q: 'How do you maintain the lacquer finish during daily use?',
          a: 'The lacquer finish is resistant to daily stains and smudges. It can be easily cleaned with a damp cloth, making it easier to maintain a professional look compared to traditional plastic pens.',
        },
        {
          q: 'Are the screwdriver bits and bubble level reliable for actual use?',
          a: 'Yes. The screwdriver bits are securely housed to withstand light-duty daily tasks, and the bubble level is sealed to ensure operational stability during professional use.',
        },
      ],
      seoKeywords: [
        // Core product terms
        '6 in 1 multi tool pen',
        'precision metal tool pen',
        'metal multitool pen',
        // B2B / corporate gifting
        'corporate multi tool pen bulk order',
        'custom logo multi tool pen',
        'branded promotional tool pen',
        'executive multi function pen gift',
        // Material / craft
        'zinc alloy tool pen',
        'lacquer finish metal pen',
        'laser engraved tool pen',
        // Use-case long-tail
        'pocket multi tool pen for office',
        'ballpoint stylus screwdriver level pen',
        'engineer gift pen tool',
        '6 in 1 pen corporate gift set',
      ],
    })
    .where(eq(products.id, 'metal-multifunctional-tool-ballpoint-pen-01'))

  console.log('✓ Multi-tool pen updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

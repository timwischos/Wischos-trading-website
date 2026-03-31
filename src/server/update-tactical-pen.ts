/**
 * Run with: npx tsx src/server/update-tactical-pen.ts
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
      name: 'Tactical Stainless Steel Pen with Glass Breaker',
      tagline: '303 Stainless Steel | Glass Breaker Tip | 102.8g Precision Weight',
      highlights: [
        'Glass-Breaker Tail Cap: The hardened tungsten-carbide tip is positioned at the tail cap (opposite the writing end) — immediately accessible for vehicle emergencies without fumbling to reverse grip.',
        'Modular Field Disassembly: Fully disassembles without tools for standard refill replacement or field cleaning — a practical design that ensures years of reliable daily use.',
        'Emergency Preparedness Tool: Designed for professionals in transport, field, or remote roles — a discreet, carry-legal self-rescue instrument that doubles as a precision writing instrument.',
        'Extreme Durability: Mirror-polished 303 stainless steel body built to withstand heavy-duty use.',
      ],
      description:
        'Designed for professionals who demand peak performance, this all-stainless steel tactical pen balances strength with refined craftsmanship. The hardened glass-breaker tip is positioned at the tail cap — the natural end to strike in an emergency — ensuring immediate access without re-gripping. For professionals in transport, logistics, field service, or remote work, this pen discreetly integrates emergency preparedness into a daily carry tool.\n\nThe mirror-polished 303 stainless steel surface reflects a commitment to precision manufacturing. Full modular disassembly allows tool-free refill replacement in under 30 seconds, ensuring this pen functions as a reliable daily writer for the long term. An ideal corporate gift for professionals who demand both preparedness and precision.',
      specifications: [
        { label: 'Length', value: '152mm' },
        { label: 'Diameter', value: '14mm' },
        { label: 'Net Weight', value: '102.8g' },
        { label: 'Material', value: '303 Stainless Steel' },
        { label: 'Hardness', value: 'HRC 40–45' },
        { label: 'Glass Breaker', value: 'Hardened Tungsten-Carbide Tip at Tail Cap' },
        { label: 'Disassembly', value: 'Full Modular — Tool-Free, Standard Refill Compatible' },
      ],
      faqs: [
        {
          q: 'How durable is the stainless steel surface against scratches?',
          a: 'The mirror-polished 303 stainless steel offers excellent resistance to daily wear. While minor traces may appear over long-term use, these are considered a natural patina of the metal rather than structural damage.',
        },
        {
          q: "Isn't the weight a bit too heavy?",
          a: 'The 102.8g weight is an intentional design choice to provide deliberate tactile feedback and enhanced stability during use. It increases grip control and the overall perceived quality of the tool without adding unnecessary bulk.',
        },
        {
          q: 'Is corporate logo customization supported?',
          a: 'Yes. The smooth, flat areas of the pen body and the clip are designed for precision branding. Please contact us to discuss laser engraving or other customization options to align with your corporate identity.',
        },
        {
          q: 'How should the polished surface be maintained?',
          a: 'Simply wipe with a soft, dry cloth. Avoid using harsh or abrasive cleaners. The all-metal construction is designed to be maintenance-free for both daily and outdoor professional use.',
        },
      ],
      seoKeywords: [
        // Core product
        'tactical stainless steel pen',
        'glass breaker tactical pen',
        'EDC metal pen',
        'tactical pen with glass breaker',
        'mirror polish stainless steel pen',
        // B2B / corporate gifting
        'custom logo tactical pen bulk',
        'corporate gifts stainless steel pen',
        'premium metal pen wholesale',
        'branded employee recognition pen',
        // Material / craft
        '303 stainless steel pen',
        'precision machined metal pen',
        'hardened tip tactical pen',
        // Long-tail
        'emergency survival pen multi-tool',
        'heavy duty stainless steel pen bulk order',
        'tactical writing instrument corporate gift',
      ],
    })
    .where(eq(products.id, 'tactical-stainless-steel-pen-01'))

  console.log('✓ Tactical Stainless Steel Pen updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

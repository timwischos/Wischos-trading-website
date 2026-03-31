/**
 * Run with: npx tsx src/server/update-minimalist-coffee-cup.ts
 * Updates minimalist-portable-stainless-steel-coffee-cup-01:
 * — Sleeve repositioned as full-wrap print canvas (primary branding surface)
 * — Wide squat desk tumbler positioning (not travel mug)
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { eq } from 'drizzle-orm'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const BASE = '/products/WP-403-weighted-vacuum-insulated-office-tumbler'

async function main() {
  await db.update(products).set({
    name: 'Weighted Vacuum Insulated Office Tumbler',
    tagline: 'SUS304 Stainless Steel | Double-Wall Vacuum | Full-Wrap Print Canvas Sleeve | Dual-Function Lid',
    category: 'Drinkware',
    materials: ['SUS304 Stainless Steel', 'Polycarbonate', 'Polyester-Nylon'],
    heroImage: `${BASE}/weighted-vacuum-insulated-office-tumbler-cover.avif`,
    images: [
      `${BASE}/weighted-vacuum-insulated-office-tumbler-cover.avif`,
      `${BASE}/weighted-vacuum-insulated-office-tumbler-hover.avif`,
      `${BASE}/weighted-vacuum-insulated-office-tumbler-detail-1.avif`,
      `${BASE}/weighted-vacuum-insulated-office-tumbler-detail-2.avif`,
      `${BASE}/weighted-vacuum-insulated-office-tumbler-detail-3.avif`,
      `${BASE}/weighted-vacuum-insulated-office-tumbler-detail-4.avif`,
    ],
    moq: 50,
    customizationOptions: [
      'Full-Wrap Digital Printing on Fabric Sleeve',
      'Laser Engraving on Steel Base',
      'Custom Fabric Sleeve Color',
      'Embossed Logo on Lid',
      'Custom Packaging',
    ],
    highlights: [
      'Full-Wrap Fabric Sleeve as Branding Canvas: The removable polyester-nylon sleeve is the primary customization surface — engineered for full-wrap digital printing of brand artwork, campaign graphics, and corporate identity across the entire visible area. A 420ml tumbler that doubles as a branded display object on every desk it occupies.',
      'Wide Squat Desk Footprint: At 8.5cm H × 8.5cm Diameter, this wide-profile tumbler is designed to sit low and stable on workstations — maximizing desk presence while fitting standard automotive and desk cup holders without tipping.',
      'Weighted 310g Tactile Build: The intentional 310g solid construction delivers a premium, balanced presence in hand — a deliberate signal of hardware quality that lightweight alternatives cannot replicate.',
    ],
    description:
      'This 420ml insulated office tumbler is engineered around the fabric sleeve as its central branding surface. The full-wrap polyester-nylon sleeve accepts digital printing across its entire visible area, turning each unit into a mobile brand display that remains on every recipient\'s desk throughout the workday. The heat-sealed construction ensures the sleeve stays secure under repeated daily handling.\n\nThe wide squat form factor — 8.5cm tall, 8.5cm in diameter — is purpose-built for desk environments. It sits low and stable, maintaining a clean branded presence on workstations, conference tables, and reception counters. The double-wall SUS304 stainless steel construction keeps beverages at temperature throughout long sessions. The 310g weighted build adds intentional heft that communicates hardware quality — a bulk gifting asset that stays visible, used, and appreciated rather than stored away.',
    specifications: [
      { label: 'Capacity', value: '420ml (14.2 oz)' },
      { label: 'Net Weight', value: '310g' },
      { label: 'Dimensions', value: '8.5cm H × 8.5cm Diameter (Wide Squat Profile)' },
      { label: 'Material', value: 'Food-Grade SUS304 Stainless Steel' },
      { label: 'Insulation', value: '6–12 Hours (Hot / Cold)' },
      { label: 'Sleeve', value: 'Removable Polyester-Nylon; Full-Wrap Digital Print Ready' },
    ],
    faqs: [
      {
        q: 'What is the print area on the fabric sleeve?',
        a: 'The polyester-nylon sleeve wraps the full visible body of the tumbler, providing a large continuous print surface for full-color brand artwork, campaign graphics, or corporate identity. Digital printing is applied across the entire sleeve area for maximum visual impact in bulk corporate gifting programs.',
      },
      {
        q: 'Is the sleeve permanent or removable?',
        a: 'The sleeve is designed to stay in place during normal use via a heat-sealed fit around the body. For bulk orders requiring co-branding or seasonal artwork updates, sleeve-only re-orders are available. Contact us to discuss volume requirements.',
      },
      {
        q: 'Is this suitable as a desk tumbler rather than a travel mug?',
        a: 'Yes — this is a desk tumbler by design. The wide 8.5cm diameter and low 8.5cm height create a stable, low-profile footprint optimized for workstation surfaces, conference table setups, and reception counters. It fits standard desk cup holders and sits flat without tipping.',
      },
      {
        q: 'How durable is the construction for long-term desk use?',
        a: 'The SUS304 stainless steel body is highly resistant to impact and corrosion, maintaining its structural integrity over long-term use. The fabric sleeve is heat-sealed to ensure it stays securely in place and remains resistant to wear and moisture after repeated handling.',
      },
    ],
    seoKeywords: [
      // SEO — core product
      'vacuum insulated office tumbler',
      'stainless steel desk tumbler',
      'double wall tumbler with sleeve',
      '420ml insulated desk tumbler',
      // SEO — B2B / corporate
      'corporate gift tumbler bulk',
      'custom logo insulated tumbler wholesale',
      'branded drinkware bulk order',
      'full wrap print tumbler corporate gift',
      // Material / craft
      'SUS304 stainless steel tumbler',
      'full wrap digital print sleeve tumbler',
      'fabric sleeve custom print tumbler',
      // SIO — social intent
      'aesthetic office tumbler branded sleeve',
      'minimalist desk drinkware wide squat',
      'branded sleeve coffee tumbler desk',
      // GEO — AI natural language
      'best insulated office tumbler with branded sleeve',
      'wide squat desk tumbler with full print sleeve corporate gift',
      'premium stainless steel office tumbler custom sleeve printing',
      // Long-tail
      'insulated tumbler with full wrap print sleeve bulk order',
      'wide desk tumbler custom sleeve branding corporate gift',
      'SUS304 vacuum tumbler branded sleeve wholesale',
    ],
    sortOrder: 220,
    active: true,
  }).where(eq(products.id, 'minimalist-portable-stainless-steel-coffee-cup-01'))

  console.log('✓ Weighted Vacuum Insulated Office Tumbler updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

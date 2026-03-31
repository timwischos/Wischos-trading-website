/**
 * Run with: npx tsx src/server/update-edc-pry-bar.ts
 * Inserts the Industrial Mini EDC Pry Bar (new product).
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const BASE = '/products/Industrial-Mini-EDC-Pry-Bar-Keychain-01'

async function main() {
  await db.insert(products).values({
    id: 'industrial-mini-edc-pry-bar-01',
    name: 'Industrial Mini EDC Pry Bar',
    tagline: 'Stainless Steel or Titanium | 12g Keychain-Ready | Box Opening & Prying',
    category: 'EDC Tools',
    materials: ['Stainless Steel', 'Titanium Alloy'],
    heroImage: `${BASE}/Industrial-Mini-EDC-Pry-Bar-Keychain-01-cover.avif`,
    images: [
      `${BASE}/Industrial-Mini-EDC-Pry-Bar-Keychain-01-cover.avif`,
      `${BASE}/Industrial-Mini-EDC-Pry-Bar-Keychain-01-hover.avif`,
      `${BASE}/Industrial-Mini-EDC-Pry-Bar-Keychain-01-detail-1.avif`,
      `${BASE}/Industrial-Mini-EDC-Pry-Bar-Keychain-01-detail-2.avif`,
      `${BASE}/Industrial-Mini-EDC-Pry-Bar-Keychain-01-detail-3.avif`,
    ],
    moq: 50,
    customizationOptions: ['Laser Engraving', 'Custom Packaging'],
    highlights: [
      'Everyday Utility: Purpose-built for the small gritty jobs — opening shipping boxes, removing stubborn staples, and light prying — always within reach on your keychain.',
      'Solid Metal Build: Available in rust-proof Stainless Steel or lightweight Titanium Alloy; won\'t bend, snap, or corrode like plastic alternatives.',
      'Pocket-Ready at 12g: Compact 70mm profile lives on your keychain unnoticed, but delivers real leverage when you need to scrape or wedge something loose.',
    ],
    description:
      'This mini pry bar is a straightforward office companion designed to handle the small, gritty jobs of the day — like popping open taped boxes or prying out misaligned staples. It\'s small enough to live on your keychain unnoticed, but solid enough to provide real leverage when you need to scrape or wedge something loose. It is a simple, permanent piece of hardware that just works.\n\nAvailable in two material grades: stainless steel for a reliable, cost-effective daily workhorse, and titanium alloy for professionals who demand the same strength at a lighter weight. Both options feature laser-engravable flat surfaces, making this a discreet but practical corporate gift that stays with its recipient every day.',
    specifications: [
      { label: 'Length', value: 'Approx. 70mm' },
      { label: 'Weight', value: '12g' },
      { label: 'Materials', value: 'Stainless Steel / Titanium Alloy' },
      { label: 'Finish Options', value: 'Brushed / Distressed / Polished' },
    ],
    faqs: [
      {
        q: 'How do the two materials compare in terms of longevity?',
        a: 'Both are fully rust-proof. Stainless steel is a reliable, cost-effective choice for daily prying tasks. Titanium offers the same structural strength at a lighter weight, making it a premium option for professionals who prefer minimal pocket bulk.',
      },
      {
        q: 'Is corporate logo customization supported?',
        a: 'Yes. The flat surfaces are ideal for laser engraving. We can add your company logo to the side or face of the tool for a permanent, clean mark that will not fade over time.',
      },
      {
        q: 'Can this actually open boxes and remove staples reliably?',
        a: 'Yes. The tapered pry tip is specifically engineered for this. It fits under packing tape seals and staple heads with enough leverage to handle daily office tasks cleanly, without damaging surrounding materials.',
      },
      {
        q: 'Is it safe to carry through airport security?',
        a: 'Security rules vary by country and checkpoint. As a compact pry tool under 70mm with no blade, it is generally accepted in carry-on luggage in most regions, but we recommend checking local regulations before travel.',
      },
    ],
    seoKeywords: [
      // Core product
      'mini EDC pry bar',
      'keychain pry bar',
      'EDC pry bar keychain',
      'pocket prybar tool',
      'mini pry bar keychain tool',
      // B2B / corporate gifting
      'EDC keychain tool corporate gift',
      'custom logo pry bar bulk',
      'industrial keychain tool wholesale',
      'branded EDC tool gift set',
      // Material / craft
      'titanium mini pry bar',
      'stainless steel keychain prybar',
      'laser engraved pry bar',
      // Long-tail
      'box opening keychain tool office',
      'heavy duty mini prybar everyday carry',
      'compact EDC tool bulk order',
      'titanium vs steel pry bar corporate gift',
    ],
    sortOrder: 160,
    active: true,
  })

  console.log('✓ Industrial Mini EDC Pry Bar inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

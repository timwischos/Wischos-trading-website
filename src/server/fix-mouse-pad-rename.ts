/**
 * Run with: npx tsx src/server/fix-mouse-pad-rename.ts
 * One-shot fix: renames WP-201 from "desk-mat" to "mouse-pad" in DB.
 * Updates: id, name, tagline, images, expert notes.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { sql } from 'drizzle-orm'
import { products } from './schema'

const client = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(client)

const OLD_ID = 'WP-201-professional-aluminum-desk-mat'
const NEW_ID = 'WP-201-professional-aluminum-mouse-pad'

async function main() {
  // Step 1: update all fields except id
  await db
    .update(products)
    .set({
      name: 'Professional Aluminum Mouse Pad',
      tagline: '5052 Aluminum Mouse Pad | Laser Engravable | Minimalist, Durable, Easy-to-Clean',
      images: [
        '/products/WP-201-professional-aluminum-mouse-pad/professional-aluminum-mouse-pad-cover.avif',
        '/products/WP-201-professional-aluminum-mouse-pad/professional-aluminum-mouse-pad-hover.avif',
        '/products/WP-201-professional-aluminum-mouse-pad/professional-aluminum-mouse-pad-detail-1.avif',
        '/products/WP-201-professional-aluminum-mouse-pad/professional-aluminum-mouse-pad-detail-2.avif',
        '/products/WP-201-professional-aluminum-mouse-pad/professional-aluminum-mouse-pad-detail-3.avif',
        '/products/WP-201-professional-aluminum-mouse-pad/professional-aluminum-mouse-pad-lifestyle.avif',
      ],
      heroImage: '/products/WP-201-professional-aluminum-mouse-pad/professional-aluminum-mouse-pad-cover.avif',
      sourcingNotes: [
        {
          title: '5052 Aluminum: The Right Alloy for a Mouse Pad',
          body: "5052-H32 aluminum has excellent formability and corrosion resistance (superior to 6061 in marine environments). Its tensile strength of 228 MPa is more than sufficient for a mouse pad, while its 2.68 g/cm³ density keeps the 240×200mm pad at a manageable 320g. The magnesium content (2.2–2.8%) also provides natural antimicrobial properties — relevant for a surface that's touched thousands of times per day.",
        },
        {
          title: 'Sandblasting + Anodization: A Two-Step Surface',
          body: 'Sandblasting uses 80–120 grit aluminum oxide particles at 3–5 bar pressure to create a uniform micro-texture (Ra 1.6–3.2μm). This is followed by Type II anodization (15–25μm oxide layer) which converts the surface aluminum into Al₂O₃ — a ceramic harder than the underlying metal. The result is a surface that resists scratches from watches, cufflinks, and mouse feet while providing optimal optical mouse tracking.',
        },
        {
          title: 'Thermal Advantage Over Cloth Pads',
          body: "Aluminum's thermal conductivity (138 W/m·K) is 500× that of cloth. This means an aluminum mouse pad actively dissipates heat from your wrist and forearm, keeping the working surface 2–4°C cooler than ambient. In warm offices, this reduces palm sweating — a practical ergonomic benefit that cloth or leather pads cannot provide.",
        },
      ],
    })
    .where(sql`id = ${OLD_ID}`)

  console.log('✓ Fields updated.')

  // Step 2: rename the primary key (requires raw SQL)
  await client`UPDATE products SET id = ${NEW_ID} WHERE id = ${OLD_ID}`
  console.log(`✓ ID renamed: ${OLD_ID} → ${NEW_ID}`)

  await client.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

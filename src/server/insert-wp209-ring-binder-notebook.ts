/**
 * Run with: npx tsx src/server/insert-wp209-ring-binder-notebook.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-209-aluminium-ring-binder-notebook'
const PREFIX = 'aluminium-ring-binder-notebook'

async function main() {
  await db.insert(products).values({
    id: 'wp-209-aluminium-ring-binder-notebook',
    sku: 'WP-209',
    name: 'Anodised Pure Aluminium Ring Binder Notebook',
    tagline: 'Anodised pure aluminium | 1mm cover · A4 to A7 · 4-9 rings | 100gsm refill paper included',
    metaDescription:
      'Custom anodised aluminium ring binder notebook for corporate gifting. A4 to A7 · 4-9 rings · 1mm cover · 100gsm refill paper · laser engraving available.',
    quickAnswer:
      'The WP-209 is an anodised pure aluminium ring binder notebook with a 1mm cover plate, available in A4, B5, A5, A6, or A7 with 4-9 ring mechanism options and 100 sheets of 100gsm refill paper. It accepts laser engraving, embossed stamping, or single-colour printing for brand customisation, and is designed for custom corporate gifting.',
    category: 'Desk Accessories',
    materials: ['Anodised pure aluminium', 'Steel (ring mechanism)', '100gsm Daolin paper'],
    moq: 100,
    sortOrder: 52,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-4.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-5.avif`,
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    description:
      'The WP-209 is an anodised pure aluminium ring binder notebook, designed for custom corporate gift sets and new employee desk kits. The cover is formed from 1mm pure aluminium plate with an anodised surface that resists moisture and daily wear. It comes loaded with 100 sheets of 100gsm Daolin paper. Available in five formats — A4 (4 rings), B5 (9 rings), A5 (6 rings), A6 (6 rings), and A7 (6 rings) — holding standard loose-leaf refills. Your company logo or brand mark is laser-engraved directly into the cover face. Available in six anodised colours.',
    highlights: [
      '1mm anodised pure aluminium cover — lightweight, rigid, and resistant to deformation',
      'Five size formats — A4, B5, A5, A6, or A7 with 4-9 ring options, all accepting standard loose-leaf refills',
      '100gsm Daolin paper included — 100 sheets loaded at shipping, ready to use on arrival',
      'Laser engraving on cover face — logo, text, or pattern cut directly into the anodised surface',
      'Six anodised colours — Red, Blue, Black, Gold, Champagne Gold, Silver',
    ],
    customizationOptions: [
      'Logo application: single-colour printing / embossed stamping / laser engraving',
      'Anodised colour: Red / Blue / Black / Gold / Champagne Gold / Silver',
      'Custom rigid gift box with printed or foil-stamped logo',
      'Custom-branded refill paper (available on request)',
    ],
    specifications: [
      { label: 'Material', value: 'Anodised pure aluminium' },
      { label: 'Cover thickness', value: '1mm aluminium alloy plate' },
      { label: 'Dimensions — A4', value: '235 × 320 mm · 4 rings' },
      { label: 'Dimensions — B5', value: '210 × 272 mm · 9 rings' },
      { label: 'Dimensions — A5', value: '180 × 235 mm · 6 rings' },
      { label: 'Dimensions — A6', value: '128 × 188 mm · 6 rings' },
      { label: 'Dimensions — A7', value: '105 × 149 mm · 6 rings' },
      { label: 'Weight', value: 'Depends on size — A5 baseline ~600g' },
      { label: 'Paper', value: '100gsm Daolin paper, 100 sheets' },
      { label: 'Surface finish', value: 'Anodised' },
      { label: 'Colours', value: 'Red, Blue, Black, Gold, Champagne Gold, Silver' },
    ],
    faqs: [
      {
        q: 'What paper size and ring standard does the A5 version use?',
        a: 'The A5 cover uses 6 standard rings sized for A5 sheets (148×210mm loose-leaf). The included Daolin paper is 100gsm. Standard A5 refill packs from most stationery suppliers fit without modification.',
      },
      {
        q: 'What logo application methods are available on the cover?',
        a: 'Three methods are available: single-colour printing, embossed or debossed stamping, and laser engraving. All covers ship blank without logo unless specified. Reach out with your quantity and we will advise on the right method.',
      },
      {
        q: 'Does this work as a standalone gift or only as part of a set?',
        a: 'Both. As a standalone item it ships in a rigid gift box with your branding on the outer sleeve. As a set component, it pairs with a metal pen and card case for a complete desk kit.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Anodised surface and engraving contrast',
        body: 'Anodised aluminium holds colour within the surface layer rather than as a coating applied on top. Laser engraving removes the anodised layer to expose bare aluminium beneath — producing a silver-on-colour contrast that holds without fading or peeling. For multi-unit corporate orders, this means logo appearance is consistent across the full batch.',
      },
      {
        title: 'Ring binder format and gifting longevity',
        body: 'Unlike a hardcover journal, a ring binder cover stays in use after the original paper runs out. Recipients refill it with standard A5 sheets from any stationery supplier. For corporate buyers, this extends the branded surface life beyond the initial gift — the logo on the cover remains on the desk after the first 100 sheets are used.',
      },
    ],
    keyInsight:
      'Anodised aluminium ring binder with laser-engravable cover — a refillable desk gifting item that keeps your brand mark in daily use after the paper runs out.',
    seoKeywords: [
      'custom aluminium ring binder notebook',
      'anodised aluminium notebook cover corporate gift',
      'engraved metal notebook',
      'A5 aluminium binder corporate gift',
      'custom metal notebook cover',
      'branded ring binder corporate gift set',
      'custom metal corporate gift set',
    ],
  })

  console.log('✓ WP-209 Anodised Pure Aluminium Ring Binder Notebook inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

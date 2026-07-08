/**
 * Run with: npx tsx src/server/insert-wp208-device-stand.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-208-precision-folding-aluminium-device-stand'
const PREFIX = 'precision-folding-aluminium-device-stand'

async function main() {
  await db.insert(products).values({
    id: 'wp-208-precision-folding-aluminium-device-stand',
    sku: 'WP-208',
    name: 'Precision Folding Aluminium Device Stand',
    tagline: 'Aluminium alloy + silicone | MagSafe compatible | 150g | 3 modes',
    category: 'Desk Accessories',
    materials: ['Aluminium alloy', 'Silicone'],
    moq: 100,
    sortOrder: 51,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-4.avif`,
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    highlights: [
      'Three configurations: Desktop phone/tablet holder, laptop riser, and folded carry mode.',
      'Ring-array magnets: MagSafe compatible with instant attachment and no adjustment needed.',
      'High-damping hinges: Hold the set angle without drift or creep.',
      'Anodised aluminium body: 150g total weight, fits in a jacket pocket or laptop bag side pocket.',
      'Silicone contact pads: Protect device surfaces and prevent desk slippage.',
      'Laser engraving area: Base panel, with logo visible on every desk it sits on.',
    ],
    customizationOptions: [
      'Laser engraving on base panel (logo or company name)',
      'Colour: gunmetal or grey',
      'Custom gift box with hot foil stamping',
      'Velvet pouch included as standard (can be replaced with branded drawstring bag)',
    ],
    description:
      'A folding aluminium stand that switches between three configurations without tools or adjustment. Flat on a desk, it holds phones and tablets via a ring-magnet array compatible with MagSafe-enabled devices — place, attach, done. Folded upright, it raises a laptop screen by up to 20cm, reducing neck load during extended desk sessions. Collapsed to 182 × 60 × 18mm and 150g, it fits in a jacket pocket or laptop bag without adding meaningful weight. High-damping hinges hold any set angle without drift. The anodised body and silicone contact pads protect surfaces on both sides.',
    specifications: [
      { label: 'Material', value: 'Aluminium alloy body + silicone contact pads' },
      { label: 'Weight', value: 'Approx. 150g' },
      { label: 'Format', value: 'Fold-flat 3-mode stand (phone / tablet / laptop riser)' },
      { label: 'Folded dimensions (packed)', value: 'Approx. 181.5 × 58 × 21mm' },
      { label: 'Single-panel thickness', value: 'Approx. 3.5mm (per leaf)' },
      { label: 'Leg width (base)', value: 'Approx. 28.5mm' },
      { label: 'Expanded span', value: 'Approx. 218mm wide' },
      { label: 'Max device support width', value: 'Approx. 190mm' },
      { label: 'Deployed height', value: 'Approx. 129mm' },
      { label: 'Deployed base depth', value: 'Approx. 196mm' },
      { label: 'Branding method', value: 'Laser engraving on base panel' },
    ],
    faqs: [
      {
        q: 'Does this work with Android phones or non-MagSafe devices?',
        a: 'Yes. A thin metal ring (included) adheres to the back of any device, allowing the magnetic mount to attach. Works with Android phones, tablets, Kindles, and any smartphone without built-in MagSafe.',
      },
      {
        q: 'Can the base panel be engraved with a company logo?',
        a: 'Yes. The flat aluminium base panel accepts laser engraving. We accept vector files (AI, EPS, SVG). The engraving is permanent — no printing that fades with handling.',
      },
      {
        q: 'What laptop sizes does the stand support?',
        a: 'The stand is designed for laptops up to approximately 16 inches and under 2kg. It raises the screen 18–20cm above desk level. It is not recommended for gaming laptops or workstation-class machines.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Why this lands in WFH onboarding kits',
        body: 'A laptop stand is one of the few corporate gifts that gets used before the recipient has finished unpacking the box. For companies running remote or hybrid onboarding, shipping this alongside a badge holder or welcome letter puts a branded object on the home desk from day one — and it stays there. Unlike pens or notebooks that migrate to drawers, a stand is a fixed desk fixture with the logo facing outward every working day.',
      },
      {
        title: 'Magnetic attachment: what the ring-array design means in practice',
        body: 'The circular magnet arrangement aligns the phone automatically as it approaches the mount — no fine adjustment, no clipping. This matters for gifting because recipients use it immediately without reading instructions. For non-MagSafe devices, the included thin metal ring (under 0.5mm) adheres to the phone back without adding noticeable bulk, extending compatibility to virtually any smartphone in a mixed corporate fleet.',
      },
    ],
    seoKeywords: [
      'custom aluminium phone stand corporate gift',
      'folding laptop stand bulk order',
      'MagSafe compatible desk stand corporate',
      'branded metal device stand engraved',
      'aluminium phone holder wholesale',
      'corporate gift desk accessories metal',
    ],
  })

  console.log('✓ WP-208 Precision Folding Aluminium Device Stand inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

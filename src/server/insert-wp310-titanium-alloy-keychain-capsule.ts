/**
 * Run with: npx tsx src/server/insert-wp310-titanium-alloy-keychain-capsule.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-310-titanium-alloy-keychain-capsule'
const PREFIX = 'titanium-alloy-keychain-capsule'

async function main() {
  await db.insert(products).values({
    id: 'wp-310-titanium-alloy-keychain-capsule',
    sku: 'WP-310',
    name: 'Titanium Alloy Keychain Capsule',
    tagline: 'Titanium alloy  |  Threaded waterproof seal  |  Three sizes  |  Sandblasted or natural finish',
    metaDescription: 'Custom engraved titanium alloy keychain capsule, threaded waterproof seal, three sizes. For corporate wellness and EDC gifting programs. Inquire for pricing.',
    quickAnswer: 'The Titanium Alloy Keychain Capsule is a machined titanium alloy sealed container with a threaded cap and keychain loop, available in small (12×32mm, 6g), medium (16×42mm, 15g), and large (20×51mm, 26g) sizes, offered by Wischos Gift for Everyday Carry (EDC) and corporate gift programs.',
    category: 'EDC Accessories',
    materials: ['Titanium alloy'],
    moq: 100,
    sortOrder: 133,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    description: 'A machined titanium alloy keychain capsule in three sizes. The body is turned from titanium alloy and sealed with a threaded cap and O-ring, keeping the interior waterproof and airtight in daily carry. At 6g for the small and 26g for the large, it attaches to keys, bag clips, or carabiners for Everyday Carry (EDC) without adding noticeable weight. The titanium alloy surface is available in sandblasted (matte) or natural finish; both accept laser engraving for company logos and text, applied directly into the metal without a coating. For corporate gifting, it works in wellness programs, outdoor industry accounts, and EDC gift sets where material quality is a visible specification. It is a custom metal corporate gift that carries a functional story, not just a logo.',
    highlights: [
      'Titanium alloy construction — lighter than stainless steel, corrosion-proof in sweat and moisture',
      'Threaded cap with O-ring seal — waterproof and airtight closure, no hinge or snap catch',
      'Three sizes — small (12×32mm, 6g), medium (16×42mm, 15g), large (20×51mm, 26g)',
      'Keychain loop — attaches to keys, bag clips, or carabiners for daily carry',
      'Laser engravable surface — logos and text engrave directly into titanium alloy, no coating to wear',
    ],
    specifications: [
      { label: 'Material', value: 'Titanium alloy' },
      { label: 'Dimensions (Small)', value: '12mm OD × 32mm H; internal 9mm ID × 22.6mm depth' },
      { label: 'Dimensions (Medium)', value: '16mm OD × 42mm H; internal 12mm ID × 30.5mm depth' },
      { label: 'Dimensions (Large)', value: '20mm OD × 51mm H; internal 16mm ID × 38mm depth' },
      { label: 'Weight', value: 'Small ~6g; Medium ~15g; Large ~26g' },
      { label: 'Wall Thickness', value: 'Small 1.1mm; Medium 1.6mm; Large 1.8mm' },
      { label: 'Seal', value: 'Threaded cap with O-ring' },
      { label: 'Attachment', value: 'Keychain loop' },
      { label: 'Surface Finish', value: 'Sandblasted (matte) or natural' },
      { label: 'Branding Method', value: 'Laser engraving' },
    ],
    customizationOptions: [
      'Laser engraving on the titanium alloy body (logo, text, or serial numbers)',
      'Choice of surface finish: sandblasted (matte) or natural',
      'Custom gift box or packaging, subject to order quantity and confirmation',
    ],
    faqs: [
      { q: 'What can the capsule hold?', a: 'The capsule carries compact daily items — emergency medication, a small key, a memory card, or other items that fit the internal diameter. Small holds items up to 9mm wide and 22.6mm long; medium up to 12mm wide and 30.5mm long; large up to 16mm wide and 38mm long.' },
      { q: 'Is the capsule waterproof?', a: 'The threaded cap includes an O-ring seal. It is designed to keep contents waterproof and airtight in normal daily carry, including rain and brief exposure to water. It is not rated for prolonged deep submersion.' },
      { q: 'Can a company logo be engraved on the capsule?', a: 'Yes. The titanium alloy body accepts laser engraving for logos and text. Sandblasted finish provides higher contrast for the engraved mark; natural finish also works. Minimum order and artwork requirements apply.' },
      { q: 'What sizes are available, and how do I choose?', a: 'Three sizes — small (12×32mm), medium (16×42mm), large (20×51mm). Medium is the most versatile for corporate gifting programs. Small suits compact EDC sets where keeping weight minimal is a priority.' },
    ],
    sourcingNotes: [
      { title: 'Titanium alloy keeps the capsule practical as a daily-carry item', body: 'Titanium alloy density is approximately 4.5 g/cm³, compared with 7.9 g/cm³ for stainless steel, which keeps a keychain capsule noticeably lighter than a steel equivalent of the same size. Unlike aluminium, titanium alloy does not corrode in contact with sweat, moisture, or common acidic environments — a relevant property for a product designed to carry medication or stay on a keychain. The material holds a laser-engraved mark without any protective coating, which removes one failure point compared with painted or anodised aluminium.' },
      { title: 'Three sizes serve different gifting contexts', body: 'Small (12×32mm, 6g) suits compact Everyday Carry (EDC) sets or minimalist keychain carry. Medium (16×42mm, 15g) holds a small daily supply of tablets or a folded note and is the most practical size for wellness gifting programs. Large (20×51mm, 26g) adds capacity for a mixed carry. Buyers ordering for a consistent corporate program typically select one size and one finish to keep the engraved set uniform.' },
      { title: 'Threaded cap reduces long-term handling wear', body: 'A threaded closure has no hinge, no snap catch, and no exterior moving part that contacts other items on a keychain. The O-ring sits inside the thread line and can be replaced if worn, without replacing the capsule. For an item that opens and closes daily, the thread format has fewer failure points over time than a hinged or friction-fit lid.' },
    ],
    comparisonTable: {
      columns: ['Capsule type', 'Best fit', 'Buyer note'],
      rows: [
        ['Titanium alloy keychain capsule', 'Daily EDC carry and compact emergency kits', 'Lightweight, corrosion-proof, laser engravable'],
        ['Stainless steel pill box', 'Desk or bag carry', 'Heavier; higher storage volume'],
        ['Aluminium screw-top capsule', 'Budget EDC carry', 'Lower material tier; less durable thread'],
      ],
    },
    keyInsight: 'The strongest B2B use case is a compact emergency carry item for wellness gifting programs and outdoor industry accounts — the titanium alloy body and waterproof threaded seal are the two buyer-facing specifications that differentiate it from aluminium or steel alternatives.',
    seoKeywords: [
      'titanium alloy keychain capsule',
      'custom titanium EDC capsule',
      'engraved titanium capsule keychain',
      'titanium pill capsule keychain',
      'titanium alloy EDC carry',
      'corporate wellness gift',
      'metal keychain capsule corporate gift',
      'engraved titanium keychain',
      'custom EDC keychain capsule',
      'waterproof titanium capsule',
    ],
  })

  console.log('✓ WP-310 Titanium Alloy Keychain Capsule inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

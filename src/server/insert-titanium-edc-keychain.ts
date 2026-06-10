/**
 * Run with: npx tsx src/server/insert-titanium-edc-keychain.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  await db.insert(products).values({
    id: 'wp-308-titanium-edc-keychain',
    sku: 'WP-308',
    name: 'Titanium EDC Keychain',
    tagline: 'Titanium frame. Brass core. Key or bag carry.',
    category: 'EDC Accessories',
    materials: ['Titanium Alloy', 'Brass Locking Core'],
    moq: 100,
    sortOrder: 122,
    active: true,
    heroImage: '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-cover.avif',
    images: [
      '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-cover.avif',
      '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-hover.avif',
      '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-detail-1.avif',
      '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-detail-2.avif',
      '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-detail-3.avif',
      '/products/WP-308-Titanium-EDC-keychain/Titanium-EDC-keychain-lifestyle.avif',
    ],
    highlights: [
      'Titanium Body, Brass Core: Grade-5 titanium alloy frame with a precision brass locking pivot. Two materials, one carry piece — both laser-engravable, each with a distinct marking aesthetic.',
      'Bottle Opener Built In: The gate profile doubles as a standard crown-cap bottle opener. A function that earns its place in the pocket without needing to be explained.',
      'One-Handed Quick Release: Spring-loaded gate opens with a single thumb press. Attaches to key rings, bag D-rings, or belt loops in under two seconds — and stays there.',
    ],
    customizationOptions: [
      'Laser Engraving on Titanium Body',
      'Color Laser Marking (Gold / Blue / Purple)',
      'Individual Kraft Sleeve Packaging',
    ],
    description:
      'A titanium alloy EDC keychain with an integrated bottle opener and brass locking core. At 11g and 53mm long, it adds nothing noticeable to a key ring while giving the buyer a compact metal carry item with a clear logo surface.\n\nThe spring-loaded gate opens one-handed: press the brass-core pivot, attach it to a key ring, bag loop, or belt ring, and release. The gate profile includes a crown-cap bottle opener as a secondary function.\n\nTitanium and brass are each laser-engravable, each with different aesthetics. The titanium body supports iridescent color marking — gold, blue, or purple tones via thin-film interference, no coatings, nothing to chip. The brass pivot accepts a warm-contrast matte mark. A carry piece where the brand appears across two metal types, two surface textures, and two marking techniques.',
    specifications: [
      { label: 'Material', value: 'Titanium alloy body + brass locking core' },
      { label: 'Dimensions', value: '53 × 26 × 5 mm' },
      { label: 'Weight', value: '~11 g' },
      { label: 'Primary function', value: 'Keychain / clip-on carry attachment' },
      { label: 'Secondary function', value: 'Crown-cap bottle opener' },
      { label: 'Gate mechanism', value: 'Spring-loaded push-to-open with brass pivot' },
      { label: 'Customization', value: 'Laser engraving on titanium body (standard or color marking)' },
      { label: 'MOQ', value: '100 pcs' },
    ],
    faqs: [
      {
        q: 'Is this load-bearing hardware?',
        a: 'No. This is a precision EDC keychain accessory, not a climbing or load-bearing tool. It is designed for key rings, bag attachment points, and belt loops only.',
      },
      {
        q: 'What engraving options are available?',
        a: 'The titanium body accepts standard laser marking (matte pale-grey on titanium surface) and iridescent color marking — gold, blue, or purple tones via thin-film interference. No paint or coating: the color is created by controlled oxidation of the titanium surface and will not chip or wear off. The brass pivot area can also carry a softer warm-contrast mark.',
      },
      {
        q: 'Does the bottle opener work on any bottle?',
        a: 'Yes — the gate cutout is a standard crown-cap opener compatible with most glass-bottle caps.',
      },
      {
        q: 'What is the minimum order quantity?',
        a: 'Our standard minimum for this product is 100 pieces. For specific quantities outside this range, contact us and we will advise.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Why titanium over aluminum for a keychain',
        body: 'Aluminum keychains are common at this price bracket. Titanium costs more per kilo but carries differently: no anodized layer to chip, no surface that ages poorly, and no weight penalty for durability. A titanium keychain keeps the material story visible through long-term carry.',
      },
      {
        title: 'The bottle opener as an interaction driver',
        body: 'The bottle opener is a secondary function built into the keychain body. It gives the object one more active-use moment while keeping the primary role clear: keys, bags, and daily carry.',
      },
      {
        title: 'Dual-metal laser engraving: what\'s possible',
        body: 'Titanium accepts iridescent color laser marking — a technique that creates gold, blue, or purple tones via thin-film interference rather than paint. No coatings, nothing to chip: the color is part of the metal surface itself. The brass core pivot can carry a softer warm-contrast matte mark. A corporate keychain where the brand appears across two different metal materials, two surface textures, and two distinct marking aesthetics is genuinely unusual at any order quantity.',
      },
      {
        title: 'Sizing for gifting',
        body: 'At 53mm, this keychain sits on a key ring without dominating it. The 5mm profile slides in and out of pockets without catching on fabric or other carry items. Size decisions matter in corporate gifting because a carry item needs to stay small enough for daily use.',
      },
      {
        title: 'Pairing with The Morning Ritual set',
        body: 'As the third component in The Morning Ritual set (WGS-005), this keychain completes a two-titanium-one-brass material story alongside the pure titanium capsule bottle and the brass bolt-action pen. Each piece has a distinct primary use: the bottle carries liquid, the keychain carries keys, and the pen stays on the desk.',
      },
    ],
    seoKeywords: [
      'custom titanium keychain corporate gift',
      'titanium EDC keychain bulk order',
      'keychain with bottle opener corporate',
      'branded titanium keychain engraved',
      'metal EDC keychain wholesale',
    ],
  })

  console.log('✓ WP-308 Titanium EDC Keychain inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

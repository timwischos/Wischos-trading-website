/**
 * Run with: npx tsx src/server/insert-wp309-slim-push-business-card-case.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-309-slim-push-stainless-steel-business-card-case'
const PREFIX = 'slim-push-stainless-steel-business-card-case'

async function main() {
  await db.insert(products).values({
    id: 'wp-309-slim-push-stainless-steel-business-card-case',
    sku: 'WP-309',
    name: 'Slim Push Stainless Steel Business Card Case',
    tagline: 'Brushed stainless steel | Thumb-push slide | 13-18 business cards | Laser engravable',
    metaDescription: 'Engraved stainless steel business card case with a thumb-push slide mechanism, brushed finish, and compact capacity for corporate gifting programs.',
    quickAnswer: 'Slim Push Stainless Steel Business Card Case is an engraved metal card holder made from brushed stainless steel, using a thumb-push slide mechanism to present one business card without opening a hinged lid.',
    category: 'EDC Accessories',
    materials: ['Brushed stainless steel'],
    moq: 100,
    sortOrder: 123,
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
    description: 'A slim stainless steel business card case built around a thumb-push slide mechanism. Instead of opening a hinged lid, the user presses and slides from the back to present a card from the front edge. The movement is short, controlled, and suitable for trade shows, reception desks, client meetings, and other high-frequency exchange settings.\n\nThe brushed stainless steel body gives the case a clean metal surface for corporate logo engraving while resisting everyday fingerprints and light handling marks better than polished steel. At approximately 10.3 × 6.0cm and about 80g, it fits a jacket pocket, briefcase pocket, or desk drawer without the bulk of a wallet.\n\nCapacity is best stated as 13-18 standard business cards because paper thickness varies by market and print method. The same format can also hold selected cards such as ID cards, credit cards, or access cards when the buyer wants a compact branded metal carry item for client-facing teams.',
    highlights: [
      'Thumb-push card access - presents a card from the front edge without opening a hinged lid',
      'Brushed stainless steel body - gives the case a clean metal surface with better fingerprint resistance than mirror polish',
      'Compact carry size - approx. 10.3 × 6.0cm and about 80g for jacket pockets, bags, and desk drawers',
      'Practical card capacity - typically holds 13-18 standard business cards, depending on paper thickness',
      'Engraving surface - flat stainless steel face supports laser engraving or screen printing for corporate logos',
      'Multi-card use - can carry business cards, selected ID cards, credit cards, or access cards when dimensions fit',
    ],
    specifications: [
      { label: 'Material', value: 'Brushed stainless steel' },
      { label: 'Dimensions', value: 'Approx. 10.3 × 6.0cm' },
      { label: 'Weight', value: 'Approx. 80g' },
      { label: 'Capacity', value: 'Typically 13-18 standard business cards, depending on paper thickness' },
      { label: 'Access Method', value: 'Thumb-push slide mechanism' },
      { label: 'Finish', value: 'Brushed steel' },
      { label: 'Branding Method', value: 'Laser engraving / screen printing' },
      { label: 'Source Model', value: 'MP-D002' },
    ],
    customizationOptions: [
      'Laser engraving on the flat stainless steel face',
      'Screen printing for logo artwork that requires colour',
      'Custom insert card or paper sleeve, subject to packaging confirmation',
      'Custom gift box, subject to packaging confirmation',
    ],
    faqs: [
      { q: 'How many business cards does the case hold?', a: 'It typically holds 13-18 standard business cards. The exact capacity depends on paper thickness, coating, and whether the cards are embossed or laminated.' },
      { q: 'Does the case need to be opened before taking out a card?', a: 'No. The case uses a thumb-push slide mechanism, so a card can be presented from the front edge without opening a hinged lid.' },
      { q: 'Can the stainless steel surface be engraved with a company logo?', a: 'Yes. The flat brushed stainless steel surface supports laser engraving. Screen printing can also be considered when the artwork requires colour.' },
      { q: 'Can it be used for cards other than business cards?', a: 'Yes, if the card dimensions fit. It can carry selected ID cards, access cards, credit cards, or similar flat cards, but capacity will be lower for thicker plastic cards.' },
    ],
    sourcingNotes: [
      { title: 'Slide access changes the hand movement', body: 'Traditional business card cases require a lid-opening motion before the card is removed. A thumb-push case shortens the movement to press, slide, and present. For exhibition staff, sales teams, and client-facing roles, that access pattern is easier to understand than a purely decorative feature.' },
      { title: 'Brushed steel supports a clear corporate mark', body: 'Brushed stainless steel gives the logo area a directional grain and a cleaner everyday surface than mirror polish. Laser engraving works well on this format because the mark sits directly on a flat metal face and does not depend on a coating that can peel through handling.' },
      { title: 'Capacity should stay tied to card thickness', body: 'Business card stock varies widely across markets, from lighter cards to thicker coated or embossed cards. Stating capacity as 13-18 cards keeps the specification useful for buyers without overpromising the same count for every print format.' },
    ],
    comparisonTable: {
      columns: ['Card holder format', 'Best fit', 'Buyer note'],
      rows: [
        ['Thumb-push stainless steel case', 'Business card exchange and compact carry', 'Fast access without opening a lid'],
        ['Hinged business card case', 'Formal desk or meeting use', 'Familiar format with a larger opening movement'],
        ['Soft leather card sleeve', 'Flexible pocket carry', 'Softer hand feel but less rigid card protection'],
      ],
    },
    keyInsight: 'The strongest B2B use case is not storage volume; it is fast, controlled business card presentation in a compact engraved metal format.',
    seoKeywords: [
      'stainless steel business card case',
      'engraved business card holder',
      'custom metal business card holder',
      'corporate business card case gift',
      'brushed stainless steel card case',
      'slide business card holder',
      'logo engraved card case',
      'business card holder bulk order',
      'metal card holder corporate gift',
      'custom business card case with logo',
    ],
  })

  console.log('✓ WP-309 Slim Push Stainless Steel Business Card Case inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

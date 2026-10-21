/**
 * Run with: npx tsx src/server/insert-wp313-solid-brass-quick-release-swivel-keychain.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-313-solid-brass-quick-release-swivel-keychain'
const PREFIX = 'solid-brass-quick-release-swivel-keychain'

async function main() {
  await db.insert(products).values({
    id: 'wp-313-solid-brass-quick-release-swivel-keychain',
    sku: 'WP-313',
    name: 'Solid Brass Quick-Release Swivel Keychain',
    tagline: 'Solid brass | 360° swivel | Pip-engraved slide collar | Two 20mm rings',
    category: 'EDC Accessories',
    materials: ['Solid brass (body and key rings)', 'Stainless steel (detent balls)'],
    moq: 100,
    sortOrder: 135,
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
    metaDescription:
      'Engraved solid brass quick-release swivel keychain, pip-patterned slide collar, two 20mm brass rings. Custom metal corporate gift for EDC. Inquire for pricing.',
    quickAnswer:
      'The Solid Brass Quick-Release Swivel Keychain is a two-piece brass key connector, 33mm long and 10mm in diameter, with a pip-engraved slide collar, a 360° swivel, and two 20mm brass key rings, used to separate two key sets in one pull.',
    description:
      'A two-piece quick-release keychain connector in solid brass. A sliding collar with a machine-engraved dice-pip pattern gives a non-slip grip and locks and releases the halves, with stainless steel detent balls holding the lock. The joint rotates 360°, so two key sets do not twist together. Two 20mm brass split rings are supplied, one per end, so home keys, vehicle keys, or an EDC tool separate in one pull. Laser engraving applies short text or a compact logo, and the brass develops a patina with handling, making it an engraved custom metal corporate gift for EDC and key-carry programs.',
    highlights: [
      'Solid brass body and key rings — develops natural patina with daily handling',
      'Pip-engraved slide collar — push-pull release with a textured grip',
      '360° swivel joint — limits twisting between two key sets',
      'Stainless steel detent balls — hold the lock until the collar is slid',
      'Two 20mm brass split rings supplied — one for each end of the connector',
    ],
    customizationOptions: [
      'Laser engraving of short text or a compact logo on the brass (the body is 10mm in diameter), with placement confirmed against supplied artwork',
      'Custom packaging, subject to order quantity and confirmation',
    ],
    specifications: [
      { label: 'Material', value: 'Solid brass body and key rings; stainless steel detent balls' },
      { label: 'Dimensions (Body)', value: '33mm L × 10mm Ø' },
      { label: 'Dimensions (Overall)', value: '65mm L including both key rings' },
      { label: 'Key Rings', value: '2 × 20mm outer diameter, solid brass' },
      { label: 'Weight', value: '~16g per set' },
      { label: 'Mechanism', value: 'Slide-collar quick release with 360° swivel' },
      { label: 'Collar Pattern', value: 'Dice-pip pattern, machine engraved' },
      { label: 'Branding Method', value: 'Laser engraving' },
    ],
    faqs: [
      {
        q: 'How does the quick release work?',
        a: 'Slide the pip-engraved collar along the body to unlock the two halves, then pull them apart. Pushing the halves together and releasing the collar locks them again.',
      },
      {
        q: 'Can a company logo be engraved on the keychain?',
        a: 'Yes. Laser engraving applies short text or a compact logo directly to the brass, and the 10mm body diameter limits the mark size. Placement and artwork requirements are confirmed with the quotation.',
      },
      {
        q: 'Does the swivel prevent keys from tangling?',
        a: 'The 360° joint lets the two ends rotate independently, which limits twisting between key sets. It is a key-carry connector and is not rated for climbing or other load-bearing use.',
      },
      {
        q: 'Will the brass change colour over time?',
        a: 'Yes. Solid brass darkens and develops a patina with handling and exposure. The pattern differs from one unit to the next depending on use.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Detent-ball release suits two-set key carry',
        body: 'The collar slides to free the stainless steel detent balls and slides back to lock them, so the connector opens and closes without tools. Splitting a house set from a vehicle or work set is the most common use, and it is why the connector ships with a key ring on each end.',
      },
      {
        title: 'Brass adds hand weight to a small accessory',
        body: 'Brass has a density of about 8.5 g/cm³, compared with about 2.7 g/cm³ for aluminium, so a 33mm body registers in the hand and on a key bunch. The pip-engraved collar gives the moving part a textured surface, which suits EDC and desk-fidget gifting.',
      },
    ],
    comparisonTable: {
      columns: ['Key attachment', 'Best fit', 'Buyer note'],
      rows: [
        ['Brass slide-collar swivel connector', 'Two key sets or an EDC tool that need to separate quickly', 'Push-pull release, 360° swivel, laser engravable'],
        ['Standard split ring', 'One fixed key set', 'No release or swivel'],
        ['Fixed swivel clip', 'Single set carried on a belt or bag', 'Rotates, but does not separate into two halves'],
      ],
    },
    keyInsight:
      'The strongest B2B use case is a compact brass accessory for EDC gift sets and key-carry programs, where a mechanical quick-release and a laser-engraved logo fit into a lightweight gift component.',
    seoKeywords: [
      'solid brass quick release keychain',
      'EDC quick release keychain',
      'brass swivel key connector',
      'engraved brass swivel keychain',
      'custom brass EDC keychain',
      'brass dice keychain',
      'quick release key connector',
      'corporate EDC gift',
      'custom metal corporate gift',
      'engraved brass keychain',
      'brass key ring set',
      'brass fidget keychain',
    ],
  })

  console.log('✓ WP-313 Solid Brass Quick-Release Swivel Keychain inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

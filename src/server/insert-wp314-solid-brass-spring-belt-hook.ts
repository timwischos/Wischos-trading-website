/**
 * Run with: npx tsx src/server/insert-wp314-solid-brass-spring-belt-hook.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-314-solid-brass-spring-belt-hook'
const PREFIX = 'solid-brass-spring-belt-hook'

async function main() {
  await db.insert(products).values({
    id: 'wp-314-solid-brass-spring-belt-hook',
    sku: 'WP-314',
    name: 'Solid Brass Spring Belt Hook',
    tagline: 'Solid brass | Stainless steel spring | 54 × 26 × 4mm | 14g',
    category: 'EDC Accessories',
    materials: ['Solid brass (body)', 'Stainless steel (spring)'],
    moq: 100,
    sortOrder: 136,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    metaDescription:
      'Solid brass spring belt hook, stainless steel spring, 54mm, 14g. Custom metal corporate gift for EDC and key-carry programs. Inquire for pricing.',
    quickAnswer:
      'The Solid Brass Spring Belt Hook is a solid brass snap hook measuring 54 × 26 × 4mm and weighing about 14g, with a stainless steel spring gate and a 14 × 8mm opening for key rings, leather straps, or lanyard cords, used for belt-loop and key carry.',
    description:
      'A snap-type belt hook made from solid brass, precision machined and stamped, with a stainless steel spring gate that returns the hook to closed after each press. The body measures 54 × 26 × 4mm and weighs about 14g, a slim profile that sits close to a belt without adding bulk. A 14 × 8mm opening takes a key ring, leather strap, or lanyard cord. The brass is uncoated and develops a patina with handling, and a company logo can be marked on the brass. It is a custom metal corporate gift for key-carry and EDC programs.',
    highlights: [
      'Solid brass body — uncoated, develops natural patina with handling',
      'Stainless steel spring — holds spring return where plain brass would not',
      'Slim 4mm profile at 14g — sits flat on a belt or bag strap',
      '14 × 8mm opening — fits key rings, leather straps, and lanyard cords',
      'Logo marking available — method and placement confirmed with the quotation',
    ],
    customizationOptions: [
      'Logo or text marking on the brass; method and placement confirmed against supplied artwork with the quotation',
      'Custom packaging, subject to order quantity and confirmation',
    ],
    specifications: [
      { label: 'Material', value: 'Solid brass body; stainless steel spring' },
      { label: 'Dimensions', value: '54mm L × 26mm W × 4mm T' },
      { label: 'Attachment Slot', value: '14mm × 8mm' },
      { label: 'Weight', value: '~14g' },
      { label: 'Process', value: 'Precision machining and stamping' },
      { label: 'Surface Finish', value: 'Natural brass, uncoated' },
      { label: 'Branding Method', value: 'Logo marking; method and placement confirmed with the quotation' },
    ],
    faqs: [
      {
        q: 'Is this a climbing carabiner?',
        a: 'No. It is a key-and-belt-carry hook and is not rated for climbing, rigging, or other load-bearing use.',
      },
      {
        q: 'Why does the hook use a stainless steel spring?',
        a: 'Solid brass has limited spring elasticity. The stainless steel spring supplies the return force, so the gate keeps snapping back after repeated use, while the brass body supplies the weight and finish.',
      },
      {
        q: 'Can a company logo be marked on the hook?',
        a: 'Logo marking on the brass is available. The marking method, placement, and artwork requirements are confirmed with the quotation.',
      },
      {
        q: 'Are material compliance documents available?',
        a: 'Alloy details and material declarations, such as a factory SVHC statement, are available on request for EU and other regulated markets.',
      },
    ],
    sourcingNotes: [
      {
        title: 'A stainless spring inside a brass body',
        body: 'Brass is chosen for weight, finish, and how it ages, but it offers limited spring elasticity. Pairing it with a stainless steel spring puts the elasticity in the part that needs it.',
      },
      {
        title: 'Opening size sets what the hook pairs with',
        body: 'The 14 × 8mm opening takes a standard key ring, a leather strap, or a lanyard cord. That makes the hook a connector for other items in a set, such as a key organizer or a leather fob, as well as a stand-alone belt accessory.',
      },
    ],
    comparisonTable: {
      columns: ['Key attachment', 'Best fit', 'Buyer note'],
      rows: [
        ['Solid brass spring belt hook', 'Belt-loop or bag-strap key carry', 'Stainless spring, uncoated brass, logo marking available'],
        ['Plain split ring', 'Fixed key set', 'No gate; keys are not detachable from a belt'],
        ['Steel wire clip', 'Light key sets', 'Lower material weight; plated or bare steel finish'],
      ],
    },
    keyInsight:
      'The strongest B2B use case is a low-weight brass key-carry accessory for corporate EDC gift sets, where the stainless spring gives it daily function and the uncoated brass gives it a visible material story.',
    seoKeywords: [
      'solid brass belt hook',
      'engraved brass carabiner keychain',
      'custom brass belt clip',
      'brass snap hook keychain',
      'EDC key hook',
      'EDC belt loop hook',
      'custom metal corporate gift',
      'corporate EDC gift',
      'engraved brass keychain',
      'brass spring clip',
      'stainless spring brass hook',
    ],
  })

  console.log('✓ WP-314 Solid Brass Spring Belt Hook inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

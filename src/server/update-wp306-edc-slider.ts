/**
 * Replace WP-306 nail clipper with Precision Dual-Action Metal EDC Slider.
 * Run with: npx tsx src/server/update-wp306-edc-slider.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const SLUG = 'precision-dual-action-metal-edc-slider'
const OLD_ID = 'wp-306-executive-zinc-alloy-nail-clipper'
const NEW_ID = `wp-306-${SLUG}`
const IMG_BASE = `/products/WP-306-${SLUG}`

async function main() {
  await db
    .update(products)
    .set({
      id: NEW_ID,
      sku: 'WP-306',
      name: 'Precision Dual-Action Metal EDC Slider',
      tagline: 'Zinc alloy | 55 × 24 × 15.3mm | 88g | Audible detents',
      category: 'EDC Accessories',
      description: `A compact zinc alloy EDC slider built around a two-part mechanical body. Each push moves the plates through distinct detents, producing stepped resistance and an audible click. The 55 × 24 × 15.3mm body weighs approximately 88g, giving it concentrated hand weight without taking up much desk or bag space.

A flat upper panel provides a controlled area for an engraved company mark. The format suits creative-team gifts, design-led client programs, and EDC sets where repeated hand interaction is part of the brief.`,
      heroImage: `${IMG_BASE}/${SLUG}-cover.avif`,
      images: [
        `${IMG_BASE}/${SLUG}-cover.avif`,
        `${IMG_BASE}/${SLUG}-hover.avif`,
        `${IMG_BASE}/${SLUG}-lifestyle.avif`,
        `${IMG_BASE}/${SLUG}-detail-1.avif`,
        `${IMG_BASE}/${SLUG}-detail-2.avif`,
        `${IMG_BASE}/${SLUG}-detail-3.avif`,
      ],
      moq: 100,
      highlights: [
        'Stepped slide feedback — distinct tactile detents through each push',
        'Audible mechanical response — a clear click accompanies the sliding action',
        'Compact 88g body — concentrated hand weight in a 55 × 24 × 15.3mm format',
        'Flat logo face — broad upper panel for a restrained engraved company mark',
        'Two finish options — black or titanium silver by current production specification',
      ],
      materials: [
        'Zinc alloy body',
        'Internal steel balls and spring component',
      ],
      specifications: [
        { label: 'Material', value: 'Zinc alloy body' },
        { label: 'Dimensions', value: '55 × 24 × 15.3mm' },
        { label: 'Net Weight', value: 'Approx. 88g' },
        { label: 'Mechanism', value: 'Two-part mechanical slide with stepped tactile feedback' },
        { label: 'Sound Profile', value: 'Audible click during operation' },
        { label: 'Finish Options', value: 'Black / titanium silver' },
        { label: 'Carry Detail', value: 'Lanyard attachment point on current sample' },
        { label: 'Branding Method', value: 'Laser engraving on flat upper panel' },
      ],
      customizationOptions: [
        'Laser engraving on the flat upper panel, subject to sample proof',
        'Black or titanium-silver finish selection',
        'Custom surface artwork or pattern, subject to tooling and production review',
        'Custom EVA zip case or rigid gift box, subject to packaging confirmation',
      ],
      faqs: [
        {
          q: 'Is the slider silent enough for every office?',
          a: 'No. The stepped mechanism produces an audible click during use. It fits private offices, creative studios, break areas, and informal desk settings better than quiet meeting rooms, training sessions, or sound-sensitive open offices.',
        },
        {
          q: 'Can the flat surface carry a company logo?',
          a: 'Yes. The broad upper panel is suitable for a restrained laser-engraved logo or short text. Final artwork should be checked against the selected finish, engraving contrast, and available marking area before production.',
        },
        {
          q: 'How large and heavy is the slider?',
          a: 'The current product specification is 55 × 24 × 15.3mm and approximately 88g. It is compact enough for a desk drawer, pouch, or bag, with more concentrated hand weight than a similarly sized aluminium accessory.',
        },
        {
          q: 'Which corporate gift programs suit this product?',
          a: 'It fits creative, engineering, technology, and design-led programs where tactile interaction supports the gift concept. For universal onboarding, formal boardroom, or field-tool programs, a pen, device stand, or practical carry tool is usually a broader fit.',
        },
      ],
      sourcingNotes: [
        {
          title: 'Sound is part of the product specification',
          body: 'The click is central to the interaction, so it should be evaluated alongside material, weight, and finish. Buyers planning quiet offices, seminars, or shared training environments should treat the audible response as a selection factor rather than a secondary detail.',
        },
        {
          title: 'Compact dimensions do not mean lightweight carry',
          body: 'At approximately 88g in a 55 × 24 × 15.3mm body, the slider has concentrated hand weight. That density supports tactile desk use and short carry in a pouch or bag, while buyers looking for light pocket carry may prefer an aluminium accessory.',
        },
        {
          title: 'The flat face supports restrained corporate marking',
          body: 'The upper panel gives a company logo a clear marking zone without placing artwork across the moving edges. A small engraved mark suits the object better than full-surface campaign graphics and keeps the sliding form visually legible.',
        },
      ],
      comparisonTable: {
        columns: ['Tactile object', 'Best fit', 'Buyer note'],
        rows: [
          ['Mechanical EDC slider', 'Creative teams, design-led client gifts, and desk interaction', 'Repeated hand movement with an audible response'],
          ['Brass spinning top', 'Executive desk sets and shared desk interaction', 'Visual movement but requires a flat surface'],
          ['Compact utility tool', 'Field, operations, and practical carry programs', 'Clear task function with less emphasis on tactile interaction'],
        ],
      },
      keyInsight: 'The product earns its place in a corporate gift program through repeated tactile interaction, not task utility, so it fits creative and design-led audiences better than universal employee distribution.',
      metaDescription: 'Engraved zinc alloy EDC slider with stepped tactile feedback, audible clicks, an 88g body, and black or titanium-silver finishes for corporate gifts.',
      quickAnswer: 'Precision Dual-Action Metal EDC Slider is a compact tactile desk and carry object with a two-part sliding body, stepped resistance, audible feedback, an approximately 88g hand weight, and a flat face for company logo engraving.',
      seoKeywords: [
        'metal EDC slider',
        'mechanical EDC slider',
        'zinc alloy fidget slider',
        'haptic slider corporate gift',
        'engraved metal fidget slider',
        'custom logo EDC slider',
        'tactile desk gift',
        'corporate desk fidget',
        'compact metal slider',
        'creative team corporate gift',
      ],
      sortOrder: 170,
      active: true,
    })
    .where(eq(products.id, OLD_ID))

  console.log(`Updated: ${OLD_ID} → ${NEW_ID}`)
  await sql.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/insert-wp408-titanium-tea-infuser-business-cup.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const FOLDER = 'WP-408-titanium-tea-infuser-business-cup'
const PREFIX = 'titanium-tea-infuser-business-cup'

async function main() {
  await db.insert(products).values({
    id: 'wp-408-titanium-tea-infuser-business-cup',
    sku: 'WP-408',
    name: 'Titanium Tea Infuser Business Cup',
    tagline: 'Warm drinks stay close at hand.',
    metaDescription: 'Titanium Tea Infuser Business Cup with pure titanium liner, pure titanium infuser, 480ml capacity, vacuum structure, and engraved logo options for corporate gift sets.',
    quickAnswer: 'The Titanium Tea Infuser Business Cup is a 480ml office drinkware piece with a pure titanium inner liner and removable pure titanium infuser. It works for tea, warm water, coffee, and meeting-room use in custom metal corporate gift set programs.',
    category: 'Drinkware',
    materials: [
      'Pure titanium inner liner',
      'Pure titanium removable infuser',
      'Titanium-gold exterior shell',
      'PP screw lid',
    ],
    moq: 100,
    sortOrder: 280,
    active: true,
    heroImage: `/products/${FOLDER}/${PREFIX}-cover.avif`,
    images: [
      `/products/${FOLDER}/${PREFIX}-cover.avif`,
      `/products/${FOLDER}/${PREFIX}-hover.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
      `/products/${FOLDER}/${PREFIX}-detail-4.avif`,
      `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
    ],
    description: 'A 480ml business cup for office desks, meeting rooms, and executive wellness gift sets. The drinking chamber uses a pure titanium inner liner, and the removable infuser is also pure titanium, supporting loose-leaf tea when needed without making the cup tea-only.\n\nThe double-wall vacuum structure helps reduce heat transfer to the outer surface during daily desk use. A PP screw lid supports covered carry between desks and meeting rooms. The titanium-gold exterior gives the cup a formal business presence for engraved logo programs, employee wellness kits, and WGS-008 reference configurations.',
    highlights: [
      'Pure titanium liner: Direct food-contact surface for tea, coffee, and warm water',
      'Removable pure titanium infuser: Loose-leaf tea support when the user wants it',
      '480ml desk capacity: Sized for meetings, focused work sessions, and daily warm drinks',
      'Double-wall vacuum structure: Helps reduce heat transfer to the outer surface',
      'Engraved business finish: Titanium-gold exterior for executive and wellness gift contexts',
    ],
    specifications: [
      { label: 'Material', value: 'Pure titanium inner liner and infuser, titanium-gold exterior shell, PP screw lid' },
      { label: 'Capacity', value: '480ml' },
      { label: 'Height', value: 'Approx. 210mm' },
      { label: 'Diameter', value: 'Approx. 65mm' },
      { label: 'Weight', value: 'Approx. 180g' },
      { label: 'Construction', value: 'Double-wall vacuum' },
      { label: 'Functions', value: 'Insulation, anti-scald handling, optional tea separation' },
      { label: 'Branding Method', value: 'Laser engraving, screen printing' },
    ],
    customizationOptions: [
      'Laser engraving on the exterior surface for company logos or names',
      'Screen printing for text marks or multi-colour artwork',
      'Gift set configuration reference for WGS-008 executive workday programs',
    ],
    faqs: [
      { q: 'What is the Titanium Tea Infuser Business Cup?', a: 'It is a 480ml office cup with a pure titanium inner liner, removable pure titanium infuser, double-wall vacuum structure, PP screw lid, and titanium-gold exterior for business gifting.' },
      { q: 'Does the cup have to be used with the infuser?', a: 'No. The infuser is removable, so the cup can be used with or without the filter depending on the drink.' },
      { q: 'Which parts are pure titanium?', a: 'The inner liner and removable infuser are pure titanium. These are the main food-contact components for drinks and tea leaves.' },
      { q: 'What is the outer shell material?', a: 'The exterior is a titanium-gold finish. The product combines a formal titanium-gold exterior with pure titanium food-contact components inside.' },
    ],
    sourcingNotes: [
      { title: 'Pure titanium food-contact system', body: 'The inner liner and removable infuser are the parts that contact drinks and tea leaves. Using pure titanium for both gives the cup a clear material story for warm water, coffee, and tea without relying on coatings inside the drinking chamber.' },
      { title: 'Removable infuser, broader daily use', body: 'The removable filter lets procurement teams position WP-408 for different recipient habits without changing the product itself: tea drinkers can use loose leaves, while other users can keep it as a covered office cup.' },
    ],
    comparisonTable: {
      columns: ['Feature', 'WP-408 Titanium Tea Infuser Business Cup', 'Standard Office Tumbler'],
      rows: [
        ['Drink format', 'Warm water, coffee, and loose-leaf tea with removable infuser', 'General coffee or water use'],
        ['Food-contact materials', 'Pure titanium liner and pure titanium infuser', 'Commonly stainless steel or coated interior'],
        ['Desk use', '480ml covered cup for office desks and meeting rooms', 'Varies by cup shape and lid design'],
        ['Branding surface', 'Titanium-gold exterior for engraving or print', 'Depends on coating and cup geometry'],
        ['Gift set role', 'WGS-008 drinkware component reference', 'Standalone drinkware item'],
      ],
    },
    keyInsight: 'WP-408 is strongest as a 480ml business cup with pure titanium food-contact components and an optional infuser, giving buyers both daily office drinkware and tea functionality in one branded gift item.',
    seoKeywords: [
      'titanium tea infuser business cup',
      'custom titanium tea cup corporate gift',
      'engraved office cup with infuser',
      'pure titanium liner cup',
      'pure titanium infuser cup',
      '480ml office cup',
      'corporate gift drinkware',
      'executive wellness gift drinkware',
      'custom metal corporate gift drinkware',
      'branded business cup',
      'titanium gold office cup',
      'office cup with removable infuser',
      'loose leaf tea cup corporate gift',
      'custom logo office cup bulk inquiry',
    ],
  })

  console.log('✓ WP-408 Titanium Tea Infuser Business Cup inserted.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

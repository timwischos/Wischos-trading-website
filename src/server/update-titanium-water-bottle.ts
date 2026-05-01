/**
 * Run with: npx tsx src/server/update-titanium-water-bottle.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

async function main() {
  await db
    .update(products)
    .set({
      name: 'Pure Titanium Vacuum Insulated Bottle',
      tagline: 'Pure titanium liner | Outdoor-ready carry handle | 500 / 600 / 750ml | Double-wall vacuum',
      highlights: [
        'Pure titanium liner - clean drinking surface for water, tea, or coffee without an inner coating',
        'Outdoor-ready carry handle - built-in loop for hand carry, bag attachment, or field kit use',
        '316 stainless steel shell - durable exterior for travel, job sites, and active workdays',
        'Double-wall vacuum format - insulated drink carry for commute, field, and wellness programs',
        'Capacity options - 500ml, 600ml, or 750ml by selected model',
      ],
      description:
        'A vacuum insulated bottle built for corporate programs where the gift needs to move beyond the desk. The pure titanium liner creates a clean drinking surface for water, tea, or coffee, while the 316 stainless steel outer shell gives the bottle a durable structure for commute, field, travel, and outdoor brand use.\n\nThe built-in carry handle is the visual and functional signal of this product: it is made for active workdays, employee wellness kits, field team gifts, outdoor campaigns, and branded travel sets. It can still sit on a desk, but its strongest role is as a premium bottle recipients carry between work, transit, and outdoor contexts.',
      specifications: [
        { label: 'Capacity Options',   value: '500ml / 600ml / 750ml' },
        { label: 'Height (500ml)',     value: '190mm' },
        { label: 'Height (600ml)',     value: '220mm' },
        { label: 'Height (750ml)',     value: '255mm' },
        { label: 'Body Diameter',      value: '70mm' },
        { label: 'Lid Diameter',       value: '55mm' },
        { label: 'Net Weight (500ml)', value: '~120g' },
        { label: 'Net Weight (600ml)', value: '~132g' },
        { label: 'Net Weight (750ml)', value: '~145g' },
        { label: 'Liner Material',     value: 'Pure Titanium (no coating, no inner shell)' },
        { label: 'Shell Material',     value: '316 Stainless Steel' },
        { label: 'Insulation',         value: 'Double-wall vacuum' },
        { label: 'Handle',             value: 'Integrated carry handle' },
        { label: 'Finish Options',     value: 'Industrial Sandblasted / Structural Crystal' },
      ],
      faqs: [
        {
          q: 'What gift programs does this bottle fit best?',
          a: 'It fits employee wellness kits, outdoor brand campaigns, field team gifts, travel programs, logistics and construction audiences, and premium drinkware sets where recipients are expected to carry the bottle through the day.',
        },
        {
          q: 'What does the titanium liner do?',
          a: 'The titanium liner is the drinking surface inside the bottle. It gives the product a clearer material story than standard stainless-only drinkware and supports use with water, tea, or coffee without relying on an inner coating.',
        },
        {
          q: 'What customization options are available for corporate branding?',
          a: 'Logo marking can be applied to the bottle body by laser marking or printing depending on the selected finish, artwork, and colour requirements.',
        },
        {
          q: 'Is this an executive desk bottle or an outdoor bottle?',
          a: 'It is better positioned as outdoor-ready premium drinkware rather than a boardroom desk item. The handle, finish, and lifestyle imagery make it strongest for travel, field, wellness, and active workday programs.',
        },
      ],
      seoKeywords: [
        // Core product terms
        'titanium water bottle',
        'pure titanium vacuum bottle',
        'titanium insulated bottle',
        // B2B / corporate gifting
        'corporate water bottle bulk order',
        'custom logo titanium bottle',
        'branded outdoor water bottle',
        'employee wellness bottle gift',
        // Material / craft
        'titanium liner bottle',
        '316 stainless steel exterior',
        'sandblasted titanium bottle',
        'titanium bottle with carry handle',
        // Use-case long-tail
        'field team water bottle gift',
        'outdoor corporate drinkware',
        'premium travel bottle with logo',
        'custom titanium bottle for outdoor brands',
      ],
      quickAnswer:
        'Pure Titanium Vacuum Insulated Bottle is an outdoor-ready corporate drinkware item with a pure titanium liner, 316 stainless steel shell, integrated carry handle, and logo marking options for field, travel, wellness, and active workday gift programs.',
      metaDescription:
        'Custom titanium vacuum bottle for outdoor-ready corporate gifting, with pure titanium liner, 316 stainless shell, integrated carry handle, insulation, and logo marking.',
      keyInsight:
        'WP-401 is strongest as premium outdoor-ready drinkware for active workdays, field teams, travel, wellness, and outdoor brand programs rather than as a boardroom desk bottle.',
      sourcingNotes: [
        {
          title: 'Outdoor-ready positioning',
          body: 'The carry handle, bottle silhouette, and lifestyle imagery point toward travel, field, wellness, and outdoor use. Positioning it as an executive boardroom item would fight the product signals.',
        },
        {
          title: 'Titanium liner as the material story',
          body: 'The liner is the surface that touches the drink. Using titanium there gives the material story a functional role rather than making titanium only a decorative claim.',
        },
        {
          title: 'Best-fit gift programs',
          body: 'This bottle fits field teams, outdoor brands, logistics, construction, employee wellness, and travel programs where daily carry is part of the recipient context.',
        },
      ],
    })
    .where(eq(products.id, 'wp-401-pure-titanium-vacuum-insulated-bottle'))

  console.log('✓ Titanium Water Bottle updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Run with: npx tsx src/server/update-wp213-desk-organiser-use.ts
 *
 * Adds dual-use desk organiser angle to WP-213 Solid Brass Tealight Holder.
 * The Ø60mm recessed top holds paperclips, binder clips, and small office
 * items — making it a daily-use desk object even when no candle is present.
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
      metaDescription:
        'Solid brass tealight holder, Ø60mm, 295g, lathe-turned. Recessed top doubles as a desk organiser for paperclips and small office items. Laser-engravable on barrel or base. Corporate Q4 gifts. MOQ 100.',

      quickAnswer:
        'The Solid Brass Tealight Holder is a 295g solid brass cylinder (Ø60mm × 25mm, lathe-turned) that holds a standard 38–40mm tealight. The recessed top also functions as a desk organiser for paperclips, binder clips, and small office items. Laser-engravable on the barrel or base. Positioned for Q4 corporate appreciation gifts, wellness desk programs, and curated desk sets. MOQ 100 units.',

      description:
        'The Solid Brass Tealight Holder is a 295g solid brass cylinder, lathe-turned with a brushed surface texture. At 60mm diameter and 25mm height, it holds a standard 38–40mm tealight candle and sits stably on a desk, shelf, or table without a base plate or tray. The recessed top accepts a standard tealight directly — no insert required.\n\nThe Ø60mm opening also functions as a desk organiser for small office items — paperclips, binder clips, rubber bands, or push pins. The 295g base keeps the holder stationary without a non-slip pad. Recipients who do not use candles at their desk will use the holder as a small-parts organiser, keeping the branded object in daily active use rather than in a drawer.\n\nThe weight — 295g — comes entirely from solid brass. For year-end client gifting, wellness-theme desk programs, and Q4 appreciation gifts, the holder provides a branded object that occupies visible space on a desk. Laser engraving is available on the cylindrical barrel or the flat base. Suitable for individual gifting or pairing with desk drinkware and writing instruments in a curated desk set.',

      highlights: [
        '295g solid brass — the weight is from material, not ballast; communicates quality before the candle is lit',
        'Ø60mm × 25mm — accepts standard 38–40mm tealights directly, no insert required',
        'Recessed top doubles as a desk organiser — holds paperclips, binder clips, and small office items in daily use',
        'Lathe-turned brushed texture — machined surface detail, develops natural brass patina',
        'Laser engraving on barrel or base — logo, name, or short text, permanent',
        'Stable flat base — sits without rubber foot or tray on wood, glass, and stone surfaces',
      ],

      faqs: [
        {
          q: 'Can this be used as a desk organiser rather than a candle holder?',
          a: 'Yes. The Ø60mm recessed top holds paperclips, binder clips, rubber bands, or small stationery items securely. The 295g brass base keeps it stationary on a desk without a non-slip pad. Recipients who do not use candles at their desk will use the holder as a small-parts organiser — the branded object stays in daily active use rather than stored away.',
        },
        {
          q: 'What tealight size fits this holder?',
          a: 'Standard tealights, 38–40mm diameter. This is the most common tealight size sold in supermarkets and catering suppliers. No insert or adapter is needed.',
        },
        {
          q: 'Is this suitable for executive desk gifting?',
          a: 'It suits wellness-theme desk programs and Q4 appreciation gifts well. For recipients in fixed office locations — private offices or home desks — the holder is a practical object that stays visible when in use. The dual-use as a desk organiser extends its utility beyond candle use.',
        },
        {
          q: 'Should the engraving go on the barrel or the base?',
          a: 'Barrel engraving keeps the brand mark visible when the holder is in use. Base engraving is less visible during use but cleaner aesthetically on the visible surface. For corporate gifting programs, barrel placement is more common.',
        },
      ],

      keyInsight:
        'At 295g solid brass and Ø60mm, this holder serves two desk roles: tealight holder for Q4 wellness gifting programs, and small-parts organiser (paperclips, binder clips) for daily desk use. Laser-engravable on barrel or base.',
    })
    .where(eq(products.id, 'wp-213-solid-brass-tealight-holder'))

  console.log('✓ WP-213 updated with desk organiser dual-use copy.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

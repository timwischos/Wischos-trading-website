/**
 * Run with: npx tsx src/server/update-metal-bookmark.ts
 * Updates the Precision Custom Metal Bookmark — values marker repositioning.
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
      name: 'Precision Custom Metal Bookmark',
      tagline: 'Laser-engraved metal that marks pages — and keeps your brand visible.',
      highlights: [
        'Desk-Visible Brand Placement: Standing in a book on the desk, the engraved face sits at eye level throughout the working day — functioning as a nameplate, a values statement, or a logo mark that no paper insert can match in permanence or material presence.',
        'Permanent Brand Integration: Logos and text are precision-etched or laser-cut directly into the metal substrate — they never fade, peel, or wear away. The brand mark outlasts the books it marks.',
        'Full Profile Customisation: Dimensions and silhouettes can be cut to match your corporate visual identity — standard rectangular or fully custom shape.',
      ],
      description:
        'Note: Product images show samples featuring Wischos branding for illustration purposes. All bulk orders are produced with your company\'s logo, name, or custom design — no Wischos branding will appear on delivered products.\n\nA metal bookmark does two things a paper one cannot: it marks a page permanently, and it holds its shape on a desk. Standing in a closed book, the engraved face is visible — your logo, a company value, a single word. It functions as a nameplate without needing a stand, a holder, or any surface space of its own.\n\nBrass and stainless steel are both laser-engravable and etch-ready. The substantial weight holds position in heavy document files and hardcover books without slipping. Through precision chemical etching and laser-cutting, complex logos and fine text are permanently integrated into the metal surface — crisp, tactile, and resistant to years of handling.',
      specifications: [
        { label: 'Material Options', value: 'Brass / Stainless Steel / Zinc Alloy' },
        { label: 'Standard Weight', value: '~20g' },
        { label: 'Size Range', value: '120mm – 150mm (Fully customizable profile)' },
        { label: 'Processing', value: 'Chemical Etching / Laser Cutting / Electroplating' },
        { label: 'Finish Options', value: 'Mirror Polished / Matte Tumbled' },
      ],
      faqs: [
        {
          q: 'The product image shows a branded bookmark — will our order look like that?',
          a: 'The images show sample bookmarks produced with Wischos branding for reference only. Your bulk order will feature your company logo, text, or custom design. We work from your vector artwork to produce a completely custom branded product.',
        },
        {
          q: 'How does the metal body hold up over years of professional use?',
          a: 'Unlike paper or plastic markers, these metal bookmarks are built for longevity. The high-tension brass and steel maintain their structural memory, ensuring they will not bend or snap in heavy books. The electroplated or polished surface is engineered to resist oxidation and daily wear.',
        },
        {
          q: 'Can you handle high-detail logos and unique geometric shapes?',
          a: 'Yes. Our chemical etching process allows for extreme detail that traditional stamping cannot achieve. We can reproduce complex corporate logos and custom silhouettes with permanent, sharp edges that remain legible throughout the product\'s entire lifespan.',
        },
        {
          q: 'What is the difference between chemical etching and laser cutting for logos?',
          a: 'Chemical etching recesses the logo into the metal surface, creating a tactile, engraved effect with high durability. Laser cutting physically cuts through or deeply scores the metal for sharp, precise outlines. Both methods are permanent — the choice depends on your design complexity and desired aesthetic.',
        },
      ],
      sourcingNotes: [
        {
          title: 'The bookmark as a standing nameplate',
          body: 'A metal bookmark sitting in a closed book on a desk occupies real estate without requiring any. The engraved face is at eye level — visible to the person sitting at the desk and to anyone sitting across from them. A company value, a logo, a year, a single word: whatever is engraved there is present every working day, on every call, in every meeting that happens at that desk. No paper insert achieves this. No digital screen replaces it.',
        },
        {
          title: 'Why laser engraving outlasts every alternative',
          body: 'Printed bookmarks fade. Foiled paper peels. Embossed card compresses. Laser engraving removes material — the mark is the metal itself, not something applied to it. A brass or stainless steel bookmark engraved in 2025 will read identically in 2035. For a branded object that recipients are expected to keep and use, permanence is not a feature — it is the baseline requirement.',
        },
        {
          title: 'Custom profile: the shape is part of the brand',
          body: 'Standard rectangular bookmarks are functional. A bookmark cut to a custom silhouette — a brand icon, a geometric form, a shape tied to the company\'s visual identity — is a different kind of object. The profile is visible every time it sticks out of a book. Chemical etching and laser cutting both support complex outlines at MOQ 100, making custom silhouettes accessible at entry-level order quantities.',
        },
        {
          title: 'Material choice: brass vs stainless steel',
          body: 'Brass develops a patina with handling — the surface darkens slightly at contact points, creating a lived-in quality that reads as craft rather than wear. It suits brands that want warmth and character. Stainless steel stays clean and consistent regardless of handling — it suits brands that want precision and permanence. Both are laser-engravable, both hold their shape in heavy books, and both are available in mirror-polished or matte-tumbled finish.',
        },
        {
          title: 'Pairing with The Desk Starter set',
          body: 'As the third component in The Desk Starter (WGS-001), the metal bookmark completes an all-aluminium desk set alongside the inkless pen and letter opener. The engraved bookmark carries the brand mark on the desk throughout the working day — not as decoration, but as a functional object that earns its position. For clients who want to include a company value or phrase rather than just a logo, the bookmark is the only component in the set that has the surface area and visibility to carry it.',
        },
      ],
      seoKeywords: [
        'custom metal bookmark',
        'precision metal bookmark',
        'metal bookmark bulk',
        'engraved metal bookmark',
        'laser cut metal bookmark',
        'corporate branded metal bookmark',
        'custom logo bookmark wholesale',
        'branded bookmark corporate gift',
        'metal bookmark bulk order',
        'brass bookmark custom',
        'stainless steel bookmark engraved',
        'chemical etching bookmark',
        'laser engraved brass bookmark',
        'personalized metal bookmark corporate gift',
        'custom shape metal bookmark B2B',
        'permanent logo metal bookmark bulk',
        'precision engraved bookmark wholesale',
      ],
    })
    .where(eq(products.id, 'WP-205-precision-custom-metal-bookmark'))

  console.log('✓ Precision Custom Metal Bookmark updated.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

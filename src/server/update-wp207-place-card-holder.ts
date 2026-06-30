/**
 * Run with: npx tsx src/server/update-wp207-place-card-holder.ts
 *
 * Replaces the current WP-207 product with Precision Brass Place Card Holder.
 * Matches either the legacy fidget-stick ID or the new place-card-holder ID.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

const OLD_IDS = [
  'edc-carbon-fibre-magnetic-fidget-sticks-01',
  'WP-207-carbon-fiber-magnetic-fidget-stick',
  'wp-207-carbon-fiber-magnetic-fidget-stick',
]

const NEW_ID = 'wp-207-precision-brass-place-card-holder'
const FOLDER = 'WP-207-precision-brass-place-card-holder'
const PREFIX = 'precision-brass-place-card-holder'

const images = [
  `/products/${FOLDER}/${PREFIX}-cover.avif`,
  `/products/${FOLDER}/${PREFIX}-hover.avif`,
  `/products/${FOLDER}/${PREFIX}-detail-1.avif`,
  `/products/${FOLDER}/${PREFIX}-detail-2.avif`,
  `/products/${FOLDER}/${PREFIX}-detail-3.avif`,
  `/products/${FOLDER}/${PREFIX}-detail-4.avif`,
  `/products/${FOLDER}/${PREFIX}-detail-5.avif`,
  `/products/${FOLDER}/${PREFIX}-detail-6.avif`,
  `/products/${FOLDER}/${PREFIX}-detail-7.avif`,
  `/products/${FOLDER}/${PREFIX}-lifestyle.avif`,
]

const payload = {
  id: NEW_ID,
  sku: 'WP-207',
  name: 'Precision Brass Place Card Holder',
  tagline: 'Solid brass | 20-100mm size range | 15 display formats',
  description:
    'A solid brass card holder series built for desk display, counter signage, table settings, and branded presentation use. The range covers round, square, bar, cylindrical, and angled block formats, each cut with a top slot to hold business cards, place cards, menu cards, or small product signs.\n\nInstead of presenting one fixed size as universal, this product works as a format family. Smaller pieces fit compact price tags or short desk cards. Longer bar and cylinder formats suit table cards, menu strips, and wider signage. The brass body gives each format visible weight, a stable base, and a clean surface for logo marking or custom shape development.\n\nSurface finish should be chosen by use context, not only by appearance. Brushed and matte satin brass are the most practical desk finishes for daily handling. Polished brass is stronger for reflective display presentation. Plated, glazed, or oil-coated versions are better when the buyer wants a more controlled colour tone or slower visible oxidation over time.',
  category: 'Desk Accessories',
  materials: ['Solid brass'],
  heroImage: images[0],
  images,
  highlights: [
    'Solid brass construction - visible metal weight and stable desk placement across all formats',
    'Multi-format series - round, square, bar, cylindrical, and polygon forms for different display widths',
    'Slot-top display method - holds business cards, place cards, menu cards, and small desk signs',
    'Size range coverage - current variants span from compact 20mm pieces to 100mm bar formats',
    'Marking surface - side or face areas can support logo engraving, depending on selected format',
    'Finish options - brushed, matte satin, polished, glazed, plated, or oil-coated brass depending on project brief',
  ],
  customizationOptions: [
    'Logo engraving on side face or front display face, depending on chosen format',
    'Size adjustment within the current desk-display range',
    'Shape selection: round, square, bar, cylindrical, or polygon block',
    'Surface finish selection: brushed, matte satin, polished, glazed, plated, or oil-coated brass',
    'Custom gift box or branded presentation packaging, subject to final packing brief',
  ],
  specifications: [
    { label: 'SKU', value: 'WP-207' },
    { label: 'Material', value: 'Solid brass' },
    { label: 'Product Type', value: 'Slot-top desk display holder for cards and small signs' },
    { label: 'Dimensions', value: 'Current range runs from approx. 20 × 15 × 10mm to 100 × 25 × 22.5mm across 15 documented variants' },
    { label: 'Weight Range', value: 'Approx. 24g-367g depending on format' },
    { label: 'Shape Families', value: 'Round / Square block / Bar / Cylindrical bar / Hex block / Inclined block' },
    { label: 'Slot Structure', value: 'Top slot for business cards, place cards, menu cards, price tags, or desk labels' },
    { label: 'Surface Finish', value: 'Brushed brass / matte satin brass / polished brass / glazed brass / plated brass / oil-coated brass, subject to production spec' },
    { label: 'Branding Method', value: 'Laser engraving, etched logo, or format-specific custom marking, subject to artwork' },
  ],
  faqs: [
    {
      q: 'Is this one fixed product or a multi-size series?',
      a: 'It is a multi-size brass holder series. The current source set shows 15 documented formats, from compact 20mm pieces to 100mm bar versions. Final selection should follow the card width, desk footprint, and logo area required for the project.',
    },
    {
      q: 'Which format is best for standard business cards?',
      a: 'Mid-size square, round, and block formats are usually the easiest starting point for standard business cards or short desk cards. Longer bar and cylindrical formats are more useful when the insert is wider, landscape-oriented, or intended for table signage rather than pocket cards.',
    },
    {
      q: 'Can the brass surface be engraved with a company logo?',
      a: 'Yes. Logo engraving is suitable on side faces or front faces, depending on the selected format. Artwork should be reviewed against the available flat area because some round and inclined forms provide less uninterrupted marking space than square or bar formats.',
    },
    {
      q: 'Which surface finish is best for everyday desk use?',
      a: 'Brushed brass and matte satin brass are usually the safest starting points for daily desk use because they soften fingerprints and light handling marks better than high-polish surfaces. Polished brass is more reflective and more display-driven. Plated, glazed, or oil-coated finishes are better when the project needs a more controlled colour tone or slower visible oxidation.',
    },
    {
      q: 'Will solid brass change colour over time?',
      a: 'Yes. Brass can develop natural oxidation and handling marks over time. Some buyers prefer that warmer aged surface. If a more consistent appearance is required, a coated or plated finish should be discussed before production.',
    },
  ],
  sourcingNotes: [
    {
      title: 'This product should be bought by display width, not by shape name',
      body: 'Round, square, and hex forms are visual categories, but the practical buying decision is the width of the insert and the desk space available. A narrow product sign, a folded place card, and a standard business card do not need the same base format.',
    },
    {
      title: 'Brass changes the display feel more than the insert does',
      body: 'On a table or counter, the insert card is lightweight and disposable. The holder is the permanent object. Solid brass shifts the product from a simple stationery accessory toward a desk object with visible material value and stronger repeat-use life.',
    },
    {
      title: 'Surface finish choice affects both handling and logo contrast',
      body: 'Brushed and matte satin surfaces are easier to live with in daily desk use because light handling marks blend into the grain. Polished brass reflects more light and reads more formally in hospitality or event display. Plated, glazed, and oil-coated versions are useful when the buyer wants a more stable visual tone or slower surface change over time.',
    },
    {
      title: 'Marking area varies sharply by form family',
      body: 'Square and bar formats provide the easiest surfaces for a clear logo. Round and inclined forms are more sculptural but leave less flat area. For bulk orders, format selection should be tied to both the insert size and the branding requirement, not only the front silhouette.',
    },
  ],
  seoKeywords: [
    'brass place card holder',
    'solid brass business card holder',
    'engraved brass card holder',
    'custom brass menu card holder',
    'brass desk sign holder',
    'brass price tag holder',
    'brass name card holder bulk order',
    'table card holder with logo',
    'machined brass display holder',
    'corporate desk card holder',
  ],
  quickAnswer:
    'Precision Brass Place Card Holder is a machined solid brass desk display holder for business cards, place cards, menu cards, and price tags, offered in 15 current size and shape formats.',
  metaDescription:
    'Solid brass place card holder for business cards, menu cards, price tags, and desk signage, available in multiple machined shapes with logo marking options.',
  comparisonTable: {
    columns: ['Format family', 'Best fit', 'Buyer note'],
    rows: [
      ['Small round or mini block', 'Price tags and compact desk labels', 'Lowest footprint for counters and retail display'],
      ['Square or hex block', 'Business cards and short place cards', 'More visible mass and stronger logo face area'],
      ['Long bar or cylinder bar', 'Menu strips, table cards, and wider signs', 'Better support for longer or landscape-format inserts'],
    ],
  },
  keyInsight:
    'The right way to present this product is as a brass desk-display system with multiple formats, not as one universal card holder size.',
  active: true,
}

async function main() {
  const idsToMatch = [...OLD_IDS.map((id) => id.toLowerCase()), NEW_ID]
  const rows = await sql<{ id: string }[]>`
    select id from products
    where lower(id) = ${idsToMatch[0]}
       or lower(id) = ${idsToMatch[1]}
       or lower(id) = ${idsToMatch[2]}
       or lower(id) = ${idsToMatch[3]}
  `

  if (rows.length === 0) {
    console.error('No matching WP-207 product row found.')
    process.exit(1)
  }

  const currentId = rows[0].id

  await sql`
    update products
    set
      id = ${payload.id},
      sku = ${payload.sku},
      name = ${payload.name},
      tagline = ${payload.tagline},
      description = ${payload.description},
      category = ${payload.category},
      materials = ${payload.materials},
      hero_image = ${payload.heroImage},
      images = ${payload.images},
      highlights = ${payload.highlights},
      customization_options = ${payload.customizationOptions},
      specifications = ${sql.json(payload.specifications)},
      faqs = ${sql.json(payload.faqs)},
      expert_notes = ${sql.json(payload.sourcingNotes)},
      seo_keywords = ${payload.seoKeywords},
      quick_answer = ${payload.quickAnswer},
      meta_description = ${payload.metaDescription},
      comparison_table = ${sql.json(payload.comparisonTable)},
      key_insight = ${payload.keyInsight},
      active = ${payload.active}
    where id = ${currentId}
  `

  console.log(`✓ Replaced ${currentId} with ${NEW_ID}`)
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

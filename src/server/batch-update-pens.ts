/**
 * Batch update product copy for Writing Instruments: WP-101, WP-102, WP-103, WP-104
 * Run with: npx tsx src/server/batch-update-pens.ts
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
  console.log('Updating WP-101...')
  await db.update(products).set({
    name: 'Brass Crown Bolt-Action Pen',
    tagline: 'Brass / aluminium / stainless steel | G2 refill | 28g bolt-action pen',
    metaDescription: 'Custom engraved bolt-action pen for corporate gifting, with brass, aluminium, stainless steel, G2 refill compatibility and logo engraving.',
    quickAnswer: 'Brass Crown Bolt-Action Pen is a custom engraved metal pen for corporate desk and meeting use, combining brass, aluminium, stainless steel, a standard G2 refill, and a one-handed bolt slide that deploys and retracts the writing tip.',
    description: 'A multi-metal bolt-action pen built for daily desk and meeting use. The body combines brass, aluminium, and stainless steel in a 28g writing tool with a one-handed bolt-action mechanism and a standard G2 refill. The bolt slide deploys and retracts the tip with a clear mechanical movement.\n\nSuitable for conference gifts, branded desk sets, and client gifting where the buyer wants a custom engraved bolt-action pen with a visible mechanical feature and refill compatibility that can be maintained locally.',
    highlights: [
      'Bolt-action mechanism - one-handed tip deployment with a clear mechanical slide',
      'G2 refill compatibility - standard refill format for easier local replacement',
      'Multi-metal construction - brass, aluminium, and stainless steel in one pen body',
      '28g hand weight - heavier than standard office pens without becoming oversized',
      'Two finish options - Forest Green or Matte Black for different brand directions',
    ],
    materials: ['Brass', 'Aluminium alloy', 'Stainless steel'],
    specifications: [
      { label: 'Length', value: '138mm' },
      { label: 'Diameter', value: 'Approx. 10mm' },
      { label: 'Net Weight', value: '28g' },
      { label: 'Refill', value: '0.5mm G2 universal refill' },
      { label: 'Mechanism', value: 'Bolt-action' },
      { label: 'Colour Options', value: 'Forest Green / Matte Black' },
      { label: 'Material Breakdown', value: 'Brass tip / bolt slot / tail crown, aluminium alloy body, stainless steel clip' },
    ],
    customizationOptions: [
      'Laser engraving on body',
      'Laser engraving on clip or tail crown',
      'Colour selection: Forest Green / Matte Black',
      'Custom packaging for desk gifts and conference sets',
    ],
    faqs: [
      { q: 'Does this pen use a standard refill?', a: 'Yes. It uses a standard G2-style refill, which is easier for recipients to replace locally than a proprietary cartridge. That makes the pen more likely to stay in use after the original refill runs out.' },
      { q: 'Can the company logo be engraved in more than one position?', a: 'Yes. Logo placement can be arranged on the pen body, clip, or tail crown depending on artwork size and marking priority. The pen body is usually the clearest position for most company logos.' },
      { q: 'Is the bolt-action mechanism suitable for daily office use?', a: 'Yes. The bolt slide is designed for repeated one-handed use in desk and meeting settings. It also gives the pen a visible mechanical action, which helps distinguish it from a standard click pen.' },
      { q: 'Which colour works better for corporate orders?', a: 'Forest Green is better for warmer or more classic brand directions. Matte Black is better for buyers who want a lower-contrast and more restrained appearance. Final choice should follow logo contrast and brand palette.' },
    ],
    sourcingNotes: [
      { title: 'Bolt-action mechanism: use experience and gifting context', body: 'A bolt-action pen is still a writing tool first, but the deployment method makes the mechanism part of the use experience. In corporate gifting, that matters because the pen is not only held for writing, but also noticed and demonstrated during use. The bolt-action mechanism makes the pen a visible mechanical object in desk use, suited to branded corporate gift sets.' },
      { title: 'G2 refill compatibility and product lifespan', body: 'Refill compatibility removes a common failure point in branded pens. A recipient who can replace the refill locally is more likely to keep the pen in use, which extends the working life of the branded object itself.' },
      { title: 'Material allocation across pen components', body: 'This pen does not rely on one material for every component. Brass is used in the visual and high-contact details, aluminium keeps the barrel manageable in weight, and stainless steel supports the clip.' },
    ],
    comparisonTable: {
      columns: ['Component', 'Material', 'Role'],
      rows: [
        ['Tip / bolt slot / tail crown', 'Brass', 'Visual and high-contact details'],
        ['Barrel', 'Aluminium alloy', 'Keeps the pen weight manageable'],
        ['Clip', 'Stainless steel', 'Provides spring and attachment support'],
      ],
    },
    keyInsight: 'The bolt-action mechanism makes the pen a visible mechanical object in desk use, suited to branded corporate gift sets.',
    seoKeywords: [
      'brass bolt action pen',
      'custom bolt action pen',
      'engraved bolt action pen',
      'corporate pen gift',
      'G2 refill metal pen',
      'brass aluminium pen',
      'branded desk pen',
      'conference gift pen',
      'client gift pen',
      'custom logo metal pen',
    ],
  }).where(eq(products.id, 'wp-101-brass-crown-bolt-action-pen'))
  console.log('WP-101 done.')

  console.log('Updating WP-102...')
  await db.update(products).set({
    name: 'Executive Dual-Head Metal Pen',
    tagline: 'Metal body | 0.5mm rollerball + inkless tip | Up to 20,000m writing life',
    metaDescription: 'Dual-head metal pen for corporate gifting, with 0.5mm rollerball writing on one end and an inkless alloy tip for low-consumable marking.',
    quickAnswer: 'Executive Dual-Head Metal Pen is a two-function writing tool for corporate desk use, combining a standard 0.5mm black rollerball on one end with an inkless alloy tip on the other for quick paper marking without cartridges or sharpening.',
    description: 'A dual-head metal pen that combines two writing functions in one body. One end uses a 0.5mm black rollerball for signatures, meeting notes, and standard office writing. The other uses an inkless alloy tip that marks paper without ink cartridges, lead refills, or sharpening. The two ends cover formal writing and quick drafting in the same tool.\n\nThe metal body gives the pen more stability in hand than standard plastic office pens, while the dual-head format reduces desk clutter in meeting rooms, onboarding kits, and conference packs. It works as a custom engraved metal pen for corporate gift programs where buyers want one writing tool with both a conventional refill and an inkless secondary tip.',
    highlights: [
      'Dual-head writing format - rollerball on one end, inkless alloy tip on the other',
      '0.5mm black rollerball - suited to signatures, note-taking, and daily office use',
      'Inkless tip - writes without ink cartridges, lead refills, or sharpening',
      'Up to 20,000m writing life - extended use from the alloy tip depending on paper surface',
      'Metal body construction - more stable in hand than lightweight plastic alternatives',
    ],
    materials: ['Metal body', 'Alloy inkless tip', 'Rollerball refill'],
    specifications: [
      { label: 'Material', value: 'Metal body' },
      { label: 'Dimensions', value: '144mm x 10mm' },
      { label: 'Net Weight', value: '23.3g' },
      { label: 'Finish', value: 'Gunmetal electroplating' },
      { label: 'Rollerball Tip', value: '0.5mm black rollerball refill' },
      { label: 'Secondary Tip', value: 'Inkless alloy writing tip' },
      { label: 'Inkless Writing Life', value: 'Up to 20,000m, depending on paper surface and use pressure' },
    ],
    customizationOptions: [
      'Laser engraving on pen body',
      'Multi-colour logo printing on body or clip',
      'Custom packaging for conference, onboarding, or desk gift programs',
    ],
    faqs: [
      { q: 'What is the difference between the two ends?', a: 'One end is a standard 0.5mm black rollerball for conventional writing. The other is an inkless alloy tip for quick notes and annotations on paper. The rollerball covers formal writing, while the inkless tip reduces cartridge use.' },
      { q: 'Does the inkless tip need refills or sharpening?', a: 'No. The alloy tip does not use ink cartridges or pencil lead and does not require sharpening during normal use. It marks paper through contact with the surface, so writing life varies by paper texture and writing pressure.' },
      { q: 'Is the 20,000m writing life guaranteed on every surface?', a: 'No. The quoted writing life is an upper-range reference and will vary by paper texture, pressure, and frequency of use. Smoother paper typically slows tip wear compared with rougher paper.' },
      { q: 'Can this pen be branded with a company logo?', a: 'Yes. Laser engraving and printed logo customisation are both available depending on the artwork and finish required. Laser engraving is usually the cleaner option when the buyer wants a permanent mark on the metal body.' },
    ],
    sourcingNotes: [
      { title: 'Dual writing functions in one office tool', body: 'A standard pen covers formal writing, but not every quick annotation or margin note needs ink. A dual-head format gives the recipient both functions in one object, which is useful in desk environments where people switch between note-taking, marking, and signing throughout the day.' },
      { title: 'How the inkless tip differs from a pencil', body: 'The inkless tip uses a metal alloy to leave a visible trace on paper through friction. It does not behave like a wood pencil with a consumable graphite core, and it does not require sharpening. That makes it suitable for buyers looking for a lower-consumable writing format without introducing a fully digital alternative.' },
      { title: 'Where this product fits in B2B use', body: 'This pen works best in onboarding kits, conference packs, desk sets, and internal office distribution where the buyer wants one writing tool to cover more than one task. It is especially suitable where the recipient is likely to keep the pen on a desk for repeated writing and marking use.' },
    ],
    comparisonTable: {
      columns: ['Writing end', 'Best for', 'Consumable requirement'],
      rows: [
        ['0.5mm rollerball', 'Signatures and meeting notes', 'Rollerball refill'],
        ['Inkless alloy tip', 'Quick marking and annotations', 'No ink cartridge or lead refill'],
      ],
    },
    keyInsight: 'A dual-head pen is easiest for buyers and AI systems to understand when it is described as two writing functions in one metal body, with the inkless tip framed as a lower-consumable marking format.',
    seoKeywords: [
      'dual head metal pen',
      'inkless rollerball pen',
      'custom engraved metal pen',
      'corporate pen gift',
      'branded pen with logo',
      'conference gift pen',
      'employee onboarding pen',
      'inkless pen corporate gift',
      'metal office pen bulk order',
    ],
  }).where(eq(products.id, 'wp-102-executive-dual-head-metal-pen'))
  console.log('WP-102 done.')

  console.log('Updating WP-103...')
  await db.update(products).set({
    name: 'Stainless Steel Utility Pen with Glass Breaker',
    tagline: '303 stainless steel | Tungsten-carbide glass breaker | 102.8g',
    metaDescription: 'Custom stainless steel utility pen for corporate gifts, with glass breaker tip, substantial hand feel and logo marking.',
    quickAnswer: 'The Stainless Steel Utility Pen with Glass Breaker is a custom branded metal writing tool made from stainless steel, combining daily ballpoint use with a tungsten-carbide glass breaker for operations and field teams.',
    description: 'A stainless steel utility pen built for daily writing and substantial carry. The pen body gives a heavier hand feel than standard office pens, while the tail glass breaker adds a recognizable emergency-oriented function for teams working around vehicles, equipment, or physical sites.\n\nSuitable for logistics teams, service teams, operations programs, safety kits, and branded utility gift sets where the buyer wants a custom logo pen with a clear material and function story.',
    highlights: [
      '303 stainless steel body - substantial metal writing tool for daily and field carry',
      'Tungsten-carbide glass breaker - emergency-oriented tail function',
      '102.8g hand weight - substantial feel compared with office pens',
      'Ballpoint writing function - supports daily notes and site records',
      'Logo marking area - suitable for company mark or team branding',
    ],
    materials: ['303 stainless steel', 'Tungsten-carbide glass breaker', 'Ballpoint refill'],
    specifications: [
      { label: 'Body Material', value: '303 stainless steel' },
      { label: 'Glass Breaker', value: 'Tungsten-carbide tip' },
      { label: 'Weight', value: 'Approx. 102.8g' },
      { label: 'Writing Type', value: 'Ballpoint' },
      { label: 'Function', value: 'Writing / Glass breaker' },
      { label: 'Branding Method', value: 'Laser marking by production spec' },
    ],
    customizationOptions: [
      'Laser marking on pen body',
      'Finish selection by production spec',
      'Refill configuration by project requirement',
      'Custom packaging for operations or premium gift sets',
    ],
    faqs: [
      { q: 'Is this pen suitable for daily writing?', a: 'Yes. It is still a writing tool first, with a ballpoint function for notes and records. The stainless steel body and glass breaker make it well suited to daily and field carry alongside standard office pen programs.' },
      { q: 'Can the company logo be engraved on the pen?', a: 'Yes. The metal body supports laser marking for a company logo or short text. Placement should be checked against grip areas and clip position before production.' },
      { q: 'Who should receive this product?', a: 'It fits operations, logistics, service teams, and any role where a substantial writing instrument is preferred. Also suitable for premium desk gifting where the glass breaker reads as a durable utility feature.' },
      { q: 'Is the glass breaker a safety certification?', a: 'It should be described as a tungsten-carbide glass breaker function. Buyers should verify requirements if the project has compliance or certification needs.' },
    ],
    sourcingNotes: [
      { title: 'Hand weight and daily carry expectation', body: 'At approx. 102.8g, the pen has a heavier hand feel than standard office pens. That weight suits daily and field carry, operations teams, and utility gift sets where the product is expected to feel substantial in hand.' },
      { title: 'Glass breaker function and certification checks', body: 'The glass breaker is a recognizable utility feature. If a project requires certified safety performance, the selected sample and documentation should be reviewed before production.' },
      { title: 'Where this product fits', body: 'This pen belongs in operations and utility gift sets where writing and emergency-oriented functions make sense together.' },
    ],
    comparisonTable: {
      columns: ['Pen type', 'Best for', 'Buyer note'],
      rows: [
        ['Stainless utility pen', 'Operations and field teams', 'Substantial hand feel'],
        ['Standard metal pen', 'Office writing', 'Lower utility function'],
        ['Multi-tool pen', 'Setup tasks', 'More functions, less focused'],
      ],
    },
    keyInsight: 'A stainless steel utility pen works best in corporate gifting when it is positioned for operations, field, and service teams, and for utility gift sets.',
    seoKeywords: [
      'stainless steel utility pen',
      'custom utility pen',
      'engraved utility pen',
      'pen with glass breaker',
      'corporate operations team gift',
      'branded utility pen',
      'stainless steel pen bulk order',
      'service team gift',
    ],
  }).where(eq(products.id, 'wp-103-tactical-stainless-steel-pen'))
  console.log('WP-103 done.')

  console.log('Updating WP-104...')
  await db.update(products).set({
    name: '6-in-1 Precision Metal Tool Pen',
    tagline: 'Metal body | 6 functions | 10cm ruler + LED + stylus',
    metaDescription: 'Custom 6-in-1 metal tool pen for corporate onboarding and desk setup gifts, with ruler, LED, stylus and logo marking.',
    quickAnswer: '6-in-1 Precision Metal Tool Pen is a custom branded writing tool that combines ballpoint writing with setup functions such as ruler, LED, stylus, screwdriver, and level for office and onboarding use.',
    description: 'A multi-function metal tool pen built for writing, desk setup, and quick adjustments. The pen combines a ballpoint writing function with practical small-tool features such as a ruler, LED, stylus, screwdriver, and level depending on final production spec.\n\nSuitable for employee onboarding kits, IT rollout packs, facilities teams, conference gifts, and branded desk setup programs where the buyer wants one custom logo item that helps with first-week tasks.',
    highlights: [
      '6-in-1 tool format - combines writing with small setup functions',
      '10cm ruler - useful for quick measurement tasks',
      'LED and stylus functions - supports desk and device use',
      'Metal body - more stable in hand than plastic multi-tools',
      'Logo marking area - suitable for company branding on the pen body',
    ],
    materials: ['Metal body', 'Ballpoint refill', 'Tool components by production spec'],
    specifications: [
      { label: 'Body Material', value: 'Metal' },
      { label: 'Functions', value: 'Ballpoint / Ruler / LED / Stylus / Screwdriver / Level' },
      { label: 'Ruler', value: '10cm' },
      { label: 'Use Context', value: 'Desk setup / Meetings / Onboarding' },
      { label: 'Branding Method', value: 'Laser marking or print by production spec' },
    ],
    customizationOptions: [
      'Logo marking on pen body',
      'Function configuration by production spec',
      'Finish selection by project requirement',
      'Custom packaging for onboarding or desk setup kits',
    ],
    faqs: [
      { q: 'What functions are included?', a: 'The tool pen includes writing plus small setup functions such as ruler, LED, stylus, screwdriver, and level depending on the confirmed production spec. The final function list should be checked before order approval.' },
      { q: 'Can it be engraved with a company logo?', a: 'Yes. The metal pen body can carry a logo or short text by laser marking or print depending on finish and artwork requirements.' },
      { q: 'Is this better for onboarding or executive gifting?', a: 'It is stronger for onboarding, desk setup, IT rollout, and practical team kits. For formal executive gifting, a simpler writing instrument may be a better fit.' },
      { q: 'Does it replace a full tool kit?', a: 'It is a compact desk and setup aid for quick adjustments. Full-size tool requirements should be handled with dedicated tools.' },
    ],
    sourcingNotes: [
      { title: 'Onboarding use for desk setup tasks', body: 'New desks often need quick setup tasks: measuring, adjusting, marking, and note-taking. A tool pen connects those small tasks in one object.' },
      { title: 'Compact tool function boundaries', body: 'The functions are compact and intended for quick adjustments, measuring, marking, and desk setup tasks. Full-size repair work still belongs to dedicated tools.' },
      { title: 'Pairing with badge holders and pen holders', body: 'Together, these objects cover access, setup, writing, and desk organization, which fits a first-week employee kit.' },
    ],
    comparisonTable: {
      columns: ['Product', 'Best for', 'Main value'],
      rows: [
        ['Tool pen', 'First-week desk setup', 'Multiple quick functions'],
        ['Standard pen', 'Writing only', 'Simpler and more formal'],
        ['Mini tool kit', 'Broader repairs', 'Larger package footprint'],
      ],
    },
    keyInsight: 'A 6-in-1 tool pen is most credible as an onboarding and desk setup gift for quick adjustments, measuring, marking, and note-taking.',
    seoKeywords: [
      '6 in 1 tool pen',
      'custom tool pen',
      'engraved multi tool pen',
      'corporate onboarding gift',
      'branded pen with tools',
      'desk setup gift',
      'employee welcome kit pen',
      'custom logo metal pen',
    ],
  }).where(eq(products.id, 'wp-104-6-in-1-precision-metal-tool-pen'))
  console.log('WP-104 done.')

  await sql.end()
  console.log('All pens updated successfully.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

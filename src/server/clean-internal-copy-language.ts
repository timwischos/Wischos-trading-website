/**
 * Clean internal editorial language from customer-visible product copy.
 * Run with: npx tsx src/server/clean-internal-copy-language.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

const updates = [
  {
    id: 'wp-103-tactical-stainless-steel-pen',
    sourcingNotes: [
      {
        title: 'Hand weight and field carry expectation',
        body: 'At approx. 102.8g, the pen has a heavier hand feel than standard office pens. That weight suits field carry, vehicle-adjacent teams, and utility gift sets where the product is expected to feel substantial in hand.',
      },
      {
        title: 'Glass breaker function and certification checks',
        body: 'The glass breaker is a recognizable utility feature. If a project requires certified safety performance, the selected sample and documentation should be reviewed before production.',
      },
      {
        title: 'Where this product fits',
        body: 'This pen belongs in field and utility gift sets where writing and emergency-oriented functions make sense together.',
      },
    ],
  },
  {
    id: 'wp-104-6-in-1-precision-metal-tool-pen',
    sourcingNotes: [
      {
        title: 'Onboarding use for desk setup tasks',
        body: 'New desks often need quick setup tasks: measuring, adjusting, marking, and note-taking. A tool pen connects those small tasks in one object.',
      },
      {
        title: 'Compact tool function boundaries',
        body: 'The functions are compact and intended for quick adjustments, measuring, marking, and desk setup tasks. Full-size repair work still belongs to dedicated tools.',
      },
      {
        title: 'Pairing with badge holders and pen holders',
        body: 'Together, these objects cover access, setup, writing, and desk organization, which fits a first-week employee kit.',
      },
    ],
  },
  {
    id: 'wp-301-rfid-aluminum-wallet-badge-holder',
    sourcingNotes: [
      {
        title: 'Onboarding use from first-day access',
        body: 'Access cards and ID badges are part of the first workday. A holder that combines badge and card carry gives the gift an immediate role in daily workplace entry and identification.',
      },
      {
        title: 'RFID function verification',
        body: 'RFID blocking is a recognizable buyer concern. Performance should be verified against the selected production sample and card type before bulk approval.',
      },
      {
        title: 'Card capacity caveat by card thickness',
        body: 'Card thickness varies. Stating capacity with a condition keeps the claim useful without overpromising for every card format.',
      },
    ],
  },
  {
    id: 'wp-303-industrial-stainless-steel-money-clip',
    sourcingNotes: [
      {
        title: 'Stainless steel spring behavior in money clips',
        body: 'Money clips rely on spring tension and repeated flex. Stainless steel is a practical choice because it provides structural memory and a clean metal surface.',
      },
      {
        title: 'Capacity limits and slim carry positioning',
        body: 'A money clip is built for slim carry. Capacity is best discussed around compact daily use because cash and card thickness vary by market and recipient habit.',
      },
      {
        title: 'Finish choice and carry presentation',
        body: "Brushed and gunmetal finishes read more understated. Gold or polished finishes create stronger visual contrast and should match the buyer's brand direction.",
      },
    ],
  },
  {
    id: 'wp-305-industrial-mini-edc-pry-bar',
    sourcingNotes: [
      {
        title: 'Light utility use case boundaries',
        body: 'This product is small and carry-focused. It is best framed as a light utility tool for EDC sets rather than heavy-duty construction work.',
      },
      {
        title: 'Pry bar role in EDC sets',
        body: 'A pry bar covers a different task from pens, scissors, and carabiners. It adds a practical utility function without increasing the size of the set much.',
      },
      {
        title: 'Material choice by project tier',
        body: 'Stainless steel is practical and strong for general use. Titanium is lighter and carries a stronger material story, but the buyer should decide based on project tier.',
      },
    ],
  },
  {
    id: 'wp-306-executive-zinc-alloy-nail-clipper',
    faqs: [
      {
        q: 'Is this suitable for formal desk gifting?',
        a: 'It fits travel kits, EDC sets, and wellness packs where personal-care items are appropriate. For formal desk programs, writing tools or desk accessories are usually a cleaner fit.',
      },
      {
        q: 'Can it carry a company logo?',
        a: 'Yes. The zinc alloy shell can carry a simple logo or short text depending on finish and available marking area. Small artwork should be checked before production.',
      },
      {
        q: 'What is the keychain function for?',
        a: 'The keychain format supports bag, pouch, or key carry, making the clipper easier to include in travel and carry kits.',
      },
      {
        q: 'Which buyers should consider this product?',
        a: 'It suits buyers building travel kits, employee wellness packs, compact carry sets, or practical event gifts. It is less suitable where personal grooming items may feel too specific.',
      },
    ],
  },
  {
    id: 'wp-307-edc-folding-metal-scissors',
    sourcingNotes: [
      {
        title: 'Folding structure for compact carry',
        body: 'Scissors are useful but awkward to carry when full-size. A folding structure makes the tool easier to include in EDC and field kits.',
      },
      {
        title: 'Small cutting task boundaries',
        body: 'This is a compact cutting tool for small office, field, and EDC tasks. Industrial cutting work belongs to full-size dedicated scissors or cutters.',
      },
      {
        title: 'Cutting role in field tool sets',
        body: 'Cutting, prying, and writing are common small tasks in operational environments. Folding scissors fill the cutting role in a compact set.',
      },
    ],
  },
  {
    id: 'wp-401-pure-titanium-vacuum-insulated-bottle',
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
        q: 'What use context does this bottle fit?',
        a: 'It fits outdoor-ready and active-workday programs. The integrated handle, bottle silhouette, and finish suit travel, field, wellness, and daily carry use.',
      },
    ],
    sourcingNotes: [
      {
        title: 'Outdoor-ready use context',
        body: 'The carry handle, bottle silhouette, and finish suit travel, field, wellness, and outdoor use. It works best when recipients are expected to carry the bottle through the day.',
      },
      {
        title: 'Titanium liner as the material story',
        body: 'The liner is the surface that touches the drink. Using titanium there gives the material story a functional role for water, tea, and coffee without relying on an inner coating.',
      },
      {
        title: 'Best-fit gift programs',
        body: 'This bottle fits field teams, outdoor brands, logistics, construction, employee wellness, and travel programs where daily carry is part of the recipient context.',
      },
    ],
  },
  {
    id: 'wp-403-weighted-vacuum-insulated-office-tumbler',
    sourcingNotes: [
      {
        title: 'Desk stability around laptops and documents',
        body: "Office tumblers are used around laptops, documents, and meeting tables. A stable desk feel is part of the product's practical value.",
      },
      {
        title: 'Print area and campaign role',
        body: 'Full-wrap printing turns the tumbler into a larger campaign surface. Laser marking keeps the presentation quieter and more material-led.',
      },
      {
        title: 'Tumbler use versus sealed bottle carry',
        body: 'The tumbler is for drinking at a desk or meeting table. A sealed bottle is the better format when the main requirement is bag carry or commute use.',
      },
    ],
  },
  {
    id: 'wp-405-ice-crystal-pure-titanium-egg-cup',
    faqs: [
      {
        q: 'Is this mainly a visual product?',
        a: 'It is compact titanium drinkware with a distinct egg-form shape. The main value is the pure titanium body, double-wall structure, and gift-set presentation role.',
      },
      {
        q: 'Can it be branded with a company logo?',
        a: 'Yes. Logo marking can be reviewed on the cup body depending on available surface, finish, and artwork size. Simple marks are better for curved compact surfaces.',
      },
      {
        q: 'What gift programs does it fit?',
        a: 'It fits premium metal gift sets, client appreciation packages, executive desk drinkware, and titanium-themed sets where a small distinct cup can carry the material story.',
      },
      {
        q: 'How is it different from a desk cup?',
        a: 'A standard desk cup is more practical for daily office drinking. This titanium egg cup is more compact and presentation-led, suited to higher-tier gift sets.',
      },
    ],
  },
]

async function main() {
  for (const update of updates) {
    const values: Record<string, unknown> = {}
    if ('faqs' in update) values.faqs = update.faqs
    if ('sourcingNotes' in update) values.expert_notes = update.sourcingNotes

    await sql`update products set ${sql(values)} where id = ${update.id}`
    console.log(`cleaned ${update.id}`)
  }

  await sql.end()
}

main().catch(async (error) => {
  console.error(error)
  await sql.end()
  process.exit(1)
})

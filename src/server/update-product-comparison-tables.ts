/**
 * Refresh customer-facing comparison tables while keeping AI/GEO structure clear.
 * Run with: npx tsx src/server/update-product-comparison-tables.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import postgres from 'postgres'

type ComparisonTable = {
  columns: [string, string, string]
  rows: [string, string, string][]
}

const tables: Record<string, ComparisonTable> = {
  'wp-101-brass-crown-bolt-action-pen': {
    columns: ['Component', 'Material', 'Buyer note'],
    rows: [
      ['Tip / bolt slot / tail crown', 'Brass', 'Adds visible weight and high-contact detail'],
      ['Barrel', 'Aluminium alloy', 'Keeps the pen balanced for daily desk use'],
      ['Clip', 'Stainless steel', 'Supports pocket, notebook, or folio carry'],
    ],
  },
  'wp-102-executive-dual-head-metal-pen': {
    columns: ['Writing end', 'Best fit', 'Buyer note'],
    rows: [
      ['0.5mm rollerball', 'Signatures and meeting notes', 'Conventional refill for formal writing'],
      ['Inkless alloy tip', 'Quick marking and annotations', 'Lower-consumable marking without cartridges or sharpening'],
    ],
  },
  'wp-103-tactical-stainless-steel-pen': {
    columns: ['Pen option', 'Best fit', 'Buyer note'],
    rows: [
      ['Stainless utility pen', 'Operations and field teams', 'Substantial hand feel with glass-breaker utility'],
      ['Standard metal pen', 'Office writing programs', 'More familiar choice for desk-only use'],
      ['Multi-tool pen', 'Onboarding and setup tasks', 'Adds more compact tool functions'],
    ],
  },
  'wp-104-6-in-1-precision-metal-tool-pen': {
    columns: ['Product option', 'Best fit', 'Buyer note'],
    rows: [
      ['Tool pen', 'First-week desk setup', 'Combines writing with quick setup functions'],
      ['Standard pen', 'Formal writing programs', 'Simpler profile for meeting and signature use'],
      ['Mini tool kit', 'Broader setup tasks', 'More capability with a larger package footprint'],
    ],
  },
  'wp-105-artisan-brass-rollerball': {
    columns: ['Pen option', 'Best fit', 'Buyer note'],
    rows: [
      ['Brass rollerball', 'Desk writing and client gifts', 'Warm hand feel with a smooth writing format'],
      ['Bolt-action pen', 'Mechanical desk interaction', 'Adds a more visible mechanism'],
      ['Tool pen', 'Onboarding and setup tasks', 'Better when utility functions matter most'],
    ],
  },
  'wp-106-solid-brass-clip-ballpoint': {
    columns: ['Pen option', 'Best fit', 'Buyer note'],
    rows: [
      ['Solid Brass Ballpoint Pen', 'Desk writing, meetings, and signatures', 'Full brass body with cylindrical clip'],
      ['Artisan Brass Rollerball', 'Client desk sets and smoother writing feel', 'Rollerball format with brass body'],
      ['Brass Crown Bolt-Action Pen', 'Visible mechanical action', 'Bolt-action mechanism and mixed-metal body'],
    ],
  },
  'wp-201-professional-aluminum-mouse-pad': {
    columns: ['Surface option', 'Best fit', 'Buyer note'],
    rows: [
      ['Anodized aluminium', 'Clean logo engraving and easy wiping', 'Rigid desk surface with a permanent metal mark'],
      ['Cloth mouse pad', 'Soft hand feel', 'Familiar office format with a softer surface'],
      ['PU-backed metal pad', 'Stable workstation use', 'Best on flat desk surfaces'],
    ],
  },
  'wp-202-precision-aluminum-pen-holder': {
    columns: ['Format', 'Best fit', 'Buyer note'],
    rows: [
      ['Single-pen holder', 'Desk visibility', 'Keeps one branded pen in view'],
      ['Pen cup', 'Multiple tools', 'Useful when storage capacity matters more than presentation'],
      ['Loose pen only', 'Carry use', 'Works best when pocket or notebook carry is the priority'],
    ],
  },
  'wp-203-executive-zinc-alloy-letter-opener': {
    columns: ['Finish', 'Best fit', 'Visual effect'],
    rows: [
      ['Silver', 'Clean office branding', 'Neutral and bright'],
      ['Gold', 'Warmer presentation', 'Higher contrast on dark packaging'],
      ['Rose gold', 'Softer brand direction', 'Warm and less traditional'],
    ],
  },
  'wp-204-propeller-spinning-letter-opener': {
    columns: ['Opener type', 'Best fit', 'Buyer note'],
    rows: [
      ['Standard letter opener', 'Formal desk sets', 'Quiet and traditional'],
      ['Propeller opener', 'Interactive desk gifts', 'Visible mechanical action'],
      ['Utility cutter', 'Packaging tasks', 'More task-focused than formal desk gifting'],
    ],
  },
  'wp-205-precision-custom-metal-bookmark': {
    columns: ['Method', 'Best fit', 'Result'],
    rows: [
      ['Laser engraving', 'Clear logos and short text', 'Direct surface mark or material removal'],
      ['Chemical etching', 'Fine line artwork', 'Recessed detail on a flat metal surface'],
      ['Profile cutting', 'Custom outline shapes', 'Brand silhouette or non-rectangular form'],
    ],
  },
  'wp-206-precision-brass-spinning-top': {
    columns: ['Gift use', 'Best fit', 'Why it works'],
    rows: [
      ['Creative team gift', 'Strong fit', 'Adds tactile interaction without taking desk space'],
      ['Meeting room object', 'Strong fit', 'Creates a small shared desk interaction'],
      ['General office giveaway', 'Secondary fit', 'Works best when paired with a pen or desk set'],
    ],
  },
  'wp-207-carbon-fiber-magnetic-fidget-stick': {
    columns: ['Desk object', 'Best fit', 'Buyer note'],
    rows: [
      ['Carbon fiber fidget stick', 'Kinetic desk interaction', 'Lightweight carbon fiber with magnetic movement'],
      ['Standard metal pen', 'Daily writing', 'More familiar office function'],
      ['Brass spinning top', 'Compact spin interaction', 'Smaller object with a brass material story'],
    ],
  },
  'wp-208-precision-folding-aluminium-device-stand': {
    columns: ['Stand format', 'Best fit', 'Buyer note'],
    rows: [
      ['Folding aluminium stand', 'Desk and travel use', 'Practical daily visibility'],
      ['Fixed desk stand', 'Permanent workstation', 'Best when the item stays on one desk'],
      ['Plastic stand', 'Low-cost programs', 'More basic material presence'],
    ],
  },
  'wp-301-rfid-aluminum-wallet-badge-holder': {
    columns: ['Function', 'Buyer use case', 'Why it works'],
    rows: [
      ['RFID blocking', 'Card security', 'Clear technical feature'],
      ['Badge carry', 'Office access', 'Strong onboarding fit'],
      ['Wallet format', 'Daily carry', 'Keeps the branded item in use'],
    ],
  },
  'wp-302-industrial-brass-key-organizer': {
    columns: ['Carry format', 'Best fit', 'Buyer note'],
    rows: [
      ['Brass key organizer', 'Compact daily key carry', 'Durable branded object'],
      ['Loose key ring', 'Basic key holding', 'Simple and familiar format'],
      ['Carabiner only', 'Bag or belt attachment', 'Best when attachment matters more than key stacking'],
    ],
  },
  'wp-303-industrial-stainless-steel-money-clip': {
    columns: ['Carry item', 'Best fit', 'Buyer note'],
    rows: [
      ['Money clip', 'Slim cash or card carry', 'Compact profile for minimal carry'],
      ['Card holder', 'Structured card storage', 'More card organization in a thicker format'],
      ['Wallet', 'Multiple cards and cash', 'Higher capacity for recipients who carry more'],
    ],
  },
  'wp-304-titanium-anti-static-edc-comb': {
    columns: ['Version', 'Best fit', 'Branding surface'],
    rows: [
      ['100mm', 'Compact kits and pocket carry', 'Smaller, more discreet logo area'],
      ['150mm', 'Larger carry sets and desk or bag use', 'Larger logo area'],
    ],
  },
  'wp-305-industrial-mini-edc-pry-bar': {
    columns: ['Material', 'Best fit', 'Buyer note'],
    rows: [
      ['Stainless steel', 'General utility carry', 'Strong and cost-stable'],
      ['Titanium', 'Lighter premium carry', 'Higher material positioning'],
      ['Coated metal', 'Colour matching', 'Adds finish colour for brand alignment'],
    ],
  },
  'wp-306-executive-zinc-alloy-nail-clipper': {
    columns: ['Gift context', 'Best fit', 'Buyer note'],
    rows: [
      ['Travel kit', 'Strong fit', 'Compact and practical'],
      ['EDC set', 'Good fit', 'Works when personal-use items match the program'],
      ['Desk set', 'Secondary fit', 'Better when included as part of a broader wellness or travel theme'],
    ],
  },
  'wp-307-edc-folding-metal-scissors': {
    columns: ['Cutting tool', 'Best fit', 'Buyer note'],
    rows: [
      ['Folding scissors', 'Small controlled cuts', 'Folds flat after use'],
      ['Utility knife', 'Box cutting', 'More blade-focused utility'],
      ['Full-size scissors', 'Desk or supply room', 'Best when pocket carry is not required'],
    ],
  },
  'wp-308-titanium-edc-keychain': {
    columns: ['Feature', 'Buyer value', 'Buyer note'],
    rows: [
      ['Titanium body', 'Light carry and material story', 'Higher material tier'],
      ['Brass detail', 'Visual contrast', 'Develops character with handling'],
      ['Bottle opener', 'Secondary utility', 'Supports the carry function without defining the whole product'],
    ],
  },
  'wp-401-pure-titanium-vacuum-insulated-bottle': {
    columns: ['Bottle type', 'Best fit', 'Buyer note'],
    rows: [
      ['Titanium liner bottle', 'Premium drinkware programs', 'Titanium is part of the drinking surface story'],
      ['Full stainless bottle', 'General drinkware programs', 'Familiar and widely understood category'],
      ['Plastic bottle', 'Budget hydration programs', 'Better for low-cost needs than premium metal gifting'],
    ],
  },
  'wp-402-pure-titanium-capsule-bottle-150ml': {
    columns: ['Bottle size', 'Best fit', 'Set fit'],
    rows: [
      ['150ml capsule bottle', 'Short carry and compact sets', 'Easy to pair with small tools'],
      ['500ml bottle', 'Daily hydration', 'Larger gift-set footprint'],
      ['Desk cup', 'Fixed desk use', 'Best when the drinkware stays at the workstation'],
    ],
  },
  'wp-403-weighted-vacuum-insulated-office-tumbler': {
    columns: ['Drinkware', 'Best fit', 'Buyer note'],
    rows: [
      ['Office tumbler', 'Desk and meeting use', 'Larger branding area'],
      ['Desk cup', 'Compact workstation use', 'Smaller footprint'],
      ['Travel bottle', 'Commute and carry', 'More portable'],
    ],
  },
  'wp-404-bamboo-groove-stainless-steel-mug': {
    columns: ['Mug type', 'Best fit', 'Buyer note'],
    rows: [
      ['Bamboo-groove mug', 'Field and casual drinkware gifts', 'Tactile grip detail'],
      ['Desk cup', 'Workstation use', 'Cleaner office format'],
      ['Travel bottle', 'Sealed carry', 'Better for commute and bag carry'],
    ],
  },
  'wp-405-ice-crystal-pure-titanium-egg-cup': {
    columns: ['Drinkware format', 'Best fit', 'Buyer note'],
    rows: [
      ['Titanium egg cup', 'Compact premium presentation', 'Distinct shape'],
      ['Desk cup', 'Daily office drinking', 'More practical workstation form'],
      ['Capsule bottle', 'Carry use', 'Sealed format'],
    ],
  },
  'wp-406-pure-titanium-capsule-bottle-200ml': {
    columns: ['Capacity', 'Best fit', 'Buyer note'],
    rows: [
      ['150ml', 'Smallest capsule sets', 'Lowest footprint'],
      ['200ml', 'Compact carry with more volume', 'Balanced set fit'],
      ['500ml+', 'Daily hydration', 'Larger packaging footprint'],
    ],
  },
  'wp-407-double-wall-stainless-steel-desk-cup': {
    columns: ['Drinkware type', 'Best fit', 'Buyer note'],
    rows: [
      ['Desk cup', 'Fixed workstation use', 'Compact and easy to place'],
      ['Travel bottle', 'Carry and commute', 'Best when sealing and portability matter'],
      ['Mug with handle', 'Casual drinkware', 'Larger hand-grip format'],
    ],
  },
}

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

  try {
    for (const [id, table] of Object.entries(tables)) {
      await sql`
        update products
        set comparison_table = ${sql.json(table)}
        where id = ${id}
      `
      console.log(`Updated ${id}`)
    }
  } finally {
    await sql.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

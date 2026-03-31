import { db } from './db'
import { products } from './schema'
import { eq } from 'drizzle-orm'

const categoryMap: Record<string, string> = {
  // Writing Instruments (4)
  'bolt-action-pen-01': 'Writing Instruments',
  'tactical-stainless-steel-pen-01': 'Writing Instruments',
  'aluminum-inkless-pen-01': 'Writing Instruments',
  'metal-multifunctional-tool-ballpoint-pen-01': 'Writing Instruments',

  // Desk Accessories (7)
  'aluminium-double-sided-mouse-pad': 'Desk Accessories',
  'aluminium-metal-pen-holder-01': 'Desk Accessories',
  'letter-opener-01': 'Desk Accessories',
  'letter-opener-02': 'Desk Accessories',
  'metal-bookmark-01': 'Desk Accessories',
  'edc-carbon-fibre-magnetic-fidget-sticks-01': 'Desk Accessories',
  'precision-brass-spinning-01': 'Desk Accessories',

  // EDC Accessories (7)
  'badge-holder-card-holder-with-metal-clip': 'EDC Accessories',
  'edc-folding-metal-scissors-01': 'EDC Accessories',
  'industrial-mini-edc-pry-bar-01': 'EDC Accessories',
  'integrated-boxed-nail-clipper-01': 'EDC Accessories',
  'key-chain-organizer-holder-01': 'EDC Accessories',
  'stainless-steel-money-clip-01': 'EDC Accessories',
  'titanium-anti-static-comb-01': 'EDC Accessories',

  // Drinkware (1)
  'titanium-water-bottle-01': 'Drinkware',
}

for (const [id, category] of Object.entries(categoryMap)) {
  await db.update(products).set({ category }).where(eq(products.id, id))
  console.log(`✅ ${id} → ${category}`)
}

console.log('\nDone. Total:', Object.keys(categoryMap).length)
process.exit(0)

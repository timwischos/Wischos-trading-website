/**
 * Run with: npx tsx src/server/seed-products.ts
 * Inserts all new products into Supabase.
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

const newProducts = [
  {
    id: 'aluminium-metal-pen-holder-01',
    name: 'Aluminium Metal Pen Holder',
    tagline: 'Keep your workspace sharp and organised',
    description:
      'A precision-machined aluminium pen holder for the modern desk. Clean geometry, anodized finish that ages beautifully, and a weighted base that stays put. Available with laser-engraved logo or embossed branding for full corporate customisation.',
    category: 'Desk Accessories',
    materials: ['Aircraft-Grade Aluminium', 'Anodized Finish'],
    heroImage: '/products/Aluminium-Metal-pen-holder-01/Aluminium-Metal-pen-holder-01-cover.avif',
    images: [
      '/products/Aluminium-Metal-pen-holder-01/Aluminium-Metal-pen-holder-01-cover.avif',
      '/products/Aluminium-Metal-pen-holder-01/Aluminium-Metal-pen-holder-01-hover.avif',
      '/products/Aluminium-Metal-pen-holder-01/Aluminium-Metal-pen-holder-01-detail-1.avif',
      '/products/Aluminium-Metal-pen-holder-01/Aluminium-Metal-pen-holder-01-detail-2.avif',
      '/products/Aluminium-Metal-pen-holder-01/Aluminium-Metal-pen-holder-01-detail-3.avif',
    ],
    moq: 50,
    customizationOptions: ['Laser Engraving', 'Anodized Color Options', 'Custom Packaging'],
    sortOrder: 20,
    active: true,
  },
  {
    id: 'badge-holder-card-holder-with-metal-clip',
    name: 'Badge Holder with Metal Clip',
    tagline: 'Professional identity, every day',
    description:
      'A refined badge and ID card holder machined from premium metal. The spring-loaded clip provides secure attachment to any lanyard or lapel, while the polished finish keeps your brand looking its best. Engrave your logo for a lasting impression at every event and conference.',
    category: 'Office Accessories',
    materials: ['Stainless Steel', 'Spring Steel Clip', 'Polished Finish'],
    heroImage: '/products/Badge-holder-card-holder-with-metal-clip/Badge Holder, ID Card Holder with Metal Clip-01-cover.avif',
    images: [
      '/products/Badge-holder-card-holder-with-metal-clip/Badge Holder, ID Card Holder with Metal Clip-01-cover.avif',
      '/products/Badge-holder-card-holder-with-metal-clip/Badge Holder, ID Card Holder with Metal Clip-01-hover.avif',
      '/products/Badge-holder-card-holder-with-metal-clip/Badge Holder, ID Card Holder with Metal Clip-01-detail-1.avif',
      '/products/Badge-holder-card-holder-with-metal-clip/Badge Holder, ID Card Holder with Metal Clip-01-detail-2.avif',
      '/products/Badge-holder-card-holder-with-metal-clip/Badge Holder, ID Card Holder with Metal Clip-01-detail-3.avif',
      '/products/Badge-holder-card-holder-with-metal-clip/Badge Holder, ID Card Holder with Metal Clip-01-detail-4.avif',
    ],
    moq: 50,
    customizationOptions: ['Logo Engraving', 'Clip Finish Options', 'Custom Card Insert', 'Gift Box Packaging'],
    sortOrder: 30,
    active: true,
  },
  {
    id: 'bolt-action-pen-01',
    name: 'Bolt-Action Pen',
    tagline: 'The satisfying click of precision engineering',
    description:
      'A bolt-action mechanism inspired by precision machining tools. A single thumb motion deploys and retracts the tip with a clean, audible click. Full-size aluminium barrel with comfortable knurled grip. Writes with standard Parker-style refills. A pen people will reach for on purpose.',
    category: 'Writing Instruments',
    materials: ['Aircraft Aluminium', 'Brass Internals', 'Anodized Finish'],
    heroImage: '/products/Bolt-action-pen-01/Bolt-action-pen-01-cover.avif',
    images: [
      '/products/Bolt-action-pen-01/Bolt-action-pen-01-cover.avif',
      '/products/Bolt-action-pen-01/Bolt-action-pen-01-hover.avif',
      '/products/Bolt-action-pen-01/Bolt-action-pen-01-detail-1.avif',
      '/products/Bolt-action-pen-01/Bolt-action-pen-01-detail-2.avif',
      '/products/Bolt-action-pen-01/Bolt-action-pen-01-detail-3.avif',
    ],
    moq: 50,
    customizationOptions: ['Barrel Engraving', 'Anodized Color', 'Premium Gift Box', 'Refill Included'],
    sortOrder: 40,
    active: true,
  },
  {
    id: 'edc-carbon-fibre-magnetic-fidget-sticks-01',
    name: 'Carbon Fibre Magnetic Fidget Sticks',
    tagline: 'Tactile precision for the focused mind',
    description:
      'Two high-grade carbon fibre rods connected by embedded rare-earth magnets. Roll them, stack them, spin them — the interaction is endlessly satisfying. A kinetic desk object that signals attention to detail without saying a word. Makes an unforgettable gift for executives and engineers alike.',
    category: 'EDC Accessories',
    materials: ['High-Grade Carbon Fibre', 'Neodymium Magnets', 'Stainless Steel Caps'],
    heroImage: '/products/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01-cover.avif',
    images: [
      '/products/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01-cover.avif',
      '/products/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01-hover.avif',
      '/products/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01-detail-1.avif',
      '/products/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01-detail-2.avif',
      '/products/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01-detail-3.avif',
      '/products/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01-detail-4.avif',
      '/products/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01/EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01-lifestyle.avif',
    ],
    moq: 50,
    customizationOptions: ['Laser Engraving on Caps', 'Custom Magnetic Strength', 'Branded Carry Case'],
    sortOrder: 50,
    active: true,
  },
  {
    id: 'key-chain-organizer-holder-01',
    name: 'Key Chain Organiser',
    tagline: 'Silence the jingle, organise the everyday',
    description:
      'A machined aluminium key organiser that keeps your keys flat, silent, and stacked in a compact form. Swiss-thread pivot screw with adjustable tension. Carry only what you need — and carry it beautifully. A practical gift that earns a permanent place in the pocket.',
    category: 'EDC Accessories',
    materials: ['Aircraft Aluminium', 'Titanium Pivot Screw', 'Anodized Finish'],
    heroImage: '/products/Key-chain-organizer-holder-01/Key-chain-organizer-holder-01-cover.avif',
    images: [
      '/products/Key-chain-organizer-holder-01/Key-chain-organizer-holder-01-cover.avif',
      '/products/Key-chain-organizer-holder-01/Key-chain-organizer-holder-01-hover.avif',
      '/products/Key-chain-organizer-holder-01/Key-chain-organizer-holder-01-detail-1.avif',
      '/products/Key-chain-organizer-holder-01/Key-chain-organizer-holder-01-detail-2.avif',
      '/products/Key-chain-organizer-holder-01/Key-chain-organizer-holder-01-detail-3.avif',
      '/products/Key-chain-organizer-holder-01/Key-chain-organizer-holder-01-detail-4.avif',
    ],
    moq: 50,
    customizationOptions: ['Anodized Color Options', 'Logo Engraving on Body', 'Custom Key Slot Count', 'Branded Pouch'],
    sortOrder: 60,
    active: true,
  },
  {
    id: 'letter-opener-01',
    name: 'Letter Opener Series I',
    tagline: 'A desk instrument that outlasts the inbox',
    description:
      'A single continuous piece of stainless steel, mirror polished and perfectly balanced. Opens correspondence with clean authority. Equally at home as an executive desk piece or a thoughtful closing gift. The engraved logo sits flush with the surface — no raised edges, no fuss.',
    category: 'Desk Accessories',
    materials: ['304 Stainless Steel', 'Mirror Polish Finish'],
    heroImage: '/products/Letter-opener-01/Letter-opener-01-cover.avif',
    images: [
      '/products/Letter-opener-01/Letter-opener-01-cover.avif',
      '/products/Letter-opener-01/Letter-opener-01-hover.avif',
      '/products/Letter-opener-01/Letter-opener-01-detail-1.avif',
      '/products/Letter-opener-01/Letter-opener-01-detail-2.avif',
      '/products/Letter-opener-01/Letter-opener-01-detail-3.avif',
      '/products/Letter-opener-01/Letter-opener-01-lifestyle.avif',
    ],
    moq: 50,
    customizationOptions: ['Laser Engraving', 'Matte or Mirror Finish', 'Presentation Gift Box'],
    sortOrder: 70,
    active: true,
  },
  {
    id: 'letter-opener-02',
    name: 'Letter Opener Series II',
    tagline: 'Warm metal, cold efficiency',
    description:
      'Series II introduces solid brass with a hand-brushed finish. Slightly heavier than Series I, with an ergonomic taper for a secure grip. The natural patina it develops over months of use becomes uniquely personal — no two will age the same way. An heirloom-grade desk instrument.',
    category: 'Desk Accessories',
    materials: ['Solid Brass', 'Hand-Brushed Finish'],
    heroImage: '/products/Letter-opener-02/Letter-opener-02-cover.avif',
    images: [
      '/products/Letter-opener-02/Letter-opener-02-cover.avif',
      '/products/Letter-opener-02/Letter-opener-02-hover.avif',
      '/products/Letter-opener-02/Letter-opener-02-detail-1.avif',
      '/products/Letter-opener-02/Letter-opener-02-detail-2.avif',
      '/products/Letter-opener-02/Letter-opener-02-detail-3.avif',
      '/products/Letter-opener-02/Letter-opener-02-lifestyle.avif',
    ],
    moq: 50,
    customizationOptions: ['Name or Logo Engraving', 'Lacquer Coating Option', 'Custom Leather Sleeve'],
    sortOrder: 80,
    active: true,
  },
  {
    id: 'metal-multifunctional-tool-ballpoint-pen-01',
    name: 'Multi-Tool Ballpoint Pen',
    tagline: 'Writes notes. Opens bottles. Gets things done.',
    description:
      'A full-size precision ballpoint pen with integrated multi-tool functions including a flat-head screwdriver, bottle opener, and capacitive stylus tip. 316 stainless steel construction with a comfortable knurled grip section. A genuinely useful gift that earns daily carry.',
    category: 'Writing Instruments',
    materials: ['316 Stainless Steel', 'Hardened Tool Steel Bits', 'Knurled Grip'],
    heroImage: '/products/Metal-Multifunctional-Tool-Ballpoint-Pen-01/Metal-Multifunctional -Tool-Ballpoint -Pen-01-cover.avif',
    images: [
      '/products/Metal-Multifunctional-Tool-Ballpoint-Pen-01/Metal-Multifunctional -Tool-Ballpoint -Pen-01-cover.avif',
      '/products/Metal-Multifunctional-Tool-Ballpoint-Pen-01/Metal-Multifunctional -Tool-Ballpoint -Pen-01-hover.avif',
      '/products/Metal-Multifunctional-Tool-Ballpoint-Pen-01/Metal-Multifunctional -Tool-Ballpoint -Pen-01-detail-1.avif',
      '/products/Metal-Multifunctional-Tool-Ballpoint-Pen-01/Metal-Multifunctional -Tool-Ballpoint -Pen-01-detail-2.avif',
      '/products/Metal-Multifunctional-Tool-Ballpoint-Pen-01/Metal-Multifunctional -Tool-Ballpoint -Pen-01-detail-3.avif',
      '/products/Metal-Multifunctional-Tool-Ballpoint-Pen-01/Metal-Multifunctional -Tool-Ballpoint -Pen-01-detail-4.avif',
      '/products/Metal-Multifunctional-Tool-Ballpoint-Pen-01/Metal-Multifunctional -Tool-Ballpoint -Pen-01-detail-5.avif',
    ],
    moq: 50,
    customizationOptions: ['Barrel Engraving', 'Tool Bit Configuration', 'Custom Gift Packaging'],
    sortOrder: 90,
    active: true,
  },
  {
    id: 'precision-brass-spinning-01',
    name: 'Precision Brass Spinning Top',
    tagline: 'Three minutes of spin from a single finger flick',
    description:
      'Machined from a single billet of solid brass with a tungsten carbide tip for maximum spin time and minimal friction. Set it spinning on any flat surface. The weight, balance, and sound are immediately recognisable as something made with intent. A desk object that invites curiosity and rewards patience.',
    category: 'EDC Accessories',
    materials: ['Solid Brass', 'Tungsten Carbide Tip'],
    heroImage: '/products/Precision-brass-spinning-01/Precision-brass-spinning-01-cover.avif',
    images: [
      '/products/Precision-brass-spinning-01/Precision-brass-spinning-01-cover.avif',
      '/products/Precision-brass-spinning-01/Precision-brass-spinning-01-hover.avif',
      '/products/Precision-brass-spinning-01/Precision-brass-spinning-01-detail-1.avif',
      '/products/Precision-brass-spinning-01/Precision-brass-spinning-01-detail-2.avif',
      '/products/Precision-brass-spinning-01/Precision-brass-spinning-01-detail-3.avif',
    ],
    moq: 50,
    customizationOptions: ['Brand Engraving on Base', 'Polished or Brushed Finish', 'Premium Wood Presentation Box'],
    sortOrder: 100,
    active: true,
  },
  {
    id: 'tactical-stainless-steel-pen-01',
    name: 'Tactical Stainless Steel Pen',
    tagline: 'Engineered to write anywhere. Built to last forever.',
    description:
      '316 stainless steel construction with precision knurling for grip control in any condition. Uses a pressurised cartridge that writes upside down, at altitude, and in extreme temperatures. The clip is machined from the same billet as the barrel — no welds, no weakness. The pen that outlasts the notebook.',
    category: 'Writing Instruments',
    materials: ['316 Stainless Steel', 'Pressurised Cartridge', 'Machined Knurling'],
    heroImage: '/products/Tactical-Stainless-Steel-pen-01/Tactical-Stainless-Steel-pen-01-cover.avif',
    images: [
      '/products/Tactical-Stainless-Steel-pen-01/Tactical-Stainless-Steel-pen-01-cover.avif',
      '/products/Tactical-Stainless-Steel-pen-01/Tactical-Stainless-Steel-pen-01-hover.avif',
      '/products/Tactical-Stainless-Steel-pen-01/Tactical-Stainless-Steel-pen-01-detail-1.avif',
      '/products/Tactical-Stainless-Steel-pen-01/Tactical-Stainless-Steel-pen-01-detail-2.avif',
      '/products/Tactical-Stainless-Steel-pen-01/Tactical-Stainless-Steel-pen-01-detail-3.avif',
      '/products/Tactical-Stainless-Steel-pen-01/Tactical-Stainless-Steel-pen-01-detail-4.avif',
      '/products/Tactical-Stainless-Steel-pen-01/Tactical-Stainless-Steel-pen-01-detail-5.avif',
      '/products/Tactical-Stainless-Steel-pen-01/Tactical-Stainless-Steel-pen-01-detail-6.avif',
    ],
    moq: 50,
    customizationOptions: ['Deep Barrel Engraving', 'Grip Pattern Options', 'Gift Box with Spare Refills'],
    sortOrder: 110,
    active: true,
  },
  {
    id: 'titanium-anti-static-comb-01',
    name: 'Titanium Anti-Static Comb',
    tagline: 'The last comb you will ever need',
    description:
      'Grade 5 titanium with an anti-static treatment that prevents hair from clinging to the teeth. Precision-cut with no sharp edges. At 18g, it disappears in a jacket pocket. Hypoallergenic, corrosion-proof, and virtually indestructible. A gift that signals thoughtfulness and quality without being showy.',
    category: 'EDC Accessories',
    materials: ['Grade 5 Titanium', 'Anti-Static Treatment', 'Anodized Finish'],
    heroImage: '/products/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01-cover.avif',
    images: [
      '/products/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01-cover.avif',
      '/products/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01-hover.avif',
      '/products/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01-detail-1.avif',
      '/products/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01-detail-2.avif',
      '/products/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01-detail-3.avif',
      '/products/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01-detail-4.avif',
      '/products/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01/Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01-detail-5.avif',
    ],
    moq: 50,
    customizationOptions: ['Anodized Color Options', 'Engraved Name or Logo', 'Branded Sleeve Packaging'],
    sortOrder: 120,
    active: true,
  },
  {
    id: 'titanium-water-bottle-01',
    name: 'Titanium Water Bottle',
    tagline: 'Pure taste. No plastic. No compromise.',
    description:
      'Single-wall titanium construction that never imparts taste or odour. No liner, no coatings — just pure metal meeting pure water. At 90g for a 500ml bottle, it weighs less than the water inside. The brushed satin finish resists fingerprints and scratches in equal measure. A gift that travels.',
    category: 'Drinkware',
    materials: ['Grade 1 Titanium', 'Brushed Satin Finish', 'Titanium Cap'],
    heroImage: '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-cover.avif',
    images: [
      '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-cover.avif',
      '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-hover.avif',
      '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-detail-1.avif',
      '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-detail-2.avif',
      '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-detail-3.avif',
      '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-detail-4.avif',
      '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-detail-5.avif',
      '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-detail-6.avif',
      '/products/Titanium-water-bottle-01/Titanium-water-bottle-01-lifestyle.avif',
    ],
    moq: 50,
    customizationOptions: ['Laser Engraving', 'Custom Volume Options', 'Corporate Gift Set with Box'],
    sortOrder: 130,
    active: true,
  },
]

async function main() {
  console.log(`Inserting ${newProducts.length} products...`)
  for (const product of newProducts) {
    try {
      await db.insert(products).values(product).onConflictDoNothing()
      console.log(`✓ ${product.id}`)
    } catch (err) {
      console.error(`✗ ${product.id}:`, err)
    }
  }
  console.log('Done.')
  await sql.end()
}

main()

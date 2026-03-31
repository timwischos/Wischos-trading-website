export interface GiftSetComponent {
  sku: string
  name: string
  productId: string
  imageIndex: number  // which detail image this component corresponds to (1, 2, or 3)
}

export interface GiftSet {
  id: string
  sku: string
  name: string
  tagline: string
  heroCopy: string
  sellingPoints: { title: string; body: string }[]
  components: GiftSetComponent[]
  targetBuyer: string
  packaging: string
  cta: string
  fob: string
  expertNotes: { title: string; body: string }[]
  coverImage: string
  hoverImage?: string
  images: string[]
}

export const giftSets: GiftSet[] = [
  {
    id: 'wgs-001-3-the-desk-starter',
    sku: 'WGS-001-3',
    name: 'The Desk Starter',
    tagline: 'Three tools. Every desk. No excuses.',
    heroCopy:
      'The cleanest entry into branded desk gifting. Three precision metal tools that cover the fundamentals of a professional workstation — writing, opening, marking. Every piece is built to last, laser-engraved to brand, and designed to stay on the desk rather than in a drawer.',
    sellingPoints: [
      {
        title: 'Zero-Waste Writing',
        body: 'The inkless tip writes up to 20,000m with no ink, no refills, no waste. An ESG-aligned product story that resonates with sustainability-conscious procurement teams.',
      },
      {
        title: 'Matte Metal Aesthetic Unity',
        body: 'All three pieces share a matte-finish metal language. They photograph as a set, not as three unrelated items — critical for branded gifting catalogs and social presentation.',
      },
      {
        title: 'Full Customization at Entry Price',
        body: 'Laser engraving across all three pieces ensures consistent brand presence at the most accessible price point in the lineup.',
      },
    ],
    components: [
      { sku: 'WP-102', name: 'Executive Dual-Head Metal Pen (Inkless)', productId: 'WP-102-executive-dual-head-metal-pen', imageIndex: 1 },
      { sku: 'WP-203', name: 'Executive Zinc Alloy Letter Opener', productId: 'WP-203-executive-zinc-alloy-letter-opener', imageIndex: 2 },
      { sku: 'WP-205', name: 'Precision Custom Metal Bookmark', productId: 'WP-205-precision-custom-metal-bookmark', imageIndex: 3 },
    ],
    targetBuyer: 'SME corporate gifting, ESG-focused brands, conference giveaways, academic institutions, first bulk order clients',
    packaging: 'Corrugated Packaging Box + EVA Foam Insert',
    cta: 'A sharp first impression at a practical MOQ.',
    fob: '$18–28',
    expertNotes: [],
    coverImage: '/products/WGS-001-3-The-Desk-Starter/The-Desk-Starter-cover.avif',
    hoverImage: '/products/WGS-001-3-The-Desk-Starter/The-Desk-Starter-hover.avif',
    images: [
      '/products/WGS-001-3-The-Desk-Starter/The-Desk-Starter-cover.avif',
      '/products/WGS-001-3-The-Desk-Starter/The-Desk-Starter-detail-1.avif',
      '/products/WGS-001-3-The-Desk-Starter/The-Desk-Starter-detail-2.avif',
      '/products/WGS-001-3-The-Desk-Starter/The-Desk-Starter-detail-3.avif',
    ],
  },
  {
    id: 'wgs-002-3-the-mechanical-desk',
    sku: 'WGS-002-3',
    name: 'The Mechanical Desk',
    tagline: 'For the desk that thinks with its hands.',
    heroCopy:
      'Three precision mechanisms. One set. The bolt-action click, the spinning propeller, the weighted brass top — each piece engineered with a distinct tactile interaction that makes it impossible to ignore. These are performance tools that happen to be satisfying to use.',
    sellingPoints: [
      {
        title: 'Three Mechanical Moments',
        body: 'Every piece has a different kinetic interaction: bolt click, propeller spin, top rotation. A set that gets picked up, handled, and remembered — by the recipient and everyone who visits their desk.',
      },
      {
        title: 'Brass Weight at Mid-Range Price',
        body: 'Solid brass construction on both the pen and spinning top delivers a material quality that outpunches the price point. The heft is the message.',
      },
      {
        title: 'Conversation-Starter Gifting',
        body: 'In a sea of identical branded mugs, this set opens conversations. Each piece is a talking point at meetings, site visits, and client calls.',
      },
    ],
    components: [
      { sku: 'WP-101', name: 'Brass Crown Bolt-Action Pen', productId: 'WP-101-brass-crown-bolt-action-pen', imageIndex: 2 },
      { sku: 'WP-204', name: 'Propeller Spinning Letter Opener', productId: 'WP-204-propeller-spinning-letter-opener', imageIndex: 1 },
      { sku: 'WP-206', name: 'Precision Brass Spinning Top', productId: 'WP-206-precision-brass-spinning-top', imageIndex: 3 },
    ],
    targetBuyer: 'Tech companies, engineering firms, product teams, design studios, innovation-focused brands',
    packaging: 'Corrugated Packaging Box + EVA Foam Insert',
    cta: 'Precision mechanisms. Permanent brand mark.',
    fob: '$28–42',
    expertNotes: [],
    coverImage: '/products/WGS-002-3-The-Mechanical-Desk/The-Mechanical-Desk-cover.avif',
    hoverImage: '/products/WGS-002-3-The-Mechanical-Desk/The-Mechanical-Desk-hover.avif',
    images: [
      '/products/WGS-002-3-The-Mechanical-Desk/The-Mechanical-Desk-cover.avif',
      '/products/WGS-002-3-The-Mechanical-Desk/The-Mechanical-Desk-detail-1.avif',
      '/products/WGS-002-3-The-Mechanical-Desk/The-Mechanical-Desk-detail-2.avif',
      '/products/WGS-002-3-The-Mechanical-Desk/The-Mechanical-Desk-detail-3.avif',
    ],
  },
  {
    id: 'wgs-003-3-the-pocket-three',
    sku: 'WGS-003-3',
    name: 'The Pocket Three',
    tagline: "Everything in your pocket. Nothing you don't need.",
    heroCopy:
      "A lean EDC set for the professional who carries only what works. The brass key organizer eliminates key jangle; the stainless clip keeps cards and cash flat; the keychain nail clipper handles the small moments. Three tools, three pockets, zero bulk.",
    sellingPoints: [
      {
        title: 'Pocket-Optimized Form Factor',
        body: "Each piece is specifically sized for everyday carry without protrusion or snag. All three disappear into a pocket; none of them feel like an afterthought.",
      },
      {
        title: 'Three-Metal Material Story',
        body: 'Brass organizer, stainless steel clip, zinc alloy clipper — a deliberate mix of precision metals that signals quality without demanding attention.',
      },
      {
        title: 'Gender-Neutral Utility',
        body: "One of the few corporate gift sets that works equally for any professional without demographic assumptions. Broader targeting, fewer returns.",
      },
    ],
    components: [
      { sku: 'WP-302', name: 'Industrial Brass Key Organizer', productId: 'WP-302-industrial-brass-key-organizer', imageIndex: 2 },
      { sku: 'WP-303', name: 'Industrial Stainless Steel Money Clip', productId: 'WP-303-industrial-stainless-steel-money-clip', imageIndex: 1 },
      { sku: 'WP-306', name: 'Executive Zinc Alloy Nail Clipper', productId: 'WP-306-executive-zinc-alloy-nail-clipper', imageIndex: 3 },
    ],
    targetBuyer: 'HR teams, employee wellness kits, finance/banking sector, insurance brokers, retail client appreciation gifts',
    packaging: 'Corrugated Packaging Box + EVA Foam Insert',
    cta: 'The set that stays in the pocket.',
    fob: '$22–32',
    expertNotes: [],
    coverImage: '/products/WGS-003-3-The-Pocket-Three/The-Pocket-Three-cover.avif',
    hoverImage: '/products/WGS-003-3-The-Pocket-Three/The-Pocket-Three-hover.avif',
    images: [
      '/products/WGS-003-3-The-Pocket-Three/The-Pocket-Three-cover.avif',
      '/products/WGS-003-3-The-Pocket-Three/The-Pocket-Three-detail-1.avif',
      '/products/WGS-003-3-The-Pocket-Three/The-Pocket-Three-detail-2.avif',
      '/products/WGS-003-3-The-Pocket-Three/The-Pocket-Three-detail-3.avif',
    ],
  },
  {
    id: 'wgs-004-3-the-field-edc',
    sku: 'WGS-004-3',
    name: 'The Field EDC',
    tagline: 'Built for the field. Sharp enough for the office.',
    heroCopy:
      'Three multi-function tools selected for environments where utility matters more than appearance. The tactical pen writes and breaks glass; the pry bar opens, pries, and keys; the folding scissors cut and pack flat. Together they cover situations that standard office gifts ignore entirely.',
    sellingPoints: [
      {
        title: 'Emergency-Ready Trio',
        body: 'Glass breaker, prying edge, cutting blade: a functional overlap across safety, daily utility, and emergency preparedness that carries a story beyond aesthetics.',
      },
      {
        title: 'All-Metal, No Plastic',
        body: "No polymer components, no moving parts that wear out. Built to outlast the environments they're carried into — a durability claim most corporate gifts can't make.",
      },
      {
        title: 'Differentiated Sector Gifting',
        body: "A non-obvious gift for sectors where it hits hardest: construction, logistics, security, defense-adjacent, outdoor retail. Stands out precisely because it's not a desk set.",
      },
    ],
    components: [
      { sku: 'WP-103', name: 'Tactical Stainless Steel Pen with Glass Breaker', productId: 'WP-103-tactical-stainless-steel-pen', imageIndex: 1 },
      { sku: 'WP-305', name: 'Industrial Mini EDC Pry Bar', productId: 'WP-305-industrial-mini-edc-pry-bar', imageIndex: 2 },
      { sku: 'WP-307', name: 'EDC Folding Metal Scissors', productId: 'WP-307-edc-folding-metal-scissors', imageIndex: 3 },
    ],
    targetBuyer: 'Construction firms, logistics companies, outdoor equipment brands, safety-focused corporate clients, field service teams',
    packaging: 'Corrugated Packaging Box + EVA Foam Insert',
    cta: 'Field-ready tools, brand-ready finish.',
    fob: '$28–38',
    expertNotes: [],
    coverImage: '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-cover.avif',
    hoverImage: '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-hover.avif',
    images: [
      '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-cover.avif',
      '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-detail-1.avif',
      '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-detail-2.avif',
      '/products/WGS-004-3-The-Field-EDC/The-Field-EDC-detail-3.avif',
    ],
  },
  {
    id: 'wgs-005-3-the-morning-ritual',
    sku: 'WGS-005-3',
    name: 'The Morning Ritual',
    tagline: 'The three you reach for before you leave.',
    heroCopy:
      'One flask, one comb, one pen — the complete pocket load-out for the professional morning. Shirt-pocket sized flask in pure titanium, precision comb that doubles as a multi-tool, brass pen with a mechanism worth using. The material pairing — titanium and brass — is intentional and cohesive.',
    sellingPoints: [
      {
        title: 'Shirt-Pocket Complete',
        body: 'All three pieces fit in a jacket or shirt pocket. The 150ml flask is explicitly pocket-sized; the comb slides flat; the pen clips. The most carry-efficient set in the lineup.',
      },
      {
        title: 'Titanium + Brass Material Pairing',
        body: 'The titanium flask and comb share a brushed metal surface that pairs deliberately with the brass pen. Two-tone premium, one unified story.',
      },
      {
        title: 'Zero Disposables Across the Set',
        body: 'No ink, no plastic, no consumables. Pure titanium flask (no metallic odor, no lining to degrade), titanium comb (static-resistant, no tooth breakage), refillable brass pen. A set built to accompany the recipient for years.',
      },
    ],
    components: [
      { sku: 'WP-101', name: 'Brass Crown Bolt-Action Pen', productId: 'WP-101-brass-crown-bolt-action-pen', imageIndex: 3 },
      { sku: 'WP-402', name: 'Pure Titanium Capsule Flask (150ml)', productId: 'WP-402-pure-titanium-capsule-flask-150ml', imageIndex: 2 },
      { sku: 'WP-304', name: 'Titanium Anti-Static EDC Comb Multi-Tool', productId: 'WP-304-titanium-anti-static-edc-comb', imageIndex: 1 },
    ],
    targetBuyer: 'Executive gifting, men\'s grooming/lifestyle brands, finance sector, premium HR onboarding programs, high-value client retention gifts',
    packaging: 'Corrugated Packaging Box + EVA Foam Insert',
    cta: 'The set for the professional who packs intentionally.',
    fob: '$38–50',
    expertNotes: [],
    coverImage: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover.avif',
    hoverImage: '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-hover.avif',
    images: [
      '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-cover.avif',
      '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-detail-1.avif',
      '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-detail-2.avif',
      '/products/WGS-005-3-The-Morning-Ritual/The-Morning-Ritual-detail-3.avif',
    ],
  },
  {
    id: 'wgs-006-3-the-first-day',
    sku: 'WGS-006-3',
    name: 'The First Day',
    tagline: 'Everything you need. Day one.',
    heroCopy:
      'The set built around the moment of arrival. Badge holder for access, six-function tool pen for the first meeting, aluminum pen holder for the desk that\'s now theirs. Three precision metal tools that cover the practical and the professional — laser-engraved with your brand before the first day begins.',
    sellingPoints: [
      {
        title: 'Badge Holder as First Touchpoint',
        body: 'The RFID-blocking aluminum badge holder is the first branded object a new hire touches. It handles daily access from the moment they arrive, and the laser-engraved logo stays visible every time they swipe in.',
      },
      {
        title: '6-in-1 Pen — Proportional Value, Practical Utility',
        body: 'Ballpoint, LED, stylus, ruler, screwdriver, spirit level: six functions in a single metal body. A gift that keeps revealing new utility — and keeps the brand in hand each time.',
      },
      {
        title: 'Aluminum Identity System',
        body: 'All three pieces share aluminum construction with anodized finish. Photographed together, they read as a single designed system. The coherence of materials is the first signal that this company gets the details right.',
      },
    ],
    components: [
      { sku: 'WP-301', name: 'RFID Aluminum Wallet & Badge Holder', productId: 'WP-301-rfid-aluminum-wallet-badge-holder', imageIndex: 1 },
      { sku: 'WP-104', name: '6-in-1 Precision Metal Tool Pen', productId: 'WP-104-6-in-1-precision-metal-tool-pen', imageIndex: 3 },
      { sku: 'WP-202', name: 'Precision Aluminum Pen Holder', productId: 'WP-202-precision-aluminum-pen-holder', imageIndex: 2 },
    ],
    targetBuyer: 'Enterprise HR onboarding teams, tech company new hire welcome kits, co-working space membership gifts, trade show badge + welcome pack combos',
    packaging: 'Corrugated Packaging Box + EVA Foam Insert',
    cta: 'Turn day one into a brand moment.',
    fob: '$25–38',
    expertNotes: [],
    coverImage: '/products/WGS-006-3-The-First-Day/The-First-Day-cover.avif',
    hoverImage: '/products/WGS-006-3-The-First-Day/The-First-Day-hover.avif',
    images: [
      '/products/WGS-006-3-The-First-Day/The-First-Day-cover.avif',
      '/products/WGS-006-3-The-First-Day/The-First-Day-detail-1.avif',
      '/products/WGS-006-3-The-First-Day/The-First-Day-detail-2.avif',
      '/products/WGS-006-3-The-First-Day/The-First-Day-detail-3.avif',
    ],
  },
]

export function getGiftSetById(id: string): GiftSet | undefined {
  return giftSets.find((s) => s.id === id)
}

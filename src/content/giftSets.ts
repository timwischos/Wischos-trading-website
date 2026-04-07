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
    expertNotes: [
      {
        title: 'Why inkless over ballpoint',
        body: 'The inkless tip pen is the counterintuitive choice — it writes on most surfaces without ink, lasts 20,000m, and surprises recipients who have never used one. For procurement teams that track sustainability metrics, it delivers a tangible ESG story without greenwashing. For everyone else, it is a writing instrument that never runs dry.',
      },
      {
        title: 'Why a letter opener in 2026',
        body: 'Physical mail is back in corporate environments — contracts, invoices, signed documents, and marketing parcels. A precision letter opener signals that someone thought about the full desk experience, not just the screen. It is also one of the most visible objects on a desk: upright, catching light, carrying a brand mark at eye level every working day.',
      },
      {
        title: 'Why Kraft Rigid Box?',
        body: 'A kraft rigid box uses 1200gsm+ greyboard wrapped in unbleached kraft paper. It delivers premium unboxing weight (the lid lifts with deliberate resistance) at 30–40% less cost than laminated art-paper boxes. The natural brown tone aligns with the sustainability narrative of the inkless pen inside — an intentional material pairing, not a budget compromise.',
      },
      {
        title: 'Logo on Packaging: Hot Foil Stamping',
        body: 'For kraft surfaces, hot foil stamping (gold, silver, or copper) creates the highest contrast and perceived value. The foil fuses into the paper fibers under heat and pressure, producing a metallic imprint that is scratch-resistant and does not peel. Alternative: debossing (blind stamp without foil) creates an elegant tone-on-tone tactile logo — quieter but highly refined.',
      },
      {
        title: 'Upgrade Option: Magnetic Closure Box',
        body: 'For clients seeking a higher-tier presentation, upgrading to a magnetic closure box (art paper + embedded magnets) adds approximately $1.50–2.50/unit at MOQ 100. The magnetic snap creates an audible "click" on opening — a small detail that significantly elevates the unboxing ritual and gift perceived value.',
      },
    ],
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
    expertNotes: [
      {
        title: 'Why three kinetic pieces',
        body: "The brief for this set was three distinct tactile moments in one box. The bolt-action click, the propeller rotation, and the top's sustained spin are each satisfying in a different way. When a visitor picks up any of these from a colleague's desk, the brand is in their hands — and the question \"where did you get this?\" follows naturally.",
      },
      {
        title: 'Why brass ages better than any finish',
        body: 'Brass is the only material in our catalog that improves with handling — it develops a patina that makes each piece unique over time. A gift set that looks better after two years of use stays on the desk instead of moving to a storage box. The weight of solid brass also communicates material quality without any explanation required.',
      },
      {
        title: 'EVA Foam Insert Engineering',
        body: "The EVA foam insert is CNC-routed to match each component's exact profile. This isn't decorative — it prevents metal-on-metal contact during shipping, eliminating scratch damage that would ruin the brass patina story. EVA density is typically 38–45 kg/m³ for gift packaging: firm enough to hold components in place, soft enough to absorb transit shock.",
      },
      {
        title: 'Magnetic Box Construction',
        body: 'The magnetic closure uses embedded neodymium magnets (N35 grade) inside 1400gsm greyboard, wrapped in art paper with matte or soft-touch lamination. The magnet pull force is calibrated to ~200g — strong enough for a satisfying snap, light enough for one-handed opening. This is the industry standard for mid-to-premium corporate gift packaging.',
      },
      {
        title: 'Alternative: Wooden Box with Sliding Lid',
        body: 'For clients targeting luxury positioning (executive VIP gifts, C-suite onboarding), a paulownia or walnut wood box with sliding lid adds $4–7/unit. Wood can be laser-engraved with the client\'s logo directly on the lid — creating a reusable desk object that extends brand exposure beyond the initial unboxing moment.',
      },
    ],
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
    expertNotes: [
      {
        title: 'Why three different metals',
        body: 'The brass key organizer, stainless steel money clip, and zinc alloy nail clipper each use the material best suited to their function: brass for the warm tactile feel of a daily carry item, stainless for the flex and spring of a money clip, zinc alloy for the precise machining tolerance required in a clipper mechanism. The variation reads as considered, not inconsistent.',
      },
      {
        title: 'The gender-neutral logic',
        body: "Most corporate gift sets assume a recipient — tactical tools for men, soft goods for women. The Pocket Three carries no such assumption. Any professional who manages keys, cards, and travel finds it immediately useful. Procurement teams ordering 200 sets for a mixed workforce don't need to sort by recipient. It goes in the box.",
      },
      {
        title: 'Why Tin Box for EDC Sets?',
        body: "Tinplate packaging (0.2mm cold-rolled steel with tin plating) is the natural choice for pocket-carry gift sets. It's crush-proof, stackable, and reusable — recipients often repurpose it as a small parts organizer, extending brand exposure for years. The metallic surface also echoes the industrial aesthetic of the brass and steel components inside.",
      },
      {
        title: 'Logo on Tin: Offset Printing + Clear Varnish',
        body: 'Tin boxes support full-color CMYK offset printing directly onto the metal surface, with a protective clear varnish layer. This allows photographic-quality brand artwork across the entire lid and sides — far more design freedom than paper boxes. The varnish prevents scratching and maintains color vibrancy through daily handling.',
      },
      {
        title: 'Alternative: Leather-Wrapped Snap Case',
        body: 'For a premium EDC presentation, a PU leather snap case (with button or magnetic closure) adds $2–4/unit. The case becomes a carry pouch itself — recipients use it as a daily pocket organizer, keeping all three tools together. This transforms the packaging from disposable container to functional accessory.',
      },
    ],
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
    expertNotes: [
      {
        title: 'Safety function, not tactical aesthetics',
        body: "The Field EDC was not selected for military styling — it was selected because the three pieces cover three genuine scenarios. The glass breaker handles vehicle emergencies. The pry bar is a daily work tool on any physical site. The folding scissors handle packaging, cable management, and first-aid situations. The gift works hardest in sectors where physical environments are part of the job description.",
      },
      {
        title: 'Why this lands in construction and logistics',
        body: "Professionals in field environments will immediately recognise each tool's application — they live in contexts where these functions matter. A gift that respects the recipient's professional reality lands differently from one that assumes they work at a desk. That relevance is what creates lasting brand association rather than polite acknowledgement.",
      },
      {
        title: 'Packaging Choice: Tin vs Kraft for Field Use',
        body: "For this set, both options are valid but serve different contexts. Tin box is better for field professionals (crush-proof, reusable as a tool tray) while kraft rigid box is better for office-to-field gifting (premium unboxing, then tools go into pockets). Recommend asking the buyer about the delivery context — trade show handout vs mailed gift — to choose correctly.",
      },
      {
        title: 'Logo on Packaging: Screen Printing for Tin, Foil for Kraft',
        body: 'Tin surfaces accept screen printing (1–4 colors) with excellent adhesion — the ink bonds directly to the metal substrate. For kraft boxes, hot foil stamping or letterpress creates the strongest impression. Both methods produce marks that survive field conditions without fading or smudging.',
      },
      {
        title: 'Alternative: Waxed Canvas Roll Pouch',
        body: "For outdoor and construction sector clients, a waxed canvas tool roll ($3–5/unit) turns the packaging into a field-ready organizer. Each tool sits in its own loop pocket, and the roll ties shut for belt or bag attachment. The canvas can be screen-printed or leather-patched with the brand logo — a packaging format that gets daily use rather than disposal.",
      },
    ],
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
    expertNotes: [
      {
        title: 'Why titanium for the top tier',
        body: "Titanium is rare in consumer products and rarer still in corporate gifting. A pure titanium flask with no inner lining, no coating, and no metallic taste is genuinely different from every alternative in this category — the material choice of aerospace and medical applications, applied to a daily carry object. Recipients typically show it to people. It starts conversations precisely because it is unusual.",
      },
      {
        title: 'The zero-consumables principle',
        body: 'This set was designed so that a premium gift asks nothing of the recipient after receipt. No refills, no replacement parts, no coating to maintain. Pure titanium does not corrode or develop odour. The bolt-action pen takes standard Parker refills. The titanium comb will not lose teeth or rust. A gift that requires nothing beyond use is a gift that lasts indefinitely — and stays associated with the brand that gave it.',
      },
      {
        title: 'Premium Tier Packaging: Soft-Touch Lamination',
        body: 'At the $38–50 FOB price point, the packaging should match the product tier. Soft-touch lamination (velvet-feel matte coating) on the magnetic box exterior adds $0.30–0.50/unit but dramatically elevates perceived value. The tactile difference is immediately noticeable — recipients instinctively slow down when handling it, which enhances the unboxing experience.',
      },
      {
        title: 'Logo on Premium Box: Combination Technique',
        body: 'For maximum impact at this price tier, combine debossing with foil stamping — the logo is pressed into the paper surface AND filled with metallic foil. This creates a 3D tactile mark that catches light from any angle. Copper or rose-gold foil pairs naturally with the brass pen and titanium flask inside.',
      },
      {
        title: 'Alternative: Magnetic Book-Style Box with Ribbon Pull',
        body: 'A book-style hinged box (opens like a book cover, with ribbon pull tab for the EVA tray) adds $2–3/unit over standard magnetic closure. The flat-lying format is better for mailing (fits in standard mailer boxes) and creates a more ceremonial opening sequence — ideal for executive gifting where the unboxing is performed in front of the giver.',
      },
    ],
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
    expertNotes: [
      {
        title: 'The badge holder as a strategic choice',
        body: 'The badge holder is the highest-frequency branded object a new employee touches — multiple times each working day, from day one. An aluminium badge holder with a laser-engraved logo delivers brand exposure at every door, every lift, and every access point. Most onboarding kits lead with a notebook. This set leads with the object the employee will hold every day for as long as they work there.',
      },
      {
        title: 'Why a 6-function pen for week one',
        body: 'The first week at a new role involves assembling equipment, adjusting furniture, taking notes across different environments, and navigating unfamiliar technology. A pen with a built-in LED, stylus, ruler, and screwdrivers is immediately relevant — not a desk ornament. By the end of week one, most recipients have used at least three of the six functions. That is when the brand mark on the pen starts doing real work.',
      },
      {
        title: 'Onboarding Box: Branded Inside and Out',
        body: 'For HR onboarding kits, the box interior matters as much as the exterior. A custom-printed interior liner (full-color digital print on the inside of the lid) can carry a welcome message, QR code to the employee portal, or brand values statement. This adds $0.50–1.00/unit but transforms a product box into a brand touchpoint.',
      },
      {
        title: 'Logo on Magnetic Box: Laser-Engraved Aluminum Plate',
        body: 'For a cohesive all-aluminum aesthetic matching the products inside, a small laser-engraved aluminum nameplate can be adhered to the box lid. This creates a metal-on-paper contrast that immediately signals "precision hardware inside." Cost: $0.80–1.20/unit including plate + adhesive.',
      },
      {
        title: 'Alternative: Desk Tray Box (Reusable)',
        body: "For onboarding kits, a box that converts into a desk tray after unboxing ($2–4/unit premium) keeps the brand visible on the recipient's desk permanently. The box base becomes a pen tray or card holder, with the brand logo visible on the interior bottom. This maximizes ROI on packaging spend — it never gets thrown away.",
      },
    ],
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

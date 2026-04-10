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
    tagline: 'Three tools. Every desk.',
    heroCopy:
      'Three aluminium desk tools that cover the basics: an inkless pen that never needs a refill, a letter opener that handles every piece of physical correspondence, and a precision-cut metal bookmark engraved with your brand or a chosen company value — visible standing in a book on the desk throughout the working day. All three are machined aluminium, laser-engraved, and built to stay on the desk rather than disappear into a drawer.',
    sellingPoints: [
      {
        title: 'Inkless Pen — No Refills, No Waste',
        body: 'The inkless tip writes up to 20,000m on most surfaces without ink cartridges or refills. For companies that include sustainability commitments in their procurement brief, it delivers a tangible material story without requiring any explanation.',
      },
      {
        title: 'All-Aluminium Material Consistency',
        body: 'All three pieces share anodised aluminium construction — the same material, the same finish language. On a desk, they read as a set rather than three items that happened to arrive together.',
      },
      {
        title: 'The Bookmark That Doubles as a Values Marker',
        body: 'Laser-engraved on the face, the metal bookmark functions as a standing nameplate when in a book on the desk — your logo, a tagline, or a single company value at eye level throughout the working day. A functional object that makes the brand visible even when no one is using it.',
      },
    ],
    components: [
      { sku: 'WP-102', name: 'Executive Dual-Head Metal Pen (Inkless)', productId: 'WP-102-executive-dual-head-metal-pen', imageIndex: 1 },
      { sku: 'WP-203', name: 'Executive Zinc Alloy Letter Opener', productId: 'WP-203-executive-zinc-alloy-letter-opener', imageIndex: 2 },
      { sku: 'WP-205', name: 'Precision Custom Metal Bookmark', productId: 'WP-205-precision-custom-metal-bookmark', imageIndex: 3 },
    ],
    targetBuyer: 'SME corporate gifting, sustainability-conscious procurement, conference welcome packs, academic institutions',
    packaging: 'Corrugated Packaging Box + EVA Foam Insert',
    cta: 'Three aluminium tools. One consistent brand mark.',
    fob: '$18–28',
    expertNotes: [
      {
        title: 'Why inkless over ballpoint',
        body: 'The inkless tip pen writes on most surfaces without ink cartridges, lasts 20,000m, and tends to stop recipients who have never encountered one. For companies with sustainability commitments in their procurement process, it delivers a concrete material story. For everyone else, it is simply a pen that never runs dry.',
      },
      {
        title: 'Why a letter opener in 2026',
        body: 'Physical mail is back in corporate environments — contracts, invoices, signed documents, and marketing parcels. A precision letter opener signals that someone thought about the full desk experience, not just the screen. It is also one of the most visible objects on a desk: upright, catching light, carrying a brand mark at eye level every working day.',
      },
      {
        title: 'Why Kraft Rigid Box?',
        body: 'A kraft rigid box uses 1200gsm+ greyboard wrapped in unbleached kraft paper. It delivers solid unboxing weight — the lid lifts with deliberate resistance — at 30–40% less cost than laminated art-paper boxes. The natural material finish works well alongside the inkless pen: both are functional without being decorative.',
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
    tagline: 'Three reasons your brand stays in someone\'s hands.',
    heroCopy:
      'Not every corporate gift needs to be a tool. Some need to be picked up. The bolt-action click of a brass pen, the idle spin of a propeller blade, the weighted rotation of a solid brass top — three distinct mechanical interactions that turn dead air into brand contact. Each piece is machined from solid brass, laser-engraved with your mark, and built to be handled — by the recipient between calls, and by every colleague and client who reaches across the desk to try it.',
    sellingPoints: [
      {
        title: 'Built to Be Handled',
        body: 'Most corporate gifts sit on a shelf or stay in a drawer. These don\'t. Each piece has a distinct mechanical interaction — click, spin, rotate — that invites touch without asking. A gift that gets picked up twelve times a day puts your brand in someone\'s hands more often than a pen ever will.',
      },
      {
        title: 'Solid Brass, Living Surface',
        body: 'All three pieces are machined from solid brass. Over months of handling, each develops a unique patina — a surface that records use and improves with age. A gift that looks better after a year on someone\'s desk is a gift that never gets replaced.',
      },
      {
        title: 'The Desk That Starts Conversations',
        body: 'When a visitor picks up a brass spinning top from a colleague\'s desk, the question follows naturally: where did you get this? That moment — your brand in their hands, the question asked — is worth more than a logo on a mug that never leaves the kitchen.',
      },
    ],
    components: [
      { sku: 'WP-101', name: 'Brass Crown Bolt-Action Pen', productId: 'WP-101-brass-crown-bolt-action-pen', imageIndex: 2 },
      { sku: 'WP-204', name: 'Propeller Spinning Letter Opener', productId: 'WP-204-propeller-spinning-letter-opener', imageIndex: 1 },
      { sku: 'WP-206', name: 'Precision Brass Spinning Top', productId: 'WP-206-precision-brass-spinning-top', imageIndex: 3 },
    ],
    targetBuyer: 'Design studios, creative agencies, architecture firms, consulting companies, innovation teams, executive thank-you gifts',
    packaging: 'Corrugated Packaging Box + EVA Foam Insert',
    cta: 'Three objects. Every conversation.',
    fob: '$28–42',
    expertNotes: [
      {
        title: 'Why tactile objects outperform practical ones',
        body: "Corporate gifting ROI comes down to one metric: how often does the recipient interact with your brand? A branded notebook gets opened once a day. A mug sits in a kitchen rotation. A brass spinning top gets picked up between every call, during every meeting pause, and by every visitor who spots it. The Mechanical Desk was designed around interaction frequency, not task utility — and that is a deliberate trade-off. For creative studios, consulting firms, and design teams, a set that invites handling outperforms a set that sits in a drawer being 'useful.'",
      },
      {
        title: 'Why brass ages better than any finish',
        body: 'Brass is the only material in our catalog that improves with handling — it develops a patina that makes each piece unique over time. A gift set that looks better after two years of daily use stays on the desk instead of moving to a storage box. The weight of solid brass also communicates material quality without any explanation required — you feel the difference the moment you pick it up.',
      },
      {
        title: 'EVA Foam Insert Engineering',
        body: "The EVA foam insert is CNC-routed to match each component's exact profile. This isn't decorative — it prevents metal-on-metal contact during shipping, eliminating scratch damage that would compromise the brass surface before the recipient even opens the box. EVA density is typically 38–45 kg/m³ for gift packaging: firm enough to hold components in place, soft enough to absorb transit shock.",
      },
      {
        title: 'Magnetic Box Construction',
        body: 'The magnetic closure uses embedded neodymium magnets (N35 grade) inside 1400gsm greyboard, wrapped in art paper with matte or soft-touch lamination. The magnet pull force is calibrated to ~200g — strong enough for a satisfying snap, light enough for one-handed opening. For a set built around tactile experience, even the packaging should have a moment.',
      },
      {
        title: 'Alternative: Wooden Box with Sliding Lid',
        body: 'For clients targeting luxury positioning (executive VIP gifts, C-suite onboarding), a paulownia or walnut wood box with sliding lid adds $4–7/unit. The wood lid can be laser-engraved with the client\'s logo — turning the box itself into a desk object that stays on the surface long after the products have been taken out. A natural material exterior also creates a deliberate contrast with the machined brass inside.',
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
        title: 'Works for Any Recipient',
        body: "Keys, cards, and a nail clipper are not gender-specific. Any professional who carries a bag or jacket pocket finds this set immediately useful — no sorting required when ordering for a mixed team.",
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
        title: 'No recipient sorting required',
        body: "Most corporate gift sets quietly assume something about the recipient. The Pocket Three doesn't. Keys, cards, and a nail clipper are daily-carry items for any professional. When ordering for a team of mixed roles and backgrounds, this set goes in the box without adjustment.",
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
        title: 'The Right Set for the Right Industry',
        body: "Construction, logistics, security, field services — sectors where people work in physical environments recognise these tools immediately. A set that fits the recipient's actual working day rather than assuming they sit at a desk.",
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
    tagline: 'Titanium and brass. Nothing else.',
    heroCopy:
      'Two titanium pieces and one brass pen — a set built around material quality rather than category convenience. The 150ml capsule bottle carries water, tea, or coffee through the morning. The titanium carabiner clips keys or bag straps with a spring-loaded gate and doubles as a bottle opener. The bolt-action brass pen stays on the desk. Three objects, two metals, one consistent material story — and nothing that wears out.',
    sellingPoints: [
      {
        title: 'Two Titanium, One Brass',
        body: 'Pure titanium for the bottle and carabiner — the material used in aerospace and medical instruments, applied to two daily carry objects. Solid brass for the pen, which develops a patina with handling. The combination is deliberate: two metals, one set, nothing that wears out.',
      },
      {
        title: 'Every Piece Has a Second Function',
        body: 'The bottle carries liquid. The carabiner clips to keys and opens bottles. The bolt-action pen writes and clicks. None of the three pieces justifies itself with appearance alone — each earns its place with something it does. That is the selection logic for The Morning Ritual.',
      },
      {
        title: 'The Highest-Tier Set in the Lineup',
        body: 'Pure titanium is rare in corporate gifting. Most drinkware in this category is stainless steel with a coating — the titanium pieces in this set are solid through. The material difference is apparent the moment you pick them up.',
      },
    ],
    components: [
      { sku: 'WP-101', name: 'Brass Crown Bolt-Action Pen', productId: 'WP-101-brass-crown-bolt-action-pen', imageIndex: 3 },
      { sku: 'WP-402', name: 'Pure Titanium Capsule Bottle (150ml)', productId: 'WP-402-pure-titanium-capsule-bottle-150ml', imageIndex: 2 },
      { sku: 'WP-308', name: 'Titanium EDC Carabiner with Bottle Opener', productId: 'WP-308-titanium-edc-carabiner', imageIndex: 1 },
    ],
    targetBuyer: 'Executive gifting, finance sector, premium client retention gifts, high-value HR onboarding programs',
    packaging: 'Corrugated Packaging Box + EVA Foam Insert',
    cta: 'The set for the professional who packs intentionally.',
    fob: '$38–50',
    expertNotes: [
      {
        title: 'Why titanium for the top tier',
        body: "Titanium is rare in consumer products and rarer still in corporate gifting. A pure titanium bottle with no inner lining, no coating, and no metallic taste is genuinely different from every alternative in this category — the material choice of aerospace and medical applications, applied to a daily carry object. Recipients typically show it to people. It starts conversations precisely because it is unusual.",
      },
      {
        title: 'The zero-consumables principle',
        body: 'This set was designed so that a premium gift asks nothing of the recipient after receipt. No replacement parts, no coatings to maintain, no lining to degrade. Pure titanium does not corrode or develop odour. The bolt-action pen takes standard Parker refills — available anywhere. The carabiner gate opens and closes indefinitely. A set that requires nothing beyond use is a gift that lasts.',
      },
      {
        title: 'Why the carabiner creates the widest brand exposure in this set',
        body: "The titanium bottle is used privately — morning drink, desk, bag. The brass pen stays on a desk or in a pocket. The carabiner goes out into the world and gets used in front of people: at a bar, at a gathering, every time a bottle needs opening. That moment — logo in hand, object in active use in a social setting — delivers brand exposure the other two pieces cannot. Three pieces, three distinct interaction contexts, one consistent material story.",
      },
      {
        title: 'Premium Tier Packaging: Soft-Touch Lamination',
        body: 'At the $38–50 FOB price point, the packaging should match the product tier. Soft-touch lamination (velvet-feel matte coating) on the magnetic box exterior adds $0.30–0.50/unit but dramatically elevates perceived value. The tactile difference is immediately noticeable — recipients instinctively slow down when handling it, which enhances the unboxing experience.',
      },
      {
        title: 'Logo on Premium Box: Combination Technique',
        body: 'For maximum impact at this price tier, combine debossing with foil stamping — the logo is pressed into the paper surface AND filled with metallic foil. This creates a 3D tactile mark that catches light from any angle. Copper or rose-gold foil pairs naturally with the brass pen and titanium pieces inside.',
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
        title: 'All-Aluminium, One Finish',
        body: 'Badge holder, pen, and pen stand — all anodised aluminium. The material consistency across three functionally different objects is the kind of detail that reads as intentional without needing to be explained.',
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
        body: "For onboarding kits, a box that converts into a desk tray after unboxing ($2–4/unit premium) keeps the brand visible on the recipient's desk long after the products have been taken out. The box base becomes a pen tray or card holder, with the brand logo on the interior bottom — packaging that stays on the desk rather than going in the bin.",
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

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
  /** Procurement-language category for SEO and search visibility (e.g. "Executive Commute Gift Set") — paired with brand name */
  procurementCategory: string
  tagline: string
  definition: string
  heroCopy: string
  sellingPoints: { title: string; body: string }[]
  components: GiftSetComponent[]
  targetBuyer: string
  packaging: string
  cta: string
  fob: string
  sourcingNotes: { title: string; body: string }[]
  coverImage: string
  hoverImage?: string
  images: string[]
  imageAlts?: string[]
}

export interface GiftSetPageContent {
  directAnswer: string
  keyTakeaways: string[]
  comparisonRows: { giftSet: string; bestFor: string; coreUseCase: string; materials: string; packaging: string }[]
  choosingGuide: string
  faqs: { question: string; answer: string }[]
  metaTitle: string
  metaDescription: string
}

export const giftSetPageContent: GiftSetPageContent = {
  directAnswer: "Wischos custom metal corporate gift sets are B2B gift kits built around practical metal tools, custom logo marking, and branded gift box packaging. The range covers desk gift sets, everyday carry kits, field team tools, onboarding welcome kits, and executive desk gifts. Available as complete pre-curated sets for corporate procurement teams, or as individual SKUs and bulk programs for promotional product distributors.",
  keyTakeaways: [
    "For corporate procurement: pre-curated 3–4 piece metal gift sets with packaging — ready to gift, white-label, MOQ 100.",
    "For promotional distributors: individual metal SKUs and bulk programs — buy components, assemble at fulfillment, resell as your branded program.",
    "Both audiences: custom logo engraving on every piece, China-sourced metal-only catalogue, 25–35 day production."
  ],
  comparisonRows: [
    {
      "giftSet": "WGS-001 The Desk Starter",
      "bestFor": "Desk visibility",
      "coreUseCase": "Writing, opening mail, bookmark display",
      "materials": "Anodised aluminium",
      "packaging": "Drawer rigid gift box"
    },
    {
      "giftSet": "WGS-002 The Mechanical Desk",
      "bestFor": "Executive desk use",
      "coreUseCase": "Writing, opening mail, holding a device",
      "materials": "Solid brass, anodised aluminium",
      "packaging": "Magnetic rigid gift box"
    },
    {
      "giftSet": "WGS-003 The Pocket Three",
      "bestFor": "Mixed teams and daily carry",
      "coreUseCase": "Keys, cards, grooming",
      "materials": "Brass, stainless steel, titanium",
      "packaging": "Magnetic rigid gift box"
    },
    {
      "giftSet": "WGS-004 The Field EDC",
      "bestFor": "Field teams",
      "coreUseCase": "Writing, prying, cutting",
      "materials": "Compact metal tools",
      "packaging": "Drawer rigid gift box"
    },
    {
      "giftSet": "WGS-005 The Morning Ritual",
      "bestFor": "Commute-to-desk gifting",
      "coreUseCase": "Drinks, keys/bag carry, writing",
      "materials": "Titanium, brass",
      "packaging": "Magnetic rigid gift box"
    },
    {
      "giftSet": "WGS-006 The First Day",
      "bestFor": "Employee onboarding",
      "coreUseCase": "Access, setup, meetings, desk use",
      "materials": "Aluminium, metal tool pen",
      "packaging": "Rigid lid gift box"
    },
    {
      "giftSet": "WGS-007 The Thinking Desk",
      "bestFor": "Client appreciation and focused desk work",
      "coreUseCase": "Writing, tactile pause, drink placement",
      "materials": "Brass, stainless steel",
      "packaging": "Magnetic rigid gift box"
    },
    {
      "giftSet": "WGS-008 The Quartet",
      "bestFor": "VIP and executive gifting",
      "coreUseCase": "Writing, warm drinks, device viewing, card exchange",
      "materials": "Brass, titanium, aluminium, stainless steel",
      "packaging": "Magnetic rigid gift box"
    },
    {
      "giftSet": "WGS-009 The Meeting Kit",
      "bestFor": "Sales and BD team gifting",
      "coreUseCase": "Note-taking, writing, card exchange",
      "materials": "Anodised aluminium, brass, stainless steel",
      "packaging": "Magnetic rigid gift box"
    }
  ],
  choosingGuide: "Choose a desk gift set when the recipient works mainly at one desk. Choose an everyday carry set when the recipient moves between meetings, offices, travel, or field locations. Choose an onboarding gift set when the goal is first-week usefulness for new hires. Choose an executive desk set when presentation, material feel, and client appreciation matter most. Choose a meeting kit when the recipient is in sales, BD, or client-facing roles where writing, note-taking, and card exchange happen daily.",
  faqs: [
    {
      "question": "What kind of corporate gift sets does Wischos make?",
      "answer": "Wischos makes practical metal corporate gift sets only. We focus on metal because it gives business buyers durable products, precise logo marking, consistent material feel across the set, and a longer desk or carry presence than disposable promotional items."
    },
    {
      "question": "Which Wischos gift set is suited to employee onboarding?",
      "answer": "WGS-006 The First Day is suited to onboarding because it combines an access card holder, 6-in-1 tool pen, and aluminium pen holder. The set supports access, desk setup, meetings, and daily branded use during a new employee's first week."
    },
    {
      "question": "Which gift set fits field teams?",
      "answer": "WGS-004 The Field EDC fits field-facing teams because it combines writing, prying, and cutting functions in compact metal tools. It is suited to field service, logistics, construction, maintenance, and safety-focused work environments."
    },
    {
      "question": "Which gift set fits executives or clients?",
      "answer": "WGS-002 The Mechanical Desk and WGS-007 The Thinking Desk are clear fits for executive and client appreciation programs. Both focus on desk use, material feel, presentation, and repeated hand interaction rather than one-time novelty. WGS-008 The Quartet is suited to VIP and senior executive programs with a higher budget. WGS-009 The Meeting Kit fits sales and BD teams where writing, note-taking, and card exchange are daily actions."
    },
    {
      "question": "Can each item carry a custom logo?",
      "answer": "Most metal items in these sets can support laser engraving, with placement depending on product shape, surface area, and finish. Gift boxes can also support hot foil stamping, blind debossing, printed liners, or other branding options depending on the box type."
    },
    {
      "question": "What materials are in The Meeting Kit?",
      "answer": "The Meeting Kit uses three metals: anodised pure aluminium for the ring binder notebook cover (1mm plate), solid brass for the rollerball pen (30g, 140mm body), and brushed stainless steel for the business card case (thumb-push slide mechanism, holds 13–18 standard business cards)."
    },
    {
      "question": "Which gift set suits sales teams or BD professionals?",
      "answer": "WGS-009 The Meeting Kit combines an anodised aluminium ring binder notebook, a solid brass rollerball pen, and a stainless steel business card case. It covers the three actions of a standard business meeting: note-taking, writing, and card exchange. Suitable for sales onboarding kits, BD team recognition, and client-facing staff gifts."
    },
    {
      "question": "What packaging options are available?",
      "answer": "The standard packaging formats include magnetic rigid gift boxes, drawer rigid gift boxes, and rigid lid gift boxes with flocked EVA inserts. Upgrade options may include soft-touch lamination, printed interior liners, wood sleeves, wood lids, waxed canvas roll pouches, or reusable desk-tray formats."
    }
  ],
  metaTitle: "Custom Metal Corporate Gift Sets | Branded Desk, Daily Carry & Onboarding Kits",
  metaDescription: "Explore custom metal corporate gift sets for desks, daily carry, field teams, onboarding, clients and executives. Add logo engraving and branded gift box packaging.",
}

export const giftSets: GiftSet[] = [
  {
    id: 'wgs-001-3-the-desk-starter',
    sku: 'WGS-001-3',
    name: 'The Desk Starter',
    procurementCategory: 'Entry-Tier Desk Gift Set',
    tagline: "Three desk tools that stay in view.",
    definition: "The Desk Starter is a custom desk gift set for companies that want daily logo visibility on a working desk. It combines an inkless pen, letter opener, and metal bookmark in a branded gift box.",
    heroCopy: "A custom desk gift set built for daily branded visibility on the working desk. The inkless pen writes without cartridges or refills, with a matte anodised aluminium body. The electroplated zinc alloy letter opener handles contracts, invoices, and mailed documents with a high-gloss desk finish. The metal bookmark stands in a book with your brand logo on the face, available in brass, stainless steel, or zinc alloy. Each piece is selected for the role it plays on the desk, with laser engraving on every surface.",
    sellingPoints: [
      {
        title: "Inkless Pen — Writes Without Refills",
        body: "The metal tip is designed for long writing life without ink cartridges or replacement parts. A practical desk tool with no plastic refills to reorder or replace.",
      },
      {
        title: "Material Allocation Across Three Pieces",
        body: "The pen uses anodised aluminium with a matte finish; the letter opener uses electroplated zinc alloy for a high-gloss desk finish; the bookmark is available in solid brass, stainless steel, or zinc alloy depending on your design brief. Each material is selected for the role its piece performs on the desk.",
      },
      {
        title: "Bookmark — Your Logo at Eye Level",
        body: "The bookmark stands upright in a book on the desk with your brand logo, tagline, or brand message engraved on the front. It stays visible between uses.",
      },
    ],
    components: [
      { sku: 'WP-102', name: 'Executive Dual-Head Metal Pen (Inkless)', productId: 'wp-102-executive-dual-head-metal-pen', imageIndex: 1 },
      { sku: 'WP-203', name: 'Executive Zinc Alloy Letter Opener', productId: 'wp-203-executive-zinc-alloy-letter-opener', imageIndex: 2 },
      { sku: 'WP-205', name: 'Precision Custom Metal Bookmark', productId: 'wp-205-precision-custom-metal-bookmark', imageIndex: 3 },
    ],
    targetBuyer: 'SME corporate gifting, sustainability-conscious procurement, conference welcome packs, academic institutions',
    packaging: 'Drawer Rigid Gift Box + Flocked EVA Insert',
    cta: "Three visible desk tools for daily branded use.",
    fob: '$18–28',
    sourcingNotes: [
      {
        title: "Inkless pen: consumables reduction and gifting logic",
        body: "The inkless pen's value in a gift set is what it removes: no cartridges, no refills, no caps to manage. For buyers with sustainability criteria, it gives a clear consumables-reduction story across the product lifetime. The metal tip writes on standard paper surfaces without drying out between uses, which means the pen can stay ready on a desk between writing sessions.",
      },
      {
        title: "Letter opener: desk function and daily visibility",
        body: "Contracts, invoices, signed documents, and mailed samples still arrive in physical form. A letter opener is a small desk tool, but it stays upright and visible on the surface between uses — a practical object with a clear office-use context that holds a brand mark at eye level every working day.",
      },
      {
        title: "What the standard packaging delivers",
        body: "The set ships in a drawer rigid gift box with a flocked EVA insert. The outer sleeve and inner drawer keep the presentation horizontal, with each component placed in its own recess. The format suits a set built around movement and interaction: slide open, view all three pieces at once, and remove each one in sequence.",
      },
      {
        title: "Logo on the box",
        body: "On a matte art-paper sleeve, hot foil stamping gives the logo strong contrast. Blind debossing is the quieter option, pressing the mark into the paper surface without metallic foil. Both methods work on the sleeve face and side panels.",
      },
      {
        title: "Upgrade options",
        body: "A wood sleeve in paulownia or walnut is available on request. Soft-touch lamination is also available for buyers who want a smoother exterior finish on the standard drawer box. If you have specific requirements for the packaging, let us know when you reach out — we source to brief.",
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
    procurementCategory: 'Executive Desk Gift Set',
    tagline: "Built for the desk, used with your hands.",
    definition: "The Mechanical Desk is a custom executive desk gift set built around three tactile actions: writing, opening mail, and holding a device at eye level. It suits clients, managers, and teams who use physical desk tools daily.",
    heroCopy: "A custom executive desk gift set built around three mechanical actions: writing, opening mail, and holding a device at eye level. The pen goes into meetings with a brass crown, anodised aluminium body, and bolt-action click. The propeller letter opener handles letters, documents, and mail that land on the desk with a single finger spin. The aluminium stand raises a phone or tablet to eye level, opens quickly, and folds flat when not in use. Your brand can be laser-engraved on all three.",
    sellingPoints: [
      {
        title: "Three Mechanisms, Three Daily Functions",
        body: "The bolt-action pen clicks and writes. The propeller opener spins and opens mail. The stand folds and holds a device at eye level. Each mechanism is tied to a function used through the working day.",
      },
      {
        title: "Brass Crown Where Hands Meet It",
        body: "The pen pairs a solid brass crown — the part your thumb rests on — with an anodised aluminium body and a bolt-action mechanism. The brass section darkens with daily use; the aluminium body holds its finish unchanged. The letter opener uses electroplated zinc alloy for a high-gloss desk finish that resists wear.",
      },
      {
        title: "Folding Aluminium Stand for Daily Device Use",
        body: "The device stand uses CNC-machined anodised aluminium and opens into a stable desk position for a phone or tablet. When the desk clears, it folds flat in seconds.",
      },
    ],
    components: [
      { sku: 'WP-101', name: 'Brass Crown Bolt-Action Pen', productId: 'wp-101-brass-crown-bolt-action-pen', imageIndex: 2 },
      { sku: 'WP-204', name: 'Propeller Spinning Letter Opener', productId: 'wp-204-propeller-spinning-letter-opener', imageIndex: 1 },
      { sku: 'WP-208', name: 'Precision Folding Aluminium Device Stand', productId: 'wp-208-precision-folding-aluminium-device-stand', imageIndex: 3 },
    ],
    targetBuyer: 'Design studios, creative agencies, technology companies, architecture firms, consulting companies, executive thank-you gifts',
    packaging: 'Magnetic Rigid Gift Box + Flocked EVA Insert',
    cta: "Three mechanical desk tools built for hands-on work.",
    fob: '$28–42',
    sourcingNotes: [
      {
        title: "Propeller letter opener: mechanism and desk use context",
        body: "The propeller letter opener adds a mechanical action that is visible the moment it is picked up, but it is still tied to a practical desk task. In offices where contracts, envelopes, samples, and mailed documents still arrive physically, it fits a clear use case rather than acting as a novelty piece.",
      },
      {
        title: "Brass as a desk material",
        body: "The pen's brass crown develops surface character over time — the grip area darkens with daily contact, recording the day in tone. The aluminium body holds its anodised finish unchanged, and the zinc alloy letter opener retains its high-gloss plated surface. Brass is placed deliberately where the hand meets the object; aluminium and zinc handle the parts that need stability and finish consistency.",
      },
      {
        title: "What the standard packaging delivers",
        body: "The set ships in a magnetic rigid gift box with a flocked EVA insert. The box core is high-density greyboard wrapped in matte art paper — firm edges, no flex. Each component sits in a precision-cut recess in the flocked EVA to help reduce movement in transit and keep metal surfaces separated. The packaging carries presentation weight before the products are removed.",
      },
      {
        title: "Logo on the box",
        body: "On a matte art-paper surface, hot foil stamping — gold, silver, or copper — creates strong contrast and holds well under normal handling. The foil is applied under heat and pressure to resist peeling in regular use. For a quieter finish, blind debossing presses the logo into the surface for a tone-on-tone tactile mark. Both methods work on the lid face and can be applied to the box sides.",
      },
      {
        title: "Available packaging upgrades",
        body: "Two upgrades are available on request. Soft-touch lamination replaces the standard matte surface with a velvet-feel coating. A printed interior liner turns the first moment of opening into a brand touchpoint: a welcome message, brand message, or QR code to an onboarding resource. If you have specific requirements for the packaging, let us know when you reach out — we source to brief.",
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
    procurementCategory: 'Daily Carry Gift Set',
    tagline: "Everything in your pocket. Nothing you don't need.",
    definition: "The Pocket Three is a branded everyday carry gift set for teams that move between offices, sites, meetings, and travel. It combines key organization, card and cash carry, and a lightweight grooming tool.",
    heroCopy: "A branded everyday carry gift set built for teams that move between offices, meetings, travel, and daily work routines. The brass key organizer holds up to ten keys in a compact stack. The stainless steel money clip keeps cards and cash flat in one piece. The titanium comb is light, rigid, and made for office, travel, and daily carry use. Three metal tools that go straight into a pocket, bag, or work carry from day one.",
    sellingPoints: [
      {
        title: "Three Tools for Daily Carry",
        body: "The key organizer keeps keys aligned and reduces pocket bulk. The money clip keeps cards and cash together in a slim form. The titanium comb adds a lightweight personal grooming tool for office, travel, and daily carry use.",
      },
      {
        title: "Brass, Stainless Steel, and Titanium",
        body: "The key organizer uses brass. The money clip uses stainless steel spring tension. The comb uses titanium for a light and rigid profile. Each material matches the function of the piece it is used for.",
      },
      {
        title: "Ready for Mixed Teams",
        body: "Keys, cards, and a comb fit daily routines across different roles and work settings. This is a set that can be issued across a team without changing the core selection.",
      },
    ],
    components: [
      { sku: 'WP-302', name: 'Compact Brass Key Organizer', productId: 'wp-302-industrial-brass-key-organizer', imageIndex: 2 },
      { sku: 'WP-303', name: 'Slim Stainless Steel Money Clip', productId: 'wp-303-industrial-stainless-steel-money-clip', imageIndex: 1 },
      { sku: 'WP-304', name: 'Titanium Anti-Static Comb', productId: 'wp-304-titanium-anti-static-edc-comb', imageIndex: 3 },
    ],
    targetBuyer: 'HR teams, employee wellness kits, finance/banking sector, insurance brokers, retail client appreciation gifts',
    packaging: 'Magnetic Rigid Gift Box + Flocked EVA Insert',
    cta: "Three pocket tools for teams on the move.",
    fob: '$22–32',
    sourcingNotes: [
      {
        title: "Material allocation across three carry functions",
        body: "Brass, stainless steel, and titanium each bring a different physical property to the set. Brass works well for a compact hinge-based key organizer. Stainless steel gives a money clip the spring it needs. Titanium keeps the comb light in pocket carry while staying rigid in use.",
      },
      {
        title: "Mixed-team carry: daily-carry items across different roles",
        body: "This set is built around objects that go into daily carry rather than staying on a desk. Keys, cards, and a comb move with the recipient through the day, which makes the set suitable for teams with different roles, schedules, and work environments.",
      },
      {
        title: "What the standard packaging delivers",
        body: "The set ships in a magnetic rigid gift box with a flocked EVA insert. The box core is high-density greyboard wrapped in matte art paper. Each component sits in a precision-cut recess in the flocked EVA: key organizer, money clip, and comb each in their own zone, with metal surfaces separated in transit. The compact footprint suits a daily-carry gift set where each item is meant to move with the recipient after unboxing.",
      },
      {
        title: "Logo on the box",
        body: "On a matte art-paper surface, hot foil stamping gives the logo strong contrast. Blind debossing is the quieter option, with the mark pressed into the surface without metallic foil. Both approaches work well on the lid of a compact presentation box.",
      },
      {
        title: "Available packaging upgrades",
        body: "Soft-touch lamination is available for buyers who want a smoother exterior finish. A printed liner inside the lid can also be added for a welcome line, campaign message, or brand statement.",
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
    procurementCategory: 'Field Team Utility Gift Set',
    tagline: "Tools for teams that work beyond the desk.",
    definition: "The Field EDC is a utility corporate gift set for field service, logistics, construction, maintenance, and safety-focused teams. It combines writing, prying, and cutting tools in a compact carry format.",
    heroCopy: "A field team gift set for companies that issue practical tools to people working in physical environments. The tactical pen writes in daily use and includes a glass breaker for permitted workplace or vehicle emergency contexts. The mini pry bar handles opening, lifting, and light prying tasks on site. The folding scissors cut packaging, cable ties, and small materials, then fold flat for carry. Three compact tools selected for field service, logistics, construction, and safety-focused teams.",
    sellingPoints: [
      {
        title: "Three Utility Tools for Field Carry",
        body: "The pen writes and includes a glass breaker for permitted emergency contexts. The pry bar handles lifting, opening, and quick tool tasks. The folding scissors cover cutting work and pack flat after use.",
      },
      {
        title: "Compact Metal Tools for Site Use",
        body: "All three pieces are built as compact metal tools suited to pockets, bags, or vehicle storage. The format works for teams that move between work areas rather than staying at one desk.",
      },
      {
        title: "Selected for Construction, Logistics, and Field Teams",
        body: "Writing, prying, cutting, and permitted emergency functions are recognisable needs in construction, logistics, maintenance, and field service settings. The set matches work that happens around equipment, packaging, vehicles, and physical sites.",
      },
    ],
    components: [
      { sku: 'WP-103', name: 'Tactical Stainless Steel Pen with Glass Breaker', productId: 'wp-103-tactical-stainless-steel-pen', imageIndex: 1 },
      { sku: 'WP-305', name: 'Industrial Mini EDC Pry Bar', productId: 'wp-305-industrial-mini-edc-pry-bar', imageIndex: 2 },
      { sku: 'WP-307', name: 'EDC Folding Metal Scissors', productId: 'wp-307-edc-folding-metal-scissors', imageIndex: 3 },
    ],
    targetBuyer: 'Construction firms, logistics companies, outdoor equipment brands, safety-focused corporate clients, field service teams',
    packaging: 'Drawer Rigid Gift Box + Flocked EVA Insert',
    cta: "Three compact tools for teams that work on site.",
    fob: '$28–38',
    sourcingNotes: [
      {
        title: "Field tool selection logic: writing, prying, cutting",
        body: "The selection logic is based on three common field functions: writing, prying, and cutting. Each tool covers a different type of task, which keeps overlap low and makes the set easier to issue across operational teams.",
      },
      {
        title: "Field-facing use context: construction, logistics, maintenance",
        body: "In field service, logistics, construction, and maintenance work, tools are judged first by whether they solve immediate tasks. A pen with a permitted emergency function, a compact pry bar, and folding scissors all fit that standard of use without requiring much explanation.",
      },
      {
        title: "What the standard packaging delivers",
        body: "The set ships in a drawer rigid gift box with a flocked EVA insert. Each tool sits in its own cut recess, which helps reduce movement in transit and keeps the metal surfaces separated. The horizontal drawer format presents the three pieces clearly in sequence when the box is opened.",
      },
      {
        title: "Logo on the box",
        body: "On a matte art-paper sleeve, hot foil stamping gives the logo strong contrast. Blind debossing is the quieter option, pressing the mark into the paper surface without metallic foil. Both methods work on the sleeve face and side panels.",
      },
      {
        title: "Available packaging upgrades",
        body: "A waxed canvas roll pouch is available on request for buyers who want the packaging to convert into a field organizer after unboxing. Soft-touch lamination is also available for the standard drawer box where a smoother presentation finish is preferred.",
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
    procurementCategory: 'Executive Commute Gift Set',
    tagline: "From the morning bag to the working desk.",
    definition: "The Morning Ritual is a branded daily carry gift set for workdays that move from commute to desk to after-work use. It combines a titanium bottle, titanium keychain, and brass bolt-action pen.",
    heroCopy: "A branded daily carry gift set built around the movement from morning commute to desk work. The titanium capsule bottle carries water, tea, or coffee through the morning. The titanium keychain attaches to keys or a bag strap and includes a bottle opener. The brass-crowned bolt-action pen — solid brass at the grip, anodised aluminium body — moves between desk and meeting use with a weighted click mechanism. Three metal objects for three different moments in the working day.",
    sellingPoints: [
      {
        title: "Titanium Bottle and Keychain",
        body: "The bottle and keychain use titanium for light carry and clean metal surfaces. One carries drinks through the day. The other attaches to keys or bags and adds a bottle-opening function in the same piece.",
      },
      {
        title: "Brass-Crowned Bolt-Action Pen",
        body: "The pen pairs a solid brass crown — the grip area your thumb rests on — with an anodised aluminium body and a bolt-action mechanism. The brass section adds the tactile weight and warm surface where the hand meets the pen, while the aluminium body keeps the overall weight pocket-friendly for daily carry. It is the desk piece in the set, but still moves easily into meeting use.",
      },
      {
        title: "Three Use Contexts in One Set",
        body: "The bottle covers the morning carry. The keychain goes onto keys or a bag. The pen stays in reach on the desk. The set places your brand across commute, desk, and after-work use through the same working day.",
      },
    ],
    components: [
      { sku: 'WP-101', name: 'Brass Crown Bolt-Action Pen', productId: 'wp-101-brass-crown-bolt-action-pen', imageIndex: 3 },
      { sku: 'WP-402', name: 'Pure Titanium Capsule Bottle (150ml)', productId: 'wp-402-pure-titanium-capsule-bottle-150ml', imageIndex: 2 },
      { sku: 'WP-308', name: 'Titanium Carabiner Keychain', productId: 'wp-308-titanium-edc-keychain', imageIndex: 1 },
    ],
    targetBuyer: 'Executive gifting, finance sector, premium client retention gifts, high-value HR onboarding programs',
    packaging: 'Magnetic Rigid Gift Box + Flocked EVA Insert',
    cta: "Three metal pieces for workdays that move from carry to desk.",
    fob: '$38–50',
    sourcingNotes: [
      {
        title: "Titanium for carry: weight and corrosion properties",
        body: "Titanium suits small carry objects where low weight and corrosion resistance matter. In this set, it keeps the bottle and keychain light in use while maintaining a clean metal surface without coating layers.",
      },
      {
        title: "Material allocation: titanium for carry, brass for desk",
        body: "The brass pen adds weight and hand feel to the part of the set that stays on the desk. Titanium covers carry. Brass covers writing. The two materials are separated by use context rather than mixed into the same role.",
      },
      {
        title: "What the standard packaging delivers",
        body: "The set ships in a magnetic rigid gift box with a flocked EVA insert. Each component sits in its own cut recess to reduce movement in transit and keep the metal surfaces separated. The magnetic lid format suits a set where the material finish is a central part of the presentation.",
      },
      {
        title: "Logo on the box",
        body: "Debossing with foil stamping works well on the matte paper wrap of the box. The deboss adds depth to the mark, while the metallic foil gives the logo a clear edge and stronger visibility on the lid. Copper or rose-gold foil complements the brass and titanium surfaces inside the box.",
      },
      {
        title: "Available packaging upgrades",
        body: "Soft-touch lamination is available for buyers who want a smoother exterior finish. A printed liner inside the lid can also be added for a welcome line, campaign message, or brand statement.",
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
    procurementCategory: 'New Employee Onboarding Kit',
    tagline: "Built for the first day at work.",
    definition: "The First Day is an employee onboarding gift set for new hire welcome kits. It supports first-day access, desk setup, note-taking, and branded desk presence from the employee's first week.",
    heroCopy: "A custom employee onboarding gift set built for first-day access, desk setup, and daily branded use. The RFID aluminium access card holder (with carbon fiber composite reinforcement) covers access from the first door entry. The electroplated zinc alloy 6-in-1 tool pen moves into meetings, desk setup, and note-taking through the first week. The 6061-T6 aluminium pen holder gives the new desk a permanent place for a branded writing tool. Three metal pieces — each material chosen for its role — selected for arrival, setup, and daily use from day one.",
    sellingPoints: [
      {
        title: "Access Card Holder for Daily Entry",
        body: "The aluminium access card holder is used from the moment a new employee enters the building. Your brand logo stays visible at doors, lifts, and access points through the working day.",
      },
      {
        title: "6-in-1 Tool Pen for Setup and Meetings",
        body: "Ballpoint, LED, stylus, ruler, screwdriver, and spirit level are built into one metal pen body. It fits early-stage onboarding tasks that move between desk setup, quick adjustments, and note-taking.",
      },
      {
        title: "Aluminium Pen Holder for the New Desk",
        body: "The aluminium pen holder gives the desk a fixed place for the pen instead of leaving it loose on the surface. It is the stationary piece in the set, balancing the two items that move with the employee.",
      },
    ],
    components: [
      { sku: 'WP-301', name: 'RFID Aluminum Wallet & Badge Holder', productId: 'wp-301-rfid-aluminum-wallet-badge-holder', imageIndex: 1 },
      { sku: 'WP-104', name: '6-in-1 Precision Metal Tool Pen', productId: 'wp-104-6-in-1-precision-metal-tool-pen', imageIndex: 3 },
      { sku: 'WP-202', name: 'Precision Aluminum Pen Holder', productId: 'wp-202-precision-aluminum-pen-holder', imageIndex: 2 },
    ],
    targetBuyer: 'Enterprise HR onboarding teams, tech company new hire welcome kits, co-working space membership gifts, trade show badge + welcome pack combos',
    packaging: 'Rigid Lid Gift Box + Flocked EVA Insert',
    cta: "Three metal tools for a more complete first-day welcome kit.",
    fob: '$25–38',
    sourcingNotes: [
      {
        title: "Onboarding use mapping: access, setup, meetings, desk",
        body: "This set is built around the first practical needs of a new employee: building access, desk setup, meetings, and a personal work surface. The three pieces map directly to those moments without relying on decorative items.",
      },
      {
        title: "Access card holder: first-use timing and daily frequency",
        body: "In an onboarding context, the access card holder is one of the earliest branded objects to enter daily use. It moves through doors, lifts, and checkpoints with the employee, which gives it a consistent presence from the first day onward.",
      },
      {
        title: "What the standard packaging delivers",
        body: "The set ships in a rigid lid gift box with a flocked EVA insert. The lift-off lid format keeps the presentation simple and formal, which suits onboarding, welcome kits, and internal gifting. Each piece sits in its own cut recess to reduce movement in transit and keep the metal surfaces separated.",
      },
      {
        title: "Logo on the box",
        body: "On the matte paper wrap of a rigid lid box, hot foil stamping gives the logo clear contrast. Blind debossing is the quieter option, creating a pressed mark in the lid surface without metallic foil.",
      },
      {
        title: "Available packaging upgrades",
        body: "A printed liner inside the lid is available for onboarding messages, QR codes, or brand messages. A reusable desk-tray format is also available on request for buyers who want the packaging to remain on the employee desk after unboxing.",
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
  {
    id: 'wgs-007-3-the-thinking-desk',
    sku: 'WGS-007-3',
    name: 'The Thinking Desk',
    procurementCategory: 'Client Appreciation Gift Set',
    tagline: "For desks where ideas, meetings, and long sessions happen.",
    definition: "The Thinking Desk is an executive desk gift set for long desk sessions, client appreciation, and focused work. It combines a brass rollerball, brass spinning top, and stainless steel desk cup.",
    heroCopy: "A custom executive desk gift set for desks where ideas, meetings, and long working sessions happen in the same place. The brass rollerball writes with weight and balance for everyday desk use. The precision brass spinning top adds a tactile desk object that stays within reach during calls, pauses, and thinking time. The double-wall stainless steel desk cup holds a drink on the desk without transferring heat directly to the hand. Three desk objects, each with a different role in the working day.",
    sellingPoints: [
      {
        title: "Rollerball, Spinning Top, and Desk Cup",
        body: "The rollerball writes. The spinning top adds a tactile pause object. The cup holds a drink beside documents, screens, and notebooks. Each piece covers a different part of desk use.",
      },
      {
        title: "Brass for the Hand, Steel for the Drink",
        body: "The rollerball and spinning top use brass, a material with weight and surface character in hand. The desk cup uses stainless steel for a clean, durable vessel on the desktop.",
      },
      {
        title: "Built for Long Desk Hours",
        body: "Writing, holding a drink, and keeping a small object in reach all belong to the same desk routine. This set fits work that happens through long sessions at one surface rather than movement between different locations.",
      },
    ],
    components: [
      { sku: 'WP-105', name: 'Artisan Brass Rollerball', productId: 'wp-105-artisan-brass-rollerball', imageIndex: 3 },
      { sku: 'WP-206', name: 'Precision Kinetic Brass Spinning Top', productId: 'wp-206-precision-brass-spinning-top', imageIndex: 1 },
      { sku: 'WP-407', name: 'Double-Wall Stainless Steel Desk Cup', productId: 'wp-407-double-wall-stainless-steel-desk-cup', imageIndex: 2 },
    ],
    targetBuyer: 'Employee recognition, year-end appreciation, client thank-you gifts — any professional with a desk they spend time at',
    packaging: 'Magnetic Rigid Gift Box + Flocked EVA Insert',
    cta: "Three desk objects for focused work in one place.",
    fob: '$32–42',
    sourcingNotes: [
      {
        title: "Spinning top: desk category and tactile function",
        body: "A spinning top brings movement into a desk set without leaving the desktop category. Unlike a pocket tool or carry item, it stays on the surface and becomes part of the visual and tactile environment of the workspace.",
      },
      {
        title: "Material allocation: brass for hand interaction, steel for drink",
        body: "Brass works well for the two pieces that are picked up directly by hand and appreciated for weight and surface feel. Stainless steel fits the desk cup as a clean, durable material for repeated drink use on the desk.",
      },
      {
        title: "What the standard packaging delivers",
        body: "The set ships in a magnetic rigid gift box with a flocked EVA insert. The magnetic lid format suits a desk set where presentation and surface finish matter from the first opening. Each component sits in its own cut recess to reduce movement in transit and keep the metal surfaces separated.",
      },
      {
        title: "Logo and product marking",
        body: "The rollerball, spinning top, and desk cup each take laser engraving in different positions suited to their form. On the box, debossing with foil stamping gives a clear mark on the lid while keeping the presentation aligned with the brass detail inside.",
      },
      {
        title: "Available packaging upgrades",
        body: "A wood-lid version is available on request for executive gifting and client thank-you programs. Soft-touch lamination is also available for buyers who want a smoother exterior finish on the standard magnetic box.",
      },
    ],
    coverImage: '/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-cover.avif',
    hoverImage: '/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-hover.avif',
    images: [
      '/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-cover.avif',
      '/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-detail-1.avif',
      '/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-detail-2.avif',
      '/products/WGS-007-3-The-Thinking-Desk/The-Thinking-Desk-detail-3.avif',
    ],
    imageAlts: [
      'Three-piece custom metal corporate desk gift set — brass spinning top, brushed silver rollerball pen and double-wall stainless steel cup presented in open magnetic closure gift box with black EVA foam insert',
      'Close-up overhead view of three engraved metal desk gifts in black EVA foam — brass spinning top, brushed silver rollerball pen and stainless steel cup',
      'Precision kinetic brass spinning top with knurled grip stem and laser-engraved logo — custom corporate desk gift',
      'Double-wall brushed stainless steel desk cup 300ml with laser-engraved logo — custom corporate gift',
      'Brushed silver rollerball pen with cylindrical barrel, capped, laser-engraved — custom corporate desk gift',
    ],
  },
  {
    id: 'wgs-008-4-the-quartet',
    sku: 'WGS-008-4',
    name: 'The Quartet',
    procurementCategory: 'VIP Executive Gift Set',
    tagline: 'Ready before the first meeting.',
    definition: 'The Quartet (WGS-008) is a four-piece engraved executive corporate gift set for client-facing professionals. It combines a solid brass ballpoint pen, titanium tea infuser business cup, folding aluminium device stand, and slim push stainless steel business card case in a magnetic rigid gift box.',
    heroCopy: 'A four-piece custom metal gift set built for executive desk use, client meetings, and workdays that move between spaces. The solid brass ballpoint pen handles signatures and daily writing. The titanium tea infuser business cup holds warm drinks at the desk and in the meeting room. The folding aluminium device stand keeps a phone or tablet at eye level when the work surface is occupied. The stainless steel business card case presents a card at the start of a meeting without opening a wallet or a lid. All four pieces support laser engraving for company logos. Four metals — brass, titanium, aluminium, stainless steel — each assigned to a different part of the professional day.',
    sellingPoints: [
      {
        title: 'Brass Pen, Titanium Cup, Aluminium Stand, Steel Card Case',
        body: 'Each piece uses a different metal matched to its function. Brass for the pen: weight and surface character in hand for writing and signatures. Titanium liner for the cup: a clean food-contact surface for warm drinks without coatings. Anodised aluminium for the stand: fold-flat carry with a stable desk footprint. Brushed stainless steel for the card case: a flat engravable face that holds a laser mark through daily handling.',
      },
      {
        title: 'Four Pieces, Four Parts of the Workday',
        body: 'Writing, warm drinks, device viewing, and business card exchange each belong to a different part of a standard professional day. The set is suited to desk-to-meeting routines where the recipient moves between a fixed workspace and client or colleague-facing situations.',
      },
      {
        title: 'Thumb-Push Card Case — Card Out Before the Handshake',
        body: 'The stainless steel card case uses a thumb-push slide mechanism. The user presses from the back to present a card from the front edge without opening a hinged lid. At approximately 103 × 60mm and 80g, it fits a jacket pocket and holds 13–18 standard business cards.',
      },
    ],
    components: [
      { sku: 'WP-106', name: 'Solid Brass Ballpoint Pen', productId: 'wp-106-solid-brass-clip-ballpoint', imageIndex: 1 },
      { sku: 'WP-309', name: 'Slim Push Stainless Steel Business Card Case', productId: 'wp-309-slim-push-stainless-steel-business-card-case', imageIndex: 2 },
      { sku: 'WP-208', name: 'Precision Folding Aluminium Device Stand', productId: 'wp-208-precision-folding-aluminium-device-stand', imageIndex: 3 },
      { sku: 'WP-408', name: 'Titanium Tea Infuser Business Cup', productId: 'wp-408-titanium-tea-infuser-business-cup', imageIndex: 4 },
    ],
    targetBuyer: 'Executive appreciation programs, finance and professional services gifting, distributor resale for high-value client accounts, VIP welcome kits, year-end recognition for senior staff',
    packaging: 'Magnetic Rigid Gift Box + Matte Soft-Touch Lamination + Flocked EVA Insert',
    cta: 'Four-piece executive metal gift set. Send a brief and we\'ll confirm the configuration.',
    fob: '$44–58',
    sourcingNotes: [
      {
        title: 'Four metals in one set: surface behavior over time',
        body: 'Brass, titanium, aluminium, and stainless steel each respond differently to handling. The brass pen barrel develops surface character through repeated contact. The titanium cup exterior holds its finish without the surface change that comes with brass. The aluminium stand has an anodised surface that resists wear at fold points. The brushed stainless steel card case maintains a consistent surface texture through daily pocket and bag handling. A recipient using all four pieces will notice that each object changes — or stays stable — in a different way.',
      },
      {
        title: 'Titanium cup: removable infuser and daily drink range',
        body: 'The infuser in WP-408 is removable. Without it, the cup works as a 480ml covered office cup for warm water or coffee. With it, the cup supports loose-leaf tea. For buyers configuring a gift set for a mixed recipient group, the removable format means the cup suits different drink habits without changing the product.',
      },
      {
        title: 'What the standard packaging delivers',
        body: 'The set ships in a magnetic rigid gift box with matte soft-touch lamination and a flocked EVA insert. The matte soft-touch surface is part of the standard configuration — not an upgrade — giving the exterior a velvet-feel coating from the first handling. Each component sits in a precision-cut recess in the flocked EVA to keep the four metal surfaces separated in transit and in presentation.',
      },
      {
        title: 'Logo placement across four pieces',
        body: 'The brass ballpoint pen takes laser engraving on the barrel. The titanium-gold exterior of the business cup takes laser engraving or screen printing. The aluminium stand takes laser engraving on its flat surface. The stainless steel card case takes laser engraving on its brushed face. Four engravable surfaces across one set gives the buyer consistent logo placement on every piece a recipient uses through the day.',
      },
      {
        title: 'Upgrade options',
        body: 'Hot-stamped debossed logo on the box lid is available on request, using gold, silver, or copper foil against the matte soft-touch surface. A printed interior liner can carry a brand message, welcome note, or QR code at the first opening. If the standard four-piece configuration does not match your brief — different components, finishes, or packaging — reach out and we\'ll advise.',
      },
    ],
    coverImage: '/products/WGS-008-4-The-Quartet/The-Quartet-cover.avif',
    hoverImage: '/products/WGS-008-4-The-Quartet/The-Quartet-hover.avif',
    images: [
      '/products/WGS-008-4-The-Quartet/The-Quartet-cover.avif',
      '/products/WGS-008-4-The-Quartet/The-Quartet-detail-1.avif',
      '/products/WGS-008-4-The-Quartet/The-Quartet-detail-2.avif',
      '/products/WGS-008-4-The-Quartet/The-Quartet-detail-3.avif',
      '/products/WGS-008-4-The-Quartet/The-Quartet-detail-4.avif',
    ],
  },
  {
    id: 'wgs-009-3-the-meeting-kit',
    sku: 'WGS-009-3',
    name: 'The Meeting Kit',
    procurementCategory: 'Business Meeting Gift Set',
    tagline: 'Record. Write. Introduce. Three metal objects. Every meeting.',
    definition: 'The Meeting Kit is a three-piece custom engraved metal gift set for sales teams and client-facing professionals. It combines an anodised aluminium ring binder notebook, a solid brass rollerball pen, and a stainless steel business card case in a rigid lid gift box.',
    heroCopy: 'A custom metal gift set built around the three actions of every business meeting: capture, write, and introduce. The anodised aluminium ring binder notebook holds A5 refill sheets and takes laser engraving on the cover face — the brand mark stays on the desk long after the first 100 sheets are filled. The brass rollerball writes with the weight of a 30g solid brass body, suited to signatures and long note-taking sessions. The stainless steel business card case uses a thumb-push slide mechanism to present a card at the start of a meeting without opening a hinged lid. All three pieces support laser engraving for company logos. Anodised aluminium, warm brass, and cool brushed steel — three metals in one cohesive set.',
    sellingPoints: [
      {
        title: 'Notebook, Pen, Card Case — Three Actions, One Set',
        body: 'The aluminium notebook captures. The brass pen writes. The steel card case introduces. Each piece covers a distinct action in a standard B2B meeting, so the set functions as a complete kit rather than a collection of branded objects.',
      },
      {
        title: 'Refillable Notebook — Brand Mark Outlasts the Paper',
        body: 'The anodised aluminium cover accepts standard A5 refill sheets from any stationery supplier. When the included 100 sheets are used, the notebook stays on the desk and is refilled. The laser-engraved company logo on the cover remains in daily use after the paper runs out.',
      },
      {
        title: 'Three Metals, Three Surface Characters',
        body: 'The 1mm anodised aluminium cover gives the notebook structural rigidity without bulk. The 30g brass rollerball sits at the grip — the weight is structural, not added. The brushed stainless steel card case holds 13–18 standard business cards and presents one card from the front edge with a single thumb press. Three metals, three surface characters, one cohesive set.',
      },
    ],
    components: [
      { sku: 'WP-209', name: 'Anodised Pure Aluminium Ring Binder Notebook', productId: 'wp-209-aluminium-ring-binder-notebook', imageIndex: 1 },
      { sku: 'WP-105', name: 'Artisan Brass Rollerball', productId: 'wp-105-artisan-brass-rollerball', imageIndex: 2 },
      { sku: 'WP-309', name: 'Slim Push Stainless Steel Business Card Case', productId: 'wp-309-slim-push-stainless-steel-business-card-case', imageIndex: 3 },
    ],
    targetBuyer: 'Sales and BD team onboarding kits, consulting and law firm client gifts, MBA and executive education program gifts, industry conference VIP sets, year-end recognition for client-facing staff',
    packaging: 'Rigid Lid Gift Box + Flocked EVA Insert',
    cta: 'Three metal objects for the three actions of every business meeting.',
    fob: '$32–45',
    sourcingNotes: [
      {
        title: 'Why an aluminium notebook replaces paper in a metal gift set',
        body: 'A paper-cover notebook is a consumable — once the pages are filled, the branded cover leaves the desk. An aluminium ring binder cover stays in use after refill. The laser-engraved company logo on the anodised face remains visible through years of daily use, which is the characteristic that separates this format from a standard branded journal in a B2B gifting context.',
      },
      {
        title: 'Notebook dimensions and ring spec',
        body: 'The A5 version measures 180 × 235mm with a 6-ring mechanism. It accepts standard A5 loose-leaf sheets (148 × 210mm) from any office stationery supplier. The included 100 sheets are 100gsm Daolin paper. The 1mm aluminium cover plate is rigid enough to write against without a hard surface underneath. The notebook component supports A4, B5, A5, A6, or A7 if a project brief calls for a different size; A5 is the standard format for this set.',
      },
      {
        title: 'Brass pen weight and writing position',
        body: 'The WP-105 weighs 30g with a 140mm body and 9mm diameter. The centre of gravity sits at the grip, so the pen holds a writing position without pressure from the hand. For a meeting kit where the pen is used for signatures and long note-taking sessions, the weight distribution matters more than the specification number.',
      },
      {
        title: 'Card case mechanism in a meeting context',
        body: 'Traditional hinged card cases require a two-hand open-and-retrieve motion. The WP-309 thumb-push slide presents a card from the front edge with one hand, which suits the handshake-adjacent moment at the start of a meeting. At 103 × 60mm and approximately 80g, it fits a jacket pocket alongside the pen.',
      },
      {
        title: 'What the standard packaging delivers',
        body: 'The set ships in a rigid lid gift box with a flocked EVA insert. The lift-off lid format keeps the presentation simple and formal, which suits sales onboarding kits, BD team recognition, and client-facing staff gifts. The notebook, rollerball, and card case each sit in their own cut recess to reduce movement in transit and keep the metal surfaces separated.',
      },
      {
        title: 'Logo on the box',
        body: 'On the matte paper wrap of a rigid lid box, hot foil stamping gives the logo clear contrast. Blind debossing is the quieter option, creating a pressed mark in the lid surface without metallic foil.',
      },
      {
        title: 'Available packaging upgrades',
        body: 'A printed liner inside the lid is available for welcome notes, sales playbook intros, or QR codes linking to a meeting briefing or company intro. A reusable desk-tray format is also available on request for buyers who want the packaging to remain on the recipient\'s desk after unboxing.',
      },
    ],
    coverImage: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover.avif',
    hoverImage: '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-hover.avif',
    images: [
      '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-cover.avif',
      '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-detail-1.avif',
      '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-detail-2.avif',
      '/products/WGS-009-3-The-Meeting-Kit/The-Meeting-Kit-detail-3.avif',
    ],
    imageAlts: [
      'Three-piece custom metal business meeting gift set — anodised aluminium ring binder notebook, brass rollerball pen, and stainless steel business card case in rigid lid gift box with black EVA foam insert',
      'Anodised aluminium A5 ring binder notebook with laser-engraved logo — custom corporate gift set component',
      'Solid brass rollerball pen with twist cap, 30g, laser-engraved barrel — custom corporate gift',
      'Slim push stainless steel business card case, brushed finish, laser-engraved — custom corporate gift',
    ],
  },
]

export function getGiftSetById(id: string): GiftSet | undefined {
  return giftSets.find((s) => s.id === id)
}

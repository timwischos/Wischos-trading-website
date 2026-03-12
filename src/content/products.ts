export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  materials: string[]
  heroImage: string
  moq: number
  customizationOptions: string[]
  leadTimeSample: string
  leadTimeBulk: string
}

export const products: Product[] = [
  {
    id: 'architect-desk-set',
    name: 'Architect Desk Set',
    tagline: 'Brake-formed aluminium desk accessories — refined, functional, unmistakably yours.',
    description:
      'The Architect Desk Set comprises a coordinated trio of brake-formed aluminium components: an in/out document tray, a vertical document holder, and a catchall dish. Each piece is manufactured from 1.5mm aluminium alloy with a satin anodised finish. Edges are deburred and radiused for a refined tactile experience. The set ships flat-packed inside a branded kraft sleeve. Logo engraving is precision CNC-milled into the catchall dish face.',
    category: 'Desk Accessories',
    materials: ['Aluminium alloy', 'Anodised finish'],
    heroImage: 'https://picsum.photos/seed/architect-desk-set/800/600',
    moq: 50,
    customizationOptions: [
      'CNC logo engraving on catchall dish face',
      'Custom colour anodising (MOQ conditions apply)',
      'Branded kraft sleeve with your logo and colour palette',
    ],
    leadTimeSample: '7–10 business days',
    leadTimeBulk: 'Approximately 30 days',
  },
  {
    id: 'signature-pen-collection',
    name: 'Signature Pen Collection',
    tagline: 'Precision-machined brass writing instruments in a custom gift box.',
    description:
      'The Signature Pen Collection is a matched pair of writing instruments — a rollerball and a ballpoint — machined from solid brass rod stock and finished with a brushed surface. The weighted barrel (28g each) sits firmly in hand. Both pens use standard international refills. The collection ships in a hand-stitched presentation box with a debossed lid panel — sized for desk display or client gifting. Logo placement is laser-engraved on the barrel clip.',
    category: 'Writing Instruments',
    materials: ['Brass', 'Stainless steel clip'],
    heroImage: 'https://picsum.photos/seed/signature-pen-collection/800/600',
    moq: 50,
    customizationOptions: [
      'Laser engraving on barrel clip (logo or text)',
      'Debossed logo on presentation box lid',
      'Custom interior lining colour',
    ],
    leadTimeSample: '7–10 business days',
    leadTimeBulk: 'Approximately 30 days',
  },
  {
    id: 'castro-catchall-tray',
    name: 'Castro Catchall Tray',
    tagline:
      'Stamped brass desk catchall with custom logo engraving — a daily-use object with presence.',
    description:
      'The Castro Catchall Tray is a single-piece stamped brass dish, 180mm × 130mm, with a 12mm upturned rim. The surface takes a light brushed finish that develops a natural patina over time. The floor of the tray is the engraving field: your logo is CNC-etched into the brass, creating a permanent, tactile brand mark. The tray is supplied in a branded tissue-wrapped carton with a printed card insert. No assembly required.',
    category: 'Desk Accessories',
    materials: ['Brass'],
    heroImage: 'https://picsum.photos/seed/castro-catchall-tray/800/600',
    moq: 50,
    customizationOptions: [
      'CNC logo engraving on tray floor',
      'Branded carton with custom print',
      'Custom card insert with brand message',
    ],
    leadTimeSample: '7–10 business days',
    leadTimeBulk: 'Approximately 30 days',
  },
  {
    id: 'executive-edc-set',
    name: 'Executive EDC Set',
    tagline: 'Coordinated brass everyday-carry accessories in branded gift packaging.',
    description:
      'The Executive EDC Set is a coordinated trio of everyday-carry items: a split-ring keyring, a twist-gate carabiner clip, and a slim card case — all machined from solid brass. Each piece has consistent proportions and a brushed finish. Together, they make a coherent desk-to-pocket set. The set ships in a rigid lid-and-base gift box with a custom-printed outer. The card case lid carries a laser-engraved logo. Ideal for new-hire gifting, client appreciation, or corporate milestone programmes.',
    category: 'EDC / Travel',
    materials: ['Brass', 'Stainless steel'],
    heroImage: 'https://picsum.photos/seed/executive-edc-set/800/600',
    moq: 50,
    customizationOptions: [
      'Laser engraving on card case lid',
      'Custom-printed outer gift box',
      'Custom card insert with brand message',
    ],
    leadTimeSample: '7–10 business days',
    leadTimeBulk: 'Approximately 30 days',
  },
]

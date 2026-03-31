export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string // display string e.g. "March 28, 2026"
  heroImage: string
  heroImageAlt: string
  heroImageCredit: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'aluminum-brass-steel-titanium-corporate-gifts',
    title: 'Aluminum, Brass, Steel, or Titanium? How to Choose the Right Metal for Corporate Gifts',
    metaTitle: 'Aluminum vs Brass vs Steel vs Titanium for Corporate Gifts | Wischos Gift',
    metaDescription:
      'Aluminum, brass, stainless steel, or titanium for your corporate gift programme? A practical guide to what each metal actually means in durability, feel, finish, and value.',
    excerpt:
      'The material is a more consequential decision than it first appears. It determines how the gift feels in hand, how it ages on a desk, and the signal it sends before anyone reads the card.',
    category: 'Material Guide',
    readTime: '6 min read',
    publishedAt: 'January 14, 2026',
    heroImage:
      'https://images.pexels.com/photos/10406128/pexels-photo-10406128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    heroImageAlt: 'Close-up of precision machined metal tool showing fine surface detail',
    heroImageCredit: 'Pexels',
  },
  {
    slug: 'laser-engraving-vs-color-printing-corporate-gifts',
    title: 'Laser Engraving vs. Color Printing: Which Logo Method Is Right for Your Metal Corporate Gift?',
    metaTitle: 'Laser Engraving vs Color Printing for Metal Corporate Gifts | Wischos Gift',
    metaDescription:
      'Laser engraving or color printing for your company logo on metal gifts? A practical guide to durability, personalization, and which method is right for your programme.',
    excerpt:
      'They look equally sharp in a mockup. In practice, the gap in durability is significant — and it matters most on the gifts people actually keep.',
    category: 'Customisation',
    readTime: '4 min read',
    publishedAt: 'February 6, 2026',
    heroImage:
      'https://images.pexels.com/photos/7254428/pexels-photo-7254428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    heroImageAlt: 'Close-up of a CNC laser engraving machine working on a metal surface',
    heroImageCredit: 'Pexels',
  },
  {
    slug: 'how-to-order-custom-corporate-gifts-from-china',
    title: "How to Order Premium Custom Corporate Gifts from China: A Buyer's Guide",
    metaTitle: "How to Order Premium Custom Corporate Gifts from China | Wischos Gift",
    metaDescription:
      'A practical guide to ordering premium custom corporate gifts from China — covering MOQ, the factory-direct myth, sample orders, and how a specialist trading partner adds real value.',
    excerpt:
      "China manufactures the vast majority of the world's corporate gifts. The quality spectrum is massive — from disposable trinkets to aerospace-grade titanium tools. Navigating it comes down to knowing the right questions to ask.",
    category: 'Sourcing Guide',
    readTime: '6 min read',
    publishedAt: 'March 3, 2026',
    heroImage:
      'https://images.pexels.com/photos/7480239/pexels-photo-7480239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    heroImageAlt: 'Close-up of a precision CNC milling machine carving metal with high accuracy',
    heroImageCredit: 'cottonbro studio / Pexels',
  },
  {
    slug: 'corporate-gift-lead-times-china-planning-guide',
    title: 'The Hidden Timeline: Why Most Corporate Gift Programs Fail on Delivery',
    metaTitle: 'Corporate Gift Lead Times from China: The Full Timeline | Wischos Gift',
    metaDescription:
      'Most corporate gift programs fail on timing, not quality. The full production-to-delivery timeline, key disruption dates to plan around, and what to do when time is short.',
    excerpt:
      "Most corporate gift programs fail on timing — not quality. The order goes in too late, the gifts arrive after the event, or quality corners get cut to hit an impossible deadline.",
    category: 'Logistics',
    readTime: '5 min read',
    publishedAt: 'March 24, 2026',
    heroImage:
      'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    heroImageAlt: 'Aerial view of shipping containers stacked at a cargo port',
    heroImageCredit: 'Pexels',
  },
]

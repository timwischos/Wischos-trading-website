export function buildOgMeta({
  title,
  description,
  image,
  type = 'website',
  url,
}: {
  title: string
  description: string
  image: string
  type?: 'website' | 'product'
  url?: string
}) {
  const fullImage = image.startsWith('http') ? image : `${siteMeta.siteUrl}${image}`
  const fullUrl = url
    ? url.startsWith('http') ? url : `${siteMeta.siteUrl}${url}`
    : siteMeta.siteUrl
  return [
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: siteMeta.siteName },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: fullImage },
    { property: 'og:url', content: fullUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: fullImage },
  ]
}

export function buildCanonical(path: string) {
  const href = path.startsWith('http') ? path : `${siteMeta.siteUrl}${path}`
  return { rel: 'canonical' as const, href }
}

export const siteMeta = {
  siteName: 'Wischos Gift',
  siteUrl: 'https://wischosgift.com',
  legalName: 'Anhui Wischos International Trading Co. Ltd',
  email: 'johnlui@wischosgift.com',
  defaultOgImage: '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-lifestyle.avif',
  defaultTitle: 'Custom Metal Corporate Gifts & Promotional Sets | Brass · Titanium · Steel | Wischos Gift',
  defaultDescription: 'Metal-only B2B custom corporate gift programs — brass, titanium, stainless steel, aluminium. Curated sets and individual SKUs for promotional distributors and corporate procurement. Custom logo engraving, MOQ 100, 25-35 day production from China.',
  routes: {
    home: {
      title: 'Custom Metal Corporate Gifts & Promotional Sets | Brass · Titanium · Steel | Wischos Gift',
      description: 'Metal-only B2B custom corporate gift programs — brass, titanium, stainless steel, aluminium. Curated sets and individual SKUs for promotional distributors and corporate procurement. Custom logo engraving, MOQ 100, 25-35 day production from China.',
    },
    products: {
      title: 'Custom Metal Corporate Gift Catalog — Brass · Titanium · Steel | Wischos Gift',
      description: 'Browse our metal-only B2B catalog: executive brass pens, titanium drinkware, daily carry tools, desk accessories. Available as curated gift sets or individual SKUs. Custom logo engraving, hot-foil packaging, MOQ 100.',
    },
    about: {
      title: 'About Wischos Gift — Metal-Only Custom Corporate Gift Specialist',
      description: 'Wischos Gift is a China-based metal-only specialist for custom corporate gift sets and promotional programs. Exclusively brass, titanium, stainless steel, and aluminium. B2B sourcing for distributors and procurement teams worldwide.',
    },
    contact: {
      title: 'Contact Wischos Gift',
      description: 'Get in touch with Wischos Gift. Request samples, ask about MOQ, or start a custom branded metal gift set inquiry. We respond within 24 hours.',
    },
    inquiry: {
      title: 'Request an Inquiry | Wischos Gift',
      description: 'Submit an inquiry for custom branded metal gift sets. Tell us your quantity and requirements.',
    },
    howItWorks: {
      title: 'How It Works | Wischos Gift',
      description: 'Our end-to-end process from first inquiry to delivery. Sample policy, lead times, and payment terms explained.',
    },
    privacy: {
      title: 'Privacy Policy | Wischos Gift',
      description: 'Privacy policy for Wischos Gift — how we collect, use, and protect your personal and inquiry data in compliance with GDPR and applicable data protection laws.',
    },
    faq: {
      title: 'FAQ — Custom Metal Corporate Gifts | Wischos Gift',
      description: 'Answers to the most common questions about ordering custom branded metal gift sets. MOQ, lead times, samples, payment terms, and packaging options.',
    },
    blog: {
      title: 'Corporate Gift Insights | Wischos Gift Blog',
      description: 'Practical guides for corporate buyers — materials, customisation methods, sourcing from China, and lead time planning.',
    },
  },
} as const

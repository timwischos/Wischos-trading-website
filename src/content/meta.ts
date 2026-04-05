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
  email: 'inquiries@wischosgift.com',
  defaultOgImage: '/products/WP-401-pure-titanium-vacuum-insulated-bottle/pure-titanium-vacuum-insulated-bottle-lifestyle.avif',
  defaultTitle: 'Custom Metal Corporate Gift Sets | MOQ 100 | Wischos Gift',
  defaultDescription: 'Custom engraved metal gift sets for corporate buyers. Executive gift sets, pens, desk accessories — MOQ 100 sets. Full branding and packaging included. Worldwide delivery.',
  routes: {
    home: {
      title: 'Custom Metal Corporate Gift Sets | MOQ 100 | Wischos Gift',
      description: 'Custom engraved metal gift sets for corporate buyers. Executive gift sets, pens, desk accessories — MOQ 100 sets. Full branding and packaging included. Worldwide delivery.',
    },
    products: {
      title: 'Corporate Metal Gift Set Catalog | Wischos Gift',
      description: 'Browse our full catalog of custom metal corporate gift sets — executive pen sets, desk accessories, EDC tools and drinkware. MOQ 100 pcs. Laser engraving and full packaging customization available.',
    },
    about: {
      title: 'About Wischos Gift — Corporate Gift Specialists',
      description: 'Wischos Gift is a trading company specialising in quality custom metal gift sets for corporate buyers worldwide.',
    },
    contact: {
      title: 'Contact Wischos Gift',
      description: 'Get in touch with Wischos Gift. Request samples, ask about MOQ, or start a custom branded metal gift set inquiry. We respond within 24 hours.',
    },
    inquiry: {
      title: 'Request an Inquiry | Wischos Gift',
      description: 'Submit an inquiry for custom branded metal gift sets. MOQ 100 sets.',
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

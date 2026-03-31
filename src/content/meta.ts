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
  defaultTitle: 'Custom Metal Gifts | Selected Objects for B2B | Wischos',
  defaultDescription: 'Custom branded metal gift sets for corporate buyers. MOQ 100 sets. Professional packaging design. Delivered to corporate buyers worldwide.',
  routes: {
    home: {
      title: 'Custom Metal Gifts | Selected Objects for B2B | Wischos',
      description: 'Custom branded metal gift sets for corporate buyers. MOQ 100 sets. Professional packaging design. Delivered to corporate buyers worldwide.',
    },
    products: {
      title: 'Metal Gift Set Catalog | Wischos Gift',
      description: 'Browse premium metal gift sets. MOQ 100 sets per series. Full packaging customization available.',
    },
    about: {
      title: 'About Wischos Gift — Corporate Gift Specialists',
      description: 'Wischos Gift is a trading company specialising in quality custom metal gift sets for corporate buyers worldwide.',
    },
    contact: {
      title: 'Contact Wischos Gift',
      description: 'Get in touch with Wischos Gift for custom branded metal gift sets.',
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
      description:
        'Privacy policy for Wischos Gift — how we collect, use, and protect your inquiry data under GDPR.',
    },
  },
} as const

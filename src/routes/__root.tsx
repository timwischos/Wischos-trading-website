import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { siteMeta } from '@/content/meta'

import appCss from '../styles.css?url'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteMeta.siteName,
  legalName: siteMeta.legalName,
  url: siteMeta.siteUrl,
  email: siteMeta.email,
  description: siteMeta.defaultDescription,
  foundingDate: '2024',
  areaServed: ['AU', 'EU', 'SG', 'KR', 'JP'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteMeta.email,
    availableLanguage: 'English',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteMeta.siteName,
  url: siteMeta.siteUrl,
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteMeta.defaultTitle },
      { name: 'description', content: siteMeta.defaultDescription },
    ],
    links: [
      { rel: 'preconnect', href: 'https://res.cloudinary.com' },
      { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      { type: 'application/ld+json', children: JSON.stringify(organizationJsonLd) },
      { type: 'application/ld+json', children: JSON.stringify(websiteJsonLd) },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-859CPYDHVK" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-859CPYDHVK');
        `}} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppButton />
        <Scripts />
      </body>
    </html>
  )
}

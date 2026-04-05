import { HeadContent, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
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
  sameAs: [
    'https://www.linkedin.com/company/wischosgift',
  ],
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
  const location = useRouterState({ select: (s) => s.location.pathname })
  const isLanding = location.startsWith('/landing/')

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
        <script dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "w6z70dz6w4");
        `}} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {!isLanding && <SiteHeader />}
        {children}
        {!isLanding && <SiteFooter />}
        {!isLanding && <WhatsAppButton />}
        <Scripts />
      </body>
    </html>
  )
}

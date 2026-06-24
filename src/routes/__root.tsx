import { HeadContent, Scripts, createRootRoute, useRouterState, Link, type LinkProps } from '@tanstack/react-router'
import { useEffect } from 'react'

type RouterTo = LinkProps['to']

function NotFoundPage() {
  return (
    <div style={{ position: 'relative', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center', overflow: 'hidden' }}>
      {/* Watermark */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(10rem, 30vw, 20rem)',
        fontWeight: 700, letterSpacing: '-0.04em',
        color: 'var(--accent-brand)', opacity: 0.06,
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>404</span>

      {/* Content */}
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-brand)', marginBottom: '1.25rem' }}>
        404
      </p>
      <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1rem', position: 'relative' }}>
        Page not found
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.75, maxWidth: '34ch', marginBottom: '2.5rem', position: 'relative' }}>
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
        <Link
          to={'/' as RouterTo}
          style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--accent-brand)', color: '#fff', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
        >
          Back to Home
        </Link>
        <Link
          to={'/products' as RouterTo}
          style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'transparent', color: '#0a0a0a', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #d0d0d0' }}
        >
          View Products
        </Link>
      </div>
    </div>
  )
}
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
  inLanguage: 'en',
  knowsLanguage: ['en', 'zh-CN'],
  areaServed: ['AU', 'NZ', 'SG', 'AE', 'HK', 'SA', 'CH', 'GB'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteMeta.email,
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.linkedin.com/company/wischosgift',
    'https://www.instagram.com/wischosgift',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteMeta.siteName,
  url: siteMeta.siteUrl,
  inLanguage: 'en',
  publisher: {
    '@type': 'Organization',
    name: siteMeta.siteName,
    url: siteMeta.siteUrl,
  },
}

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
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
      { rel: 'preconnect', href: 'https://a.clarity.ms' },
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

  useEffect(() => {
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', 'page_view', { page_path: location })
    }
  }, [location])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {!isLanding && <SiteHeader />}
        <main>{children}</main>
        {!isLanding && <SiteFooter />}
        {!isLanding && <WhatsAppButton />}

        {/* Third-party analytics - Non-blocking scripts */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-859CPYDHVK" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-859CPYDHVK', { 'send_page_view': false });
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "w6z70dz6w4");
        `}} />
        <Scripts />
      </body>
    </html>
  )
}

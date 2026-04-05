import { Link } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { cloudinaryUrl } from '@/lib/cloudinary'

const productCategories = [
  { label: 'Gift Sets', href: '/featured' },
  { label: 'Our Products', href: '/products' },
  { label: 'Writing Instruments', href: '/products?category=Writing+Instruments' },
  { label: 'Desk Accessories', href: '/products?category=Desk+Accessories' },
  { label: 'EDC Accessories', href: '/products?category=EDC+Accessories' },
  { label: 'Drinkware', href: '/products?category=Drinkware' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'How It Works', href: '/about#how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#6b6b6b',
  marginBottom: '1.5rem',
}

const linkStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.85rem',
  color: '#444',
  textDecoration: 'none',
  marginBottom: '0.75rem',
  transition: 'color 150ms ease',
  cursor: 'pointer',
}


function SocialIconButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        width: '2.25rem', height: '2.25rem',
        border: '1px solid var(--grid-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none', color: '#6b6b6b',
        transition: 'border-color 150ms ease, color 150ms ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-brand)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-brand)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--grid-color)'; (e.currentTarget as HTMLElement).style.color = '#6b6b6b' }}
    >
      {children}
    </a>
  )
}

export function SiteFooter() {

  return (
    <footer style={{ borderTop: '1px solid var(--grid-color)', background: '#fff' }}>
      {/* Main 3-column grid */}
      <div style={{
        display: 'grid',
        borderBottom: '1px solid var(--grid-color)',
      }} className="grid-cols-1 md:grid-cols-3">

        {/* Left — Brand + Social */}
        <div style={{ padding: '2.5rem 2rem', borderRight: '1px solid var(--grid-color)' }}>
          {/* Logo */}
          <img
            src={cloudinaryUrl('/wischos-logo')}
            alt="Wischos Gift Trading"
            style={{ height: '2.5rem', width: 'auto', marginBottom: '1.25rem', display: 'block' }}
          />

          <p style={{ fontSize: '0.8rem', color: '#4a4a4a', lineHeight: 1.65, maxWidth: '22ch', marginBottom: '1rem' }}>
            Custom metal gifts for B2B buyers. MOQ 100 sets.
          </p>
          <a
            href="mailto:inquiries@wischosgift.com"
            style={{ fontSize: '0.75rem', color: '#6b6b6b', display: 'block', marginBottom: '1.75rem', textDecoration: 'none', transition: 'color 150ms ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6b6b6b' }}
          >
            inquiries@wischosgift.com
          </a>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <SocialIconButton href="https://www.linkedin.com/company/wischosgift" label="LinkedIn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </SocialIconButton>
            <SocialIconButton href="mailto:inquiries@wischosgift.com" label="Email us">
              <Mail size={16} />
            </SocialIconButton>
          </div>
        </div>

        {/* Middle — Products */}
        <div style={{ padding: '2.5rem 2rem', borderRight: '1px solid var(--grid-color)', borderTop: '1px solid var(--grid-color)' }} className="md:border-t-0">
          <p style={labelStyle}>Products</p>
          {productCategories.map(link => (
            <Link
              key={link.label}
              to={link.href as any}
              style={linkStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#444' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right — Company */}
        <div style={{ padding: '2.5rem 2rem', borderTop: '1px solid var(--grid-color)' }} className="md:border-t-0">
          <p style={labelStyle}>Company</p>
          {companyLinks.map(link => (
            <Link
              key={link.label}
              to={link.href as any}
              style={linkStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#444' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.72rem', color: '#6b6b6b', letterSpacing: '0.04em' }}>
          &copy; {new Date().getFullYear()} Wischos Gift Trading Co. All rights reserved.
        </p>
        <p style={{ fontSize: '0.72rem', color: '#6b6b6b' }}>
          B2B Custom Metal Gifts · MOQ 100
        </p>
      </div>
    </footer>
  )
}

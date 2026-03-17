import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const productCategories = [
  { label: 'Writing Instruments', href: '/products' },
  { label: 'Desk Accessories', href: '/products' },
  { label: 'EDC Accessories', href: '/products' },
  { label: 'Drinkware', href: '/products' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
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

const subLinkStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  color: '#6b6b6b',
  textDecoration: 'none',
  marginBottom: '0.55rem',
  paddingLeft: '0.85rem',
  borderLeft: '1px solid var(--grid-color)',
  transition: 'color 150ms ease',
  cursor: 'pointer',
}

// Placeholder social icon — uses button for keyboard accessibility
function SocialPlaceholder({ label }: { label: string }) {
  return (
    <button
      aria-label={label}
      style={{
        width: '2rem', height: '2rem',
        border: '1px solid var(--grid-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', background: 'none',
        transition: 'border-color 150ms ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0a0a0a' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--grid-color)' }}
    >
      <div style={{ width: '0.9rem', height: '0.9rem', background: '#bbb', borderRadius: '1px' }} />
    </button>
  )
}

export function SiteFooter() {
  const [productsHovered, setProductsHovered] = useState(false)

  return (
    <footer style={{ borderTop: '1px solid var(--grid-color)', background: '#fff' }}>
      {/* Main 3-column grid */}
      <div style={{
        display: 'grid',
        borderBottom: '1px solid var(--grid-color)',
      }} className="grid-cols-1 md:grid-cols-3">

        {/* Left — Brand + Social */}
        <div style={{ padding: '2.5rem 2rem', borderRight: '1px solid var(--grid-color)' }}>
          {/* Logo placeholder */}
          <div style={{
            width: '7rem', height: '2.25rem',
            border: '1px dashed #ccc',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.25rem',
          }}>
            <span style={{ fontSize: '0.65rem', color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Logo</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#4a4a4a', lineHeight: 1.65, maxWidth: '22ch', marginBottom: '1rem' }}>
            Premium metal corporate gifts. Custom branding from MOQ 50 sets.
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
            <SocialPlaceholder label="Social 1" />
            <SocialPlaceholder label="Social 2" />
            <SocialPlaceholder label="Social 3" />
            <SocialPlaceholder label="Social 4" />
          </div>
        </div>

        {/* Middle — Products */}
        <div style={{ padding: '2.5rem 2rem', borderRight: '1px solid var(--grid-color)', borderTop: '1px solid var(--grid-color)' }} className="md:border-t-0">
          <p style={labelStyle}>Products</p>

          {/* All Products with hover dropdown */}
          <div
            style={{ position: 'relative', marginBottom: productsHovered ? '0.25rem' : '0.75rem' }}
            onMouseEnter={() => setProductsHovered(true)}
            onMouseLeave={() => setProductsHovered(false)}
          >
            <Link
              to="/products"
              style={{ ...linkStyle, marginBottom: 0, color: productsHovered ? '#0a0a0a' : '#444', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              All Products
              <span style={{ fontSize: '0.6rem', color: '#6b6b6b', transition: 'transform 150ms ease', display: 'inline-block', transform: productsHovered ? 'rotate(90deg)' : 'none' }}>▶</span>
            </Link>

            {/* Subcategories */}
            <div style={{
              overflow: 'hidden',
              maxHeight: productsHovered ? '12rem' : '0',
              transition: 'max-height 250ms ease',
              marginTop: productsHovered ? '0.6rem' : '0',
            }}>
              {productCategories.map(link => (
                <Link
                  key={link.label}
                  to={link.href as any}
                  style={subLinkStyle}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6b6b6b' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
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
          B2B Custom Metal Gifts · MOQ 50
        </p>
      </div>
    </footer>
  )
}

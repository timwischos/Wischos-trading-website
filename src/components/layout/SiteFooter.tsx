import { Link } from '@tanstack/react-router'

const footerLinks = {
  products: [
    { label: 'All Products', href: '/products' },
    { label: 'Writing Instruments', href: '/products' },
    { label: 'Desk Accessories', href: '/products' },
    { label: 'EDC Accessories', href: '/products' },
    { label: 'Drinkware', href: '/products' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
  ],
}

const colStyle: React.CSSProperties = {
  borderRight: '1px solid var(--grid-color)',
  padding: '2.5rem 2rem',
}
const colLastStyle: React.CSSProperties = {
  padding: '2.5rem 2rem',
}
const headingStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#888',
  marginBottom: '1.25rem',
}
const linkStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.85rem',
  color: '#444',
  textDecoration: 'none',
  marginBottom: '0.65rem',
  transition: 'color 150ms ease',
}

export function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--grid-color)', background: '#fff', marginTop: 0 }}>
      {/* Main footer grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', borderBottom: '1px solid var(--grid-color)' }}
        className="md:grid-cols-4">

        {/* Brand column */}
        <div style={{ ...colStyle }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Wischos Gift
          </p>
          <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.65, maxWidth: '22ch' }}>
            Premium metal corporate gifts. Custom branding from MOQ 50 sets.
          </p>
          <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '1rem' }}>
            inquiries@wischosgift.com
          </p>
        </div>

        {/* Products column */}
        <div style={{ ...colStyle, borderTop: '1px solid var(--grid-color)' }} className="md:border-t-0">
          <p style={headingStyle}>Products</p>
          {footerLinks.products.map(link => (
            <Link key={link.label} to={link.href as any} style={linkStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#444' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Company column */}
        <div style={{ ...colStyle, borderTop: '1px solid var(--grid-color)' }} className="md:border-t-0">
          <p style={headingStyle}>Company</p>
          {footerLinks.company.map(link => (
            <Link key={link.label} to={link.href as any} style={linkStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#444' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Legal column */}
        <div style={{ ...colLastStyle, borderTop: '1px solid var(--grid-color)' }} className="md:border-t-0">
          <p style={headingStyle}>Legal</p>
          {footerLinks.legal.map(link => (
            <Link key={link.label} to={link.href as any} style={linkStyle}
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
        <p style={{ fontSize: '0.72rem', color: '#bbb', letterSpacing: '0.04em' }}>
          &copy; {new Date().getFullYear()} Wischos Gift Trading Co. All rights reserved.
        </p>
        <p style={{ fontSize: '0.72rem', color: '#bbb' }}>
          B2B Custom Metal Gifts · MOQ 50
        </p>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { Link, type LinkProps } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { navigation } from '@/content/navigation'

type RouterTo = LinkProps['to']

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--grid-color)', background: '#fff', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: '3.5rem' }}>

          {/* Logo */}
          <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 300, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#0a0a0a', textDecoration: 'none' }}>
            {navigation.logoText}
          </Link>

          {/* Desktop navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden md:flex">
            {navigation.links.map((link) => (
              <Link
                key={link.href}
                to={link.href as RouterTo}
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Link
              to={navigation.cta.href as RouterTo}
              style={{
                fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#0a0a0a', border: '1px solid #0a0a0a', padding: '0.5rem 1.25rem',
                textDecoration: 'none', transition: 'background 150ms ease, color 150ms ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0a0a0a'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
            >
              {navigation.cta.label}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', lineHeight: 0 }}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.2)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 101,
          width: '75vw', maxWidth: '20rem', background: '#fff',
          borderLeft: '1px solid var(--grid-color)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 250ms ease',
          display: 'flex', flexDirection: 'column', padding: '1.5rem',
        }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          style={{ alignSelf: 'flex-end', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0, marginBottom: '2rem' }}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {navigation.links.map((link) => (
            <Link
              key={link.href}
              to={link.href as RouterTo}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={navigation.cta.href as RouterTo}
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: '1rem', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#fff', background: '#0a0a0a', border: '1px solid #0a0a0a',
              padding: '0.75rem 1.25rem', textDecoration: 'none', textAlign: 'center',
            }}
          >
            {navigation.cta.label}
          </Link>
        </nav>
      </div>
    </>
  )
}

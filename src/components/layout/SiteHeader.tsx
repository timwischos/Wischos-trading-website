import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, type LinkProps } from '@tanstack/react-router'
import { Menu, X, ChevronDown, Search } from 'lucide-react'
import { navigation } from '@/content/navigation'
import { cloudinaryUrl } from '@/lib/cloudinary'
import { trackViewSearchResults } from '@/lib/analytics'

type RouterTo = LinkProps['to']

const productDropdownItems = [
  { label: 'Gift Sets', href: '/featured' },
  { label: 'Our Products', href: '/products' },
  { label: 'Writing Instruments', href: '/products?category=Writing+Instruments' },
  { label: 'Desk Accessories', href: '/products?category=Desk+Accessories' },
  { label: 'EDC Accessories', href: '/products?category=EDC+Accessories' },
  { label: 'Drinkware', href: '/products?category=Drinkware' },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Close search on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate({ to: '/products' as RouterTo, search: { q: searchQuery.trim() } as never })
      trackViewSearchResults({ query: searchQuery.trim() })
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--grid-color)', background: '#fff', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: '3.5rem' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={cloudinaryUrl('/wischos-logo')} alt="Wischos Gift Trading" style={{ height: '2rem', width: 'auto', display: 'block' }} />
          </Link>

          {/* Desktop navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden md:flex">
            {navigation.links.map((link) =>
              link.label === 'Products' ? (
                /* Products — hover dropdown */
                <div
                  key={link.href}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    }}
                    className="nav-link"
                    aria-haspopup="true"
                    aria-expanded={productsOpen}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      style={{
                        transition: 'transform 200ms ease',
                        transform: productsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        opacity: 0.6,
                      }}
                    />
                  </button>

                  {/* Dropdown panel */}
                  <div
                    style={{
                      position: 'absolute', top: '100%', left: '50%',
                      transform: 'translateX(-50%)',
                      minWidth: '13rem',
                      paddingTop: '0.75rem',
                      opacity: productsOpen ? 1 : 0,
                      pointerEvents: productsOpen ? 'auto' : 'none',
                      transition: 'opacity 180ms ease',
                    }}
                  >
                    <div style={{
                      background: '#fff',
                      border: '1px solid var(--grid-color)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      padding: '0.5rem 0',
                    }}>
                    {productDropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href as RouterTo}
                        style={{
                          display: 'block',
                          padding: '0.45rem 1.25rem',
                          fontSize: '0.78rem',
                          fontWeight: 400,
                          color: '#555',
                          textDecoration: 'none',
                          letterSpacing: '0.02em',
                          transition: 'background 120ms ease, color 120ms ease',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f5f5f5'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#555' }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href as RouterTo}
                  className="nav-link"
                  activeProps={{ className: 'nav-link is-active' }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop right: search + CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSearchOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', lineHeight: 0, color: '#555' }}
              aria-label="Search products"
            >
              <Search size={18} />
            </button>
            <Link
              to={navigation.cta.href as RouterTo}
              style={{
                fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#fff', background: '#0a0a0a', border: '1px solid #0a0a0a', padding: '0.5rem 1.25rem',
                textDecoration: 'none', transition: 'background 150ms ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#333' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0a0a0a' }}
            >
              {navigation.cta.label}
            </Link>
          </div>

          {/* Mobile: search + menu toggle */}
          <div className="md:hidden" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setSearchOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', lineHeight: 0, color: '#555' }}
              aria-label="Search products"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', lineHeight: 0 }}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search bar — slides down */}
        <div style={{
          overflow: 'hidden',
          maxHeight: searchOpen ? '4rem' : '0',
          transition: 'max-height 200ms ease',
          borderTop: searchOpen ? '1px solid var(--grid-color)' : 'none',
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', padding: '0 1.5rem', height: '3.5rem', gap: '0.75rem' }}>
            <Search size={16} style={{ color: '#999', flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products by name, material, or category..."
              style={{
                flex: 1, border: 'none', outline: 'none', fontSize: '0.85rem',
                color: '#0a0a0a', background: 'transparent',
              }}
            />
            <button
              type="button"
              onClick={() => { setSearchOpen(false); setSearchQuery('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', lineHeight: 0, color: '#999' }}
              aria-label="Close search"
            >
              <X size={16} />
            </button>
          </form>
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
          overflowY: 'auto',
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
          {navigation.links.map((link) =>
            link.label === 'Products' ? (
              <div key={link.href}>
                <button
                  onClick={() => setMobileProductsOpen(o => !o)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  }}
                  className="nav-link"
                >
                  {link.label}
                  <ChevronDown
                    size={13}
                    style={{
                      transition: 'transform 200ms ease',
                      transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      opacity: 0.6,
                    }}
                  />
                </button>

                {/* Mobile sub-items */}
                <div style={{
                  overflow: 'hidden',
                  maxHeight: mobileProductsOpen ? '20rem' : '0',
                  transition: 'max-height 250ms ease',
                  marginTop: mobileProductsOpen ? '0.75rem' : '0',
                  display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  paddingLeft: '0.85rem',
                  borderLeft: '1px solid var(--grid-color)',
                }}>
                  {productDropdownItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href as RouterTo}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        fontSize: '0.82rem',
                        color: '#666',
                        fontWeight: 400,
                        textDecoration: 'none',
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href as RouterTo}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
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

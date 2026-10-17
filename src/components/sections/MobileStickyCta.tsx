import { useEffect, useState } from 'react'
import { trackCtaClick, trackWhatsAppClick } from '@/lib/analytics'
import { WHATSAPP_HREF } from '@/components/layout/WhatsAppButton'

const SHOW_AFTER_PX = 480

/**
 * Mobile-only bottom action bar for landing pages.
 * Appears after the hero scrolls out of view; hides again while the inquiry form or footer is on screen
 * so it never covers them. Replaces the global floating WhatsApp pill on mobile while mounted.
 */
export function MobileStickyCta() {
  const [pastHero, setPastHero] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets: Element[] = []
    const form = document.getElementById('inquiry-form')
    const footer = document.querySelector('footer')
    if (form) targets.push(form)
    if (footer) targets.push(footer)
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') return
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      }
      setBlocked(visible.size > 0)
    })
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const show = pastHero && !blocked

  return (
    <>
      <style>{`
        .sticky-cta { position: fixed; left: 0; right: 0; bottom: 0; z-index: 50; display: flex; gap: 0.5rem;
          padding: 0.6rem 0.75rem calc(0.6rem + env(safe-area-inset-bottom)); background: #fff;
          border-top: 1px solid #e5e5e5; box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
          transform: translateY(100%); visibility: hidden; transition: transform 200ms ease, visibility 200ms; }
        .sticky-cta[data-show="true"] { transform: translateY(0); visibility: visible; }
        .sticky-cta a { flex: 1 1 0; text-align: center; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.03em;
          padding: 0.8rem 0.5rem; text-decoration: none; box-sizing: border-box; }
        .sticky-cta-quote { background: #B87333; color: #fff; }
        .sticky-cta-wa { background: #25D366; color: #fff; }
        @media (max-width: 767px) { .wa-btn { display: none !important; } }
        @media (min-width: 768px) { .sticky-cta { display: none; } }
      `}</style>
      <div className="sticky-cta" data-show={show} aria-hidden={!show}>
        <a
          className="sticky-cta-quote"
          href="#inquiry-form"
          tabIndex={show ? 0 : -1}
          onClick={() => trackCtaClick({ location: 'sticky_bar', label: 'request_quote' })}
        >
          Request a Quote
        </a>
        <a
          className="sticky-cta-wa"
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          onClick={() => {
            trackCtaClick({ location: 'sticky_bar', label: 'whatsapp' })
            trackWhatsAppClick()
          }}
        >
          WhatsApp
        </a>
      </div>
    </>
  )
}

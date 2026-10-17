import { trackCtaClick, trackWhatsAppClick } from '@/lib/analytics'
import { WHATSAPP_HREF } from '@/components/layout/WhatsAppButton'

/**
 * Hero action buttons for /solutions/* landing pages.
 * Mobile: full-width "Request a Quote" + "Chat on WhatsApp" so the next step is visible without scrolling.
 * Desktop: unchanged — "Request a Quote" + "Browse the Sets".
 *
 * Also defines the shared mobile/desktop helper classes used by the hero copy (.sol-m-only / .sol-d-only,
 * .sol-eyebrow / .sol-h1 / .sol-ctas spacing overrides).
 */
export function SolutionHeroCtas() {
  return (
    <>
      <style>{`
        .sol-m-only { display: block; }
        .sol-d-only { display: none; }
        .sol-btn { display: block; width: 100%; text-align: center; box-sizing: border-box; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.04em; padding: 0.95rem 1rem; text-decoration: none; }
        .sol-btn-primary { background: #B87333; color: #fff; }
        .sol-btn-wa { background: none; color: #0a0a0a; border: 1px solid #0a0a0a; }
        .sol-btn-browse { background: none; color: #0a0a0a; border: 1px solid #0a0a0a; }
        .sol-ctas { display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1rem; }
        .sol-btn-browse { display: none; }
        @media (max-width: 767px) {
          .sol-eyebrow { margin-bottom: 0.6rem !important; font-size: 0.68rem !important; }
          .sol-h1 { margin-bottom: 0.75rem !important; }
          .sol-lede-short { margin-bottom: 1.1rem !important; }
        }
        @media (min-width: 768px) {
          .sol-m-only { display: none; }
          .sol-d-only { display: block; }
          .sol-ctas { flex-direction: row; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; }
          .sol-btn { display: inline-block; width: auto; font-size: 0.9rem; padding: 0.85rem 2rem; }
          .sol-btn-wa { display: none; }
          .sol-btn-browse { display: inline-block; }
        }
      `}</style>
      <div className="sol-ctas">
        <a
          href="#inquiry-form"
          className="sol-btn sol-btn-primary"
          onClick={() => trackCtaClick({ location: 'hero', label: 'request_quote' })}
        >
          Request a Quote →
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="sol-btn sol-btn-wa"
          onClick={() => {
            trackCtaClick({ location: 'hero', label: 'whatsapp' })
            trackWhatsAppClick()
          }}
        >
          Chat on WhatsApp
        </a>
        <a
          href="#sets"
          className="sol-btn sol-btn-browse"
          onClick={() => trackCtaClick({ location: 'hero', label: 'browse_sets' })}
        >
          Browse the Sets ↓
        </a>
      </div>
    </>
  )
}

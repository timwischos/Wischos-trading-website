import { about } from '@/content/about'

export function TrustSection() {
  return (
    <section className="py-20">
      <div className="page-wrap">
        <h2 className="text-2xl font-bold text-[var(--sea-ink)] mb-8 text-center">Trust &amp; Transparency</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column — contact & quality */}
          <div className="island-shell rounded-xl p-6">
            <p className="text-xs island-kicker mb-2">Contact</p>
            <a
              href={`mailto:${about.trust.email}`}
              className="text-[var(--lagoon-deep)] font-medium hover:underline"
            >
              {about.trust.email}
            </a>
            <p className="text-sm text-[var(--sea-ink)] opacity-70 mt-4">{about.trust.qualityStatement}</p>
          </div>

          {/* Right column — registration */}
          <div className="island-shell rounded-xl p-6">
            <p className="text-xs island-kicker mb-2">{about.trust.registrationLabel}</p>
            {import.meta.env.DEV && about.trust.registrationNumber.includes('PLACEHOLDER') && (
              <p className="bg-yellow-100 text-yellow-800 text-xs px-3 py-2 rounded mb-3 border border-yellow-200">
                DEV: Registration number placeholder — operator must fill in before launch
              </p>
            )}
            <p className="text-sm text-[var(--sea-ink)]">{about.trust.registrationNumber}</p>
            <p className="text-xs text-[var(--sea-ink)] opacity-60 mt-1">{about.trust.registrationNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

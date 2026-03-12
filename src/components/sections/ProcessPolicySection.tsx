import { howItWorks } from '@/content/howItWorks'

export function ProcessPolicySection() {
  return (
    <section className="py-20 bg-[var(--surface)]">
      <div className="page-wrap">
        <h2 className="text-2xl font-bold text-[var(--sea-ink)] text-center mb-10">
          Policies &amp; Terms at a Glance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sample Policy */}
          <div className="island-shell rounded-xl p-6">
            <p className="island-kicker mb-4">{howItWorks.samplePolicy.heading}</p>
            <ul className="space-y-2">
              <li className="text-sm text-[var(--sea-ink)]">{howItWorks.samplePolicy.reference}</li>
              <li className="text-sm text-[var(--sea-ink)] opacity-70">{howItWorks.samplePolicy.custom}</li>
            </ul>
          </div>

          {/* Lead Times */}
          <div className="island-shell rounded-xl p-6">
            <p className="island-kicker mb-4">{howItWorks.leadTimes.heading}</p>
            <p className="text-sm text-[var(--sea-ink)] mb-1">{howItWorks.leadTimes.samples}</p>
            <p className="text-sm text-[var(--sea-ink)]">{howItWorks.leadTimes.bulk}</p>
            <p className="text-xs text-[var(--sea-ink)] opacity-60 mt-2">{howItWorks.leadTimes.note}</p>
          </div>

          {/* Payment Terms */}
          <div className="island-shell rounded-xl p-6">
            <p className="island-kicker mb-4">{howItWorks.paymentTerms.heading}</p>
            <p className="font-semibold text-[var(--sea-ink)]">{howItWorks.paymentTerms.method}</p>
            <p className="text-sm text-[var(--sea-ink)] opacity-70 mt-2">{howItWorks.paymentTerms.structure}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

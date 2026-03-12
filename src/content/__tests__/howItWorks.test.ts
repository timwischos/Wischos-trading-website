import { describe, it, expect } from 'vitest'
import { howItWorks } from '@/content/howItWorks'

describe('howItWorks content', () => {
  it('steps has at least 4 items', () => {
    expect(howItWorks.steps.length).toBeGreaterThanOrEqual(4)
  })

  it('samplePolicy.reference is a non-empty string', () => {
    expect(howItWorks.samplePolicy.reference).toBeTruthy()
    expect(typeof howItWorks.samplePolicy.reference).toBe('string')
  })

  it('leadTimes.samples includes 7 or 10', () => {
    const samplesStr = howItWorks.leadTimes.samples
    expect(samplesStr.includes('7') || samplesStr.includes('10')).toBe(true)
  })

  it('leadTimes.bulk includes 30', () => {
    expect(howItWorks.leadTimes.bulk).toContain('30')
  })

  it('paymentTerms.method includes T/T', () => {
    expect(howItWorks.paymentTerms.method).toContain('T/T')
  })
})

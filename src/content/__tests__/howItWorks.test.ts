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

  it('leadTimes.samples states that timing is confirmed per project', () => {
    expect(howItWorks.leadTimes.samples).toContain('Confirmed per project')
  })

  it('leadTimes.bulk communicates the current 25–35 day range', () => {
    expect(howItWorks.leadTimes.bulk).toContain('25–35')
  })

  it('paymentTerms.method includes T/T', () => {
    expect(howItWorks.paymentTerms.method).toContain('T/T')
  })
})

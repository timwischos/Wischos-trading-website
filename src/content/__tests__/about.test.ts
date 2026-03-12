import { describe, it, expect } from 'vitest'
import { about } from '@/content/about'

describe('about content', () => {
  it('hero.heading and hero.subheading are non-empty strings', () => {
    expect(about.hero.heading).toBeTruthy()
    expect(typeof about.hero.heading).toBe('string')
    expect(about.hero.subheading).toBeTruthy()
    expect(typeof about.hero.subheading).toBe('string')
  })

  it('expertise.markets has at least 3 items', () => {
    expect(about.expertise.markets.length).toBeGreaterThanOrEqual(3)
  })

  it('whyUs.points has at least 3 items', () => {
    expect(about.whyUs.points.length).toBeGreaterThanOrEqual(3)
  })

  it('trust.registrationNumber contains PLACEHOLDER', () => {
    expect(about.trust.registrationNumber).toContain('PLACEHOLDER')
  })

  it('trust.email contains wischosgift.com', () => {
    expect(about.trust.email).toContain('wischosgift.com')
  })
})

import { describe, it, expect } from 'vitest'
import { homepage } from '@/content/homepage'

describe('homepage content', () => {
  it('hero has required string fields', () => {
    expect(homepage.hero.kicker).toBeTruthy()
    expect(typeof homepage.hero.kicker).toBe('string')
    expect(homepage.hero.headline).toBeTruthy()
    expect(typeof homepage.hero.headline).toBe('string')
    expect(homepage.hero.subheadline).toBeTruthy()
    expect(typeof homepage.hero.subheadline).toBe('string')
    expect(homepage.hero.cta).toBeTruthy()
    expect(typeof homepage.hero.cta).toBe('string')
  })

  it('valueProps has 3 items', () => {
    expect(homepage.valueProps.items).toHaveLength(3)
  })

  it('differentiators has at least 3 items', () => {
    expect(homepage.differentiators.items.length).toBeGreaterThanOrEqual(3)
  })

  it('credibility has at least 3 stats', () => {
    expect(homepage.credibility.stats.length).toBeGreaterThanOrEqual(3)
  })

  it('productPreview has exactly 3 items', () => {
    expect(homepage.productPreview.items).toHaveLength(3)
  })

  it('cta.buttonLabel is a non-empty string', () => {
    expect(homepage.cta.buttonLabel).toBeTruthy()
    expect(typeof homepage.cta.buttonLabel).toBe('string')
  })
})

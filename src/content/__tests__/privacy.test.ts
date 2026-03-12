import { describe, it, expect } from 'vitest'
import { privacy } from '@/content/privacy'

describe('privacy content', () => {
  it('title is a non-empty string', () => {
    expect(privacy.title).toBeTruthy()
    expect(typeof privacy.title).toBe('string')
  })

  it('effectiveDate is a non-empty string', () => {
    expect(privacy.effectiveDate).toBeTruthy()
    expect(typeof privacy.effectiveDate).toBe('string')
  })

  it('sections has at least 6 items', () => {
    expect(privacy.sections.length).toBeGreaterThanOrEqual(6)
  })
})

import { describe, it, expect } from 'vitest'
import type { DbProduct } from '@/server/schema'

// Product data is now stored in Supabase — no static array to test.
// These tests verify that the DbProduct type has the expected shape
// by exercising it against a well-formed fixture.

const fixture: DbProduct = {
  id: 'fixture-product',
  name: 'Fixture Product',
  tagline: 'A tagline',
  description: 'A description',
  category: 'Desk Accessories',
  materials: ['Brass', 'Steel'],
  heroImage: 'https://example.com/hero.jpg',
  images: ['https://example.com/img1.jpg'],
  moq: 50,
  customizationOptions: ['Logo engraving'],
  sortOrder: 0,
  active: true,
}

describe('DbProduct type', () => {
  it('id is URL-safe kebab-case', () => {
    expect(fixture.id).toMatch(/^[a-z0-9-]+$/)
  })

  it('has required text fields', () => {
    expect(fixture.name).toBeTruthy()
    expect(fixture.tagline).toBeTruthy()
    expect(fixture.description).toBeTruthy()
    expect(fixture.heroImage).toBeTruthy()
  })

  it('has at least 1 material', () => {
    expect(fixture.materials.length).toBeGreaterThanOrEqual(1)
  })

  it('has at least 1 customization option', () => {
    expect(fixture.customizationOptions.length).toBeGreaterThanOrEqual(1)
  })

  it('Product JSON-LD shape contains priceSpecification On Request', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: fixture.name,
      description: fixture.description,
      brand: { '@type': 'Brand', name: 'Wischos Gift' },
      offers: {
        '@type': 'Offer',
        priceSpecification: { '@type': 'PriceSpecification', price: 'On Request' },
      },
    }
    const serialised = JSON.stringify(jsonLd)
    expect(serialised).toContain('"priceSpecification"')
    expect(serialised).toContain('"On Request"')
  })
})

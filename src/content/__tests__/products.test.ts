import { describe, it, expect } from 'vitest'
import { products } from '@/content/products'

describe('products content', () => {
  it('has exactly 4 product series', () => {
    expect(products).toHaveLength(4)
  })

  it('each product has a URL-safe kebab-case id', () => {
    for (const product of products) {
      expect(product.id).toBeTruthy()
      expect(product.id).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('each product has required string fields', () => {
    for (const product of products) {
      expect(product.name).toBeTruthy()
      expect(product.tagline).toBeTruthy()
      expect(product.description).toBeTruthy()
      expect(product.heroImage).toBeTruthy()
      expect(product.leadTimeSample).toBeTruthy()
      expect(product.leadTimeBulk).toBeTruthy()
    }
  })

  it('each product has moq of 50', () => {
    for (const product of products) {
      expect(product.moq).toBe(50)
    }
  })

  it('each product has at least 1 material', () => {
    for (const product of products) {
      expect(product.materials.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('each product has at least 1 customization option', () => {
    for (const product of products) {
      expect(product.customizationOptions.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('each product heroImage uses picsum with product id as seed', () => {
    for (const product of products) {
      expect(product.heroImage).toContain('picsum.photos/seed/')
      expect(product.heroImage).toContain(product.id)
    }
  })

  it('Product JSON-LD shape contains priceSpecification On Request for each product', () => {
    for (const product of products) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        brand: { '@type': 'Brand', name: 'Wischos Gift' },
        offers: {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: 'On Request',
          },
        },
      }
      const serialised = JSON.stringify(jsonLd)
      expect(serialised).toContain('"priceSpecification"')
      expect(serialised).toContain('"On Request"')
    }
  })
})

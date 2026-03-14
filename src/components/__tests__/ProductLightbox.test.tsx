import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ProductLightbox } from '@/components/sections/ProductDetailSection'
import type { DbProduct } from '@/server/schema'

// NOTE: ESC key dismiss is NOT tested here — Radix Dialog keyboard events
// are unreliable in jsdom. Verify ESC dismiss manually in browser.

const mockProduct: DbProduct = {
  id: 'test-product',
  name: 'Test Product',
  tagline: 'A tagline',
  description: 'A description',
  category: 'Desk Accessories',
  materials: ['Brass'],
  heroImage: 'https://example.com/hero.jpg',
  images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
  moq: 50,
  customizationOptions: ['Logo engraving'],
  sortOrder: 0,
  active: true,
}

describe('ProductLightbox', () => {
  const product = mockProduct

  it('renders an image trigger button', () => {
    render(<ProductLightbox product={product} />)
    const trigger = screen.getByRole('button', { name: new RegExp(product.name, 'i') })
    expect(trigger).toBeTruthy()
  })

  it('opens dialog when image trigger is clicked', async () => {
    render(<ProductLightbox product={product} />)
    const trigger = screen.getByRole('button', { name: new RegExp(product.name, 'i') })
    await act(async () => {
      fireEvent.click(trigger)
    })
    // After click, dialog content should be present
    // Radix renders dialog in a portal — query on document.body
    const dialog = document.body.querySelector('[data-slot="dialog-content"]')
    expect(dialog).not.toBeNull()
  })
})

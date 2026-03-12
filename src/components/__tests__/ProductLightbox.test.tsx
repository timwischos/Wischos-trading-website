import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ProductLightbox } from '@/components/sections/ProductDetailSection'
import { products } from '@/content/products'

// NOTE: ESC key dismiss is NOT tested here — Radix Dialog keyboard events
// are unreliable in jsdom. Verify ESC dismiss manually in browser.

describe('ProductLightbox', () => {
  const product = products[0]!

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

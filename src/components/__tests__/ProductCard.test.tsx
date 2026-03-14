import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
  type RouteComponent,
} from '@tanstack/react-router'
import { ProductCard } from '@/components/sections/ProductGridSection'
import type { DbProduct } from '@/server/schema'

function createTestRouter(component: RouteComponent) {
  const rootRoute = createRootRoute({ component: Outlet })
  const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component })
  const routeTree = rootRoute.addChildren([indexRoute])
  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
}

const mockProduct: DbProduct = {
  id: 'test-product',
  name: 'Test Product',
  tagline: 'A tagline for testing',
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

describe('ProductCard', () => {
  const product = mockProduct

  it('renders product name', async () => {
    const router = createTestRouter(() => <ProductCard product={product} />)
    render(<RouterProvider router={router} />)
    await act(() => router.load())
    expect(screen.getByText(product.name)).toBeTruthy()
  })

  it('renders product category', async () => {
    const router = createTestRouter(() => <ProductCard product={product} />)
    render(<RouterProvider router={router} />)
    await act(() => router.load())
    expect(screen.getByText(product.category)).toBeTruthy()
  })

  it('renders MOQ badge', async () => {
    const router = createTestRouter(() => <ProductCard product={product} />)
    render(<RouterProvider router={router} />)
    await act(() => router.load())
    expect(screen.getByText(/MOQ 50/i)).toBeTruthy()
  })
})

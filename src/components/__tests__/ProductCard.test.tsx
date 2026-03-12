import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router'
import { ProductCard } from '@/components/sections/ProductGridSection'
import { products } from '@/content/products'

function createTestRouter(component: React.ComponentType) {
  const rootRoute = createRootRoute({ component: Outlet })
  const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component })
  const routeTree = rootRoute.addChildren([indexRoute])
  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
}

describe('ProductCard', () => {
  const product = products[0]!

  it('renders product name', async () => {
    const router = createTestRouter(() => <ProductCard product={product} />)
    render(<RouterProvider router={router} />)
    await router.load()
    expect(screen.getByText(product.name)).toBeTruthy()
  })

  it('renders "Custom Logo Available" callout', async () => {
    const router = createTestRouter(() => <ProductCard product={product} />)
    render(<RouterProvider router={router} />)
    await router.load()
    expect(screen.getByText(/Custom Logo Available/i)).toBeTruthy()
  })

  it('renders MOQ badge', async () => {
    const router = createTestRouter(() => <ProductCard product={product} />)
    render(<RouterProvider router={router} />)
    await router.load()
    expect(screen.getByText(/MOQ 50/i)).toBeTruthy()
  })
})

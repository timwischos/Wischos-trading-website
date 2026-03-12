import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { SiteFooter } from '@/components/layout/SiteFooter'

function createTestRouter() {
  const rootRoute = createRootRoute({ component: SiteFooter })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  return router
}

describe('SiteFooter', () => {
  it('renders a link to /privacy', () => {
    const router = createTestRouter()
    const { container } = render(<RouterProvider router={router} />)
    const privacyLink = container.querySelector('a[href="/privacy"]')
    expect(privacyLink).not.toBeNull()
    expect(privacyLink?.textContent).toContain('Privacy Policy')
  })
})

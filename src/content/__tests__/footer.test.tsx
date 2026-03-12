import { describe, it, expect } from 'vitest'
import { render, act } from '@testing-library/react'
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
  it('renders a link to /privacy', async () => {
    const router = createTestRouter()
    let container!: HTMLElement
    await act(async () => {
      const result = render(<RouterProvider router={router} />)
      container = result.container
      await router.load()
    })
    const privacyLink = container.querySelector('a[href="/privacy"]')
    expect(privacyLink).not.toBeNull()
    expect(privacyLink?.textContent).toContain('Privacy Policy')
  })
})

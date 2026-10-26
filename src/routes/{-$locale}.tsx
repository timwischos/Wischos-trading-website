import { createFileRoute, notFound, Outlet, redirect } from '@tanstack/react-router'

const SUPPORTED_LOCALES = ['en']

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ params, location }) => {
    if (params.locale === undefined) return
    // Unknown first segments (e.g. /zz-nonexistent) would otherwise match as a locale
    // and render an empty layout with HTTP 200 (soft 404).
    if (!SUPPORTED_LOCALES.includes(params.locale)) throw notFound()
    // Bare /en has no child route; send it to the homepage instead of an empty page.
    if (location.pathname.replace(/\/$/, '') === `/${params.locale}`) {
      throw redirect({ to: '/', statusCode: 301 })
    }
  },
  component: LocaleLayout,
})

// Transparent pass-through layout. The optional {-$locale} segment makes all child routes
// respond to both /page (no locale) and /en/page (with locale).
function LocaleLayout() {
  return <Outlet />
}

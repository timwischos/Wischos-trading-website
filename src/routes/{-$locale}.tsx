import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}')({
  component: LocaleLayout,
})

// Transparent pass-through layout. The optional {-$locale} segment makes all child routes
// respond to both /page (no locale) and /en/page (with locale).
function LocaleLayout() {
  return <Outlet />
}

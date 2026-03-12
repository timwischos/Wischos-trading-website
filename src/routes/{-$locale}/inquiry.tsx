import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/inquiry')({
  beforeLoad: ({ location }) => {
    throw redirect({
      to: '/{-$locale}/contact',
      search: location.search as Record<string, string>,
      replace: true,
    })
  },
  component: () => null, // never rendered (redirect happens in beforeLoad)
})

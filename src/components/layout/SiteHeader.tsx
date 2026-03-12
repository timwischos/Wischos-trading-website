import { useState } from 'react'
import { Link, type LinkProps } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { navigation } from '@/content/navigation'

// Navigation hrefs use short paths (e.g. /products) that resolve via the optional
// /{-$locale} prefix segment. TanStack Router's generated type union does not include
// the short forms, so we cast them here rather than litter the JSX with suppressions.
type RouterTo = LinkProps['to']

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="font-semibold text-lg">
          {navigation.logoText}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.links.map((link) => (
            <Link
              key={link.href}
              to={link.href as RouterTo}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: 'text-foreground' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <Button asChild>
            <Link to={navigation.cta.href as RouterTo}>{navigation.cta.label}</Link>
          </Button>
        </div>

        {/* Mobile navigation */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <nav className="flex flex-col gap-4 pt-8">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href as RouterTo}
                  className="text-base font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4">
                <Link to={navigation.cta.href as RouterTo} onClick={() => setMobileOpen(false)}>
                  {navigation.cta.label}
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

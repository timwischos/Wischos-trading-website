export function SiteFooter() {
  return (
    <footer className="border-t py-8 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Wischos Gift. All rights reserved.</p>
        <nav className="flex gap-6">
          <a href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="mailto:inquiries@wischosgift.com" className="hover:text-foreground transition-colors">
            inquiries@wischosgift.com
          </a>
        </nav>
      </div>
    </footer>
  )
}

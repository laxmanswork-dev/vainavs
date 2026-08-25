import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SkipLink } from '@components/common/SkipLink'
import { ScrollToTop } from '@components/common/ScrollToTop'
import { WhatsAppButton } from '@components/common/WhatsAppButton'

/**
 * Persistent app shell — Navbar + Footer stay mounted across route changes
 * while <Outlet> swaps the page content between them. Wired up as the root
 * element in routes/AppRoutes.jsx.
 */
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <ScrollToTop />
      {/* Floating WhatsApp contact button — per follow-up ("add a small
          floating WhatsApp contact button"), mounted once here (same
          persistent-utility tier as ScrollToTop/SkipLink above) so it's
          present on every route, not just Home. Fixed-positioned by the
          component itself, so where it sits in this tree doesn't affect
          layout. */}
      <WhatsAppButton />
      <Navbar />
      {/* pt-[4.5rem] clears the fixed Navbar (h-[4.5rem], was h-20/pt-20)
          for every page; Hero adds its own extra top space on top of this
          for a more cinematic opening.
          bg-atmosphere (new) — was transparent, just showing body's own
          flat fill through. Home's own sections (Hero, Heritage,
          CoffeeStory, ...) are each opaque and paint over this regardless,
          so this only actually becomes visible on routes that don't fill
          it with their own section background yet — the ComingSoon-backed
          pages (Our Story, Menu, Contact, Reservations) and NotFound —
          giving them the same layered coffee-house depth in one place
          instead of touching each page file individually. */}
      <main id="main-content" className="bg-atmosphere flex-1 pt-[4.5rem]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

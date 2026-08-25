import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@components/layout/Layout'
import { PageLoader } from '@components/common/PageLoader'
import { ROUTES } from '@constants/routes'

// Each page is its own chunk — only the page the visitor lands on downloads
// up front; the rest fetch on navigation.
// OurStory removed per follow-up — that page/route no longer exists, its
// content moved into Home instead (see Home.jsx/OurStoryHero.jsx).
// Reservations removed the same way per a later follow-up — the café
// doesn't have seating capacity for online booking, and rather than keep
// a permanent "coming soon" page/route around, the route itself was
// dropped entirely. Any old /reservations link now falls through to
// NOT_FOUND below (still resolves to a real page, not a dead route) —
// see wrangler.jsonc for why a direct load of that URL doesn't 404 at
// the edge first. Hero's own CTA that used to point here now goes to
// Home's #our-story section instead (see Hero.jsx).
const Home = lazy(() => import('@pages/Home'))
const Menu = lazy(() => import('@pages/Menu'))
const Contact = lazy(() => import('@pages/Contact'))
const NotFound = lazy(() => import('@pages/NotFound'))

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

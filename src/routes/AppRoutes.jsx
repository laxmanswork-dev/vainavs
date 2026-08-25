import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@components/layout/Layout'
import { PageLoader } from '@components/common/PageLoader'
import { ROUTES } from '@constants/routes'

// Each page is its own chunk — only the page the visitor lands on downloads
// up front; the rest fetch on navigation.
// OurStory removed per follow-up — that page/route no longer exists, its
// content moved into Home instead (see Home.jsx/OurStoryHero.jsx).
const Home = lazy(() => import('@pages/Home'))
const Menu = lazy(() => import('@pages/Menu'))
const Reservations = lazy(() => import('@pages/Reservations'))
const Contact = lazy(() => import('@pages/Contact'))
const NotFound = lazy(() => import('@pages/NotFound'))

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.RESERVATIONS} element={<Reservations />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

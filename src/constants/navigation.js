import { ROUTES } from './routes'

/**
 * Primary site navigation, shared by the Navbar and the Footer sitemap
 * column so both stay in sync from one list.
 *
 * "Our Story" — per follow-up, the standalone /our-story page/route was
 * removed; that content now lives inside Home (right after Heritage, see
 * OurStoryHero.jsx's `id="our-story"`). `path` here points at
 * `/#our-story` instead of a real route, so this entry still goes
 * somewhere real (Footer renders it as a plain `<Link>`, no 404). The
 * Navbar itself doesn't use this entry for "Our Story" at all — it renders
 * a dedicated `ScrollLink` there instead, which also handles the actual
 * scroll-to-section + fixed-navbar-offset precision this plain path alone
 * can't provide (see Navbar.jsx).
 */
export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Our Story', path: `${ROUTES.HOME}#our-story` },
  { label: 'Menu', path: ROUTES.MENU },
  { label: 'Contact', path: ROUTES.CONTACT },
]

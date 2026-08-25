import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '@hooks/useLenis'

/**
 * Resets scroll position to the top on every route change. React Router
 * doesn't do this by default, and without it a client lands mid-page on
 * the next route after following a link near the bottom of the current one.
 * Renders nothing — mount once near the top of the route tree.
 *
 * A hash in the URL (e.g. /#heritage, /#our-story) means "land on this
 * section instead of the top" — per follow-up ("fix sticky navbar
 * overlap... across the entire website... must work after page refresh
 * and when opening a URL directly"). Two bugs stacked here, confirmed the
 * hard way (hard-reloading /#heritage previously left scrollY at 0 every
 * single time):
 *   1. This effect used to force-snap to 0 on every mount/route-change
 *      regardless of hash, stomping over any anchor navigation before it
 *      could happen.
 *   2. Even with that removed, nothing else reliably got the page there
 *      on a hard load: every route is lazy-loaded (see routes/
 *      AppRoutes.jsx's React.lazy + Suspense) — on a hard reload/direct
 *      link, this component (part of the persistent Layout) mounts and
 *      runs before the target route's chunk has finished loading, so the
 *      target element doesn't exist in the DOM yet. Navbar.jsx's own
 *      ScrollLink has this exact same one-shot-attempt limitation for the
 *      "arrived from another route" case, which is a much rarer race (a
 *      route that's very likely already cached) — but on a cold hard
 *      load it reliably loses the race and silently fails.
 * Fixed by polling briefly for the element instead of a single query —
 * once found, scroll straight to it (immediate, not animated — a direct
 * link/reload should land there, not visibly animate down the page),
 * offset by the fixed navbar's own height so it doesn't cover the
 * section's top edge (same -72px/4.5rem convention used everywhere else
 * on the site — Navbar's own h-[4.5rem], Layout's pt-[4.5rem], the
 * target sections' own scroll-mt-[4.5rem]). Gives up after ~5s if the
 * element never appears (a genuinely missing/typo'd hash), rather than
 * polling forever.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      let cancelled = false
      let attempts = 0
      const tryScroll = () => {
        if (cancelled) return
        const el = document.getElementById(id)
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { offset: -72, immediate: true })
          } else {
            const top = el.getBoundingClientRect().top + window.scrollY - 72
            window.scrollTo(0, Math.max(0, top))
          }
          return
        }
        attempts += 1
        if (attempts < 50) setTimeout(tryScroll, 100)
      }
      tryScroll()
      return () => {
        cancelled = true
      }
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    return undefined
  }, [pathname, hash, lenis])

  return null
}

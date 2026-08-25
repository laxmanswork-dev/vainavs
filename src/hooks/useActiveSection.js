import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const POLL_INTERVAL_MS = 100
const MAX_POLL_ATTEMPTS = 50

/**
 * Tracks which of the given section ids is currently the "active" one in
 * the viewport, for a scroll-driven navbar underline (see Navbar.jsx) —
 * per follow-up ("when scrolling... the line need to move" — the active
 * underline should follow scroll position, not just the current route).
 * Returns the id of whichever tracked section is currently in view, or
 * null when none are (e.g. still up in the Hero, above the first tracked
 * section).
 *
 * `ids` should be a stable array (module-level constant) — it's read once
 * per attach cycle, not tracked as a dependency itself.
 *
 * rootMargin '-72px 0px -60% 0px' — top inset clears the fixed navbar
 * (same 72px/4.5rem convention used everywhere else on the site: Navbar's
 * own h-[4.5rem], Layout's pt-[4.5rem], each tracked section's own
 * scroll-mt-[4.5rem]); bottom inset (-60%) narrows the "active" band to
 * roughly the upper 40% of the viewport, so a section only counts as
 * active once it's substantially in view near the top, not the instant
 * its first pixel appears at the very bottom edge.
 *
 * Polls briefly for each element before observing it, same technique
 * ScrollToTop.jsx uses — every route is lazy-loaded (routes/AppRoutes.jsx),
 * so on a hard reload/direct link the target elements often don't exist in
 * the DOM yet the moment this effect first runs. Re-attaches on every
 * pathname change (not just once on mount) so navigating away from and
 * back to Home — where these ids only exist — keeps working.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let observer
    let pollTimer
    let attempts = 0
    let cancelled = false

    function attach() {
      const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
      if (elements.length < ids.length) {
        attempts += 1
        if (attempts < MAX_POLL_ATTEMPTS && !cancelled) {
          pollTimer = setTimeout(attach, POLL_INTERVAL_MS)
        }
        return
      }

      const visibility = new Map(elements.map((el) => [el.id, false]))
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => visibility.set(entry.target.id, entry.isIntersecting))
          // First id (in caller's own top-to-bottom order) that's
          // currently intersecting wins — if the active band somehow
          // spans more than one tracked section at once, the earlier one
          // in document order is "the one you're reading right now."
          const next = ids.find((id) => visibility.get(id))
          setActiveId(next ?? null)
        },
        { rootMargin: '-72px 0px -60% 0px', threshold: 0 },
      )
      elements.forEach((el) => observer.observe(el))
    }

    setActiveId(null)
    attach()

    return () => {
      cancelled = true
      if (pollTimer) clearTimeout(pollTimer)
      if (observer) observer.disconnect()
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return activeId
}

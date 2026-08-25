import { useEffect, useRef, useState } from 'react'

/**
 * Reports scroll direction ('up' | 'down') and whether the page has scrolled
 * past `offset` px. Navbar only reads `isPast` now (for its "firmer once
 * scrolled" background) — a follow-up removed the slide-away-on-scroll-down
 * behavior this hook used to drive, since the navbar must stay visible at
 * all times while scrolling; `direction` is kept for any future call site
 * that needs it. Reads window.scrollY (Lenis keeps it in sync with the
 * smoothed position, so this works whether Lenis is active or disabled for
 * reduced motion) and rAF-throttles the scroll handler.
 */
export function useScrollDirection(offset = 80) {
  const [direction, setDirection] = useState('up')
  const [isPast, setIsPast] = useState(false)
  const lastScroll = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScroll.current

      if (Math.abs(delta) > 4) {
        setDirection(delta > 0 ? 'down' : 'up')
        lastScroll.current = scrollY
      }

      setIsPast(scrollY > offset)
      ticking.current = false
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return { direction, isPast }
}

import { useEffect, useState } from 'react'

/**
 * Live media query match, e.g. `useMediaQuery('(min-width: 1024px)')`.
 * Prefer Tailwind responsive classes for layout; reach for this only when a
 * breakpoint decision has to happen in JS (e.g. swapping a component tree).
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handleChange = (event) => setMatches(event.matches)

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

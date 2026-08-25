import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { gsap, ScrollTrigger, initGsap } from '@animations/gsap'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

/**
 * Rendered inside <ReactLenis> so it can read the Lenis instance via
 * context. Hands frame-driving over to GSAP's ticker (the recommended
 * Lenis + GSAP integration) so Lenis's virtual scroll and ScrollTrigger's
 * pin/trigger math read the exact same frame — no drift between the two.
 */
function GsapScrollSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const syncScrollTrigger = () => ScrollTrigger.update()
    const driveLenisFromGsapTicker = (time) => lenis.raf(time * 1000)

    lenis.on('scroll', syncScrollTrigger)
    gsap.ticker.add(driveLenisFromGsapTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', syncScrollTrigger)
      gsap.ticker.remove(driveLenisFromGsapTicker)
    }
  }, [lenis])

  return null
}

/**
 * App-wide smooth scroll. Skips Lenis entirely when the user has requested
 * reduced motion, falling back to plain native scrolling — smooth scroll is
 * a delight-layer, never a requirement for using the site.
 */
export function SmoothScrollProvider({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    initGsap()
  }, [])

  if (prefersReducedMotion) {
    return children
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        autoRaf: false,
      }}
    >
      <GsapScrollSync />
      {children}
    </ReactLenis>
  )
}

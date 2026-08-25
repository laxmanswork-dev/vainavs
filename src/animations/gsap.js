import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/**
 * Registers GSAP plugins exactly once and applies the site-wide slow/smooth
 * motion defaults. Import and call this at the top of any component that
 * uses GSAP directly (Framer Motion covers most cases; reach for GSAP for
 * scroll-pinning, timelines, or SVG/canvas work Framer doesn't handle well).
 */
export function initGsap() {
  if (registered) return gsap

  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.9,
  })

  registered = true
  return gsap
}

export { gsap, ScrollTrigger }

import { DURATION, EASE_LUXURY_OUT, REVEAL_OFFSET } from './motion.config'

/**
 * Reusable Framer Motion variants. Compose these on `motion.*` elements via
 * `variants={fadeUp} initial="hidden" whileInView="visible"` instead of
 * writing bespoke animation objects per component.
 */

export const fadeUp = {
  hidden: { opacity: 0, y: REVEAL_OFFSET },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_LUXURY_OUT },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_LUXURY_OUT },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE_LUXURY_OUT },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -REVEAL_OFFSET },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE_LUXURY_OUT },
  },
}

/**
 * Wrap a group of children in this on the parent, give each child a simple
 * `fadeUp`/`fadeIn` variant, and they reveal in sequence automatically.
 */
export const staggerContainer = (staggerChildren = 0.15, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Standard viewport config for scroll-triggered reveals — fires once, slightly before fully in view. */
export const viewportOnce = { once: true, amount: 0.3 }

/**
 * Shared motion constants for Framer Motion. Mirrors the CSS custom
 * properties in `src/styles/theme.css` (--ease-luxury, --duration-*) so
 * animations feel identical whether they're driven by CSS or JS. Keep the
 * two in sync if either changes.
 *
 * Philosophy: slow, smooth, deliberate, cinematic. Never bouncy, never
 * springy-fast, never more than a subtle amount of movement.
 */
export const EASE_LUXURY = [0.65, 0, 0.35, 1]
export const EASE_LUXURY_OUT = [0.16, 1, 0.3, 1]

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.9,
  cinematic: 1.4,
}

/** Distance (in px) subtle reveal animations travel — kept small on purpose. */
export const REVEAL_OFFSET = 32

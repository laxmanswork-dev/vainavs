/**
 * Re-exported from `lenis/react` so the rest of the app depends on our own
 * hooks/ path rather than the vendor package directly — swapping smooth
 * scroll libraries later only means changing this one file.
 *
 * Usage: const lenis = useLenis(); lenis?.scrollTo('#menu')
 */
export { useLenis } from 'lenis/react'

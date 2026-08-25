import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { cn } from '@utils/cn'

const wisps = [
  { left: '38%', delay: 0, duration: 4.5 },
  { left: '50%', delay: 0.8, duration: 5.2 },
  { left: '62%', delay: 1.6, duration: 4.8 },
]

/**
 * Gentle rising steam — three soft blurred wisps that drift up and fade on
 * a slow, staggered loop. Purely decorative (aria-hidden); layer it over
 * the top edge of a coffee cup image with `absolute inset-x-0 -top-4`.
 * Skips animating entirely under prefers-reduced-motion.
 */
export function SteamEffect({ className }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className={cn('pointer-events-none absolute h-24 w-full', className)} aria-hidden="true">
      {wisps.map(({ left, delay, duration }, index) => (
        <motion.span
          key={index}
          className="bg-cream-100/25 absolute bottom-0 h-16 w-2 rounded-full blur-[6px]"
          style={{ left }}
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [-4, -56], opacity: [0, 0.6, 0], scaleY: [0.7, 1.3, 0.7] }
          }
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

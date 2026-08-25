import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { logo } from '@assets'
import { SITE_CONFIG } from '@constants/site'

/**
 * VaiNav's signature brand intro — a one-time, ~4.5s reveal of the actual
 * café logo, replacing the old generic pulsing-Coffee-icon loader (see
 * PageLoader.jsx, which shows the real logo instead of that icon for its
 * own, much shorter, code-split-chunk fallback role — this component is
 * the ONE real "intro" on the site).
 *
 * Visual foundation, per explicit follow-up correcting an earlier near-
 * black/glowing-ring draft that read as a generic "AI luxury loader"
 * rather than this actual café's own identity: the background is the
 * SAME solid warm terracotta-brown this site already uses for its own
 * Hero/Footer/FullscreenMenu dark bands (--color-espresso-950, #5e3023 —
 * not a new one-off color), so the intro visually IS this website from
 * the first frame, not a separate template bolted onto it. No black, no
 * radial spotlight/vignette, no glow bloom, no circular ring around the
 * logo, and — per a further follow-up removing this file's own earlier
 * two small diamond ticks above/below the logo — no decorative element
 * of any kind now. The composition is just the solid terracotta fill and
 * the authentic logo itself, nothing added around it.
 *
 * The authentic <img src={logo}> is never redrawn/recolored/distorted —
 * it reveals via a plain percentage-based clip-path wipe (top-to-bottom,
 * naturally responsive) followed by one restrained light pass once fully
 * visible.
 *
 * Stage timeline (full motion):
 *   background (0-800ms)    — solid terracotta fill, nothing else yet
 *   ticks      (800-1500ms) — (no longer renders anything — see above;
 *                              kept as a named timer checkpoint only so
 *                              the reveal/hold/exit timing below didn't
 *                              need to shift when the ticks themselves
 *                              were removed)
 *   reveal     (1500-3200ms)— logo wipes in top-to-bottom (1.7s)
 *   hold       (3200-3800ms)— logo settled, one subtle light pass crosses it
 *   exit       (3800-4500ms)— whole overlay fades, homepage shows through
 * See the reduced-motion branch below for the short static/fade path.
 *
 * Runs once per browser tab session (sessionStorage flag) — refreshing or
 * navigating within the same tab never replays it; a new tab/session does.
 */
const SESSION_KEY = 'vainavs-intro-shown'

const STAGES = ['background', 'ticks', 'reveal', 'hold', 'exit']
const EASE_IN_OUT = [0.65, 0, 0.35, 1] // = --ease-luxury

const TIMING = { ticks: 800, reveal: 1500, hold: 3200, exit: 3800, done: 4500 }
const REDUCED_TIMING = { reveal: 50, hold: 550, exit: 1050, done: 1450 }

// Very faint static film-grain — a single fractalNoise SVG tile, not
// animated (zero per-frame cost). Kept intentionally low-opacity per
// follow-up ("barely visible... must never look like a gradient or
// special-effect background") — this is texture, not a visual effect.
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export function BrandIntro() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) !== 'true',
  )
  const [stage, setStage] = useState('background')

  useEffect(() => {
    if (!visible) return
    sessionStorage.setItem(SESSION_KEY, 'true')
    // Block background scroll/interaction for the intro's short life —
    // restored the instant the exit stage begins, not held for the whole
    // fade, so scrolling feels available the moment the site starts
    // showing through.
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    const timing = prefersReducedMotion ? REDUCED_TIMING : TIMING
    const timers = Object.entries(timing)
      .filter(([key]) => key !== 'done')
      .map(([key, delay]) => setTimeout(() => setStage(key), delay))
    const doneTimer = setTimeout(() => setVisible(false), timing.done)

    return () => {
      document.documentElement.style.overflow = previousOverflow
      timers.forEach(clearTimeout)
      clearTimeout(doneTimer)
    }
  }, [visible, prefersReducedMotion])

  if (!visible) return null

  const reached = (name) => STAGES.indexOf(stage) >= STAGES.indexOf(name)
  const exiting = stage === 'exit'
  const exitMs = prefersReducedMotion ? 0.4 : 0.7

  return (
    <motion.output
      aria-live="polite"
      data-intro-stage={stage}
      // z-[110] — deliberately above every other fixed layer on the site
      // (Navbar/PageLoader/SkipLink all top out at z-100, see their own
      // comments) so this sits above literally everything, including the
      // Suspense PageLoader that may also be rendering underneath it
      // during the very first chunk load.
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden"
      // --color-espresso-950 exact — the same solid brown Hero/Footer/
      // FullscreenMenu already use, hardcoded here (not a Tailwind class)
      // since this component intentionally never reads the accent/glow
      // tokens those sections layer on top of it.
      style={{ backgroundColor: '#5e3023' }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 0.98 : 1 }}
      transition={{ duration: exitMs, ease: EASE_IN_OUT }}
    >
      <span className="sr-only">Loading {SITE_CONFIG.name}…</span>

      {/* Static grain, no animation — texture only, see GRAIN comment
          above. Not a gradient, not a spotlight — uniform across the
          whole fill. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN }}
        aria-hidden="true"
      />

      {/* Logo stage — a fixed-aspect box (matches the real logo.webp's own
          1535:1023 ratio exactly) so object-contain never has to stretch
          or crop the authentic artwork; width is a clamp() so it scales
          smoothly from small phones to 4K without ever overflowing or
          shrinking to illegibility. */}
      <div className="relative aspect-[1535/1023] w-[clamp(12rem,52vw,22rem)]">
        {/* The authentic logo artwork itself — pixel-identical <img>, no
            filters/recoloring/distortion, no glow or ring behind it.
            Revealed via a percentage-based clip-path wipe (top-down),
            which is what makes the reveal feel hand-painted-on rather
            than a plain fade. */}
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{
            clipPath: reached('reveal') ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
          }}
          transition={{
            duration: prefersReducedMotion ? 0.5 : 1.7,
            ease: EASE_IN_OUT,
          }}
        >
          <img
            src={logo}
            alt={`${SITE_CONFIG.name} logo`}
            className="size-full object-contain"
            fetchPriority="high"
          />

          {/* One restrained light pass — plays exactly once, only after
              the logo has settled (stage 'hold'). Keyed to stage so it
              mounts fresh (and therefore re-plays its initial->animate)
              only on the 'hold' transition, then never again — not a
              looping shimmer. Narrow and low-opacity on purpose ("extremely
              subtle light pass"), skipped entirely under reduced motion. */}
          {!prefersReducedMotion && (
            <motion.div
              key={stage}
              className="pointer-events-none absolute inset-y-0 w-1/4"
              style={{
                background:
                  'linear-gradient(115deg, transparent, rgba(238,223,206,0.3), transparent)',
                mixBlendMode: 'overlay',
              }}
              aria-hidden="true"
              initial={{ left: '-35%' }}
              animate={{ left: reached('hold') ? '120%' : '-35%' }}
              transition={{ duration: 0.6, ease: EASE_IN_OUT, delay: 0.1 }}
            />
          )}
        </motion.div>
      </div>
    </motion.output>
  )
}

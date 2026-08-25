import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import { Container } from '@components/ui/Container'
import { NAV_LINKS } from '@constants/navigation'
import { ROUTES } from '@constants/routes'
import { SITE_CONFIG } from '@constants/site'
import { SOCIAL_LINKS } from '@constants/social'
import { useLockBodyScroll } from '@hooks/useLockBodyScroll'
import { toTelHref } from '@utils/formatters'
import { EASE_LUXURY_OUT } from '@animations/motion.config'
import { cn } from '@utils/cn'
import { COFFEE_BEAN_TEXTURE } from '@utils/coffeeBeanTexture'

// y: -12 -> 0 alongside the fade — "background fades/slides into view."
const panelVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_LUXURY_OUT } },
}

// The decorative rule (left column) grows in on its own, ahead of the nav
// items — "decorative rule reveals" as its own animation beat, not lumped
// into the same stagger as the words.
const ruleVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.6, ease: EASE_LUXURY_OUT, delay: 0.15 } },
}

const taglineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_LUXURY_OUT, delay: 0.3 } },
}

// staggerChildren 0.12 (was 0.07) — per follow-up, a "100-150ms" gap
// between each word entering one after another; 120ms sits in the middle
// of that range. delayChildren unchanged — still waits for the panel/
// rule/tagline to settle first.
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
}

// y: 18 -> 20, duration 0.5s — per follow-up's own explicit spec
// (opacity 0->1, translateY(20px)->0). No bounce/zoom/rotation/elastic —
// EASE_LUXURY_OUT is a plain cubic-bezier ease-out, same one every other
// reveal on the site already uses.
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_LUXURY_OUT } },
}

// Mobile-only divider + Order Online/Reserve a Table row (new) — fades in
// as its own beat once the nav list's own stagger (delayChildren 0.35 +
// 3 * staggerChildren 0.12 ≈ 0.71, +itemVariants' own 0.5s duration) has
// essentially settled, so it reads as "the next thing to arrive" rather
// than competing with the nav words for attention.
const mobileActionsVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_LUXURY_OUT, delay: 0.85 } },
}

/**
 * Full-viewport navigation overlay, triggered by the Navbar's hamburger/X
 * button — the site's only navigation surface.
 *
 * Earlier redesign — the original version ("EXPLORE VAINAV'S" eyebrow +
 * 01-04 numbered links, uniform flex-col-items-center stack, Montserrat)
 * was called out as generic/template-like. That pass replaced it with an
 * asymmetric editorial grid: a left column carrying the site's own real
 * tagline ("Tradition Meets Modern Taste", from SITE_CONFIG) plus a thin
 * decorative rule, and a right column holding the nav words in Spectral
 * (a warm editorial serif) with per-item staggered indents/sizes.
 * Background reuses `bg-atmosphere` (the same layered "inside a premium
 * coffee house at night" treatment used site-wide) plus the same barely-
 * visible coffee-bean texture the Navbar/Categories already use.
 *
 * A follow-up then asked for changes to ONLY the 4 nav words themselves
 * (HOME/OUR STORY/MENU/CONTACT), explicitly leaving the rest — logo,
 * Order Now, hamburger, background, phone/socials, the left-column brand
 * detail, the overall grid layout — untouched:
 *   - nav words moved to their own font, DM Serif Display
 *     (font-nav-display) — more expressive/high-contrast than Spectral,
 *     which stays exactly where it was for the tagline (two different
 *     serifs in this one panel, on purpose, not a mistake)
 *   - the per-item staggered indent/alternating size (NAV_ITEM_RHYTHM) is
 *     gone — that "editorial rhythm" is exactly what the follow-up called
 *     "uneven alignment." All four words now share one left edge and one
 *     fluid clamp()-based size instead
 *   - one-by-one entrance sped up to a clearer ~120ms stagger between
 *     words (was 70ms), each still a plain opacity+translateY reveal
 *   - hover/focus now combines all three requested cues at once (color,
 *     an 8-12px rightward shift, the thin underline reveal) at a
 *     250-350ms duration — the earlier version deliberately used only
 *     color+underline per a different, now-superseded instruction
 *     ("pick 1-2 effects"); this follow-up explicitly asks for the
 *     combination instead
 *
 * z-40 — deliberately BELOW Navbar's own header (z-50), so the header bar
 * — and the hamburger-now-X button inside it — stays visible and
 * clickable on top of this panel the whole time it's open.
 */
export function FullscreenMenu({ open, onClose }) {
  useLockBodyScroll(open)

  // Escape closes the menu, from anywhere on the page.
  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          // overflow-hidden -> overflow-y-auto overflow-x-hidden (new) —
          // the mobile-only heading/divider/action-links added below (see
          // the Container further down) mean this panel now has more
          // content than before; on the shortest real phone viewports
          // (~568-600px tall, minus this pt-[4.5rem]) that content can
          // genuinely be taller than the space available. overflow-hidden
          // would have silently CLIPPED the bottom of the menu there —
          // overflow-y-auto lets it scroll instead, exactly the "works
          // correctly with scrolling if necessary" ask; overflow-x-hidden
          // keeps the original no-horizontal-scroll guarantee. On any
          // viewport tall enough to fit everything (most phones, and
          // certainly tablet/desktop) this never actually engages — no
          // visible scrollbar, nothing looks different.
          className="bg-atmosphere fixed inset-0 z-40 flex flex-col overflow-x-hidden overflow-y-auto pt-[4.5rem] backdrop-blur-md"
          // Clicking the panel's own background (not a link/button inside
          // it) closes it — there's no visually distinct "outside" on a
          // full-viewport overlay, so this is what "click outside closes
          // it" means here.
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          {/* Same barely-visible bean texture the Navbar/Categories already
              use, at the same low opacity — "café-inspired pattern, almost
              invisible," reusing an already-established treatment instead
              of inventing a new one. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: COFFEE_BEAN_TEXTURE, backgroundRepeat: 'repeat' }}
          />

          <div className="relative flex flex-1 flex-col justify-center">
            {/* Container now wraps the whole mobile-visible stack (was
                applied directly to the grid div below) — a mobile-only
                small heading goes above the grid, a mobile-only divider +
                Order Online/Reserve a Table row goes below it, both new
                (see their own comments further down), and putting all
                three inside one shared Container is what keeps their
                left/right edges lined up with the grid's own edges (and
                with the navbar/footer row's own edges) instead of each
                computing its own centering independently. The grid div
                itself keeps every one of its original classes unchanged
                below — same rendered result at `lg` and up as before this
                pass, nothing here touches desktop. */}
            <Container>
              {/* Small subtle heading (new) — mobile only. The desktop
                  view already carries brand context via the left column's
                  own tagline just below (`hidden lg:flex`); mobile hides
                  that column entirely, so this fills the same "yes,
                  you're in the Vainav's menu" role there, at eyebrow
                  scale — reuses taglineVariants (same fade, same timing)
                  and the same tracking-showcase token "Cafeteria" already
                  uses in Hero.jsx, so this isn't a new type treatment,
                  just the same one applied here too. */}
              <motion.p
                variants={taglineVariants}
                className="tracking-showcase text-cream-200/50 mb-8 text-center text-xs font-medium uppercase lg:hidden"
              >
                {SITE_CONFIG.name}
              </motion.p>

              {/* Editorial grid — a left "brand detail" column and a right
                  nav column, not a single centered stack. Below `lg` the
                  left column is hidden entirely (kept simple on small
                  screens, per the responsive brief — decorative extras give
                  way before the primary navigation does) and the nav column
                  takes the full width on its own.
                  -translate-y-* — positions the whole composition slightly
                  above true vertical center, so it reads as balanced
                  against the footer row below rather than perfectly
                  bisecting the screen; scoped here only, so the footer stays
                  anchored and stable. */}
              <div className="grid -translate-y-6 grid-cols-1 items-center gap-10 sm:-translate-y-8 lg:-translate-y-10 lg:grid-cols-12 lg:gap-8">
                {/* Left column — the one subtle Vainav's-specific detail: a
                  thin vertical rule (grows in on its own, see
                  ruleVariants) beside the site's own real tagline and
                  location, not invented filler copy. Small, muted, purely
                  supporting — never competes with the nav words. */}
                <div className="hidden lg:col-span-4 lg:flex lg:items-center lg:gap-5">
                  <motion.span
                    variants={ruleVariants}
                    className="bg-accent/40 h-24 w-px origin-top"
                    aria-hidden="true"
                  />
                  <motion.div variants={taglineVariants} className="max-w-[16rem]">
                    <p className="font-menu-display text-cream-200/70 text-lg leading-snug italic">
                      {SITE_CONFIG.tagline}
                    </p>
                    <p className="text-cream-200/40 mt-3 font-sans text-xs tracking-[0.2em] uppercase">
                      {SITE_CONFIG.address.line1}
                    </p>
                  </motion.div>
                </div>

                {/* Right column — the nav itself. text-left (not centered),
                  every word now sharing ONE left edge — no per-item
                  indent (was NAV_ITEM_RHYTHM, removed per follow-up: that
                  staggered-indent/alternating-size "editorial rhythm" is
                  exactly what got called out as uneven alignment). Gap
                  scales up with viewport (generous but controlled, not a
                  cramped default list and not oversized) instead of one
                  fixed value. */}
                <motion.nav
                  variants={listVariants}
                  aria-label="Full site"
                  className="col-span-1 flex flex-col gap-4 text-left sm:gap-6 lg:col-span-8 lg:gap-8"
                >
                  {NAV_LINKS.map((link) => (
                    <motion.div key={link.path} variants={itemVariants}>
                      <NavLink
                        to={link.path}
                        // end (unchanged) — HOME only reads as "active" on
                        // an exact match to `/`, never just because it's
                        // first in the list; the real current-page state,
                        // not a default.
                        end={link.path === ROUTES.HOME}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            // font-nav-display (was font-menu-display/
                            // Spectral) — DM Serif Display, per follow-up,
                            // scoped to just these 4 words; the tagline
                            // beside them (untouched, out of scope this
                            // pass) still reads in Spectral.
                            // text-[clamp(...)] — fluid responsive size
                            // (per follow-up, "use clamp()") instead of
                            // discrete breakpoint jumps: ~44px on small
                            // phones up to 88px at desktop widths, scaling
                            // continuously in between so "Our Story" (the
                            // longest word) never has its own awkward jump.
                            // No font-weight class — DM Serif Display ships
                            // one static weight (400 Regular, no bold cut);
                            // forcing a heavier class would just trigger
                            // the browser's synthetic/faux-bold.
                            // hover:translate-x-2 (8px) / sm:translate-x-3
                            // (12px) — the "shift slightly right" cue,
                            // combined with the color + underline below;
                            // per follow-up, use all three together this
                            // time (an earlier pass deliberately picked
                            // only two per a different, now-superseded
                            // instruction to keep it to "1-2 effects").
                            // duration-300 (was duration-[var(--duration-base)],
                            // 500ms) — tightened to sit inside the
                            // requested 250-350ms hover-response window.
                            'group font-nav-display ease-luxury text-cream-100 hover:text-accent focus-visible:text-accent relative inline-block text-[clamp(2.75rem,6vw_+_1rem,5.5rem)] leading-[1.05] tracking-tight transition-[color,transform] duration-300 hover:translate-x-2 focus-visible:translate-x-2 sm:hover:translate-x-3 sm:focus-visible:translate-x-3',
                            isActive && 'text-accent',
                          )
                        }
                      >
                        {link.label}
                        {/* Hover/focus reveal — a thin rule grows in under
                          the word from the left (echoes the left
                          column's own rule, same visual language). */}
                        <span
                          aria-hidden="true"
                          className="bg-accent ease-luxury absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                        />
                      </NavLink>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>

              {/* Divider + Order Online/Reserve a Table (new) — mobile
                  only. A thin centered rule (same bg-accent language as
                  the desktop left column's own vertical rule above, just
                  horizontal here) separates the primary nav from these
                  two secondary actions, then the actions themselves as
                  plain uppercase text links — not a repeat of the site's
                  filled-pill Button (Hero/Navbar already own that
                  treatment for these same two actions elsewhere); "compact
                  link" reads intentionally lighter/quieter than the large
                  serif nav words above it, which stay the one dominant
                  element on this screen.
                  Order Online — same external Swiggy destination/
                  target="_blank"/rel as every other Order Online entry
                  point on the site (Navbar, Hero); ArrowRight icon matches
                  those too. Reserve a Table — plain in-app NavLink to
                  ROUTES.RESERVATIONS, CalendarCheck icon, same pairing
                  Hero's own two buttons use. Both call onClose on click,
                  same as every NAV_LINKS item above — this panel always
                  closes once its own navigation has actually been used. */}
              <motion.div
                variants={mobileActionsVariants}
                className="mt-10 flex flex-col items-center gap-8 lg:hidden"
              >
                <span aria-hidden="true" className="bg-accent/30 h-px w-16" />
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                  <a
                    href={SITE_CONFIG.swiggyMenu}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="group text-accent hover:text-cream-50 ease-luxury inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-[var(--duration-fast)]"
                  >
                    Order Online
                    <ArrowRight
                      className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                  <NavLink
                    to={ROUTES.RESERVATIONS}
                    onClick={onClose}
                    className="group text-cream-100 hover:text-accent ease-luxury inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-[var(--duration-fast)]"
                  >
                    <CalendarCheck className="size-4" aria-hidden="true" />
                    Reserve a Table
                  </NavLink>
                </div>
              </motion.div>
            </Container>
          </div>

          {/* Footer row — same Container every other section uses, so it
              left/right-edge-aligns with the nav grid above and the
              navbar row above that. No variants of its own — it rides
              along with the panel's own fade only, staying visually
              stable while the composition above it animates in. */}
          <Container className="relative flex flex-col items-center gap-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <a
              href={toTelHref(SITE_CONFIG.contact.phone)}
              className="text-cream-200/70 ease-luxury hover:text-accent font-sans text-sm transition-colors duration-[var(--duration-fast)]"
            >
              {SITE_CONFIG.contact.phoneDisplay}
            </a>
            <ul className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="border-cream-100/20 text-cream-100 ease-luxury hover:border-accent hover:text-accent flex size-9 items-center justify-center rounded-full border transition-colors duration-[var(--duration-fast)]"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Container } from '@components/ui/Container'
import { ROUTES } from '@constants/routes'
import { SITE_CONFIG } from '@constants/site'
import { SOCIAL_LINKS } from '@constants/social'
import { useLockBodyScroll } from '@hooks/useLockBodyScroll'
import { useLenis } from '@hooks/useLenis'
import { toTelHref } from '@utils/formatters'
import { EASE_LUXURY_OUT } from '@animations/motion.config'
import { cn } from '@utils/cn'
import { COFFEE_BEAN_TEXTURE } from '@utils/coffeeBeanTexture'

// y: -12 -> 0 alongside the fade — "background fades/slides into view."
const panelVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_LUXURY_OUT } },
}

// The decorative rule (left info panel, desktop only) grows in on its own,
// ahead of the nav items — its own animation beat, not lumped into the
// nav's stagger.
const ruleVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.6, ease: EASE_LUXURY_OUT, delay: 0.15 } },
}

const taglineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_LUXURY_OUT, delay: 0.3 } },
}

// staggerChildren 0.12 — a clear, readable ~120ms gap between each of the
// 5 nav words entering one after another. delayChildren waits for the
// panel/rule/tagline to settle first.
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
}

// opacity 0->1, translateY(20px)->0 — a plain, restrained reveal per the
// "no aggressive animation, no bouncing" brief; same easing every other
// reveal on the site already uses.
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_LUXURY_OUT } },
}

// Five items, in the exact required order — Home, Our Heritage, Our
// Story, Menu, Contact. "Our Heritage"/"Our Story" scroll to a Home
// section instead of routing to their own page (there is no standalone
// route for either); the other three are real routes. Kept as a plain
// local array (not NAV_LINKS, which only has 4 entries and is missing
// "Our Heritage" entirely — the exact bug this pass fixes) so this
// component owns its own complete, correct list; NAV_LINKS itself is
// untouched since the Footer's sitemap column still reads from it.
const MENU_ITEMS = [
  { type: 'route', label: 'Home', path: ROUTES.HOME, end: true },
  { type: 'scroll', label: 'Our Heritage', hash: '#heritage' },
  { type: 'scroll', label: 'Our Story', hash: '#our-story' },
  { type: 'route', label: 'Menu', path: ROUTES.MENU },
  { type: 'route', label: 'Contact', path: ROUTES.CONTACT },
]

// Shared type treatment for every nav word, both link kinds — Playfair
// Display Semibold (see --font-nav-display in theme.css/fonts.css),
// fluid clamp() size (34px on the smallest phones up to a hard 58px cap
// on desktop/4K — never "giant" at any width, per follow-up), controlled
// (not wide/loose) tracking. Color transition only (no translate-x
// shift, no scale) — "subtle... no aggressive animation... no scaling
// that causes layout shift" — plus a thin underline reveal, an
// absolutely-positioned decorative span that doesn't affect layout
// either.
const NAV_ITEM_CLASSES =
  'group font-nav-display ease-luxury text-cream-100 hover:text-accent focus-visible:text-accent relative inline-block text-[clamp(2.125rem,1.6vw_+_1.7rem,3.625rem)] leading-[1.15] font-semibold tracking-tight transition-colors duration-[250ms] focus-visible:outline-none'

const NAV_ITEM_UNDERLINE =
  'bg-accent ease-luxury pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-[250ms] group-hover:scale-x-100 group-focus-visible:scale-x-100'

/**
 * Local re-implementation of Navbar.jsx's own ScrollLink, scoped to just
 * this file — "Our Heritage"/"Our Story" need the exact same scroll-to-
 * section behavior here (offset by -72px for the fixed navbar, via the
 * site's shared Lenis instance) that the desktop nav already has, but
 * this pass is explicitly "ONLY fix the opened navigation menu/overlay,"
 * so Navbar.jsx itself — including extracting this into a shared
 * file — is left completely untouched. Same logic, small duplication,
 * zero risk to the navbar.
 */
function MenuScrollLink({ hash, label, onNavigate }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lenis = useLenis()

  const scrollToTarget = () => {
    if (lenis) {
      lenis.scrollTo(hash, { offset: -72, duration: 1.2 })
    } else {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Handles the "navigated here from another page" case — once Home has
  // mounted with this hash in the URL, scroll to it.
  useEffect(() => {
    if (location.pathname !== ROUTES.HOME || location.hash !== hash) return
    const frame = requestAnimationFrame(scrollToTarget)
    return () => cancelAnimationFrame(frame)
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash, lenis, hash])

  function handleClick(event) {
    event.preventDefault()
    onNavigate()
    if (location.pathname === ROUTES.HOME) {
      scrollToTarget()
    } else {
      navigate(`${ROUTES.HOME}${hash}`)
    }
  }

  return (
    <a href={`${ROUTES.HOME}${hash}`} onClick={handleClick} className={NAV_ITEM_CLASSES}>
      {label}
      <span aria-hidden="true" className={NAV_ITEM_UNDERLINE} />
    </a>
  )
}

/**
 * Full-viewport navigation overlay, triggered by the Navbar's hamburger/X
 * button — the site's only navigation surface.
 *
 * This is the fourth pass on this component's content/layout (see git
 * history for the earlier three — a generic numbered-link stack, an
 * asymmetric editorial grid with DM Serif Display nav words, then a
 * follow-up that only touched the nav words' own font/rhythm). This pass
 * is a full rebuild per an extremely detailed brief, fixing one real bug
 * and rebalancing the whole composition:
 *
 *   BUG FIXED: "Our Heritage" was completely missing from this menu.
 *   NAV_LINKS (the shared constant this component used to `.map()`
 *   directly) only ever had 4 entries (Home/Our Story/Menu/Contact) —
 *   the desktop navbar has always shown "Our Heritage" too, but only
 *   because Navbar.jsx inserts it by hand outside of NAV_LINKS.map, a
 *   pattern this component never replicated. MENU_ITEMS (above) is this
 *   component's own complete, correct 5-item list now.
 *
 *   TRUE centering: the old layout used per-breakpoint -translate-y-*
 *   nudges to *approximate* a balanced position against the footer row.
 *   This pass removes those — flex-1 + items-center + justify-center on
 *   the content wrapper centers the whole group by construction, and (at
 *   `lg`+) a 3-column grid with EQUAL outer tracks (1fr / auto / 1fr —
 *   the exact same technique Navbar.jsx's own header row uses to keep
 *   its center content mathematically centered regardless of what sits
 *   in the side tracks) keeps the nav column centered on the full
 *   viewport width even with the info panel sitting in the left track.
 *
 *   Typography: nav words move from DM Serif Display to Playfair
 *   Display at a controlled Semibold weight and a much smaller fluid
 *   clamp() range (34px mobile floor, 58px desktop/4K ceiling — was up
 *   to 88px) — "the current huge serif menu typography is NOT
 *   acceptable... do NOT use extremely heavy/bold typography."
 *
 *   The mobile-only "Order Online"/"Reserve a Table" row from an earlier
 *   pass is removed — this brief's own exhaustive content list (mobile
 *   layout, desktop layout, visual hierarchy, and final QA sections) is
 *   explicit and consistent: 5 nav words, plus the tagline/location
 *   panel, nothing else. Those two actions already have dedicated,
 *   prominent entry points elsewhere (Navbar's own Order Online button,
 *   Hero's two buttons) that this redesign doesn't touch.
 *
 * z-40 — deliberately BELOW Navbar's own header (z-50), so the header bar
 * — and the hamburger-now-X button inside it — stays visible and
 * clickable on top of this panel the whole time it's open. Unchanged;
 * the close button itself lives in Navbar.jsx, out of scope this pass.
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
          // min-h-dvh (new, alongside the existing inset-0) — explicit
          // per follow-up ("use min-height:100dvh rather than relying
          // only on height:100vh... account for mobile browser UI").
          // `fixed` + `inset-0` already anchors this panel to all four
          // viewport edges regardless of dynamic mobile toolbars (a
          // stronger guarantee than a computed height value would be on
          // its own), so this is a belt-and-suspenders addition, not a
          // fix for an actual bug — it costs nothing and directly
          // satisfies what was asked.
          // overflow-y-auto (unchanged) — a real safety net: with 5 nav
          // items now (was 4) plus the tagline/location panel below on
          // mobile, the shortest real phone viewports can still be
          // shorter than the content; this lets it scroll instead of
          // clipping. Confirmed by testing it barely ever engages once
          // the new, smaller clamp() type scale is in place.
          className="bg-atmosphere fixed inset-0 z-40 flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto pt-[4.5rem] backdrop-blur-md"
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

          {/* flex-1 + items-center + justify-center — true centering by
              construction, both axes, no manual offsets. px-6/sm:px-8
              (same gutters Container uses elsewhere) keeps content off
              the screen edges at every width without needing Container
              itself here (Container's own max-width would fight the
              lg:grid-cols-[1fr_auto_1fr] trick below, which needs to
              span the full available width for its two outer tracks to
              stay genuinely equal). */}
          <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-10 sm:px-8">
            {/* Below `lg`: a single centered column (info panel hidden,
                per the mobile-layout brief — "do NOT keep the desktop
                left-side information panel floating beside the
                navigation on mobile"). `min(90%,45rem)` — "the navigation
                should never touch the screen edges" — a width cap that
                still shrinks gracefully on very narrow phones instead of
                a bare fixed max-width.
                At `lg` and up: a 3-column grid, equal 1fr outer tracks
                (see this component's own top-level comment for why) —
                info panel in the left track, nav in the center track
                (mathematically centered on the full viewport regardless
                of the info panel's width), an empty spacer in the right
                track balancing it. */}
            <div className="grid w-[min(90%,45rem)] grid-cols-1 items-center gap-10 lg:w-full lg:max-w-(--container-content) lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
              {/* Left info panel — desktop/lg only. The one subtle
                  Vainav's-specific detail: a thin vertical rule beside
                  the site's own real tagline and location, not invented
                  filler copy — "should feel like an editorial detail,"
                  not compete with the nav. justify-self-end sits it
                  right against the nav column regardless of how wide
                  this 1fr track actually is on an ultra-wide monitor,
                  rather than drifting off toward the far left edge. */}
              <div className="hidden lg:col-start-1 lg:flex lg:items-center lg:gap-5 lg:justify-self-end">
                <motion.span
                  variants={ruleVariants}
                  className="bg-accent/40 h-16 w-px origin-top"
                  aria-hidden="true"
                />
                <motion.div variants={taglineVariants} className="max-w-[14rem]">
                  <p className="font-menu-display text-cream-200/70 text-base leading-snug italic">
                    {SITE_CONFIG.tagline}
                  </p>
                  <p className="text-cream-200/40 mt-2 font-sans text-xs tracking-[0.2em] uppercase">
                    {SITE_CONFIG.address.line1}
                  </p>
                </motion.div>
              </div>

              {/* Center — the nav itself, always centered text (was
                  text-left with a single shared left edge; centered here
                  since there's no longer a wide desktop column of its
                  own to left-align within — a centered stack reads as
                  the deliberate focal point the brief asks for at every
                  width, mobile included).
                  gap-y via clamp() — "elegant, consistent... do not use
                  huge margin-top... responsive gap values" — scales
                  smoothly with the same viewport-width math the type
                  scale itself uses, instead of a few discrete
                  breakpoint jumps. */}
              <motion.nav
                variants={listVariants}
                aria-label="Full site"
                className="col-span-1 flex flex-col items-center gap-y-[clamp(0.875rem,1.2vw_+_0.5rem,1.75rem)] text-center lg:col-start-2"
              >
                {MENU_ITEMS.map((item) =>
                  item.type === 'scroll' ? (
                    <motion.div key={item.hash} variants={itemVariants}>
                      <MenuScrollLink hash={item.hash} label={item.label} onNavigate={onClose} />
                    </motion.div>
                  ) : (
                    <motion.div key={item.path} variants={itemVariants}>
                      <NavLink
                        to={item.path}
                        end={item.end}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(NAV_ITEM_CLASSES, isActive && 'text-accent')
                        }
                      >
                        {item.label}
                        <span aria-hidden="true" className={NAV_ITEM_UNDERLINE} />
                      </NavLink>
                    </motion.div>
                  ),
                )}
              </motion.nav>

              {/* Empty spacer — desktop/lg only, balances the info
                  panel's own 1fr track so the center track (the nav)
                  lands at the exact mathematical center of the viewport,
                  not just the center of "nav + info panel combined."
                  aria-hidden since it's pure layout, no content. */}
              <div aria-hidden="true" className="hidden lg:col-start-3 lg:block" />
            </div>

            {/* Tagline/location, mobile + tablet only (< lg, where the
                desktop info panel above is hidden) — moved BELOW the nav
                instead of beside it, per the mobile-layout brief. Same
                copy, smaller/simpler treatment (no rule, single centered
                block) than the desktop panel — "optionally," a quiet
                closing detail under the nav, not a second competing
                column. */}
            <motion.div
              variants={taglineVariants}
              className="mt-10 flex flex-col items-center gap-1 text-center lg:hidden"
            >
              <p className="font-menu-display text-cream-200/70 text-sm leading-snug italic sm:text-base">
                {SITE_CONFIG.tagline}
              </p>
              <p className="text-cream-200/40 font-sans text-xs tracking-[0.2em] uppercase">
                {SITE_CONFIG.address.line1}
              </p>
            </motion.div>
          </div>

          {/* Footer row — same Container every other section uses, so it
              left/right-edge-aligns with the navbar row above it. No
              variants of its own — it rides along with the panel's own
              fade only, staying visually stable while the composition
              above it animates in. Untouched by this pass. */}
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

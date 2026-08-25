import { useState, useEffect } from 'react'
import { NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@components/common/Logo'
import { Button } from '@components/ui/Button'
import { Container } from '@components/ui/Container'
import { FullscreenMenu } from './FullscreenMenu'
import { NAV_LINKS } from '@constants/navigation'
import { ROUTES } from '@constants/routes'
import { SITE_CONFIG } from '@constants/site'
import { useScrollDirection } from '@hooks/useScrollDirection'
import { useActiveSection } from '@hooks/useActiveSection'
import { useLenis } from '@hooks/useLenis'
import { EASE_LUXURY_OUT } from '@animations/motion.config'
import { cn } from '@utils/cn'
import { COFFEE_BEAN_TEXTURE } from '@utils/coffeeBeanTexture'
import { iconSwiggy } from '@assets'

// Shared base classes — DesktopLink and ScrollLink both build their final
// className from this same visual language (warm cream at rest, muted
// caramel + a thin fade-in underline when active/hovered), so the two link
// types are visually indistinguishable apart from their active-state logic
// below.
const NAV_LINK_BASE_CLASSES =
  'ease-luxury relative py-2 font-sans text-sm font-semibold text-[#f4e8d8] transition-colors duration-[var(--duration-fast)] hover:text-[#c98a52] after:absolute after:-bottom-1.5 after:left-1/2 after:h-px after:w-4 after:-translate-x-1/2 after:bg-[#c98a52] after:opacity-0 after:transition-opacity after:duration-[var(--duration-base)]'

// ids (in top-to-bottom document order) of the Home sections whose active
// underline should follow scroll position — see useActiveSection.jsx and
// the Navbar() body below. Module-level constant so it's a stable
// reference across renders (the hook only re-attaches on pathname change,
// not on every render).
const SCROLLSPY_SECTION_IDS = ['heritage', 'our-story']

// activeOverride — per follow-up ("when scrolling... the line need to
// move"), used ONLY for the Home link (see Navbar() below): a plain
// RouterNavLink match is true for the entire time pathname is '/',
// regardless of how far down the page you've scrolled, so without this
// Home's own underline would stay lit even once you've scrolled well past
// it into Heritage/Our Story. Passing an explicit true/false here
// overrides that route-match result for just this one link; every other
// DesktopLink call site leaves it undefined and keeps the original plain
// route-matching behavior untouched.
function DesktopLink({ path, label, activeOverride }) {
  return (
    <RouterNavLink
      to={path}
      end={path === ROUTES.HOME}
      className={({ isActive }) => {
        const active = activeOverride ?? isActive
        return cn(
          NAV_LINK_BASE_CLASSES,
          active ? 'text-[#c98a52] after:opacity-100' : 'hover:after:opacity-100',
        )
      }}
    >
      {label}
    </RouterNavLink>
  )
}

/**
 * Nav items that scroll to a section on Home instead of navigating to
 * their own page — "Our Heritage" (originally) and now "Our Story" too
 * (per follow-up: the standalone /our-story page was removed, its content
 * moved into Home right after Heritage — see Home.jsx/OurStoryHero.jsx's
 * new `id="our-story"`). Originally a Heritage-only component; generalized
 * to take `hash`/`label` once a second, identical use case showed up,
 * rather than maintaining two near-duplicate copies of the same logic.
 * On Home already: scrolls immediately via the site's own Lenis instance
 * (same smooth-scroll engine as ScrollToTop.jsx), offset by -72px so the
 * fixed navbar (h-[4.5rem]) doesn't cover the section's top edge — same
 * 72px compensation Layout.jsx's own `pt-[4.5rem]` uses.
 * From any other page: navigates to `/#<hash>` first; the effect below
 * then fires once Home has mounted and scrolls from there — a plain
 * anchor jump can't wait for the page swap the way this can.
 * href stays a real `/#<hash>` URL throughout (not `href="#"`) — right-
 * click "open in new tab", middle-click, and no-JS fallback all still
 * work; the onClick handler only intercepts the common case to route it
 * through Lenis instead of a hard jump.
 *
 * `isActive` (new) — per follow-up ("when scrolling... the line need to
 * move automatically"). This link has no route of its own to match
 * against (it's an anchor inside the Home page, not a separate page), so
 * unlike DesktopLink it can't derive its active state from RouterNavLink
 * at all — the caller (Navbar(), via useActiveSection) now computes
 * whether THIS section is the one currently in view and passes the result
 * straight through. Same underline treatment as DesktopLink's active
 * state either way.
 */
function ScrollLink({ hash, label, isActive }) {
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
    if (location.pathname === ROUTES.HOME) {
      scrollToTarget()
    } else {
      navigate(`${ROUTES.HOME}${hash}`)
    }
  }

  return (
    <a
      href={`${ROUTES.HOME}${hash}`}
      onClick={handleClick}
      className={cn(
        NAV_LINK_BASE_CLASSES,
        isActive ? 'text-[#c98a52] after:opacity-100' : 'hover:after:opacity-100',
      )}
    >
      {label}
    </a>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isPast } = useScrollDirection(40)
  const location = useLocation()
  // Which of Heritage/Our Story is currently in view, for the scroll-
  // driven active underline (see the DesktopLink/ScrollLink call sites
  // below) — null while still up in the Hero (or on any other route,
  // where these ids don't exist at all).
  const activeSection = useActiveSection(SCROLLSPY_SECTION_IDS)
  const isHome = location.pathname === ROUTES.HOME

  // Close the fullscreen menu automatically whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={cn(
          // Frosted dark glass — rgb(32 20 16) at 65% idle lets the video/
          // page content show through the blur instead of being hidden
          // behind it; backdrop-blur-md keeps the links readable
          // regardless. Border pulled in to a lighter touch (0.08) — a
          // hairline, not a hard seam.
          //
          // No scroll-direction hide — the navbar must stay visible at
          // all times while scrolling, never disappear. useScrollDirection
          // is only read for `isPast` (the "firmer once scrolled"
          // background below).
          //
          // z-50 — deliberately HIGHER than FullscreenMenu's own z-40 (see
          // that file), so this bar — and the hamburger/X button inside it
          // — stays visible and clickable on top of the fullscreen panel
          // while it's open.
          'ease-luxury-out fixed inset-x-0 top-0 z-50 border-b border-[rgba(244,232,216,0.08)] bg-[rgb(32_20_16_/_0.65)] shadow-[0_4px_20px_rgba(10,6,4,0.2)] backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-[var(--duration-base)]',
          // "Firmer once scrolled" — 90% (not fully opaque either) once
          // the page has scrolled past the hero.
          isPast && 'border-[rgba(244,232,216,0.14)] bg-[rgb(32_20_16_/_0.90)]',
        )}
      >
        {/* Coffee-bean texture, kept — same low-opacity detail as before,
            back on a dark surface now instead of ivory. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: COFFEE_BEAN_TEXTURE, backgroundRepeat: 'repeat' }}
        />

        <Container>
          {/* Grid, not flexbox — a 3-way flex justify-between only truly
              centers the middle item when the left/right items are equal
              width, which logo vs. CTA+menu-button never are. `1fr auto
              1fr` forces the outer two tracks to stay equal width no
              matter what they contain, so the middle (auto) track — the
              links — always lands at the exact mathematical center.
              items-center — one shared alignment rule for every child in
              this row, still the baseline everything sits on.
              -translate-y-2 (previous pass, "up this") briefly moved the
              whole row together; per immediate follow-up ("up this alone
              not logo") that's now split back into per-element offsets on
              purpose — links + actions move up further, the logo stays
              exactly where it was. Intentional this time, not the
              uncoordinated drift the items-center rewrite fixed earlier:
              there's only two offsets total (logo's, and everything
              else's), both explicit and documented here, not accumulated
              one-off patches.
              h-[4.5rem]/72px — Layout.jsx's `pt-[4.5rem]` and Hero.jsx's
              `calc(...-4.5rem)` both have to stay in sync with this exact
              value — it's the fixed navbar's real height. */}
          <nav
            className="grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center gap-4"
            aria-label="Primary"
          >
            {/* Logo's own badge is a self-contained dark circle (bg-
                espresso-950 + gold ring) regardless of what it sits on —
                unchanged. -translate-y-2 keeps it at the same position the
                last pass left it at (was riding on the row's own shared
                transform, now applied directly here since that shared
                transform is gone — links/actions move further per
                follow-up, logo intentionally does not).
                The logo is taller than the 72px bar (see Logo.jsx), so
                true centering means a small, even overflow on both sides:
                a few px spill below the bar (harmless, into the page) and
                a few px crop against the very top of the emblem's own
                ornamental tip (the browser viewport's own edge, not a CSS
                clip) — unchanged from before, not made worse by this
                follow-up since the logo isn't moving further.
                Plain (no `href`) — the Vainav's logo stays a Home link;
                Swiggy ordering is its own separate icon at the right of
                the bar (below), not this logo. Logo.jsx's `href` prop
                still exists and still works if that ever changes — just
                unused here now. */}
            <div className="-translate-y-2 justify-self-start">
              <Logo />
            </div>

            {/* Desktop nav links — the site's PRIMARY visible navigation
                at `lg` and up, shown alongside the hamburger (not
                replaced by it). Hidden below `lg`, where there isn't room
                for both a full link row and the CTA/hamburger group — the
                hamburger becomes the only navigation control at that
                point, per the responsive brief.
                -translate-y-2 — matches the logo's own offset exactly
                now (was -translate-y-4, 8px higher than the logo) per
                final-polish follow-up ("every navbar element must share
                the same visual centerline") — that extra lift is what
                was actually causing the links/actions row to sit
                noticeably higher than the logo beside it. Brought back
                down to the logo's own baseline rather than pushing the
                logo up to match, since the logo was explicitly asked to
                stay untouched.
                "Our Heritage" and "Our Story" both scroll to a Home
                section instead of routing to their own page (see
                ScrollLink above) — inserted directly here rather than via
                NAV_LINKS.map, since NAV_LINKS[1] ("Our Story") still
                needs to render as a ScrollLink, not a DesktopLink.
                NAV_LINKS itself keeps an entry for Our Story (Footer's
                sitemap reads from that same shared list, and wasn't
                asked to change) — its `path` was updated separately to a
                `/#our-story` hash now that the old /our-story route is
                gone, so Footer's link still goes somewhere real even
                without this component's extra scroll-precision.
                -translate-x-6 (new) — per follow-up ("move this left
                side... just nudge slightly left"), a horizontal transform
                on just this element, same technique as the vertical
                offsets above — shifts the links a bit toward the logo
                without touching the grid's own centering math (still
                `1fr auto 1fr`) or the logo/actions group's positions. */}
            <ul className="hidden -translate-x-6 -translate-y-2 items-center gap-10 lg:flex">
              <li key={NAV_LINKS[0].path}>
                <DesktopLink
                  {...NAV_LINKS[0]}
                  activeOverride={isHome ? activeSection === null : undefined}
                />
              </li>
              <li>
                <ScrollLink
                  hash="#heritage"
                  label="Our Heritage"
                  isActive={isHome && activeSection === 'heritage'}
                />
              </li>
              <li>
                <ScrollLink
                  hash="#our-story"
                  label="Our Story"
                  isActive={isHome && activeSection === 'our-story'}
                />
              </li>
              {NAV_LINKS.slice(2).map((link) => (
                <li key={link.path}>
                  <DesktopLink {...link} />
                </li>
              ))}
            </ul>

            {/* -translate-y-2 — matches the logo's and the links' own
                offset above (was -translate-y-4), so the whole row now
                shares one exact baseline. See the links `<ul>`'s own
                comment above for why.
                gap-3/sm:gap-4 (was gap-2/3) — the row's one shared
                baseline gap, now doing the real work of "comfortable but
                not excessive" breathing room between Order Online,
                Swiggy and the hamburger. Replaces two earlier ad-hoc
                patches (a `translate-x` nudge on the button, an extra
                `ml-*` on the icon) that were layering visual-only fixes
                on top of a baseline gap that was actually too tight —
                per final-polish follow-up, cleaned up into this one
                real, consistent value instead. */}
            <div className="flex -translate-y-2 items-center gap-3 justify-self-end sm:gap-4">
              {/* Restrained toasted-caramel (#b9783f) — a specific navbar
                  CTA color, one step more muted than the site's own
                  Caramel accent token, with ivory text. Only color is
                  overridden here — shape/proportions stay Button's own
                  default. (Briefly moved to bg-accent/hover:bg-accent-
                  strong during the burgundy-accent experiment, so this
                  button wouldn't be left orange while the rest of the
                  site went red — reverted back to its own original
                  standalone color per "HARD RESTORE MODE," now that the
                  accent itself is Caramel again and there's no mismatch
                  to guard against.)
                  "Order Now" -> "Order Online" + `to`->`href` per
                  follow-up final flow: this is now the PRIMARY route to
                  the Swiggy restaurant page (same URL/tab behavior as the
                  Swiggy icon beside it), not the internal /reservations
                  route — Button already renders an external `<a>` when
                  given `href` instead of `to` (see Button.jsx), so this
                  is the only change needed here. target="_blank" +
                  rel="noopener noreferrer" — opens Swiggy in a new tab,
                  same as the Swiggy icon; this site's own tab never
                  navigates away.
                  translate-x-3 (new) — per follow-up ("move this right"),
                  a transform on this button only, same technique as the
                  nav links' own -translate-x-6 above — nudges it right
                  without reflowing Swiggy/the hamburger beside it or
                  touching the row's own gap. */}
              <Button
                href={SITE_CONFIG.swiggyMenu}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="translate-x-3 bg-[#b9783f] px-5 text-[#f4e8d8] hover:bg-[#a3692f]"
              >
                Order Online
                <ArrowRight
                  className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>

              {/* Swiggy icon — a recognition + trust badge ("yes, we're
                  on Swiggy") sitting beside ORDER ONLINE, not a second
                  CTA competing with it.
                  size-7/8 — a full step down from the hamburger's own
                  size-10/11, and from Order Online's own height — is what
                  actually produces that "badge, not a button" weight;
                  opacity-80 at rest, full opacity + the same
                  -translate-y-0.5 lift on hover, so it still confirms
                  it's interactive without drawing the eye at rest. No
                  extra background/border wrapper — the icon's own square
                  already carries Swiggy's brand orange, so a ring around
                  it would just double up.
                  Extra ml-2/sm:ml-3 (on top of the row's own gap-3/4) —
                  Order Online, as the primary CTA, gets a visibly more
                  generous gap before the next element than the smaller
                  Swiggy-to-hamburger gap does (that one relies on the
                  row's shared gap alone, no extra margin) — reads as
                  intentional hierarchy rather than uniform spacing that
                  ignores how differently weighted these three controls
                  are.
                  Same destination/behavior as ORDER ONLINE
                  (target="_blank" + rel="noopener noreferrer" — opens in
                  a new tab; this site's own tab never navigates away) —
                  intentional, per the brief: both go to the same Swiggy
                  page, just at different visual weights. */}
              <a
                href={SITE_CONFIG.swiggyMenu}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on Swiggy (opens in a new tab)"
                className="ease-luxury ml-2 size-7 shrink-0 overflow-hidden rounded-md opacity-80 transition-[transform,opacity] duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:opacity-100 sm:ml-3 sm:size-8"
              >
                {/* scale-110 — the source asset's outer edge carries a
                    faint anti-aliased matte that reads as invisible on a
                    white canvas but shows as a thin light ring against
                    this dark navbar. Scaling the image up slightly while
                    the parent keeps overflow-hidden at the exact same box
                    size crops that sliver off without changing the icon's
                    visible size or position. */}
                <img src={iconSwiggy} alt="" className="size-full scale-110 object-contain" />
              </a>

              {/* Hamburger stays LAST in the bar. Still an ADDITIONAL
                  control, always visible at every breakpoint
                  (not `lg:hidden`), sitting beside the desktop links
                  rather than replacing them at `lg`+. Below `lg`, where
                  the link row is hidden, this is the only way to
                  navigate. Opens the same premium FullscreenMenu overlay
                  at any screen size.
                  Toggles open/closed and morphs its own three bars into
                  an X (not an icon swap) — animating each bar's own
                  rotate/translate/opacity is what actually produces the
                  "hamburger morphs into X" motion, and keeps the X the
                  same visual weight as the hamburger since it's literally
                  the same three bars, not a different icon.
                  ml-1/1.5 (new) — a small amount of extra breathing room
                  from the Swiggy icon, on top of the row's own gap-3/4,
                  per micro-polish follow-up. A margin on this element
                  only, same technique used for Order-Online-to-Swiggy
                  earlier, so it doesn't touch the Swiggy icon's own
                  classes (kept exactly as-is) and doesn't widen the
                  Order-Online-to-Swiggy gap. Also nudges the whole
                  action group's footprint a touch wider, closer to the
                  nav links row's own visual width, per the same
                  follow-up's balance note. */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="ease-luxury ml-1 flex size-10 shrink-0 flex-col items-center justify-center gap-1.5 text-[#f4e8d8] transition-colors duration-[var(--duration-fast)] hover:text-[#c98a52] sm:ml-1.5 sm:size-11"
              >
                <motion.span
                  className="block h-0.5 w-5 rounded-full bg-current"
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_LUXURY_OUT }}
                />
                <motion.span
                  className="block h-0.5 w-5 rounded-full bg-current"
                  animate={{ opacity: isMenuOpen ? 0 : 1, scale: isMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="block h-0.5 w-5 rounded-full bg-current"
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_LUXURY_OUT }}
                />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <FullscreenMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

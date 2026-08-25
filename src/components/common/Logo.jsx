import { Link } from 'react-router-dom'
import { ROUTES } from '@constants/routes'
import { SITE_CONFIG } from '@constants/site'
import { cn } from '@utils/cn'
import { logo } from '@assets'

/**
 * Brand mark — the client's actual logo file (a circular illustrated
 * emblem with the "VaiNav's Cafetaria" wordmark, coffee cup and pastries
 * baked into the artwork itself), used in the Navbar (`large=false`) and
 * Footer (`large=true`).
 *
 * Was a live-text badge built from CSS (a Coffee icon + script "Vainav's" +
 * uppercase "Cafetaria" caption inside a double ring) so it needed no
 * asset — that was always meant to be swapped once a final logo file
 * existed (see the old comment here); now it renders that image directly
 * instead. No extra ring/border wrapper — the image is already a
 * self-contained circular badge with its own border/glow baked in, so
 * adding another ring around it would just double up. Every call site
 * (Navbar, Footer) is unchanged.
 *
 * `href` (new, optional) — per follow-up, the Navbar's own logo now links
 * out to the Swiggy ordering page instead of Home; Footer's logo doesn't
 * pass this prop, so it's completely unaffected (still an internal
 * react-router `<Link to={ROUTES.HOME}>`, same as before). When `href` is
 * given, this renders a plain external `<a>` instead — react-router's
 * `<Link>` is for in-app routes, and an external URL going through it
 * would either warn or misbehave, plus a `<Link to={ROUTES.HOME}>` is
 * exactly the "still navigates to /" behavior this was asked to avoid.
 * `target="_blank" rel="noopener noreferrer"` opens Swiggy in a new tab
 * without giving it a handle back to this window, so the Vainav's site
 * itself never navigates away in the original tab.
 * The <img>, its size classes, and every other prop/className are
 * identical in both branches — only the wrapping element and where it
 * points change; the logo itself is pixel-for-pixel the same either way.
 */
export function Logo({ className, large = false, href }) {
  const classes = cn(
    'ease-luxury-out inline-flex shrink-0 items-center justify-center transition-transform duration-[var(--duration-fast)] hover:-translate-y-0.5',
    // Navbar size-16/18 -> size-20/24 per follow-up ("increase the
    // size... big") — the illustrated emblem has enough fine detail
    // (scrollwork, the cup, crossed forks) that it wants real size to
    // actually read. This exact jump (sm:size-24/96px) is now BIGGER
    // than the navbar's own 72px bar height — a deliberate follow-up
    // ("don't increase the navbar size, only the logo") ruled out
    // raising the bar to fit it. The bar itself is unchanged; see
    // Navbar.jsx's `self-start` override on this component's wrapper
    // for how the overflow is handled without clipping.
    large ? 'size-28' : 'size-20 sm:size-24',
    className,
  )
  const image = (
    <img src={logo} alt={`${SITE_CONFIG.name} logo`} className="size-full object-contain" />
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Order ${SITE_CONFIG.name} on Swiggy (opens in a new tab)`}
        className={classes}
      >
        {image}
      </a>
    )
  }

  return (
    <Link to={ROUTES.HOME} aria-label={`${SITE_CONFIG.name} — Home`} className={classes}>
      {image}
    </Link>
  )
}

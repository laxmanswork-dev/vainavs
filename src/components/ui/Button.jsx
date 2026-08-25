import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cva } from 'class-variance-authority'
import { cn } from '@utils/cn'

const buttonStyles = cva(
  [
    'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-sans font-semibold uppercase tracking-wide',
    'transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--duration-fast)] ease-luxury',
    'active:scale-[0.98]',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    // rounded-md/rounded-bl-* (a plain rounded rectangle, then a rounded
    // one with one asymmetric sharper corner) both retired per follow-up,
    // in favor of `btn-carved` (see base.css) — a hand-drawn reference
    // sketch specified a carved-plaque silhouette with concave-cut left/
    // right ends instead of any rounded-corner treatment. One shared
    // clip-path class now defines the button shape for every variant/size
    // — no more per-size radius tuning, the concave cut is a fixed px
    // depth that reads identically everywhere (see base.css for why).
    'btn-carved',
  ],
  {
    variants: {
      variant: {
        // Filled Caramel (--color-accent) — the design's primary CTA
        // (Explore Menu, Book a Table, Order Now). shadow-soft, not a
        // colored "glow" shadow — hover is just a darker fill, no glow/
        // shine effect layered on top; motion stays to the icon (see call
        // sites' `group-hover:translate-x-1` on their arrow/play icons).
        accent: 'bg-accent hover:bg-accent-strong text-cream-50 shadow-soft',
        // Filled Coffee — a step darker than `accent`, for a secondary
        // solid CTA that still reads as coffee-theme rather than neutral.
        primary: 'bg-espresso-800 text-cream-50 hover:bg-espresso-700',
        // Thin border, brightens on hover — stays transparent even on
        // hover (no fill-in), so it never competes with a solid-fill
        // sibling button in the same row. Reads off the `ink` token, so
        // it's for use on a wall section (bg-surface*).
        outline: 'border border-ink/30 text-ink hover:border-ink',
        // Same shape as `outline`, hardcoded light instead of reading `ink`
        // — for the handful of sections that stay a dark band on purpose
        // (Hero, FinalCta) where `ink` resolves to dark text.
        // border/30 -> /40, plus a faint bg tint + backdrop-blur-sm (new)
        // — next to a solid-fill sibling (Explore Menu, Book a Table) a
        // bare 1px stroke on its own read as visually "thin"/underweight;
        // the tint+blur gives it a touch of its own body/weight (a soft
        // "frosted glass" plate) without turning it into a second solid
        // button — still clearly the secondary action in the pair.
        outlineInverse:
          'border border-cream-50/40 bg-cream-50/8 text-cream-50 backdrop-blur-sm hover:border-cream-50/70 hover:bg-cream-50/12',
        ghost: 'text-ink hover:text-accent',
      },
      // Compact, not an oversized capsule — heights/padding pulled in from
      // the old h-14/px-9 max down to h-12/px-7. No per-size radius class
      // anymore (was rounded-bl-*) — `btn-carved`'s concave-cut ends are a
      // fixed px depth shared by every size, not something that needs its
      // own scale.
      size: {
        sm: 'h-9 px-5 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-7 text-sm',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'md',
    },
  },
)

/**
 * Universal button. Renders a <Link> when given `to`, an <a> when given
 * `href`, otherwise a native <button> — so call sites never have to think
 * about which element they need. Sets a `group` class on the root so a
 * child icon can react to hover — pair an arrow/play icon with
 * `transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1`
 * for the "icon nudges 3-5px" micro-interaction instead of animating the
 * button itself.
 *
 *   <Button to="/menu">View Menu</Button>
 *   <Button href="tel:+91..." variant="outline">Call Us</Button>
 *   <Button type="submit" variant="accent" size="lg">Reserve a Table</Button>
 */
export const Button = forwardRef(function Button(
  { className, variant, size, to, href, children, ...props },
  ref,
) {
  const classes = cn(buttonStyles({ variant, size }), className)

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type={props.type ?? 'button'} className={classes} {...props}>
      {children}
    </button>
  )
})

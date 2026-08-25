import { ImageIcon } from 'lucide-react'
import { cn } from '@utils/cn'

/**
 * Stand-in for real photography that hasn't been supplied by the client
 * yet. Reserves the exact box (aspect ratio, radius, border) the final
 * `<img>` will occupy, so dropping the real asset in later is a pure
 * content swap — no layout changes anywhere that uses this component.
 *
 * `label` should be the suggested filename + recommended dimensions, e.g.
 * "hero-coffee-pour.jpg — 1200×1500". `icon` is a Lucide component used as
 * a quiet visual cue for the kind of shot (defaults to a generic photo icon).
 *
 * Frosted glass, not a flat gradient fill — translucent + backdrop-blur plus
 * a hairline border gives it the "resting on top of the canvas" layered
 * depth the flat matte background needs, instead of competing with it. This
 * is the one shared component behind every image slot site-wide (Hero
 * collage, Heritage/Menu card fallbacks, Gallery, ...), so the effect is
 * consistent everywhere without touching each call site.
 *
 * `onLight` flips the glass tint: the default (translucent dark + cream
 * hairline) reads correctly on the matte espresso page background, but goes
 * muddy/washed-out blurred against a *light* backdrop — pass `onLight` for
 * any placeholder nested inside a Cream card (HeritageCard, MenuCard) to get
 * a translucent light tint + dark hairline instead.
 */
export function ImagePlaceholder({
  icon: Icon = ImageIcon,
  label,
  className,
  iconClassName,
  onLight = false,
}) {
  return (
    // A real <img> can't host the icon/caption children below (it's a void
    // element) — role="img" on a div is the correct pattern for a composite
    // placeholder, not a lint gap.
    <div
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="img"
      aria-label={label ? `Photo placeholder: ${label}` : 'Photo placeholder'}
      className={cn(
        'shadow-soft relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border p-6 text-center backdrop-blur-md',
        // bg-espresso-950/35 -> /55 (dark variant only) — background pass:
        // every image on the site is still a placeholder (see this file's
        // own doc comment), so this box is what actually renders in most
        // photo slots on a dark section. /35 read as thin/washed-out,
        // floating on top of the page rather than belonging to it; /55
        // gives it real weight as its own dark panel instead.
        onLight ? 'border-espresso-900/10 bg-wall-300/60' : 'border-cream-50/10 bg-espresso-950/55',
        className,
      )}
    >
      {/* opacity-40 -> opacity-20 (dark variant only, via the wrapper below)
          — background pass: this Caramel corner glow is the one legitimate
          "small decorative accent" this box should keep (per the brand's
          own color rule), just dialed back so it reads as a quiet accent on
          a dark panel instead of the box's dominant, defining color. */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          onLight ? 'opacity-40' : 'opacity-20',
        )}
        style={{
          // rgb() is Caramel (--color-gold-500 / --color-amber-500, #c08552)
          // — hardcoded because a gradient color-stop alpha needs a literal.
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgb(192 133 82 / 0.18), transparent 55%)',
        }}
      />
      <Icon
        className={cn(
          'relative size-8',
          onLight ? 'text-espresso-700/70' : 'text-gold-400/70',
          iconClassName,
        )}
        strokeWidth={1.25}
        aria-hidden="true"
      />
      {label && (
        <p
          className={cn(
            'relative font-sans text-[0.65rem] font-medium tracking-wide uppercase',
            onLight ? 'text-espresso-700/60' : 'text-gold-300/60',
          )}
        >
          {label}
        </p>
      )}
    </div>
  )
}

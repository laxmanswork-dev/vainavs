import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { cn } from '@utils/cn'

/**
 * Reusable cinematic background video layer. Render it as the first child
 * of a `relative overflow-hidden` section, followed by that section's real
 * content — normal DOM order stacks the content above it, no z-index
 * juggling needed:
 *
 * ```jsx
 * <section className="relative overflow-hidden">
 *   <BackgroundVideo src={videoHeritageBg} />
 *   <Container className="relative">...</Container>
 * </section>
 * ```
 *
 * Every video asset in this project is currently an empty placeholder file
 * (see `src/assets/README.md`) — `onError` swallows the resulting media
 * error silently instead of leaving a broken-video icon on screen; the
 * section's own background color reads as the fallback until real footage
 * ships.
 *
 * Skips rendering the `<video>` entirely under `prefers-reduced-motion` —
 * `poster` (or the section's own background) carries the visual instead,
 * matching how `SmoothScrollProvider`/Lenis already opt out for the same
 * users.
 */
export function BackgroundVideo({
  src,
  poster,
  fixed = false,
  overlay = true,
  overlayClassName,
  blur = false,
  className,
  videoClassName,
  preload = 'none',
}) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        fixed && 'fixed',
        className,
      )}
      aria-hidden="true"
    >
      {!prefersReducedMotion && src && (
        <video
          // min-w-full/min-h-full alongside size-full — belt-and-braces
          // against a `<video>`'s intrinsic aspect ratio ever winning out
          // over object-cover and leaving a sliver of the section's own
          // background visible at the left/right edges. scale-105 is the
          // same defensive margin for sub-pixel rounding at the container
          // boundary (a well-known object-cover edge case, not specific to
          // this video) — imperceptible, just insurance against a 1px gap.
          className={cn('size-full min-h-full min-w-full scale-105 object-cover', videoClassName)}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          // Defaults to "none" — most call sites still point at an empty
          // placeholder file, so there's nothing worth fetching yet.
          // "none" plus `autoPlay` also isn't reliable in every browser
          // (autoplay can't force a load the preload hint refused), so a
          // call site with a real video (Hero) needs to override this to
          // "auto" to actually play instead of sitting paused at
          // readyState 1 (metadata only, no frame data).
          preload={preload}
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      )}

      {blur && <div className="absolute inset-0 backdrop-blur-md" />}

      {overlay && (
        <div
          className={cn(
            'from-espresso-950/85 via-espresso-950/55 to-espresso-950/85 absolute inset-0 bg-linear-to-b',
            overlayClassName,
          )}
        />
      )}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { ImagePlaceholder } from '@components/ui/ImagePlaceholder'
import { cn } from '@utils/cn'

/**
 * Production `<img>` wrapper: responsive `srcSet`/`sizes`, a pulse skeleton
 * shown while the asset loads, and a graceful fallback when it 404s.
 *
 * A 404 is the *normal* state for every image in this project right now —
 * every file under `src/assets/` is an intentional 0-byte placeholder (see
 * `src/assets/README.md`) — so the fallback re-uses `ImagePlaceholder`, the
 * same warm bordered box already used across the homepage sections, not a
 * broken-image icon. Once a real file replaces the placeholder, the image
 * just starts rendering — nothing here needs to change.
 *
 * Use this directly for above-the-fold / eagerly-needed images. For
 * below-the-fold content that should defer loading until scrolled near, use
 * `LazyImage` instead — it wraps this component with a viewport gate.
 *
 * `hideOnError` is for decorative/atmospheric use (section background
 * photos, texture overlays) where a big "photo placeholder" box would look
 * like a bug rather than a stand-in — it renders an empty, appropriately
 * sized box instead so the section's own background color shows through.
 *
 * `onLight` — pass this when the image sits inside a light Cream card
 * (HeritageCard, MenuCard) rather than directly on the dark page background;
 * see `ImagePlaceholder` for why the glass tint needs to flip there.
 *
 * `onStatusChange` — optional; fires with the current 'loading' | 'loaded' |
 * 'error' status whenever it changes. Opt-in and additive (every existing
 * call site that doesn't pass it behaves exactly as before) — for a caller
 * that needs its own bespoke fallback UI instead of either of the two built
 * in here (hideOnError's empty box, or the default ImagePlaceholder), e.g.
 * MenuItemCard's category-icon chip on the /menu page.
 */
export function ResponsiveImage({
  src,
  alt = '',
  srcSet,
  sizes,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  fallbackIcon = ImageOff,
  fallbackLabel,
  hideOnError = false,
  onLight = false,
  className,
  imgClassName,
  onStatusChange,
}) {
  const [status, setStatus] = useState('loading') // 'loading' | 'loaded' | 'error'

  // Ref, not a dependency-array entry — onStatusChange is commonly an
  // inline arrow at the call site (a new function identity every render),
  // and only an actual status change should re-fire the effect below.
  const onStatusChangeRef = useRef(onStatusChange)
  onStatusChangeRef.current = onStatusChange

  useEffect(() => {
    onStatusChangeRef.current?.(status)
  }, [status])

  if (status === 'error') {
    if (hideOnError) {
      return <div className={className} aria-hidden="true" />
    }
    return (
      <ImagePlaceholder
        icon={fallbackIcon}
        label={fallbackLabel ?? alt}
        onLight={onLight}
        className={className}
      />
    )
  }

  return (
    <div
      className={cn(
        'border-gold-500/25 bg-surface-elevated relative overflow-hidden rounded-lg border',
        className,
      )}
    >
      {status === 'loading' && (
        <div className="bg-surface-elevated absolute inset-0 animate-pulse" aria-hidden="true" />
      )}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={cn(
          'ease-luxury size-full object-cover opacity-0 transition-opacity duration-[var(--duration-base)]',
          status === 'loaded' && 'opacity-100',
          imgClassName,
        )}
      />
    </div>
  )
}

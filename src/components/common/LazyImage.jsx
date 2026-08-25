import { useInView } from 'react-intersection-observer'
import { ResponsiveImage } from '@components/common/ResponsiveImage'
import { cn } from '@utils/cn'

/**
 * `ResponsiveImage`, deferred until the box scrolls near the viewport.
 * Renders the same skeleton `ResponsiveImage` shows while loading, so
 * there's no visible difference except the network request itself starts
 * later — use this for anything below the fold (gallery grids, story
 * strips) instead of paying the request cost for images no one has
 * scrolled to yet. Above-the-fold images (hero, first section) should use
 * `ResponsiveImage` directly with `loading="eager"`.
 */
export function LazyImage({ rootMargin = '200px', className, ...imageProps }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin })

  if (!inView) {
    return (
      <div
        ref={ref}
        className={cn('bg-surface-elevated animate-pulse', className)}
        aria-hidden="true"
      />
    )
  }

  return <ResponsiveImage {...imageProps} className={className} />
}

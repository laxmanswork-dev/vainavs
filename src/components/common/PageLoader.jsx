import { Coffee } from 'lucide-react'

/**
 * Full-viewport fallback shown while a lazy-loaded route chunk downloads
 * (see the <Suspense> boundary in routes/AppRoutes.jsx). Deliberately quiet
 * — a slow pulse, not a spinner — to match the site's calm motion language.
 */
export function PageLoader() {
  return (
    <output
      className="bg-atmosphere fixed inset-0 z-100 flex items-center justify-center"
      aria-live="polite"
    >
      <Coffee
        className="size-8 animate-pulse text-amber-400"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <span className="sr-only">Loading…</span>
    </output>
  )
}

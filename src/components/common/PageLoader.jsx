import { logo } from '@assets'
import { SITE_CONFIG } from '@constants/site'

/**
 * Full-viewport fallback shown while a lazy-loaded route chunk downloads
 * (see the <Suspense> boundary in routes/AppRoutes.jsx). Deliberately quiet
 * — a slow pulse, not a spinner — to match the site's calm motion language.
 *
 * Was a generic lucide `Coffee` icon (see prior history in git blame) —
 * replaced with the real brand mark per follow-up ("replace the generic
 * Coffee icon with the authentic logo/static brand treatment so the old
 * generic coffee visual is completely gone"). This is intentionally the
 * plain static case: BrandIntro.jsx (mounted once, above everything, at
 * app root) is the actual cinematic reveal a visitor sees on first load —
 * this component only ever gets its own moment on a later in-app
 * navigation to a route chunk that hasn't downloaded yet, so it stays a
 * small, quiet, non-competing placeholder rather than a second intro.
 */
export function PageLoader() {
  return (
    <output
      className="bg-atmosphere fixed inset-0 z-100 flex items-center justify-center"
      aria-live="polite"
    >
      <img
        src={logo}
        alt=""
        className="size-16 animate-pulse object-contain opacity-90"
        aria-hidden="true"
      />
      <span className="sr-only">Loading {SITE_CONFIG.name}…</span>
    </output>
  )
}

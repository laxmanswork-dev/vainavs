import { cn } from '@utils/cn'

/**
 * Small eyebrow label used above section headings ("OUR HERITAGE",
 * "TRADITION MEETS"). Wraps the shared `.text-kicker` utility (see
 * src/styles/base.css). Pass `className="justify-center"` to center it
 * under a heading. Plain text only — no trailing icon/mark; pass `icon` with
 * a Lucide component if a call site ever wants one back.
 *
 * Defaults to `text-amber-400` — a vivid light accent with good contrast on
 * the dark page background every section shares. Override via `className`
 * if a call site ever needs a different accent; it merges correctly since
 * both are real Tailwind color utilities.
 */
export function Kicker({ children, icon: Icon = null, className }) {
  return (
    <p className={cn('text-kicker flex items-center gap-2 text-amber-400', className)}>
      {children}
      {Icon && <Icon className="size-3 fill-current" aria-hidden="true" />}
    </p>
  )
}

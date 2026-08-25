import { FaWhatsapp } from 'react-icons/fa6'
import { SITE_CONFIG } from '@constants/site'

// The message a visitor lands on WhatsApp with, pre-filled but fully
// editable (wa.me's own `text` param does this natively — nothing custom
// to build). Kept local to this one component rather than in
// constants/site.js: SITE_CONFIG.social.whatsapp (reused below) is the
// single source of truth for the *number*, already shared with Footer's
// own plain WhatsApp icon link; this message is specific to this floating
// button's own purpose and isn't something Footer's link needs too.
const PREFILL_MESSAGE =
  "Hi Vainav's Cafeteria, I found you through your website. I'd like to know more about your menu and services."

// Reuses SITE_CONFIG.social.whatsapp (https://wa.me/916380411268) rather
// than hardcoding the number a second time — that's the same official
// click-to-chat host/number format WhatsApp itself documents (wa.me/<E.164
// number, no +/spaces>?text=<url-encoded message>), which is what makes
// this open the WhatsApp app on mobile (when installed) and WhatsApp Web/
// the download prompt on desktop automatically, with no device-detection
// code of our own needed.
const WHATSAPP_HREF = `${SITE_CONFIG.social.whatsapp}?text=${encodeURIComponent(PREFILL_MESSAGE)}`

/**
 * Small floating "contact utility" button, fixed to the bottom-right
 * corner on every page — per follow-up ("add a small floating WhatsApp
 * contact button... NOT a primary CTA"). Mounted once in Layout.jsx
 * (alongside ScrollToTop/SkipLink, the site's other persistent
 * cross-route utilities), not per-page.
 *
 * A plain `<a>` to a wa.me click-to-chat URL — not a custom chat widget/
 * SDK — opened in a new tab so a visitor never loses the page they were
 * on. Native `<a>` semantics mean keyboard reachability (Tab + Enter) and
 * the site's shared global `:focus-visible` outline (base.css) both come
 * for free, same as every other real link on the site.
 *
 * Sized/positioned/z-indexed independently of the rest of the page's own
 * breakpoint system (which keys off `lg`, 1024px) — this is a simple
 * two-state "mobile vs everything bigger" utility, so the standard
 * Tailwind `sm` (640px) split is the right, simplest tool: 48px/16px
 * insets below it, 52px/20px at and above it, per spec.
 * z-30 — deliberately BELOW the fixed Navbar (z-50) and the mobile
 * FullscreenMenu overlay (z-40, see Navbar.jsx), so opening the mobile
 * menu correctly covers this button instead of it floating oddly on top
 * of the nav overlay; still above ordinary page content/sections (which
 * top out around z-10).
 * bg-[#25D366] is WhatsApp's own official brand green — a deliberate
 * exception to reading the page's own --color-accent/Caramel token, the
 * same way the brand-icon imports below intentionally reach for the
 * official mark rather than a generic chat icon. shadow-soft (this
 * project's own existing shared shadow token, same one Button/menu cards
 * use) rather than a new one-off value, for both "very subtle" and
 * "visually consistent with the premium design."
 * title (native browser tooltip) covers "hover tooltip on desktop" with
 * zero added markup/JS/dependency — the lightest possible way to satisfy
 * that requirement.
 */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vainav's Cafeteria on WhatsApp"
      title="Chat on WhatsApp"
      className="ease-luxury shadow-soft fixed right-4 bottom-4 z-30 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white transition-[background-color,transform] duration-[var(--duration-fast)] hover:scale-105 hover:bg-[#20BD5A] active:scale-95 sm:right-5 sm:bottom-5 sm:size-[52px]"
    >
      <FaWhatsapp className="size-6 sm:size-7" aria-hidden="true" />
    </a>
  )
}

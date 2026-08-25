/**
 * WCAG 2.4.1 bypass block. Invisible until keyboard-focused, then jumps
 * straight to <main id="main-content">, letting keyboard/screen-reader
 * users skip the Navbar on every single page load.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only-focusable bg-espresso-900 text-cream-50 fixed top-4 left-4 z-100 rounded-md px-4 py-2 font-sans text-sm"
    >
      Skip to content
    </a>
  )
}

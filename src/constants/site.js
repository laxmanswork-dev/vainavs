/**
 * Central business/site configuration. Import this anywhere the brand name,
 * contact details or canonical URL are needed instead of hardcoding strings
 * — keeps a single source of truth for content that legal/marketing may ask
 * to change later.
 */
export const SITE_CONFIG = {
  name: "Vainav's Cafeteria",
  shortName: "Vainav's",
  logoMark: "Vainav's",
  logoSub: 'Cafetaria',
  tagline: 'Tradition Meets Modern Taste',
  description:
    'Where tradition meets modern taste. From comforting brews to global bites, ' +
    'we serve happiness on every plate.',
  url: import.meta.env.VITE_SITE_URL ?? 'https://www.vainivascafe.com',
  themeColor: '#1c130c',

  contact: {
    phone: '+91 63804 11268',
    phoneDisplay: '+91 63804 11268',
    whatsapp: '+91 63804 11268',
    email: 'hello@vainivascafe.com',
  },

  address: {
    line1: 'Kanyakumari',
    line2: 'Tamil Nadu 629001',
    country: 'India',
    // The café's real, verified Google Maps listing — per follow-up
    // ("https://maps.app.goo.gl/Xbtc5bFnx4DAXRtRA..this is the exact
    // location link vainavs cafe"), replacing an earlier bare-coordinate
    // URL (extracted from a generic saved map pin, not the actual
    // business listing) with the official Google-issued short link
    // itself. Resolved once to confirm: it redirects to
    // google.com/maps/place/Vainavs+cafeteria/@8.0969357,77.5451397,21z/
    // ...(Place ID 0x3b04eda5c17023bd:0x62d18b63dade004f) — the real
    // named business, not just a dropped pin. Used by both "GET
    // DIRECTIONS"/"Open in Google Maps" and the address text itself in
    // Footer.jsx's "Our Location" card — single source, so every link on
    // the site always points at this same, exact, real place.
    mapUrl: 'https://maps.app.goo.gl/Xbtc5bFnx4DAXRtRA',
  },

  // `opens`/`closes` are 24h HH:MM (schema.org/JSON-LD needs machine-readable
  // times); `display` is what actually renders in the Footer/Contact page.
  // opens 10:00 -> 08:00 (display "10:00 AM" -> "8:00 AM") per follow-up —
  // the café's real opening time changed; `opens` updated alongside
  // `display` so the machine-readable JSON-LD (see utils/structuredData.js,
  // which reads opens/closes directly) stays consistent with what's shown,
  // not just the visible text. `closes`/`23:00`/"11:00 PM" unchanged.
  hours: [
    { days: 'Monday - Sunday', opens: '08:00', closes: '23:00', display: '8:00 AM - 11:00 PM' },
  ],

  social: {
    // Real account, per follow-up ("...add the instagram link") —
    // replaces the earlier guessed 'vainivascafe' handle placeholder.
    // igsi= query param kept as given (an Instagram share-tracking token,
    // harmless to leave in — not something to strip).
    instagram: 'https://www.instagram.com/vainavs_cafeteria_kanyakumari?igsi=MW11N3J5eXl4YTNqag==',
    facebook: 'https://facebook.com/vainivascafe',
    whatsapp: 'https://wa.me/916380411268',
  },

  // The official Swiggy ordering page — used by the standalone Swiggy
  // order icon in Navbar.jsx (the Vainav's logo itself still links Home).
  // Centralized here rather than hardcoded, same reasoning as `social`
  // above.
  swiggyMenu: 'https://www.swiggy.com/menu/1420819?source=sharing',
}

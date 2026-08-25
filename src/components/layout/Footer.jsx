import { Link } from 'react-router-dom'
import { Phone, ArrowRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { Logo } from '@components/common/Logo'
import { LocationCard } from '@components/common/LocationCard'
import { ResponsiveImage } from '@components/common/ResponsiveImage'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { NAV_LINKS } from '@constants/navigation'
import { ROUTES } from '@constants/routes'
import { SITE_CONFIG } from '@constants/site'
import { SOCIAL_LINKS } from '@constants/social'
import { FOOTER_BACKGROUND } from '@data/footer'
import { toTelHref } from '@utils/formatters'

function FooterHeading({ children }) {
  return (
    <h3 className="text-cream-50 mb-5 font-sans text-sm font-semibold tracking-wide uppercase">
      {children}
    </h3>
  )
}

/**
 * Quick Links, with "Our Heritage" added between Home and Our Story — per
 * follow-up, it was missing (NAV_LINKS itself only ever had 4 entries;
 * this is the exact same gap Navbar.jsx and FullscreenMenu.jsx both had
 * to work around for their own nav lists — see their own comments for the
 * fuller history). Derived from NAV_LINKS (not a hand-typed duplicate of
 * all 4 existing entries) so Home/Our Story/Menu/Contact stay wired to
 * that single shared source; NAV_LINKS itself is left completely
 * untouched rather than inserting into it directly — Navbar.jsx reads
 * specific indices out of that array (NAV_LINKS[0], NAV_LINKS.slice(2))
 * to build its own separate desktop link row, and inserting a new entry
 * there would silently shift those indices and break it, despite this
 * being a footer-only follow-up.
 * `${ROUTES.HOME}#heritage` matches NAV_LINKS[1]'s own existing
 * `${ROUTES.HOME}#our-story` pattern exactly — a real anchor already used
 * site-wide (Home.jsx's own `id="heritage"` section), not a new URL.
 * Plain <Link>, same as every other item here — no new scroll-specific
 * component needed: ScrollToTop.jsx already handles landing on any
 * `#hash` correctly (offset for the fixed navbar) on every route change,
 * including a hash-only change while already on Home, which is exactly
 * how "Our Story" already worked from this same footer before this
 * follow-up — this is that identical, already-working pattern, just one
 * more entry using it.
 */
const QUICK_LINKS = [
  NAV_LINKS[0],
  { label: 'Our Heritage', path: `${ROUTES.HOME}#heritage` },
  ...NAV_LINKS.slice(1),
]

export function Footer() {
  const year = new Date().getFullYear()
  const [hours] = SITE_CONFIG.hours

  return (
    <footer className="bg-espresso-950 relative overflow-hidden">
      {/* Decorative — a broken/placeholder asset should fade away, not show
          an obvious "photo placeholder" box behind footer text, so it opts
          out of ResponsiveImage's default fallback via `hideOnError`. */}
      <ResponsiveImage
        src={FOOTER_BACKGROUND.image}
        alt=""
        hideOnError
        loading="lazy"
        className="pointer-events-none absolute inset-0 rounded-none border-0"
        imgClassName="opacity-20"
      />

      <Container className="relative grid grid-cols-2 gap-x-8 gap-y-12 py-20 sm:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <Logo large />
          <p className="text-cream-200/70 mt-5 max-w-xs text-sm leading-relaxed">
            {SITE_CONFIG.description}
          </p>
          <ul className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="border-cream-50/20 text-cream-50 ease-luxury hover:border-accent hover:text-accent flex size-9 items-center justify-center rounded-full border transition-colors duration-[var(--duration-fast)]"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.path}>
                {/* font-medium added — sitewide typography pass: footer nav
                    links had no weight class (defaulting to regular/400);
                    spec calls for "medium" on footer links specifically,
                    one step up from the plain-regular footer body copy
                    around them (address/hours paragraphs stay regular). */}
                <Link
                  to={link.path}
                  className="text-cream-200/70 ease-luxury hover:text-accent text-sm font-medium transition-colors duration-[var(--duration-fast)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Opening Hours</FooterHeading>
          <p className="text-cream-50 text-sm">
            {hours.days.replace('Monday', 'Mon').replace('Sunday', 'Sun')}
          </p>
          <p className="text-cream-200/70 mt-1 text-sm">{hours.display}</p>
          {/* "Good Food. Good Mood. Better Memories." -> "YOU'LL LOVE
              SPENDING TIME HERE." per follow-up — text only; the exact
              same classes as before (text-gold-300/80 mt-4 text-xs
              italic) are untouched, per "use the existing footer
              tagline typography/style." Written in literal caps in the
              source (not a CSS uppercase transform) since that's exactly
              how the follow-up itself specified the target string, and
              this element had no existing transform to hook into. */}
          <p className="text-gold-300/80 mt-4 text-xs italic">
            YOU&apos;LL LOVE SPENDING TIME HERE.
          </p>
        </div>

        {/* col-span-2 sm:col-span-1 — matches "Call Us" below (the other
            content-heavy column in this row): without it, this column
            would get squeezed into a single ~140px-wide mobile grid cell,
            too tight for a map-preview card to read comfortably. Full-
            width on mobile (stacks cleanly below the rest of the Contact
            content, per follow-up), a normal single column again from
            sm/tablet up. */}
        <div className="col-span-2 sm:col-span-1">
          <FooterHeading>Our Location</FooterHeading>
          {/* Plain address-text-plus-link replaced with LocationCard — per
              follow-up ("redesign ONLY the visual presentation of the
              existing GET DIRECTIONS / location area... premium café
              location card inspired by Google Maps"). Same underlying
              SITE_CONFIG.address.mapUrl (the one real, already-verified
              Google Maps URL), just a richer presentation around it —
              see LocationCard.jsx for the full rationale/structure. */}
          <LocationCard />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <FooterHeading>Call Us</FooterHeading>
          <a
            href={toTelHref(SITE_CONFIG.contact.phone)}
            className="text-cream-200/70 ease-luxury hover:text-accent flex items-center gap-2.5 text-sm transition-colors duration-[var(--duration-fast)]"
          >
            <Phone className="text-accent size-4 shrink-0" aria-hidden="true" />
            {SITE_CONFIG.contact.phoneDisplay}
          </a>

          <Button to={ROUTES.RESERVATIONS} size="sm" className="mt-4">
            Order Now
            <ArrowRight
              className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>

          <a
            href={SITE_CONFIG.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream-200/70 ease-luxury hover:text-accent mt-3 flex items-center gap-2 text-xs transition-colors duration-[var(--duration-fast)]"
          >
            <FaWhatsapp className="size-3.5" aria-hidden="true" />
            Chat with us on WhatsApp
          </a>
        </div>
      </Container>

      <div className="border-cream-50/10 relative border-t">
        <Container className="text-cream-200/60 flex flex-col items-center gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  )
}

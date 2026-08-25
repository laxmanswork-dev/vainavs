import { Phone } from 'lucide-react'
import { Seo } from '@components/common/Seo'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { SITE_CONFIG } from '@constants/site'
import { toTelHref } from '@utils/formatters'

/**
 * Table reservations aren't open yet — the café doesn't have the seating
 * capacity for online booking (proper seating is ~3 months out, per
 * follow-up), so this page deliberately does NOT offer a booking form or
 * any hint of live availability. It exists to say so calmly and with
 * intent, with a working way to reach the café in the meantime — not to
 * read as an unbuilt page or a loud "sorry, not ready" apology.
 *
 * Was ComingSoon.jsx (the generic "page not built yet" placeholder — a
 * lucide Coffee icon + title/description + "Back to Home"). Rebuilt
 * standalone here rather than reusing/editing that shared component, for
 * two reasons: this needed a real secondary CTA (Call Us, wired to the
 * site's actual phone number) instead of ComingSoon's generic "Back to
 * Home", and this page's own follow-ups explicitly ruled out the generic
 * Coffee icon that component always renders — removing it there would
 * touch every future page that reuses ComingSoon for a real "not built
 * yet" placeholder, so it's left completely untouched and this page just
 * stopped importing it.
 *
 * Copy hierarchy, per a second follow-up correcting a first pass that put
 * "Reservations Coming Soon" as a giant heading (too loud/apologetic for
 * "a confident, established café that is preparing reservations"):
 *   RESERVATIONS        — small eyebrow, .text-kicker + amber-400 (this
 *                          site's own established "label above a heading"
 *                          pattern, e.g. Heritage/Our Story's section
 *                          kickers — not a new treatment)
 *   Coming Soon          — the actual h1, but deliberately NOT the site's
 *                          usual bold/tight-tracking heading weight (see
 *                          its own className below) — kept quiet/editorial
 *                          on purpose, the eyebrow above already states
 *                          what it's about
 *   supporting sentence   — text-ink-muted, unchanged pattern from before
 *   Call Us               — one secondary action, no invented phone number
 */
export default function Reservations() {
  return (
    <>
      <Seo
        title="Reservations"
        description="Table reservations at Vainav's Cafeteria are coming soon. Call us in the meantime."
        path="/reservations"
      />
      <div className="flex min-h-[70vh] items-center">
        <Container className="py-24 text-center">
          <p className="text-kicker mb-4 text-amber-400">Reservations</p>
          {/* font-normal tracking-normal — overrides this site's own h1
              default (font-semibold tracking-tight, see base.css) for this
              one heading only, so "Coming Soon" reads as a quiet, settled
              statement rather than the same bold weight a page title like
              "A Taste of Vainav's" uses. Not a typography-system change —
              every other h1 on the site is untouched. */}
          <h1 className="font-serif text-3xl font-normal tracking-normal sm:text-4xl">
            Coming Soon
          </h1>
          <p className="text-ink-muted mx-auto mt-4 mb-10 max-w-md">
            We're preparing a better seating experience for you. Table reservations will be
            available soon.
          </p>
          {/* toTelHref(SITE_CONFIG.contact.phone) — the same phone number and
              tel: helper Footer.jsx/ContactVisit.jsx already use, so there's
              still only one source of truth for it, not a second hardcoded
              number. Phone icon matches Footer's own Call Us treatment
              (Phone icon + number) rather than introducing a new icon
              convention. */}
          <Button href={toTelHref(SITE_CONFIG.contact.phone)} variant="outline" size="lg">
            <Phone className="size-4" aria-hidden="true" />
            Call Us
          </Button>
        </Container>
      </div>
    </>
  )
}

import { motion } from 'framer-motion'
import { Phone, MapPin, ArrowRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { Container } from '@components/ui/Container'
import { Kicker } from '@components/ui/Kicker'
import { contactVisitBackground } from '@assets'
import { SITE_CONFIG } from '@constants/site'
import { toTelHref } from '@utils/formatters'
import { fadeUp, staggerContainer, viewportOnce } from '@animations/variants'

// Local, scoped to this section only — per follow-up ("give animation
// fade out"), the content should fade back OUT if you scroll back up past
// it, not just fade in once and then stay put forever (which is what the
// shared viewportOnce — `{ once: true }`, used everywhere else on the
// site — does). Derived from viewportOnce (same trigger `amount`), just
// `once: false` so whileInView re-fires (toward "hidden") on exit too. A
// local const here rather than editing viewportOnce itself, which many
// other components sitewide still rely on for its current one-shot
// behavior.
const viewportRepeat = { ...viewportOnce, once: false }

/**
 * The real /contact page body — replaces the earlier ComingSoon placeholder,
 * per follow-up ("you already have the Contact information in the footer...
 * connect the Contact page to the actual actions... Call + WhatsApp +
 * Directions + Order are much more valuable [than a generic form]").
 *
 * The 3 contact blocks have gone through several redesigns:
 *  1. heritage-card-frame cream cards, circular icon badges, filled buttons
 *     (the site's own standard card language, matching Heritage/Menu).
 *  2. Card-free "editorial" columns — plain typography, thin hairline
 *     dividers between columns, no cards/circles/filled buttons.
 *  3. A hand-drawn SVG-outline version (inspired by a hand-sketched
 *     reference photo) — one single closed path per block, stretched via
 *     preserveAspectRatio="none" to fit each block's box.
 *  4. Back to (1) briefly per a follow-up ("give our box design followed
 *     by menu and other section"), then its card color changed to match
 *     Footer's own dark "Our Location" card per a screenshot reference.
 *  5. A hand-drawn SVG outline again, rebuilt as 4 independent edge-strips
 *     (top/right/bottom/left) instead of one single stretched rectangle
 *     path, to fix a real distortion issue the single-path version had.
 *  6. The outline itself removed again per a follow-up ("remove this box
 *     border alone, not content") — the 3 blocks sit plain on the page
 *     background with no border/frame of any kind. A hand-drawn icon set
 *     (custom line-art SVGs) replaced the library icons around the same
 *     time as (5), then that too was reverted per the most recent
 *     follow-up ("replace the icons with original icons... don't design,
 *     give original icons") — back to Phone/FaWhatsapp/MapPin, the same
 *     icon set Footer.jsx already uses elsewhere on this same page, in
 *     the site's standard accent-orange color.
 *
 * Still does NOT touch the large map section below at all — that stays
 * exactly as it was, its own separate, untouched block (see the bottom of
 * ContactVisit() below). Find Us here is address text + a "Get directions"
 * link only, no map preview of its own.
 */

const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: 'Call Us',
    value: SITE_CONFIG.contact.phoneDisplay,
    linkLabel: "Call Vainav's",
    href: toTelHref(SITE_CONFIG.contact.phone),
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: "Have a question? We're here.",
    linkLabel: 'Start a conversation',
    href: SITE_CONFIG.social.whatsapp,
    external: true,
  },
  {
    icon: MapPin,
    label: 'Find Us',
    value: `${SITE_CONFIG.address.line1}, ${SITE_CONFIG.address.line2}`,
    linkLabel: 'Get directions',
    href: SITE_CONFIG.address.mapUrl,
    external: true,
  },
]

// Same real, live Google Maps embed technique LocationCard.jsx already uses
// in the Footer (the classic no-API-key `output=embed` query-search trick).
// Duplicated here rather than imported since LocationCard's own
// EMBED_QUERY is a private local const, not exported.
const MAP_EMBED_QUERY = 'Vainavs cafeteria Kanyakumari'

/**
 * One contact item. Label styling skips the site-wide `.text-kicker`
 * uppercase/tracked treatment for this one section — plain sans-serif at
 * normal weight/case instead, reading like signage rather than a UI
 * label. Icon color text-amber-400/70 -> text-accent -> white with a
 * black drop-shadow outline -> plain white, across three follow-ups
 * ("original icons... don't design", then "icons need to be white with
 * black coating", then "remove that black") — the outline is gone again,
 * just the plain white fill/stroke left.
 *
 * clip-path polygon (new) — per follow-up ("give triangle shape boxes"),
 * a filled triangular background behind each block. A true point-apex
 * triangle (`polygon(50% 0%, 0% 100%, 100% 100%)`) would clip the icon/
 * label row right at the narrow top — real text can't be clipped along
 * with the background without visibly spilling outside the shape's fill,
 * so this uses a gently-tapered version instead (a wide flat top, angled
 * sides converging toward it) — still reads clearly as a triangle
 * silhouette, just wide enough at the top that the icon+label row (the
 * least room any of the 3 blocks needs) always stays safely inside the
 * fill. bg-espresso-900/60 is the same dark card tone approved earlier
 * via a screenshot reference (matching Footer's own "Our Location" card)
 * — CSS borders don't follow a clip-path's angled edges correctly, so
 * this is fill-only, no border, per that same earlier constraint.
 *
 * pl-16 (new, was symmetric px-7/sm:px-8) — per follow-up ("content
 * sitting too close to the left edge... first icon partially clipped").
 * The trapezoid's own top edge is inset 15% of the box's width from each
 * side (see the clip-path above: `15% 0%` / `85% 0%`), narrowing toward
 * 0% inset at the bottom — a plain symmetric px-7 (28px) padding was
 * computed for a rectangle, not this shape, so at the icon/label row's
 * height (near the narrow top) the old padding sat well inside the
 * clipped-away diagonal, cutting the icon's own left edge off. 64px
 * safely clears that inset at every real box width this section actually
 * renders at (mobile's single wide stacked column included), and — since
 * all 3 blocks share this exact one className/one box width per
 * breakpoint (equal-width grid columns) — applying the SAME fixed value
 * to all 3 is what actually produces the "one consistent invisible left
 * content line" the follow-up asked for, without needing to compute a
 * different offset per card. Right padding (pr-7/sm:pr-8) is deliberately
 * left smaller/asymmetric — the content is short and left-aligned, so it
 * never reaches anywhere near the (equally-inset) right edge; this was
 * never the reported problem. pt-10/pb-8 unchanged — vertical spacing
 * wasn't part of this ask. */
function ContactDetail({ icon: Icon, label, value, linkLabel, href, external }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-espresso-900/60 pt-10 pr-7 pb-8 pl-16 sm:pr-8"
      style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-[18px] shrink-0 text-white" aria-hidden="true" />
        <p className="text-ink-muted font-sans text-sm font-medium">{label}</p>
      </div>
      <p className="text-ink mt-2.5 font-serif text-lg leading-snug sm:text-xl">{value}</p>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group text-accent ease-luxury mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-[var(--duration-fast)] hover:text-amber-400"
      >
        {linkLabel}
        <ArrowRight
          className="size-3.5 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
    </motion.div>
  )
}

export function ContactVisit() {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_EMBED_QUERY)}&z=17&output=embed`

  return (
    // relative overflow-hidden — required for the absolutely-positioned
    // background layer below to stay scoped to this section, same as
    // Heritage.jsx/OurStoryHero.jsx/SignatureMenu.jsx/MenuShowcase.jsx's
    // own background sections. The locked map section further down sits
    // inside its own opaque cream card regardless, so it's unaffected
    // either way — its own JSX is untouched by this.
    <section className="bg-atmosphere relative overflow-hidden py-16 lg:py-20">
      {/* The background photo — inset-0, behind everything. brightness
          (0.47) blur(2px) + the 0.72 overlay below are Heritage.jsx's own
          exact values, reused as-is (same technique every other section-
          background photo on this site shares). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${contactVisitBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.47) blur(2px)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[rgb(27_18_12_/_0.72)]" />

      <Container className="relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="text-center"
        >
          <Kicker className="justify-center">Contact</Kicker>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Come Visit Vainav&apos;s</h1>
          <p className="text-ink-muted mx-auto mt-4 max-w-md text-lg">
            You&apos;ll Love Spending Time Here.
          </p>
        </motion.div>

        {/* 3 equal columns at sm+, generous gap doing the separation work
            (no dividers, no cards, no outline — see ContactDetail above). */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="mt-12 grid gap-8 sm:grid-cols-3 lg:mt-16"
        >
          {CONTACT_DETAILS.map((detail) => (
            <ContactDetail key={detail.label} {...detail} />
          ))}
        </motion.div>

        {/* Order Online — small, secondary CTA rather than a 4th
            equal-weight block, present and fully working (same real Swiggy
            link the Navbar's own Order Online button/icon use), just not
            competing with Call/WhatsApp/Directions for attention. */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="text-ink-muted mt-10 text-center text-sm"
        >
          Prefer to order in?{' '}
          <a
            href={SITE_CONFIG.swiggyMenu}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent ease-luxury inline-flex items-center gap-1 font-semibold transition-colors duration-[var(--duration-fast)] hover:text-amber-400"
          >
            Order Online
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </motion.p>

        {/* Large map — LOCKED, untouched. Same cream "memory frame" card
            language as this page has always used for it (not
            LocationCard.jsx's own compact dark footer variant), scaled up
            to be the page's own focal map rather than a small sidebar
            preview. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          className="mt-16 lg:mt-20"
        >
          <div className="border-espresso-900/10 shadow-soft heritage-card-frame overflow-hidden border bg-[#e5e1db] p-3 sm:p-4">
            <iframe
              src={embedUrl}
              title={`${SITE_CONFIG.name} location on Google Maps`}
              className="h-80 w-full sm:h-96"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

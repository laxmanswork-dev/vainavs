import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ArrowRight, ArrowUpRight, UtensilsCrossed } from 'lucide-react'
import 'swiper/css'
import { Container } from '@components/ui/Container'
import { Kicker } from '@components/ui/Kicker'
import { Button } from '@components/ui/Button'
import { ImagePlaceholder } from '@components/ui/ImagePlaceholder'
import { LazyImage } from '@components/common/LazyImage'
import { SIGNATURE_MENU } from '@data/signatureMenu'
import { signatureMenuBackground } from '@assets'
import { ROUTES } from '@constants/routes'
import { fadeUp, viewportOnce } from '@animations/variants'
import { EASE_LUXURY_OUT } from '@animations/motion.config'
import { cn } from '@utils/cn'

// How long each card waits before ITS OWN reveal starts, in seconds — one
// shared schedule both the light-sweep shimmer and the name's typewriter
// reveal key off of, so the two effects read as one choreographed moment
// per card (light reaches the card right as its name finishes typing in),
// not two unrelated animations that happen to coexist. index 0 (Chicken
// Wraps) leads at 0.7s in; each card after it starts 0.32s later, so the
// whole row visibly plays left-to-right rather than firing all at once.
// 0.5/0.16 -> 0.7/0.32 per follow-up ("the animation is so speed, reduce
// the speed") — roughly doubled the per-card gap so the row's own
// left-to-right sweep reads as a deliberate, unhurried reveal instead of
// six cards catching up with each other in a blur.
const CARD_REVEAL_DELAY = (index) => 0.7 + index * 0.32

// One single silhouette for all 6 cards — per follow-up ("the card shapes
// need to be even"). This row used to cycle through all 6 hand-tuned
// menu-card-frame variants (base.css) so no two cards traced the same
// curve; in this tight, side-by-side curated row of exactly 6 items that
// read as visually inconsistent/uneven rather than handcrafted. One
// shared shape keeps the hand-cut paper edge (still not a plain rounded
// rectangle) while the row itself reads as one even, deliberate set.
// menu-card-frame-4 specifically: the shallowest/most restrained of the
// six curves (6-6.5px peak vs 9-10.5px on the others), so a single shape
// repeated six times reads as a quiet material texture, not a busy
// silhouette. (menu-card-frame-{1,2,3,5,6} stay defined in base.css,
// still used elsewhere/available if a future section wants variety again.)
const CARD_FRAME = 'menu-card-frame-4'

// A different soft radial-warmth position per card — the "soft uneven
// paper tone" material cue below. Six fixed positions (not random, which
// would look glitchy re-rendered), each just off-center in its own
// direction, so no two cards' warm patch sits in quite the same spot.
const PAPER_TONE_POSITIONS = ['32% 22%', '68% 28%', '50% 62%', '24% 68%', '76% 66%', '50% 38%']

// One shared warm color-grade, applied to every card's <img> — per
// follow-up ("polish the food imagery... six images should look like one
// professional Vainav's photoshoot, not six collected from different
// websites"). This environment has no image-generation/sourcing tool, so
// the six source photos themselves can't be replaced/reshot here; this is
// the real, code-only lever available — a single consistent filter
// recipe (warmed via a touch of sepia, boosted saturation/contrast/
// brightness) applied identically to all six, regardless of each photo's
// own original lighting/white-balance, so they read as color-matched to
// each other and to the page's own Caramel/Brownie palette instead of
// "six different sources." Tailwind arbitrary `filter` property (not the
// individual saturate-*/contrast-* utilities) so the exact recipe is one
// readable value instead of four separately-scaled utility classes.
const IMAGE_GRADE_CLASSNAME = '[filter:saturate(1.1)_sepia(0.08)_contrast(1.05)_brightness(1.02)]'

function MenuCard({ name, description, image, frameClass, toneAt, index, shimmer }) {
  // Same aspect/box the photo occupies — shared so the real-photo and
  // no-photo-yet paths (below) reserve the exact same footprint, no
  // layout shift once a real asset is dropped in for Chicken Popcorn /
  // Sizzling Brownie.
  const imageBoxClassName =
    'ease-luxury-out aspect-3/4 w-full rounded-none border-0 transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]'

  return (
    // bg-surface-raised is Cream — a deliberately light card floating on the
    // dark page, so its text can't read the page-level text-ink/-muted
    // (those are light); text-ink-inverse + espresso-700 pair with the light
    // card instead, same as HeritageCard.
    // rounded-lg -> menu-card-frame-4 — per a hand-drawn reference sketch
    // ("premium handcrafted café menu card"), swaps the plain
    // rounded-rectangle for the organic clip-path silhouette (see
    // base.css): full-width top/bottom, sides bowing inward toward the
    // vertical center. Same shape for every card in this row (frameClass
    // prop, decided by the caller) — see CARD_FRAME's own comment above
    // for why this row uses one shared shape rather than cycling variants.
    // border-espresso-900/10 -> /18 — a touch more defined per the
    // brief's own "subtle dark-brown edge," still clearly a hairline, not
    // a heavy outline.
    // <article> -> <Link to={ROUTES.MENU}> per follow-up ("make every menu
    // card clickable... entire card should link to the existing /menu
    // destination... use semantic <a> elements rather than clickable
    // <div>s"). Renders a real <a> (react-router's Link, the same
    // primitive Button.jsx already uses for its own `to` prop), not a
    // div+onClick — native Tab/Enter/Space activation and the site's
    // global :focus-visible outline (base.css) both come for free, no
    // bespoke keyboard handling needed. `block` is new — an <a> defaults
    // to display:inline in the browser's own stylesheet, which would
    // silently break the h-full/overflow-hidden/clip-path box behavior
    // this card has always relied on; `block` is the one addition that
    // keeps the exact same visual layout the old <article> had, not a
    // design change. aria-label spells out the destination explicitly
    // (not just the visible dish name/description) — per the same
    // follow-up ("the arrow interaction [must be] understandable without
    // relying only on visual appearance"), so a screen reader user gets
    // "View Chicken Wraps on the full menu," not just the dish name.
    <Link
      to={ROUTES.MENU}
      aria-label={`View ${name} on the full menu`}
      className={cn(
        'group border-espresso-900/18 bg-surface-raised shadow-soft relative block h-full overflow-hidden border',
        frameClass,
      )}
    >
      {/* Fine paper-grain texture — the "thick handmade paper... very fine
          fibre texture" material cue. Same low-opacity radial-dot
          technique HeritageCard already uses for its own paper texture,
          tuned finer (8px grid, was 14px) and fainter (opacity 0.05, was
          0.08) — this card's grain reads as fibre, not the more visible
          "dot print" texture Heritage's cream cards use. z-order via
          source order (painted first, everything else after) keeps it
          strictly behind the photo/text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgb(94 48 35) 0.6px, transparent 0.6px)',
          backgroundSize: '8px 8px',
        }}
      />
      {/* Soft uneven paper tone — a very faint warm patch, positioned
          differently per card (toneAt), so the cream surface reads as a
          real handmade sheet with a naturally uneven tone rather than a
          flat, uniformly-printed color. Extremely low opacity (0.05) —
          meant to be felt more than seen. Mostly visible in the text
          area below the photo (the photo itself is opaque and sits above
          this layer), which is exactly where a real paper card's own
          tone would actually show.
          rgb(192 133 82) is Caramel, the accent — went to rgb(137 87 55)
          (Coffee) then rgb(122 35 51) (deep burgundy) across two
          follow-ups, both reverted back to Caramel per "HARD RESTORE
          MODE." A literal value (inline gradient stops can't read CSS
          variables), same as the site's other hardcoded accent
          literals. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 60% at ${toneAt}, rgb(192 133 82) 0%, transparent 70%)`,
        }}
      />

      <div className="relative overflow-hidden">
        {/* image is null for any item with no genuine photo asset yet —
            render the site's own elegant placeholder treatment directly
            rather than pointing LazyImage at one that doesn't exist. Same
            component ResponsiveImage itself falls back to on a broken
            photo, so this reads identically to every other
            still-a-placeholder card (all six did, before real assets
            existed) — not a new look. */}
        {image ? (
          <>
            <LazyImage
              src={image.src}
              alt={image.alt}
              fallbackIcon={UtensilsCrossed}
              onLight
              className={imageBoxClassName}
              imgClassName={IMAGE_GRADE_CLASSNAME}
            />
            {/* Consistent warm "studio light" wash — the other half of the
                same-photoshoot illusion: a fixed light source (soft warm
                highlight, upper-left) and a fixed shadow (Brownie tone,
                lower-right) laid over every photo identically, regardless
                of where each source photo's own light actually came from.
                mix-blend-overlay lets it warm/deepen the photo underneath
                rather than sit on top of it like a flat tint; low opacity
                so it reads as ambient light, not a filter effect. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgb(255 214 170 / 0.22) 0%, transparent 45%), linear-gradient(315deg, rgb(94 48 35 / 0.28) 0%, transparent 55%)',
              }}
            />
          </>
        ) : (
          <ImagePlaceholder
            icon={UtensilsCrossed}
            label={name}
            onLight
            className={imageBoxClassName}
          />
        )}
      </div>
      {/* Fixed text-block sizing — per follow-up ("all 6 cards must have
          exactly the same width and height, regardless of name/description
          length"). Swiper doesn't equalize slide heights on its own (each
          slide's height is measured from its own content); "Chicken
          Popcorn" and "Sizzling Brownie" wrap to a 2nd name line the other
          4 don't, which was the entire source of the ~20px height
          mismatch (confirmed by measuring each card: description is
          already a uniform 2 lines everywhere, only the name varied).
          min-h-10 (2 lines @ text-sm's 20px line-height) / min-h-8 (2
          lines @ text-xs's 16px line-height) reserve that same worst-case
          space on every card regardless of breakpoint, so a 1-line name
          just leaves its own second line blank instead of the card
          shrinking — the whole card's height becomes a pure function of
          its (equal, swiper-driven) width, never of its text. */}
      <div className="relative p-5">
        {/* Name fades up as one piece — per follow-up ("replace the type
            animation with fade out"), swapping out the earlier
            letter-by-letter TypewriterFade reveal (a few follow-ups of
            tuning its speed back and forth) for a single calm fade+rise,
            matching the fadeUp language used everywhere else on the site
            instead of a distinct "typing" effect. Plain initial/animate
            (not variants+whileInView) — Swiper's own slide positioning
            makes a per-card viewport observer unreliable, same reasoning
            the shimmer below already uses. delay: CARD_REVEAL_DELAY(index)
            keeps the exact same choreography as before — this card's name
            still lands right as its own light-sweep reaches it, just as
            one smooth motion now instead of a typed-out sequence. 8px
            rise (not the shared fadeUp variant's 32px REVEAL_OFFSET) —
            that distance is tuned for section-level headings; inside a
            compact card it would read as an odd jump rather than a
            subtle lift.
            text-sm/tracking-wide -> text-[13px]/no tracking, per earlier
            follow-up ("Chicken Popcorn / Sizzling Brownie... it should
            not cross one line") — measured fit against the 139px box;
            unrelated to this pass, left as-is. min-h-5/leading-5 likewise
            unchanged — still just a single reserved line, still keeps
            all 6 cards exactly as even. */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={shimmer ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: EASE_LUXURY_OUT, delay: CARD_REVEAL_DELAY(index) }}
          className="text-ink-inverse min-h-5 font-sans text-[13px] leading-5 font-semibold whitespace-nowrap uppercase"
        >
          {name}
        </motion.p>
        <p className="text-espresso-700 mt-1.5 min-h-8 text-xs">{description}</p>
        {/* aria-hidden on the whole badge (was only on the icon inside it)
            — now that the card itself is the real link with its own
            aria-label above, this badge is purely a visual "this is
            clickable" cue; a screen reader announcing it separately would
            just repeat what the link's own accessible name already says. */}
        <span
          aria-hidden="true"
          className="bg-accent text-cream-50 shadow-gold ease-luxury absolute -top-6 right-5 flex size-11 items-center justify-center rounded-full transition-transform duration-[var(--duration-fast)] group-hover:-translate-y-1"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      {/* The "double-layered handcrafted edge" — a second, smaller inset
          copy of the exact same menu-card-frame silhouette, rendered as a
          thin stroke (no fill) over the whole card face, the way a
          picture mat's inner line sits visually over the print it frames.
          inset-1.5 (6px in from every edge) is what produces the
          "slightly inset inner contour" — clip-path percentages scale
          with the element's own box, so the same class on this smaller
          box traces a proportionally smaller version of the outer curve
          automatically, no second hand-tuned shape needed.
          z-10 so it sits above the photo too, not just the text below it;
          pointer-events-none + aria-hidden since it's pure decoration.
          Same frameClass as the outer card (not a fixed class) — the
          inner line has to trace the same variant's curve as the outer
          edge it's framing, or the two would visibly mismatch. */}
      <div
        aria-hidden="true"
        className={cn(
          frameClass,
          'border-espresso-800/30 pointer-events-none absolute inset-1.5 z-10 border',
        )}
      />

      {/* Light-sweep shimmer — per explicit follow-up ("very rare, unique,
          noticeable animation"), a one-time signature reveal for this
          curated 6-card row specifically (not applied to the 40-card Full
          Menu grid, which stays deliberately restrained per its own
          brief). A bright diagonal streak of warm light sweeps once across
          the *entire* card — photo, text, and the arrow badge all catch
          it together, like a single ray of sunlight crossing real paper
          on a table — staggered by `index` (same CARD_REVEAL_DELAY the
          name's typewriter above uses) so it visibly travels down the
          row, card by card, rather than all six flashing at once.
          mix-blend-screen (was mix-blend-overlay) — overlay's own math
          barely lightens pixels that are already bright, which made the
          streak nearly invisible over these photos' own light areas
          (confirmed by screenshotting mid-sweep: no visible band at all);
          screen always adds brightness regardless of what's underneath,
          so the streak reads clearly across dark AND light regions of
          every photo alike. Bumped alpha (0.75->0.9) and a slightly
          narrower/brighter band for the same reason — visible contrast
          over a busy food photo, not just a technically-present overlay.
          Same frameClass clip-path as the card itself, so the sweep is
          trimmed to the exact paper silhouette, not a rectangle poking
          past the card's own hand-cut edges. z-30 — above the inner frame
          stroke (z-10) and the badge (no z of its own, so natural
          stacking already puts it below). Gated on `shimmer` (flips true
          once, from the parent's onViewportEnter — see SignatureMenu
          below) so it plays once on scroll-in, never loops or re-fires,
          and never runs at all if reduced-motion users never trigger the
          parent's viewport-enter animation start in a jarring way
          (initial state is simply invisible/off-screen). */}
      <motion.div
        aria-hidden="true"
        className={cn(frameClass, 'pointer-events-none absolute inset-0 z-30 mix-blend-screen')}
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 42%, rgb(255 244 214 / 0.9) 50%, transparent 58%)',
          backgroundSize: '260% 100%',
          backgroundRepeat: 'no-repeat',
        }}
        initial={{ backgroundPositionX: '-70%' }}
        animate={shimmer ? { backgroundPositionX: '170%' } : undefined}
        // duration 1 -> 1.6s per follow-up ("reduce the speed") — a
        // slower, more deliberate sweep across the card instead of a
        // quick flash.
        transition={{ duration: 1.6, delay: CARD_REVEAL_DELAY(index), ease: [0.65, 0, 0.35, 1] }}
      />
    </Link>
  )
}

export function SignatureMenu() {
  // Fires the shimmer once, the first time the card row scrolls into view
  // — set via the Swiper wrapper's own onViewportEnter below, not a
  // per-card observer (Swiper positions offscreen slides via transform
  // inside an overflow-hidden track, which makes a *plain* per-card
  // whileInView unreliable — a slide can measure as "intersecting" before
  // it's actually scrolled/swiped into visible view). One shared trigger
  // for the whole row sidesteps that entirely and is what actually
  // produces the intended "sweeps down the row once" effect.
  const [hasEnteredView, setHasEnteredView] = useState(false)

  return (
    // relative overflow-hidden — required for the absolutely-positioned
    // background layer below (added per follow-up: "i need to add
    // background for this create file ground.png") to stay scoped to this
    // section and not spill past its edges. No sticky/scroll-linked
    // descendant in this section (unlike OurStoryHero), so — same as
    // Heritage.jsx — overflow-hidden is safe directly on the <section>
    // itself, no separate wrapper div needed.
    // border-b border-cream-50/10 (new) — per follow-up ("each every
    // section end give line"), same thin warm hairline added to every
    // Home section's bottom edge (see Hero.jsx's own comment for the full
    // rationale) — marks the end of this section/start of Footer, the
    // last boundary in the Home page's own section flow.
    <section className="bg-atmosphere border-cream-50/10 relative overflow-hidden border-b py-20 lg:py-28">
      {/* The background photo — inset-0, behind everything (plain DOM
          order paints it before the Container below, and the Container
          is also lifted onto its own stacking context via relative z-10
          further down, so it's unambiguously on top either way). Now a
          real photo of the café interior (ground.png). brightness(0.47)
          blur(2px) + the 0.72 overlay below are Heritage.jsx's own exact
          values, reused as-is — this section's cards are the same light
          cream-on-dark-photo composition Heritage's cards already are, so
          the same dimming/blur strikes the same balance (photo reads as
          atmosphere behind the cards, not a sharp competing image).
          (A darker/browner variant — blur 3px, overlay rgb(94 48 35 /
          0.78) — was tried per a follow-up, then reverted per "restore
          signature background" right after; back to these original
          values.) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${signatureMenuBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.47) blur(2px)',
        }}
      />
      {/* Warm overlay on top of the photo — same espresso-toned family
          (rgb(27 18 12)) every other section's own background overlay
          uses, keeping the cream cards/light text exactly as legible as
          they were on the flat bg-atmosphere background regardless of
          what the photo looks like. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[rgb(27_18_12_/_0.72)]" />

      <Container className="relative z-10">
        {/* "A Taste of Vainav's" — per follow-up, renamed from "Our
            Signature Menu" and given the same eyebrow/heading/supporting-
            line structure the site already uses for a centered section
            intro (see OurStoryHero, MenuShowcase's own hero) rather than
            leaving the section heading as just the small Kicker label it
            was before — the new copy is a full headline phrase, not a
            short eyebrow word, so it needs the same visual weight those
            other headings get. Exact same classes as MenuShowcase's own
            centered hero block, so this reads as one consistent pattern
            site-wide, not a one-off. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          <Kicker className="justify-center">Signature Menu</Kicker>
          <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">A Taste of Vainav's</h2>
          <p className="text-ink-muted mx-auto mt-4 max-w-md text-lg">
            A few favourites worth coming back for.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onViewportEnter={() => setHasEnteredView(true)}
          className="mt-10"
        >
          <Swiper
            spaceBetween={20}
            slidesPerView={1.6}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 6, spaceBetween: 20, allowTouchMove: false },
            }}
            // Swiper defaults to overflow: hidden on both axes. Plain
            // !overflow-visible (both axes) was clipping-off-fix here before,
            // but that also un-clips the X axis — slides beyond slidesPerView
            // stay in normal flow and widen the page, causing real horizontal
            // scroll on every viewport (confirmed via a full-page audit).
            // Split per-axis instead: keep X clipped (contains the slides),
            // free Y (so each card's -top-6 badge and hover lift aren't cropped).
            className="!overflow-x-hidden !overflow-y-visible"
          >
            {SIGNATURE_MENU.map((item, index) => (
              <SwiperSlide key={item.name} className="h-auto pt-6">
                <MenuCard
                  {...item}
                  frameClass={CARD_FRAME}
                  toneAt={PAPER_TONE_POSITIONS[index % PAPER_TONE_POSITIONS.length]}
                  index={index}
                  shimmer={hasEnteredView}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* "Explore Full Menu" CTA — per follow-up: this section is a
            curated preview (SIGNATURE_MENU is already just 6 items, no
            data change needed here), not the complete menu; the full
            40-item, 7-category menu lives on its own dedicated page (see
            pages/Menu.jsx/MenuShowcase.jsx) and stays completely
            untouched by this change. Same Button component + ArrowRight/
            group-hover:translate-x-1 pattern already used for every other
            primary CTA on the site (Hero, OurStoryStatement, ...) — not
            a one-off styled link, so it automatically matches typography/
            colors/hover behavior with zero bespoke styling here.
            mt-12/lg:mt-16 gives it real breathing room from the cards
            above, comfortably clear of the swiper's own -top-6 badges. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 text-center lg:mt-16"
        >
          <Button to={ROUTES.MENU} size="lg">
            Explore Full Menu
            <ArrowRight
              className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}

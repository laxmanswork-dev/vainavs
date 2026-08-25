import { motion } from 'framer-motion'
import { Container } from '@components/ui/Container'
import { Kicker } from '@components/ui/Kicker'
import { ResponsiveImage } from '@components/common/ResponsiveImage'
import { TypewriterFade } from '@components/common/TypewriterFade'
import { HERITAGE_CARDS, HERITAGE_HEADING, HERITAGE_SUPPORTING } from '@data/heritage'
import { fadeUp, staggerContainer, viewportOnce } from '@animations/variants'
import { EASE_LUXURY_OUT } from '@animations/motion.config'
import { cn } from '@utils/cn'
import { COFFEE_BEAN_TEXTURE } from '@utils/coffeeBeanTexture'
import { heritageBackground } from '@assets'

// Card content fade+rise — per follow-up ("for this inside box content
// give [a] fade... animation"), the eyebrow/heading/description inside
// each card previously had no animation of their own; they just appeared
// the instant the whole card's own fadeUp finished, all at once. Same
// pattern already used for MenuShowcase's card text and SignatureMenu's
// card name: a variants object (no own initial/animate/whileInView) so it
// inherits its hidden->visible trigger by propagation from this card's
// own `variants={fadeUp}` article, cascading through the small stagger
// below so eyebrow -> heading -> description settle in sequence rather
// than all three popping together. 8px rise, not the shared fadeUp
// variant's 32px REVEAL_OFFSET — that distance is tuned for section-level
// headings; inside a card it reads as an odd jump rather than a subtle
// lift.
const CARD_CONTENT_FADE_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_LUXURY_OUT } },
}
const CARD_CONTENT_STAGGER = staggerContainer(0.1)

// Heading + subtitle only, per follow-up ("typewriter animation mixed with
// fade out") — card titles/bodies keep their existing plain fadeUp.
// TypewriterFade itself now lives in components/common (SignatureMenu's
// card names reuse the exact same effect) — see its own doc comment for
// the full per-character mechanics/accessibility notes. Types in once
// when scrolled into view (this section's shared viewportOnce on the
// outer stagger container) and then simply stays visible - no fade-out
// afterward, no looping. Renders as the DIRECT children of a
// motion.h2/motion.p that itself carries variants={staggerContainer(...)}
// (see call sites below) - same nested-stagger technique this file
// already uses one level up (the section's own motion.div staggering
// Kicker/heading/subtitle/cards), so the outer section stagger reaches
// TypewriterFade, then its own staggerChildren cascades into characters.

function HeritageCard({ eyebrow, heading, description, image, imageClassName }) {
  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        // bg-surface-raised (Cream) -> a light warm gray, per follow-up
        // ("change the colour... to gray with dot dot texture") — still a
        // deliberately light card floating on the dark page, just a
        // desaturated warm gray now instead of Cream's own warmer tone.
        // Not a token from the shared palette (there's no gray in it) —
        // a one-off arbitrary value, close in lightness to the old Cream
        // so text-ink-inverse/espresso-700 below still read exactly as
        // well against it. Everything else about the card (border,
        // shadow, dark-on-light text pairing, clip-path shape) is
        // unchanged.
        // relative overflow-hidden — needed so the dot-grid texture and
        // the center card's own coffee-bean wash (below) stay clipped to
        // the card's own silhouette.
        // p-6 -> p-5 — per follow-up, trims card internal empty space a
        // touch (part of the overall "reduce card height" pass below).
        // rounded-lg -> heritage-card-frame (new) — per follow-up (a
        // hand-drawn reference sketch), swaps the plain rounded-rectangle
        // card for a custom clip-path silhouette: all four edges curve
        // gently inward toward the shape's own center, corners stay
        // sharp/pointed rather than rounded. See base.css for the shape
        // itself and why it's built as a fixed-px clip-path (same
        // technique as the site's own `btn-carved` button shape) rather
        // than a %-based one or an actual border-radius. clip-path clips
        // background/border/shadow together automatically, so hover and
        // every other state just inherit the shape — nothing else here
        // needed to change for that.
        'border-espresso-900/10 text-ink-inverse shadow-soft heritage-card-frame relative flex flex-col overflow-hidden border bg-[#e5e1db] p-5',
        // The text-only middle card has no image pushing it down, so center
        // its content in the full card height instead of top-aligning —
        // otherwise it reads as misaligned against its two photo siblings.
        // This structural difference (text-led center vs. photo-led sides)
        // is what makes the three cards read as "chapters," not three
        // identical feature cards.
        !image && 'justify-center text-center',
      )}
    >
      {/* Dot-grid texture — new, per follow-up, on all three cards (not
          just the text-only one). A plain CSS radial-gradient repeat, not
          an image asset — a small, fine grid of dots at very low opacity
          in the same warm Brownie/espresso tone the rest of the site's
          dark surfaces use, so it reads as a subtle paper/print texture
          rather than a pattern competing with the title/body text above
          it. z-[0] via source order (rendered first, before the
          image/wash and the text) keeps it strictly behind everything
          else in the card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgb(94 48 35) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      {image ? (
        // aspect-4/3 -> aspect-3/2 — per follow-up ("cards are too tall,
        // reduce their height"), a flatter/shorter image area is most of
        // where that height reduction comes from; also just a better fit
        // for landscape-style heritage/hospitality photography than a
        // taller 4:3 crop. mb-6 -> mb-4 to match the tightened spacing
        // used throughout this pass.
        // whileInView scale — a very subtle reveal (1.04x -> 1x), kept
        // from the previous pass.
        // hideOnError — every image asset in this project is still an
        // intentional 0-byte placeholder (see src/assets/README.md), so
        // this renders an empty box (the card's own cream surface showing
        // through) rather than an icon-labeled placeholder, until real
        // Vainav's photography replaces the file.
        // imageClassName (new, optional, from data/heritage.js) — an extra
        // zoom+anchor on just this card's <img>, layered on top of the
        // box's own object-fit:cover. Needed only for the "From
        // Kanyakumari, with Love." photo: at this box's 3:2 aspect, its
        // source (≈1.9:1, wider than the box) already shows its FULL
        // height under plain cover — object-position's vertical axis has
        // no overflow to work with, so it's inert here, no matter the
        // value. scale-[1.2] origin-bottom zooms in 20% anchored at the
        // box's bottom edge, which pins the bottom (coastline/water stays
        // fully framed, zero crop there) while pushing ~20% of the box's
        // own height off the top — trimming a real chunk of plain sky
        // without touching the Thiruvalluvar Statue (the tallest point in
        // frame, safely below that 20% line). Undefined for the other two
        // cards, so their `<img>` renders with no extra transform, exactly
        // as before.
        <motion.div
          initial={{ scale: 1.04, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          // relative (new) — without a position, this normal-flow block
          // would actually paint BEHIND the new absolutely-positioned
          // dot-grid texture above (CSS paints in-flow content before
          // positioned descendants, regardless of DOM order), putting
          // faint dots visibly over the photo. Making this a positioned
          // element too puts it back in the same paint pass as the
          // texture, where DOM order wins instead — this comes after the
          // texture in the JSX, so it correctly paints on top.
          className="relative mb-4 aspect-3/2 overflow-hidden rounded-md"
        >
          {/* border-0 — per follow-up ("photos need to fully cover the
              box"), overrides ResponsiveImage's own default
              border-gold-500/25 ring (a 1px inset border drawn just
              inside the photo's edge, which was exactly what stopped it
              from reading as edge-to-edge). Scoped to just this
              className override, not a change to ResponsiveImage.jsx
              itself — other call sites (Menu cards, Hero collage, ...)
              keep that border since they weren't asked to change. */}
          <ResponsiveImage
            src={image.src}
            alt={image.alt}
            hideOnError
            onLight
            className="size-full border-0"
            imgClassName={imageClassName}
          />
        </motion.div>
      ) : (
        <>
          {/* Subtle brand texture filling the card's upper area instead of
              an icon — the same coffee-bean pattern already used
              site-wide (Navbar, Categories), at a very low opacity. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: COFFEE_BEAN_TEXTURE, backgroundRepeat: 'repeat' }}
          />
          {/* Thin ornamental rule — the "subtle brand detail" this,
              the emotional-centerpiece card, gets instead of a photo or
              an icon. mb-6 -> mb-4 to match the tightened spacing used
              throughout this pass. */}
          <span aria-hidden="true" className="bg-accent/50 relative mx-auto mb-4 h-px w-10" />
        </>
      )}
      {/* Eyebrow/heading/description now fade in as a small in-sequence
          cascade (see CARD_CONTENT_FADE_VARIANTS/CARD_CONTENT_STAGGER
          above) instead of appearing instantly with the rest of the
          card. This wrapper declares no initial/animate/whileInView of
          its own — inherits its hidden->visible trigger by propagation
          from the article's own `variants={fadeUp}` above it. */}
      <motion.div variants={CARD_CONTENT_STAGGER}>
        {/* Eyebrow — new, per follow-up ("eyebrow → heading → description"
            hierarchy). Reuses the site's shared `.text-kicker` treatment
            (same one Kicker.jsx wraps) rather than a new one-off style, at
            a muted accent tone appropriate for sitting inside a light card
            (the section-level Kicker is tuned for the dark page background,
            wrong here) — relative so it stays above the center card's own
            texture wash, mb-1 keeps it snug against the heading right
            below it without disturbing that heading's own spacing to the
            image above. */}
        <motion.p
          variants={CARD_CONTENT_FADE_VARIANTS}
          className="text-kicker text-accent/70 relative mb-1"
        >
          {eyebrow}
        </motion.p>
        {/* base.css's `h3 { @apply text-ink ... }` sets color directly on
            the element — the parent's text-ink-inverse won't cascade past
            that explicit utility, so it has to be overridden here too.
            relative — sits visually above the center card's texture wash. */}
        <motion.h3
          variants={CARD_CONTENT_FADE_VARIANTS}
          className="text-ink-inverse relative text-xl"
        >
          {heading}
        </motion.h3>
        {/* One sentence only now (was a `paragraphs` array rendered as
            multiple <p>s) — per follow-up, "no paragraphs," max ~10-12
            words in the body. mt-3 -> mt-2 to match the tightened spacing
            used throughout this pass. */}
        <motion.p
          variants={CARD_CONTENT_FADE_VARIANTS}
          className="text-espresso-700 relative mt-2 text-sm leading-relaxed"
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.article>
  )
}

export function Heritage() {
  return (
    // pt-8/pb-20 (lg:pt-10/lg:pb-28) -> pt-6/pb-14 (lg:pt-8/lg:pb-16) ->
    // pt-6/pb-10 (lg:pt-6/lg:pb-12) — per follow-up ("fit perfectly within
    // one viewport, remove the empty space below the cards"), tightened
    // once more: lg:pt-8->lg:pt-6 (navbar-to-heading a touch more
    // compact) and pb-14/lg:pb-16->pb-10/lg:pb-12 (cards-to-bottom now
    // 40px/48px, inside the requested ~40-60px range, down from 56/64px).
    // Diagnosed and confirmed separately: most of the visible empty brown
    // area below the cards is actually CoffeeStory's own top padding
    // bleeding through, since it shares this exact bg-atmosphere color —
    // left untouched on purpose (out of scope for this pass), so this
    // section's own spacing is now as tight as it gets without touching
    // that sibling section.
    // id="heritage" — purely a scroll anchor target for the Navbar's
    // "Our Heritage" link (see Navbar.jsx); no visual/behavioral change
    // to this section itself.
    // scroll-mt-[4.5rem] was tried here per an earlier follow-up ("fix
    // sticky navbar overlap"), on the assumption that Lenis's own -72px
    // click-path offset works purely via getBoundingClientRect and
    // wouldn't stack with it — wrong: confirmed the hard way (clicking
    // "Our Heritage" was landing 144px down, not 72px, visibly leaving
    // part of the previous section's own content poking in at the top).
    // Removed again per that follow-up ("that page need to perfect...
    // previous disturb"); ScrollToTop.jsx separately attempts to handle
    // the hard-reload/direct-link case (its own explicit offset
    // calculation, not CSS scroll-margin), but that is NOT yet fully
    // working end-to-end (still confirmed landing at scrollY 0 in
    // testing) — a real, still-open gap, not something this line was
    // covering for. Left as its own separate follow-up rather than
    // reintroducing this specific fix, since this exact value is what
    // caused the click-path regression above.
    // min-h-[calc(100svh-4.5rem)]/lg:min-h-[calc(100vh-4.5rem)] (new) —
    // per follow-up ("fully cover the page"), matches Hero.jsx's own
    // exact pattern for a true full-screen section: 100% of the viewport
    // height minus the fixed navbar's 72px (svh on mobile sidesteps
    // mobile browser chrome resizing the viewport mid-scroll; vh on
    // desktop/lg, same split Hero uses). flex + justify-center vertically
    // centers the heading/subtitle/cards within that full height, so the
    // section always fills the whole screen regardless of content height
    // — this also resolves the earlier "Coffee Story bleeds into the same
    // screen" issue without needing to touch Coffee Story at all: nothing
    // below Heritage is visible until the user actually scrolls past it.
    // pb-10/lg:pb-12 -> pb-8/lg:pb-8 — per final-polish follow-up, trimmed
    // a touch further now that the section is vertically centered via
    // flex (that centering does most of the "balanced" work already;
    // this padding was adding a bit more weight below than above).
    // A full-section background (first a video, then a static image) was
    // tried here per two follow-ups and then explicitly reverted per a
    // third ("or image also not needed") — now restored per a later,
    // explicit follow-up ("add background image holistically... new.png"),
    // this time as a plain CSS background-image (no BackgroundVideo/
    // BackgroundImage component involved, same lean technique
    // OurStoryHero.jsx already uses for its own photo) rather than
    // reintroducing either of the earlier components.
    // relative overflow-hidden — required for the absolutely-positioned
    // background layer below to stay scoped to this section and not
    // spill past its edges.
    // border-b border-cream-50/10 (new) — per follow-up ("each every
    // section end give line"), same thin warm hairline added to every
    // Home section's bottom edge (see Hero.jsx's own comment for the
    // full rationale) — marks the end of this section/start of Our Story.
    <section
      id="heritage"
      className="bg-atmosphere border-cream-50/10 relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center overflow-hidden border-b pt-6 pb-8 lg:min-h-[calc(100vh-4.5rem)] lg:pt-6 lg:pb-8"
    >
      {/* The background photo itself — inset-0, behind everything else in
          the section (plain DOM order puts the Container after it, so it
          paints on top with no z-index needed). A background-image (not
          an <img>) renders nothing at all if the source ever 404s (the
          current 0-byte placeholder), which is exactly right for a
          section backdrop — bg-atmosphere's own warm gradient is already
          the correct fallback underneath it either way.
          brightness(0.55) -> 0.47 (~15% further) + a very slight
          blur(2px) — per follow-up ("10-15% darker or blur it very
          slightly... the goal is Kanyakumari heading -> cards ->
          background, not background+cards competing"). Both together,
          not just one, since the ask was for detail specifically at the
          bottom to recede — dimming alone leaves fine detail contrast
          intact, the small blur is what actually softens it so the
          photo reads as atmosphere behind the cards rather than a sharp
          competing image. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${heritageBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.47) blur(2px)',
        }}
      />
      {/* Warm overlay on top of the photo — same espresso-toned family
          (rgb(27 18 12), matches --color-coffee-black) the rest of the
          site's own overlays use, not a neutral black scrim. Present
          across the whole section so the cream cards/light text on top
          stay exactly as legible as they were on the flat bg-atmosphere
          background, regardless of what the photo underneath looks like.
          0.65 -> 0.72 opacity — deepened alongside the brightness/blur
          cut above, per the same follow-up. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[rgb(27_18_12_/_0.72)]" />

      <Container className="relative z-10">
        {/* One shared stagger sequence for the eyebrow, the heading, the
            supporting line, AND the three cards — each fades in one after
            another. staggerContainer(0.12) — a ~100-150ms gap between
            each step. */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp}>
            <Kicker>Our Heritage</Kicker>
          </motion.div>

          {/* Main heading — one line only now (was two, "Born in
              Kanyakumari." + "Built to be shared.") per follow-up: this
              section is scoped strictly to "where we're from," and the
              second line read as edging into the founder-story territory
              that belongs in the separate "Our Story" section instead —
              see HERITAGE_SUPPORTING below for where that "for everyone"
              idea moved to.
              No more uppercase (was uppercase) — per follow-up ("do not
              make everything uppercase"), back to natural case matching
              every other h2 on the site (CoffeeStory, TableStory, ...).
              text-2xl/3xl/4xl kept from the last size-reduction pass.
              variants={staggerContainer(0.028)} (was fadeUp) — per
              follow-up ("typewriter animation mixed with fade out"), the
              heading no longer animates its own opacity/position; it
              relays the outer stagger's "visible" trigger straight into
              TypewriterFade's per-character stagger instead. See
              TypewriterFade above for the full rationale. */}
          <motion.h2
            variants={staggerContainer(0.028)}
            className="mt-2 max-w-xl text-2xl leading-tight sm:text-3xl lg:text-4xl"
          >
            <TypewriterFade text={HERITAGE_HEADING} />
          </motion.h2>

          {/* Supporting line — new per follow-up, carries the "shared
              with everyone" idea that used to be the heading's own
              second line. Smaller/softer than the heading (text-ink-muted,
              not the full-strength text-ink the h2 reads in), sitting
              close enough beneath it (mt-2) to read as one thought,
              per follow-up.
              variants={staggerContainer(0.02)} (was fadeUp) — same
              typewriter-fade treatment as the heading above, just a
              touch faster per character (0.02 vs 0.028) since this
              sentence is roughly twice as long — keeps its own total
              type-in time from dragging out disproportionately. */}
          <motion.p
            variants={staggerContainer(0.02)}
            className="text-ink-muted mt-2 max-w-md text-base sm:text-lg"
          >
            <TypewriterFade text={HERITAGE_SUPPORTING} />
          </motion.p>

          {/* sm:grid-cols-2 lg:grid-cols-3 — mobile stays single-column
              (cards may stack and scroll naturally — the one-viewport
              rule is a desktop/laptop target, not forced on mobile),
              tablet gets an intelligently stacked 2-column layout (third
              card wraps to its own row), desktop gets the full 3-column
              editorial layout.
              mt-6 -> mt-7 -> mt-10 — per follow-up ("move the cards
              down"), subtitle-to-cards nudged again, +12px this time,
              28px -> 40px. */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HERITAGE_CARDS.map((card) => (
              <HeritageCard key={card.heading} {...card} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

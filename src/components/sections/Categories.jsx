import { motion } from 'framer-motion'
import * as ReactFastMarquee from 'react-fast-marquee'
import { Container } from '@components/ui/Container'
import { LazyImage } from '@components/common/LazyImage'
import { CATEGORIES } from '@data/categories'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { fadeUp, viewportOnce } from '@animations/variants'
import { cn } from '@utils/cn'
import { COFFEE_BEAN_TEXTURE } from '@utils/coffeeBeanTexture'

// react-fast-marquee ships a CJS build (`export default require_dist()`)
// that Vite's dev dependency optimizer doesn't unwrap correctly — `import
// Marquee from 'react-fast-marquee'` resolves to the whole exports object
// ({ default, __esModule }) instead of the component, which throws
// "Element type is invalid". Unwrap defensively so this works whether or
// not the bundler already did it (dev vs. production build differ here).
const Marquee = ReactFastMarquee.default?.default ?? ReactFastMarquee.default

function CategoryPill({ label, description, image, fixedWidth }) {
  return (
    // The photo is now the whole box's background, not a small side
    // thumbnail — image fills the card (absolute inset-0), a dark gradient
    // scrim sits above it for text legibility, and the label/description
    // are overlaid at the bottom. Text is light (ivory) now, not dark
    // espresso, since it reads against a photo + scrim instead of the flat
    // ivory surface.
    //
    // hideOnError (not the default ImagePlaceholder fallback) — this card
    // already renders its own label/description as an overlay, so the
    // fallback's own icon+label would double up with it (the exact "Wraps /
    // Wraps" duplication that showed up before). On error it just renders
    // an empty absolutely-positioned box instead, and bg-[#3c2517] on the
    // card itself (a dark roasted-coffee tone, not ivory) shows through —
    // the light overlay text stays legible either way, photo or no photo.
    //
    // h-36/w-64 (up from h-28/w-56) — bigger cards, a background photo
    // reads more like an actual photo the larger it is.
    //
    // No margin between marquee items now (was mx-1.5) — that gap exposed
    // the wrapper's own ivory background as a visible light seam between
    // each dark card; flush cards (their own border is enough separation)
    // cover that "white space" entirely instead.
    //
    // Border rgba(244,232,216,0.16) (light warm-cream hairline) ->
    // rgba(0,0,0,0.35) (black) per follow-up — was previously softened to
    // cream specifically to avoid the earlier dark rgba(36,21,14,0.18)
    // reading as a harsh outline against a bright photo; swapped back to
    // a dark edge (now literal black, not the old warm-brown dark) at a
    // bit more opacity (0.35, was 0.18) so it still reads clearly as a
    // deliberate border rather than getting lost against the card's own
    // dark corners.
    // (A glassmorphism treatment — frosted blur label strip, lighter
    // border/scrim — was tried here across a few follow-ups and then
    // reverted per "last 3 prompts are wrong so restore my category";
    // back to this original scrim+border approach.)
    // hover:scale-[1.03] + hover:shadow-xl (new) — with pauseOnHover
    // already stopping the marquee, a scale/lift on the card someone's
    // hovering gives immediate tactile confirmation of *which* card is
    // about to be clicked, on top of just "the strip stopped moving."
    // ease-luxury/duration-base (same transition tokens already used for
    // the label's own hover shift below) keeps both motions feeling like
    // one coordinated response instead of two different speeds.
    // hover:z-20 so the (slightly) enlarged card overlaps its neighbors
    // instead of tucking underneath them.
    <div
      className={cn(
        'group/cat ease-luxury relative isolate flex h-36 flex-col justify-end overflow-hidden border border-[rgba(0,0,0,0.35)] bg-[#3c2517] p-4 text-left transition-transform duration-[var(--duration-base)] hover:z-20 hover:scale-[1.03] hover:shadow-xl',
        fixedWidth ? 'w-64 shrink-0' : 'w-full',
      )}
    >
      <LazyImage src={image} alt={label} hideOnError className="absolute inset-0 size-full" />
      {/* via-black/35 (was /25) — a little more scrim strength through the
          card's midsection, so the label/description stay legible even
          against the busiest, brightest part of a given photo, not just
          its bottom edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
      />
      <div className="ease-luxury relative z-10 transition-transform duration-[var(--duration-base)] group-hover/cat:-translate-y-0.5">
        {/* tracking-wide -> tracking-tight — sitewide typography pass:
            card titles read as "slightly tight" per spec (a punchier,
            more compact uppercase mark for short single words like
            "COFFEE"/"BURGERS"), the opposite direction from the wide-
            tracked eyebrows (tracking-luxury) elsewhere — that contrast is
            deliberate, not an inconsistency: eyebrows lead in quietly,
            card titles need to read fast while scanning a moving strip. */}
        <p className="font-sans text-sm font-semibold tracking-tight text-[#f3e7d2] uppercase transition-colors duration-[var(--duration-base)] group-hover/cat:text-[#e0bd93]">
          {label}
        </p>
        <p className="mt-1 line-clamp-1 text-xs text-[rgba(243,231,210,0.75)]">{description}</p>
      </div>
    </div>
  )
}

/**
 * Homepage category bar — a continuously scrolling marquee (react-fast-
 * marquee, already a project dependency) rather than a static grid, so it
 * reads as an always-moving strip of the menu. `pauseOnHover` lets someone
 * actually stop and read a card; `autoFill` repeats CATEGORIES enough times
 * to fill the container so the loop never shows a gap.
 *
 * Falls back to the original static grid under prefers-reduced-motion — an
 * auto-scrolling strip is exactly the kind of motion that preference exists
 * to turn off (same pattern as SmoothScrollProvider/SteamEffect). Per-item
 * stagger doesn't make sense once items repeat via autoFill, so the whole
 * bar gets one scroll-triggered fadeUp instead.
 *
 * (A recurring per-card text loop — fade/slide the label+description in,
 * hold, fade out, repeat — was tried here and removed per follow-up.
 * CategoryPill's text is plain, static markup again; the marquee's own
 * horizontal scroll is the only motion on the strip now.)
 */
export function Categories() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    // Now rendered *inside* Hero.jsx (a normal in-flow child near the
    // bottom of its video, under the CTA buttons), not as a separate
    // top-level section here — see Hero.jsx for why (nesting it inside
    // Hero's own flex column means Hero's content block centers itself
    // around the rail's real height instead of guessing, and Heritage
    // starts flush after Hero with no leftover gap). This component itself
    // is unchanged either way — same padding, same everything, just called
    // from a different parent now.
    <section className="pt-0 pb-2 sm:pb-4">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          // Warm ivory, matching the Navbar exactly (#F3E7D2) instead of
          // the previous dark roasted-coffee gradient — same "premium menu
          // card" surface repeated lower on the page. No glow, no
          // glassmorphism — flat solid fill and a single subtle border.
          // No rounding on the wrapper (was rounded-lg) — the cards inside
          // are flush, square-cornered rectangles now, so a rounded
          // wrapper exposed a curved sliver of the ivory background at
          // each end of the strip instead of the cards reaching cleanly
          // into the corners.
          className="relative overflow-hidden border border-[rgba(36,21,14,0.10)] bg-[#f3e7d2]"
        >
          {/* Same bean-texture tile as the Navbar, continuous across the
              whole strip (not per-card, see CategoryPill) so the pattern
              doesn't seam at card edges. ~2-3% visual prominence — noticed
              only on close inspection. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: COFFEE_BEAN_TEXTURE, backgroundRepeat: 'repeat' }}
          />

          {prefersReducedMotion ? (
            <ul className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 lg:grid-cols-6">
              {CATEGORIES.map((category) => (
                <li key={category.label}>
                  <CategoryPill {...category} />
                </li>
              ))}
            </ul>
          ) : (
            // gradient={false} — tried gradient with the wrapper's own
            // ivory color to soften the edge clip (first at 56px, then
            // 28px), but against the dark photo cards it read as a bright
            // "white glow" at both corners either way, not a quiet fade.
            // Off entirely per follow-up — a card sliding off-frame at a
            // hard edge reads as normal marquee behavior; a glow read as a
            // lighting artifact.
            <Marquee autoFill pauseOnHover speed={32} gradient={false}>
              {CATEGORIES.map((category) => (
                <CategoryPill key={category.label} {...category} fixedWidth />
              ))}
            </Marquee>
          )}
        </motion.div>
      </Container>
    </section>
  )
}

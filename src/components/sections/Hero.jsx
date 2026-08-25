import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { BackgroundVideo } from '@components/common/BackgroundVideo'
import { Categories } from './Categories'
import { ROUTES } from '@constants/routes'
import { fadeUp, staggerContainer } from '@animations/variants'
import { videoCoffeePour } from '@assets'

/**
 * A custom capital N for the "Vainav's" wordmark, replacing the earlier
 * CompactCapitalN — per urgent follow-up, that upright/small-hook design
 * (built to an earlier reference photo) read as too plain; this one is
 * built specifically to resemble Brittany Signature's own capital N: a
 * long sweeping entry from the lower-left, a tall rising first stroke, a
 * narrow diagonal sweeping down through the middle, and a long rising
 * finishing stroke tapering to a fine point at the upper-right — one
 * continuous-looking calligraphic movement, not three separate strokes
 * bolted together.
 *
 * This is a FILLED outline (a real tapered letterform shape), not a
 * uniform-width stroked line like the previous version — genuine
 * calligraphy is thick where the pen presses down and thin on its
 * connecting movements, and a single constant stroke-width can't produce
 * that. The path was generated (not hand-typed) by a small script that
 * samples a centerline of cubic-bezier segments, walks a width value
 * along it (thick at the entry/first-stroke/final-stroke, narrow through
 * the diagonal, tapering to a point at the very tip), and offsets left/
 * right of the centerline by half that width at each sample to build the
 * two edges of the outline — the standard technique for constructing a
 * calligraphic letterform, just computed instead of eyeballed, so the
 * taper is genuinely smooth with no lumps at direction changes. (The
 * generating script isn't part of the app; only its output — this path
 * — is committed.)
 * `fill="currentColor"` inherits text-accent, same copper/gold as every
 * other letter — no new color introduced. h-[0.78em] (unchanged) keeps
 * its rendered height in line with the surrounding script text; the
 * path's own proportions (a tall cap-height reach at top, a small
 * below-baseline entry swash) are what give it its capital-letter scale
 * without this className needing to change. Being a filled vector path
 * (not a raster image), it stays sharp at any size, including 4K.
 */
function SignatureCapitalN(props) {
  return (
    <svg
      viewBox="-10 -15 115 165"
      className="inline-block h-[0.78em] w-auto align-baseline"
      style={{ transform: 'translateY(0.08em)' }}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M15.37,144.83 L14.05,143.28 L13,141.56 L12.13,139.58 L11.44,137.39 L10.94,135 L10.62,132.45 L10.49,129.76 L10.52,126.96 L10.73,124.07 L11.09,121.13 L11.61,118.14 L12.26,115.14 L13.06,112.15 L13.98,109.18 L15.03,106.26 L16.25,103.29 L17.41,100.4 L18.55,97.13 L19.65,93.57 L20.72,89.71 L21.76,85.54 L22.78,81.05 L23.76,76.24 L24.71,71.11 L25.62,65.66 L26.49,59.89 L27.32,53.79 L28.1,47.37 L28.83,40.62 L29.52,33.54 L30.15,26.14 L30.71,18.7 L30.95,18.3 L31.37,17.24 L31.73,16.48 L31.98,16.01 L32.07,15.79 L31.95,15.73 L31.67,15.71 L31.38,15.63 L31.25,15.49 L31.41,15.43 L31.84,15.55 L32.49,15.92 L33.29,16.59 L34.19,17.54 L35.15,18.79 L36.15,20.33 L38.36,24.04 L40.59,27.84 L42.83,31.72 L45.07,35.67 L47.31,39.69 L49.54,43.79 L51.75,47.96 L53.94,52.21 L56.1,56.53 L58.22,60.93 L60.29,65.4 L62.3,69.94 L64.24,74.56 L66.12,79.25 L67.92,84 L69.65,88.86 L70.45,90.8 L71.22,92.58 L72.01,94.27 L72.82,95.85 L73.66,97.33 L74.53,98.69 L75.45,99.94 L76.45,101.06 L77.54,102.03 L78.74,102.85 L80.08,103.45 L81.53,103.79 L83.05,103.82 L84.56,103.54 L86.03,102.97 L87.87,101.8 L89.52,99.49 L90.83,96.83 L91.96,93.73 L92.95,90.23 L93.82,86.33 L94.56,82.08 L95.18,77.52 L95.67,72.67 L96.03,67.59 L96.25,62.33 L96.33,56.92 L96.26,51.42 L96.04,45.86 L95.67,40.3 L95.14,34.79 L94.46,29.44 L94.03,26.1 L93.46,22.8 L92.78,19.6 L91.98,16.52 L91.07,13.55 L90.05,10.71 L88.95,7.99 L87.76,5.41 L86.51,2.97 L85.2,0.65 L83.84,-1.52 L82.45,-3.57 L81.03,-5.48 L79.57,-7.28 L78.09,-8.97 L76.59,-10.54 L75.41,-9.46 L76.82,-7.89 L78.06,-6.16 L79.16,-4.28 L80.11,-2.25 L80.93,-0.09 L81.64,2.2 L82.23,4.59 L82.74,7.09 L83.17,9.69 L83.55,12.38 L83.89,15.17 L84.21,18.05 L84.52,21.02 L84.84,24.09 L85.17,27.24 L85.54,30.56 L86.24,35.84 L86.86,41.13 L87.39,46.48 L87.83,51.83 L88.18,57.14 L88.42,62.36 L88.56,67.44 L88.58,72.33 L88.47,76.98 L88.23,81.35 L87.85,85.39 L87.33,89.02 L86.66,92.2 L85.86,94.86 L84.96,96.92 L84.13,98.2 L83.77,98.29 L83.12,98.55 L82.6,98.65 L82.15,98.65 L81.72,98.56 L81.23,98.35 L80.67,97.99 L80.05,97.44 L79.38,96.71 L78.68,95.8 L77.97,94.71 L77.24,93.46 L76.51,92.06 L75.78,90.52 L75.05,88.85 L74.35,87.14 L72.66,82.3 L70.95,77.45 L69.22,72.64 L67.48,67.87 L65.73,63.15 L63.95,58.47 L62.15,53.85 L60.31,49.29 L58.43,44.8 L56.51,40.38 L54.55,36.03 L52.53,31.77 L50.45,27.6 L48.31,23.52 L46.12,19.55 L43.85,15.67 L42.6,13.7 L41.32,11.89 L40,10.27 L38.6,8.83 L37.09,7.56 L35.41,6.51 L33.5,5.74 L31.38,5.38 L29.15,5.52 L27.01,6.21 L25.13,7.32 L23.55,8.74 L22.24,10.38 L21.15,12.2 L20.24,14.19 L19.29,17.3 L18.72,25.28 L18.22,32.65 L17.75,39.68 L17.31,46.38 L16.87,52.76 L16.44,58.8 L16,64.51 L15.54,69.89 L15.05,74.93 L14.51,79.64 L13.91,84.01 L13.25,88.04 L12.51,91.72 L11.68,95.05 L10.78,98.02 L9.75,100.71 L8.51,103.83 L7.43,107.13 L6.56,110.48 L5.89,113.86 L5.43,117.22 L5.17,120.56 L5.1,123.84 L5.23,127.04 L5.53,130.14 L6.02,133.12 L6.69,135.95 L7.53,138.61 L8.55,141.1 L9.75,143.38 L11.14,145.45 L12.63,147.17 Z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * Typography-first hero, now with a cinematic background video behind it
 * (was flat matte espresso-950 with no imagery) — `videoCoffeePour` via
 * `BackgroundVideo`, which already handles the espresso-toned overlay
 * scrim (for text legibility), skips the video under prefers-reduced-
 * motion, and silently no-ops if the source is ever an empty placeholder
 * again — nothing here needs to change either way.
 */
export function Hero() {
  return (
    // min-h fills the full viewport below the fixed navbar (calc(100svh/
    // 100vh - navbar height)) — the video covers the entire first screen
    // with no leftover gap.
    //
    // flex-col with NO justify-center here (moved down a level, see below)
    // — the section itself is just a column stack of [content, rail]. The
    // content block below is `flex-1` and centers *itself* within
    // whatever space is left over once the rail (a normal in-flow child
    // now, not an absolute-positioned guess) has claimed its own height.
    // That's what fixes the old top/bottom imbalance: previously the rail
    // was pinned to a hardcoded `bottom-*` offset while the content was
    // centered against the *full* section height as if the rail didn't
    // exist, which read as a huge dead-air gap above the kicker and a
    // near-zero one below the rail. Flex flow now does that math instead
    // of hand-picked pixel values, so top/bottom breathing room stays
    // proportionate at any viewport height.
    // border-b border-cream-50/10 (new) — per follow-up ("each every
    // section end give line"), a thin warm hairline marking where this
    // section ends and Heritage begins, same border color/opacity token
    // already used elsewhere on the site (Footer's own copyright-row
    // divider, LocationCard's card border) — not a new visual language,
    // just applied here too. Same addition on Heritage.jsx/
    // OurStoryHero.jsx/SignatureMenu.jsx, so every Home section boundary
    // now reads the same way.
    // min-h shortened by 2.5rem on mobile only (new) — per follow-up
    // ("hero content sits too low, category cards start too low, feel
    // tighter"). Since the rail (Categories) is a normal in-flow child
    // sitting right at this section's own bottom edge, and that edge is
    // pinned to fill the full viewport height, the rail's on-screen
    // position was really being set by this min-h value, not by its own
    // padding — shortening it is what actually lifts the whole first-
    // screen composition (content + rail together) up a bit, rather
    // than just nudging content around independently inside an
    // unchanged-height box. sm:min-h-[calc(100svh-4.5rem)] restores the
    // exact original full-viewport value from `sm` (640px) up — tablet
    // is completely untouched; lg's own dvh/vh swap right after it is
    // also untouched.
    <section className="bg-espresso-950 border-cream-50/10 relative flex min-h-[calc(100svh-4.5rem-2.5rem)] flex-col overflow-hidden border-b sm:min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100vh-4.5rem)]">
      {/* preload="auto" (BackgroundVideo defaults to "none") — this is a
          real video, not one of the project's usual empty placeholders, so
          it actually needs the browser to fetch and buffer it instead of
          sitting paused at metadata-only.

          PREMIUM COLOR GRADE (was brightness-95 flat, no highlight control):
          brightness-[0.85] — a further ~10-15% pull-back below neutral (on
          top of the already-reduced 95%) so the base exposure reads as
          "cinematic café film" rather than "brightly exposed phone
          recording." contrast-[1.1] adds punch/richness — deeper shadows,
          without crushing them. No saturate() added — "keep natural, do
          NOT oversaturate" per spec; warmth instead comes entirely from
          the overlay's brown tint, not from pushing color saturation.

          Highlight control (the video's brightest moments have pale glowing
          archways/walls that a uniform brightness/contrast filter can't
          target on their own — it hits everything equally, mids and
          shadows included) is mostly the overlay's job below: it no longer
          fades all the way to fully transparent at its outer edge (was
          rgb(94_48_35_/_0) — meant every corner/edge of frame, exactly
          where the bright surfaces tend to sit, had ZERO tinting). Now it
          has a nonzero warm-brown floor (0.20) everywhere, a stronger
          mid-ring (0.30), rising to its strongest (0.42) directly behind
          the headline for extra text protection — and the ellipse itself
          is a little wider (50%/60%, was 45%/55%) so that stronger
          coverage reaches the side archways too, not just the dead center.
          Still Brownie-toned (rgb(94 48 35), never neutral black) — a warm
          dark-brown wash, not a black vignette.

          opacity-90 (new) — the video itself is now let through at 90%
          instead of fully opaque, so the section's own bg-espresso-950
          (dark, near-black brown) shows through faintly underneath it.
          That's a further, gentler pass at the same "too bright" problem —
          it dims and desaturates the whole frame slightly toward the
          page's own dark base color rather than pushing brightness/
          contrast further (which would start crushing shadow detail
          instead of just calming it down).

          brightness-[0.85] -> brightness-[0.8] -> brightness-[0.7] — two
          more small trims on top of opacity-90, per follow-up ("reduce
          little bit brightness also", later "reduce the background video
          brightness"). Kept as its own incremental step each time rather
          than one bigger jump, since opacity-90 is already doing part of
          the dimming work; contrast/overlay untouched. */}
      {/* Two stacked background-image layers (comma-separated in one bg-[]
          — CSS paints the first-listed layer on top): the radial ellipse
          stays as the primary, precisely-centered text guard; a new
          linear top-to-bottom wash sits underneath it as a "regardless of
          which frame is playing" baseline, so legibility doesn't depend
          entirely on the one radial hot-spot. Stop values are tuned to
          *this* layout, not copied as literal percentages from a generic
          spec — the headline sits roughly mid-height here (no more top-
          anchored kicker), and the category rail sits at the very bottom,
          so: 0.50 at the top (moderate — behind mostly-empty video before
          the headline), 0.32 at 45% (kept lighter — the radial already
          does the heavy lifting exactly where the headline sits, so
          stacking two strong darkenings there would start looking muddy),
          0.68 at 100% (strongest — extra grounding right above the
          category rail). Same warm dark-brown family as everything else
          (rgb(20 10 8) here — closer to near-black for a firmer base
          layer — vs. the radial's rgb(94 48 35) brown; both read as
          "warm dark," not neutral black, when layered together). */}
      {/* Overlay stops bumped ~7-9% relative (0.42/0.30/0.20 -> 0.46/0.33/0.22
          on the radial; 0.50/0.32/0.68 -> 0.54/0.35/0.73 on the linear) per
          follow-up — the background photo/lighting detail was reading as
          slightly distracting/competing with the hero text. Same two-layer
          shape, same warm dark-brown family, same hottest point behind the
          headline — just each stop a touch darker/softer than before, not a
          structural change. videoClassName's own brightness/contrast are
          untouched; only the overlay moved.
          (A further darkening pass was tried on top of this during the
          burgundy-accent experiment, to help that red wordmark read
          against the background — reverted back to these values per "HARD
          RESTORE MODE," now that the wordmark itself is back to the
          original orange/Caramel, which never needed the extra help.) */}
      <BackgroundVideo
        src={videoCoffeePour}
        preload="auto"
        videoClassName="opacity-90 brightness-[0.7] contrast-[1.1]"
        overlayClassName="bg-[radial-gradient(ellipse_50%_60%_at_50%_42%,rgb(94_48_35_/_0.46)_0%,rgb(94_48_35_/_0.33)_55%,rgb(94_48_35_/_0.22)_100%),linear-gradient(180deg,rgb(20_10_8_/_0.54)_0%,rgb(20_10_8_/_0.35)_45%,rgb(20_10_8_/_0.73)_100%)]"
      />

      {/* flex-1 + justify-center: centers the kicker/heading/buttons in
          the space above the rail (not the full section height), with a
          small py floor so on very short viewports content never presses
          flush against the navbar or the rail.
          -translate-y-5 -> translate-y-8 per follow-up — a prior pass had
          nudged this -20px up ("too high" was flagged in the opposite
          direction back then); now flagged as sitting too high again, so
          this moves it to +32px (2rem) down from the untranslated centered
          baseline — a net ~52px downward shift from where it was sitting
          (-20px -> +32px), inside the requested ~45-60px range. Still a
          transform, not a padding/margin change, so it's a pure visual
          nudge that doesn't touch the flex-centering math above, the rail
          below, or any element's spacing relative to its neighbors.
          translate-y-3 sm:translate-y-8 + py-4 sm:py-6 (new) — mobile-only
          follow-up ("hero content sits too low... reduce the gap under
          the navbar"). translate-y-3 trims that downward shift to +12px
          on phones (was +32px everywhere) — content, headline and both
          buttons sit visibly higher without touching the transform's own
          +32px value at `sm` (640px) and up, so tablet/desktop keep the
          exact centered position described above. py-4 (was py-6, no
          previous sm: override) shaves a little off the same short-
          viewport floor mentioned above, for the same "gap under the
          navbar" ask. sm:py-6 restores tablet's original floor exactly;
          lg:py-8 (desktop) is untouched either way. */}
      <div className="relative z-10 flex flex-1 translate-y-3 flex-col items-center justify-center px-4 py-4 text-center sm:translate-y-8 sm:py-6 lg:py-8">
        <Container className="flex flex-col items-center">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Localized text-protection wash — sits behind the headline
                only (not the buttons, which already have their own solid
                pill fills and don't need it). A soft radial gradient, not
                a rectangle, so it has no hard edge to read as a "box";
                fades to fully transparent well before the frame edges, so
                the architecture/lighting around it stays untouched — this
                is deliberately tighter and subtler than BackgroundVideo's
                own overlay above (that one already does the heavy lifting
                site-wide; this is just a little extra insurance directly
                behind the headline, where legibility matters most). -z-10
                (needs the wrapper below to be `relative`) so it paints
                behind the non-positioned text instead of on top of it.
                Pure decoration — pointer-events-none, aria-hidden,
                absolutely positioned, so it can't affect spacing/layout of
                anything around it. */}
            <div className="relative flex flex-col items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 bg-[radial-gradient(ellipse_65%_75%_at_50%_50%,rgb(30_16_10_/_0.30)_0%,rgb(30_16_10_/_0.14)_55%,rgb(30_16_10_/_0)_100%)] sm:-inset-x-16 sm:-inset-y-8 lg:-inset-x-24 lg:-inset-y-10"
              />

              {/* Typography hierarchy pass — three tiers, tuned so each one
                  reads as a distinct step rather than two same-weight
                  headlines plus a stray signature:

                  1. "You'll Love Spending Time Here." (was "Time Tastes
                     Better At", then briefly "Come. Sit With Us.", "Good
                     Things Start Here.", "A Break Can Do Wonders.",
                     "Welcome To Your Happy Place.", "The Extra Hours
                     You'll Love Spending Here" — that last one needed a
                     hard <br/> to avoid feeling too long as one line; this
                     one's short enough to drop back to a single line) —
                     copy swapped per follow-up, styling untouched.
                     SECONDARY EYEBROW. Dropped
                     from text-lg/2xl/4xl (was nearly headline-scale, a
                     leftover from before it took over the old Kicker's
                     lead-in role) down to text-sm/base/lg — genuinely
                     eyebrow-sized now. font-medium (was font-normal) +
                     the site's shared `tracking-luxury` token (0.22em, see
                     theme.css — the same value every other eyebrow/kicker
                     uses, e.g. Kicker.jsx's `.text-kicker`; was a bespoke
                     tracking-[0.25em]/[0.3em] pair here only) reads as a
                     deliberate, restrained lead-in — "not too wide" — and
                     keeps every eyebrow site-wide sharing one tracking
                     value instead of scattering slightly-different ones
                     per component. Still Montserrat (h1's own font-serif
                     default — no font-family override needed here, this
                     already was the "clean modern sans-serif").

                  2. "Vainav's." — PRIMARY WORDMARK. Sized up from
                     text-6xl/7xl/8xl to text-7xl/8xl/9xl so it's
                     unambiguously the dominant element on the screen, not
                     just the biggest of two similar lines. leading-[1.05]
                     added directly on this span (was inheriting the h1's
                     leading-[0.95]) — a script face's loops/descenders
                     need a touch more room than tight uppercase-sans
                     leading gives, or the ascender of "V" and the tail of
                     the apostrophe start crowding the eyebrow above/
                     signature below at this larger size. mt bumped a
                     half-step (mt-3/4/5, was mt-2/3/4) so the extra size
                     doesn't close the gap back down to where it started.

                  Both still text-accent/text-cream-50 — no new colors,
                  same Caramel/cream tokens as before.

                  "Vainav's." font-hero-display -> font-script per
                  follow-up ("restore 1st font style") — back to the
                  original handwritten/script face (Great Vibes), same as
                  the logo and CoffeeStory's "It's shared.". This heading
                  went through several other display serifs chasing
                  "premium but not handwritten" (Bodoni Moda italic ->
                  Cormorant Garamond -> Fraunces -> Young Serif, each
                  swapped out per its own follow-up), then landed back on
                  the very first treatment. tracking-tight (added partway
                  through that chain, not part of the original) dropped
                  too — normal-case is the only non-default text style
                  this span carries now. --font-hero-display itself is
                  gone (see theme.css/fonts.css) — nothing references it
                  anymore.
                  text-6xl/7xl/8xl -> text-7xl/8xl/9xl (one step back up at
                  each breakpoint — undoes the previous "slightly reduce
                  its width" pass) — that reduction ended up reading as too
                  small relative to the rest of the Hero; this restores
                  Tailwind's next size step up (a 20% jump at the base
                  tier, Tailwind's own 6xl->7xl ratio, landing inside the
                  requested "~15-20% larger" ask) without touching the font
                  itself. normal-case (still needed — cancels the parent
                  h1's uppercase transform so it reads "Vainav's." not
                  "VAINAV'S.") and position/color are untouched — same
                  leading-[1.05], mt-3/4/5, text-accent as before. No
                  underline, icon, or flourish added. --font-script itself
                  (Great Vibes) is untouched too — CoffeeStory's "It's
                  shared." accent still uses it; only this one heading uses
                  the new token. */}
              <motion.h1 variants={fadeUp} className="mt-4 leading-[0.95] uppercase">
                {/* Back to one line (no <br/>) — this copy is short enough
                    that the earlier "too long as one line" problem
                    doesn't apply here. */}
                <span className="tracking-luxury text-cream-50/90 block text-sm font-medium sm:text-base lg:text-lg">
                  You&apos;ll Love Spending Time Here.
                </span>

                {/* The decorative mark that lived here (brush-stroke,
                    coffee-ring stain, gradient line, diamond ticks,
                    coffee bean, triangles, hearts — in that order, each
                    replaced per follow-up) is gone. Per follow-up: it
                    read as a playful/casual clash against the elegant
                    warm-café tone everywhere else in Hero, added visual
                    noise right under the tagline without earning its
                    place, and (hearts specifically) carried an unwanted
                    "rating/favorite" implication. Clean spacing between
                    the eyebrow and "Vainav's." now does that job instead
                    of a divider glyph. */}

                {/* mt-3/4/5 -> mt-4/5/6 per follow-up — a little more
                    breathing room off the eyebrow above.
                    "VaiNav's" -> "Vainav's" (lowercase n) per follow-up
                    ("the n can small letter not caps") — supersedes the
                    earlier explicit "capital N" spec a few follow-ups
                    back. normal-case (still needed — cancels the parent
                    h1's uppercase) makes sure this exact mixed-case
                    string is what actually renders.
                    font-hero-brand (Kaushan Script) -> back to font-script
                    (Great Vibes) per follow-up ("restore the font
                    style") — the Kaushan Script swap is reverted;
                    --font-hero-brand itself, the Fontsource package, and
                    the fonts.css import are all removed too (see theme.
                    css/fonts.css/package.json), not just left as unused
                    dead weight.
                    Uses the shared text-accent token, same as buttons/
                    footer/menu tabs everywhere else on the site — this
                    span briefly carried its own dedicated burgundy value
                    (text-[#B92D3E]) during the deep-wine-red accent
                    experiment, reverted back to plain text-accent (the
                    original warm orange/Caramel) per "HARD RESTORE MODE."
                    */}
                {/* "Vainav's" -> "VaiNav's", capital N only — several
                    approaches tried across follow-ups: a different font
                    for just the N (DM Serif Display, "pasted in"), a
                    hand-traced custom SVG matching the logo ("a completely
                    different decorative character"), plain Great Vibes'
                    own built-in capital N at full size ("extremely
                    oversized"), then that same glyph scaled down — which
                    fixed the size but not the actual complaint: Great
                    Vibes' N is *structurally* a big curved swash reaching
                    far left, and no amount of scaling makes that "upright
                    and clean." Landed on CompactCapitalN — a from-scratch
                    compact path built strictly to a supplied reference
                    photo (small entrance hook, not a loop; mostly-
                    vertical strokes; small tail).
                    CompactCapitalN -> SignatureCapitalN (defined above,
                    urgent follow-up) — the "upright and clean" compact N
                    above, once fixed, was later called out as too plain/
                    generic; this follow-up asked for the opposite
                    direction specifically — a dramatic, sweeping
                    signature-script capital N (Brittany Signature was the
                    named style reference) that reads as "personally
                    handwritten," not the earlier restrained hook-and-
                    verticals shape. Same treatment either way: only this
                    one glyph changes, "Vai"/"av's" are completely
                    untouched plain text in this same font-script span. */}
                <span className="font-script text-accent mt-4 block text-7xl leading-[1.05] normal-case sm:mt-5 sm:text-8xl lg:mt-6 lg:text-9xl">
                  Vai
                  <SignatureCapitalN />
                  av&apos;s
                </span>
              </motion.h1>

              {/* 3. "Cafeteria" — BRAND DESCRIPTOR (tier 3 of the hierarchy
                  pass above). Was a second script rendering (SVG + ink-
                  wobble filter, Great Vibes) — dropped per follow-up: with
                  "Vainav's." already owning the handcrafted/script
                  identity, a second script line read as a redundant,
                  slightly-random signature rather than a distinct tier.
                  Now plain uppercase sans-serif text — deliberately the
                  opposite treatment from tier 2, so the three lines don't
                  blur into "two scripts + a sans" but read as a clean
                  three-step system: sans eyebrow (small, wide-tracked) /
                  script wordmark (large, the one handcrafted moment) /
                  sans descriptor (small, wide-tracked) bracketing it.
                  uppercase + the shared `tracking-showcase` token (0.35em,
                  see theme.css — a deliberately wider step than
                  `tracking-luxury`, reserved for this one "spelled-out"
                  brand-descriptor moment; was a bespoke tracking-[0.35em]/
                  [0.4em] pair here only) reads as letter-spaced
                  "C A F E T E R I A" (not literal space characters — CSS
                  tracking keeps it one selectable/readable word) +
                  font-medium is the same "premium plaque/letterhead"
                  language as tier 1's eyebrow, just quieter (smaller size,
                  lower opacity) since it's the closing line, not the lead-
                  in. text-cream-50/80 (was text-white on the old SVG) —
                  same cream token the eyebrow uses at a touch less
                  opacity, so the eyebrow and descriptor bracket the
                  Caramel wordmark in matching tone rather than each
                  introducing their own color. mt-3/4 keeps the "small but
                  intentional gap" directly under "Vainav's." — snug enough
                  to read as its descriptor, not floating.
                  No underline/icon/glow/shadow/ornament — text only.
                  Real text now (was aria-hidden SVG glyphs standing in for
                  a graphic) — left readable to assistive tech instead of
                  hidden, since "Cafeteria" is actual brand content, not a
                  decorative duplicate of text said elsewhere. */}
              <motion.p
                variants={fadeUp}
                className="tracking-showcase text-cream-50/80 mt-3 text-center text-xs font-medium uppercase sm:mt-4 sm:text-sm lg:text-base"
              >
                Cafeteria
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              {/* ArrowRight (was Heart, briefly) — the signature mark above
                  is the page's one brand-personality detail now, so the
                  hearts (an unrelated motif) came back out; buttons revert
                  to their original, semantically-fitting icons. */}
              <Button to={ROUTES.MENU} size="lg">
                Explore Menu
                <ArrowRight
                  className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              {/* Reserve a Table (was Our Story) — Our Story already has its
                  own link in the navbar, so pairing it with Explore Menu
                  here just split intent between two "browse" actions on a
                  cafeteria site. Reserve a Table is the actual second
                  high-intent action (Explore Menu → see the food, Reserve
                  a Table → come eat it), same as the navbar's own Order
                  Now button (also ROUTES.RESERVATIONS).
                  CalendarCheck (was Heart, briefly) — reverted for the same
                  reason as Explore Menu's icon above. */}
              <Button to={ROUTES.RESERVATIONS} variant="outlineInverse" size="lg">
                <CalendarCheck
                  className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
                Reserve a Table
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* Category rail, inside the video (still an overlay on Hero itself,
          not a separate section flowing after it — the video is Hero's
          own absolutely-positioned background, so anything in Hero's
          normal flow still reads as "inside" it) — sits under the CTA
          buttons, not the top under the navbar. Now a normal in-flow
          child (was absolute + hardcoded bottom-*), so its own height
          pushes the content block above to recenter around it instead of
          risking a hand-tuned offset drifting into overlap.
          pb-* -> py-* per follow-up — the rail read as a separate
          component sitting on top of the hero rather than part of the
          same composition; matching top padding to the existing bottom
          padding gives the buttons-to-rail gap real breathing room
          instead of the rail sitting flush against them.
          py-4 -> py-3 on mobile only (new) — per the same "move the
          category cards up" follow-up as the section's own shortened
          min-h above: a little less padding directly around the rail on
          phones, on top of the shorter section height doing most of the
          actual lifting. sm:py-6 lg:py-8 (already present) are untouched
          — tablet and desktop keep their exact original rail padding. */}
      <div className="relative z-20 py-3 sm:py-6 lg:py-8">
        <Categories />
      </div>
    </section>
  )
}

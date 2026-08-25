import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { BackgroundVideo } from '@components/common/BackgroundVideo'
import { Categories } from './Categories'
import { ROUTES } from '@constants/routes'
import { fadeUp, staggerContainer } from '@animations/variants'
import { videoCoffeePour } from '@assets'

/**
 * A custom capital N for the "Vainav's" wordmark. This is the third
 * version: the very first (CompactCapitalN) was upright but read as too
 * plain; a follow-up swapped it for a sweeping, tapered Brittany
 * Signature-style N with a large curling entry and a flourished tip —
 * which the very next follow-up called out as bending too far into the
 * surrounding script and no longer reading as a clear capital N. This
 * version is a deliberate middle ground, built strictly to that
 * feedback: UPRIGHT and STRAIGHT structure (a genuinely vertical left
 * stem, a genuinely vertical right stem — both hold one constant x the
 * entire way down, not just "roughly" vertical — connected by one clean
 * straight diagonal), with just a small handwritten flick at the entry
 * and exit so it still reads as signature/calligraphic rather than a
 * mechanical block letter. No loop, no hook, no curl, no swash anywhere
 * on the path.
 * Monoline — a single constant `strokeWidth`, not the previous version's
 * filled variable-width outline. Real tapered calligraphy is exactly
 * what the previous version got right and this follow-up explicitly
 * asked to move away from for this letter specifically ("clean monoline
 * calligraphic... capital N"), so this is a plain stroked path (like the
 * very first CompactCapitalN was) — simpler, and correct for what's
 * being asked this time.
 * `stroke="currentColor"` inherits text-accent, same copper/gold as
 * every other letter — no new color introduced. h-[0.78em] (unchanged)
 * keeps its rendered height in line with the surrounding script text —
 * same sizing convention as both earlier versions, so nothing about how
 * this scales across breakpoints needed to change, only the path/stroke
 * inside the same viewBox-relative box. Being a vector path (not a
 * raster image), it stays sharp at any size, including 4K, and — since
 * there's no responsive variant on this component at all, just one
 * fixed path scaled uniformly by the shared h-[0.78em]/w-auto sizing —
 * its proportions and character are identical at every breakpoint.
 */
function SignatureCapitalN(props) {
  return (
    <svg
      viewBox="0 0 90 130"
      className="inline-block h-[0.78em] w-auto align-baseline"
      style={{ transform: 'translateY(0.08em)' }}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M13,10 C15,15 18,19 20,24 L20,116 L80,20 L80,114 C82,116 85,118 89,119"
        fill="none"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
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
                    CompactCapitalN -> SignatureCapitalN, twice now
                    (defined above; see its own comment for the full
                    history). First swap: the "upright and clean" compact
                    N was called out as too plain, so it was replaced with
                    a dramatic, sweeping, tapered signature-script N
                    (Brittany Signature named as the style reference).
                    Second swap (this one, "final typography fix"): that
                    sweeping version was then called out as bending too
                    far into the surrounding script and no longer reading
                    as a clear capital N — so the current version dials
                    back to upright/straight stems and a clean diagonal
                    (monoline stroke again, not the sweeping version's
                    filled taper), while still keeping a small handwritten
                    flick at the entry/exit so it doesn't just become the
                    original plain compact N again. Same treatment every
                    time: only this one glyph changes, "Vai"/"av's" are
                    completely untouched plain text in this same
                    font-script span. */}
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
              {/* Reserve a Table -> Reservations Coming Soon -> Reservations
                  -> Our Story across three follow-ups. The reservations
                  route itself is gone now (removed entirely — the café
                  doesn't have seating capacity for online booking, and
                  rather than keep a permanent "coming soon" page around,
                  the page/route was deleted; see routes/AppRoutes.jsx and
                  constants/routes.js), so this second CTA needed a new,
                  real destination rather than another rewording of a page
                  that no longer exists. Our Story already has its own
                  entry point in the Navbar (a dedicated ScrollLink there),
                  but Hero didn't have a second on-page action pointing at
                  it before — same pairing logic as the original "Reserve a
                  Table" idea (Explore Menu → see the food, this → know the
                  place), just a different second action now that
                  reservations aren't a thing this site offers.
                  `${ROUTES.HOME}#our-story` — the same real anchor
                  NAV_LINKS/Footer's own "Our Story" entry already points
                  at (see constants/navigation.js's own comment for why
                  there's no standalone /our-story route to link to
                  instead). A plain <Link> (via Button's `to` prop) is
                  enough to land on it correctly — ScrollToTop.jsx already
                  handles any #hash on any route change, including a
                  hash-only change while already on Home, the same way it
                  already does for Footer's own hash links.
                  ArrowRight (was CalendarCheck, which no longer fits an
                  "Our Story" CTA) — reuses the exact same icon + hover-
                  nudge Explore Menu already uses, after the text instead
                  of before it, matching that button's own icon placement.
                  Same position/shape/border/hierarchy/hover as before —
                  variant stays outlineInverse, this site's own established
                  "clearly secondary, next to a solid-fill sibling"
                  treatment (see Button.jsx) — only the label, icon and
                  destination changed.
                  className="px-5" (new, was Button's own default lg px-7)
                  — per a follow-up asking Our Story to read as clearly
                  narrower/quieter than Explore Menu beside it, not just
                  differently colored. Only the horizontal padding is
                  overridden, on this one instance, via its own className
                  (Button.jsx's shared size="lg" styles are untouched, so
                  every other lg button on the site keeps its normal
                  px-7). Height (h-12, from size="lg"), text size, border
                  treatment, icon, alignment and hover/tap animation are
                  all completely unchanged — the shorter word "Our Story"
                  plus this tighter padding is the entire size difference,
                  nothing else about the button was touched. */}
              <Button
                to={`${ROUTES.HOME}#our-story`}
                variant="outlineInverse"
                size="lg"
                className="px-5"
              >
                Our Story
                <ArrowRight
                  className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
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

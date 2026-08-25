import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { Container } from '@components/ui/Container'
import { Kicker } from '@components/ui/Kicker'
import { TypewriterFade } from '@components/common/TypewriterFade'
import {
  OUR_STORY_HERO,
  OUR_STORY_PARAGRAPHS,
  OUR_STORY_CLOSING_LINE,
  OUR_STORY_STATEMENT,
  OUR_STORY_IMAGE,
  OUR_STORY_SECOND_IMAGE,
  OUR_STORY_BACKGROUND,
} from '@data/ourStory'
import { fadeUp, staggerContainer, viewportOnce } from '@animations/variants'
import { EASE_LUXURY_OUT } from '@animations/motion.config'
import { cn } from '@utils/cn'

/**
 * The Vainav's "Our Story" content — ONE self-contained Home section (was
 * a standalone /our-story page; the route was removed, see Home.jsx).
 * `id="our-story"` is the Navbar's scroll target (see Navbar.jsx's
 * ScrollLink).
 *
 * Rebuilt several times per follow-up corrections; this is the current,
 * most explicit spec:
 * - Fixed two-column composition, LEFT ~55% / RIGHT ~45%, left-aligned
 *   throughout (never centered) — LEFT = the whole story, RIGHT = one
 *   photograph permanently pinned to that column, framed like a kept
 *   memory, capped in size (not a full-height backdrop).
 * - The story is plain short paragraphs now — no numbered "01/02/03"
 *   labels (explicitly called out as reading "like an AI-generated
 *   timeline" and removed).
 * - Ends with the full 3-line closing statement ("Traditional at heart. /
 *   Fresh in taste. / Made with love.") and then an emphasized one-line
 *   beat ("This is Vainav's. ❤️") — order flipped per the most recent
 *   rewrite (statement now comes BEFORE the closing beat, not after).
 *   Both live here, inside this one section — there is no longer a
 *   separate OurStoryStatement.jsx section after this one repeating those
 *   same lines (removed from Home.jsx) — the brief was explicit that this
 *   must read as one self-contained section, not split across two.
 * `lg:items-start` (not `items-center`) lets the fixed-height framed
 * photo sit pinned near the top of the row while the left column's own
 * (taller) content continues down past it.
 * - Full-section background photo (new, per follow-up "background image i
 *   need to add") — same technique Heritage.jsx already uses for its own
 *   section: a dimmed/blurred `background-image` div behind everything,
 *   plus a warm dark overlay on top of it so the existing text colors
 *   (tuned for the flat bg-atmosphere background) stay exactly as legible
 *   regardless of what the photo looks like. The original radial-gradient
 *   accent wash stays too, layered on top of the overlay — a subtle warm
 *   glow over the dimmed photo reads better than either alone.
 * - A second, smaller photo (new, per the same follow-up) sits below the
 *   first photo's caption in the right column — same "kept memory frame"
 *   treatment, smaller and rotated the opposite way for a natural,
 *   not-perfectly-matched pair, no caption of its own.
 */
// How far below the fixed navbar the pinned text should sit once it
// "sticks" — same 120px value the earlier (non-functional) CSS
// position:sticky attempt used.
const STICKY_TOP_OFFSET = 120

export function OurStoryHero() {
  const frameRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  // Manual scroll-linked "sticky" for the left text column — per follow-up
  // ("that auto scroll restore"), asking for the pinned-while-scrolling
  // effect back after the previous attempt (plain CSS position:sticky) was
  // reverted for genuinely not engaging despite every precondition being
  // met (see the long diagnostic write-up still further down in this file,
  // kept for the record). Rather than re-trying the same non-functional
  // CSS approach, this reimplements the identical visual result a
  // different way: the column NEVER actually leaves normal document flow
  // (so none of the width/positioning pitfalls of a fixed/absolute toggle
  // apply either) — instead a calculated `translateY` is applied via
  // Framer Motion's own `y` style prop, the exact same mechanism already
  // used two lines up for the photo's parallax drift, just driven by a
  // plain scroll listener instead of useScroll's target-relative progress
  // (useScroll's progress is normalized 0-1 across ITS OWN target's scroll
  // range, which doesn't map cleanly onto "hold at a fixed viewport
  // position for a defined pixel range" the way a raw scrollY comparison
  // does).
  //
  // The maths: let rowTop/rowHeight be the flex row's own position/height
  // (the row's cross-size is set by its tallest child, i.e. the photo
  // column now that there are two photos) and leftHeight be this text
  // column's own natural height. `stickyStart` is the scrollY at which the
  // column's natural (untransformed) position would first reach
  // STICKY_TOP_OFFSET from the top of the viewport. From that point,
  // translateY grows 1:1 with scroll (exactly cancelling the column's own
  // natural upward drift, which is what makes it visually stay put) until
  // it caps at `rowHeight - leftHeight` — the same point real CSS sticky
  // would release, since that's exactly when the row's bottom edge catches
  // up to the column's own bottom edge. Past that point translateY simply
  // stays at its capped value, so the column resumes scrolling away with
  // the page at the normal rate, just permanently offset by however much
  // it held — i.e. it releases cleanly instead of snapping.
  const rowRef = useRef(null)
  const leftColRef = useRef(null)
  const stickyY = useMotionValue(0)

  useEffect(() => {
    function update() {
      // lg breakpoint only — below that this section is a single stacked
      // column (see the row's own lg:flex below), where a pinned column
      // wouldn't make sense; the CSS attempt before this one was lg-only
      // for the same reason.
      if (window.innerWidth < 1024 || !rowRef.current || !leftColRef.current) {
        stickyY.set(0)
        return
      }
      const rowTopAbs = rowRef.current.getBoundingClientRect().top + window.scrollY
      const rowHeight = rowRef.current.offsetHeight
      const leftHeight = leftColRef.current.offsetHeight
      const maxTranslate = Math.max(0, rowHeight - leftHeight)
      const stickyStart = rowTopAbs - STICKY_TOP_OFFSET
      const raw = window.scrollY - stickyStart
      stickyY.set(Math.min(Math.max(raw, 0), maxTranslate))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [stickyY])

  return (
    // py-16 (64px top) -> pt-28/lg:pt-32 (112px/128px), pb-16 unchanged —
    // per follow-up ("fix sticky navbar overlap... add sufficient top
    // padding") — the eyebrow/heading were landing only a handful of px
    // below the fixed 72px navbar's bottom edge once scrolled/navigated
    // here. Bottom padding/navbar height/position/design all untouched.
    // scroll-mt-[4.5rem] was also tried here at the same time, on the
    // assumption that Lenis's own -72px click-path offset works purely
    // via getBoundingClientRect and wouldn't stack with it — wrong:
    // confirmed the hard way on Heritage.jsx's identical setup (clicking
    // its nav link was landing 144px down, not 72px, visibly leaving part
    // of the previous section poking in at the top). Removed again per
    // that follow-up ("previous disturb"); ScrollToTop.jsx separately
    // attempts to handle the hard-reload/direct-link case (its own
    // explicit offset calculation, not CSS scroll-margin), but that is
    // NOT yet fully working end-to-end (still confirmed landing at
    // scrollY 0 in testing) — a real, still-open gap, not something this
    // line was covering for.
    // border-b border-cream-50/10 (new) — per follow-up ("each every
    // section end give line"), same thin warm hairline added to every
    // Home section's bottom edge (see Hero.jsx's own comment for the
    // full rationale) — marks the end of this section/start of
    // Signature Menu.
    <section
      id="our-story"
      className="bg-atmosphere border-cream-50/10 relative border-b pt-28 pb-16 lg:pt-32"
    >
      {/* overflow-hidden moved off the <section> itself onto this
          dedicated wrapper — per follow-up ("apply sticky positioning to
          the left text container"), position:sticky silently stops
          working on ANY descendant if ANY ancestor between it and the
          scroll container has overflow other than visible (confirmed the
          hard way: measured the sticky column's own position while
          scrolling and it just scrolled normally with the page). The
          background layers still need their own overflow-hidden — the
          blur(7px) filter on the photo below bleeds a few px past its
          own box, and that still needs clipping to the section's
          bounds — so it moved here instead of the section, keeping that
          clipping without it sitting in the sticky element's ancestor
          chain. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Full-section background photo. First pass borrowed Heritage.jsx's
          own values (brightness 0.47, blur 2px, overlay 0.72); a follow-up
          asked to sharpen/brighten it, which overshot — this specific
          photo has a lot of its own readable detail (storefront signage,
          a neighbouring shop's own lettering) that, once sharp, competed
          directly with the actual story text sitting on top of it. A
          second follow-up ("reduce the brightness... should not disturb
          to read content... blur it need to perfect") pulled it back to
          brightness 0.34 + blur(6px) — darker/softer than even the
          original Heritage-borrowed values, since this photo (unlike
          Heritage's own, comparatively abstract/textural one) has legible
          foreground subjects and text that need real obscuring, not just
          dimming. brightness 0.34 -> 0.4 per one more small follow-up
          ("little bit increase brightness") — blur/overlay untouched,
          just a touch more of the photo's own light coming through.
          brightness(0.4) + the 0.78 overlay below are now LOCKED per
          explicit follow-up ("~9/10, if you brighten it the background
          will compete with the heading/paragraphs, lock this") — do not
          adjust either value again without a new explicit request; blur
          is the one dial still open (bumped 6px -> 7px per that same
          follow-up's own optional "slightly more blurred... premium
          look" suggestion). Still renders nothing at all if the file is
          a 0-byte placeholder — bg-atmosphere's own gradient is the
          correct fallback underneath either way. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${OUR_STORY_BACKGROUND})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4) blur(7px)',
          }}
        />
        {/* Warm overlay on top of the photo — same espresso-toned family
          Heritage.jsx's own overlay uses. 0.6 -> 0.78 (higher than even
          Heritage's own 0.72) per an earlier follow-up — this section
          leans on the overlay a bit more than Heritage does, since the
          photo underneath needs more suppressing to stop competing with
          the story text. LOCKED at 0.78 — see the background photo's own
          comment above. */}
        <div aria-hidden="true" className="absolute inset-0 bg-[rgb(27_18_12_/_0.78)]" />
        {/* The original accent wash — kept, now layered above the overlay
          instead of directly on the flat background; still reads as a
          quiet warm glow, just over the dimmed photo instead of a plain
          color. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 50% at 85% 20%, rgb(137 87 55 / 0.14) 0%, transparent 65%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          ref={rowRef}
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:flex lg:items-start lg:gap-x-12 xl:gap-x-16"
        >
          {/* LEFT — the entire story, left-aligned throughout.
              lg:grid grid-cols-[55%_1fr] -> lg:flex + lg:w-[55%]/lg:flex-1
              (see the RIGHT column below) — same ~55%/45% split.
              style={{ y: stickyY }} is the pinned-while-scrolling effect
              — see the big comment on stickyY's own useEffect above for
              the full mechanics and why this replaced an earlier, non-
              functional plain CSS position:sticky attempt. */}
          <motion.div ref={leftColRef} style={{ y: stickyY }} className="lg:w-[55%]">
            <motion.div variants={fadeUp}>
              <Kicker>{OUR_STORY_HERO.eyebrow}</Kicker>
            </motion.div>
            {/* Heading + supporting line now type in letter-by-letter —
                per follow-up ("give very normal typewriter animation in
                1x speed"). Reuses TypewriterFade as-is (components/common)
                — the exact same component, and the exact same stagger
                intervals (0.028/0.02), Heritage.jsx's own heading/subtitle
                already use right above this section; "1x speed" = the
                component's own normal/default pace, not re-tuned faster
                or slower the way Signature Menu's name reveal was several
                times. Paragraphs/statement/closing line below ALSO now
                type in (were plain fadeUp) per a direct follow-up right
                after this one ("for this also I want typewriting
                animation in 1x speed") — the section-wide restraint
                Heritage.jsx established (heading+subtitle only) was an
                explicit, separate request there; this section got asked
                for the fuller version instead. */}
            <motion.h2
              variants={staggerContainer(0.028)}
              className="mt-3 max-w-md text-4xl leading-tight sm:text-5xl"
            >
              <TypewriterFade text={OUR_STORY_HERO.heading} />
            </motion.h2>
            <motion.p
              variants={staggerContainer(0.02)}
              className="text-ink-muted mt-6 max-w-md text-lg"
            >
              <TypewriterFade text={OUR_STORY_HERO.supporting} />
            </motion.p>

            {/* The story — plain short paragraphs, generous space-y
                between them (not tight stacked-article spacing), no
                numbering/labels. No surrounding quote marks (was a
                first-person quoted testimonial; this rewrite reads as
                plain narrative text — see data/ourStory.js's own comment).
                mt-4/mt-8/mt-8/space-y-5 -> mt-6/mt-6/mt-6/space-y-6
                (uniformly 1.5rem) per follow-up ("equalize margin-bottom
                across all paragraph blocks... 1.5rem" — the gap before
                this paragraph block was 32px while paragraphs themselves
                were only 20px apart, reading as an uneven rhythm; every
                block-level gap down this column was made the same 24px.
                mt-6 -> mt-8, space-y-6 -> space-y-7 per a later follow-up
                ("improve left-side text spacing... clearer visual
                hierarchy") — the perfectly uniform 24px rhythm above read
                as slightly dense; this block (where the intro hands off to
                the actual story) now opens with a touch more air (32px)
                than the tighter heading-to-intro gap above it, and the
                paragraphs themselves breathe a little more too (28px).
                variants={{staggerContainer(0.2)}} (was fadeUp) — types the
                3 paragraphs in with a visible cascade (each one starts
                ~0.2s after the previous), rather than fading the whole
                block up as one static-once-visible unit. Each <p> is now
                its own motion.p + staggerContainer(0.012) + TypewriterFade
                (same 3-level nesting pattern as the heading above —
                outer block stagger -> per-paragraph stagger -> per-
                character stagger). 0.012 (faster than the heading's
                0.028) since these are full sentences, not a short title —
                a slower per-character pace here would make the longest
                paragraph alone take several seconds to finish typing. */}
            <motion.div variants={staggerContainer(0.2)} className="mt-8 max-w-lg space-y-7">
              {OUR_STORY_PARAGRAPHS.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  variants={staggerContainer(0.012)}
                  className="text-ink text-lg leading-relaxed"
                >
                  <TypewriterFade text={paragraph} />
                </motion.p>
              ))}
            </motion.div>

            {/* The final closing statement — small brand-statement
                treatment, a thin rule above it, not another paragraph.
                Was one <p> with the 3 lines joined by literal <br />s;
                TypewriterFade takes a single plain string, which can't
                carry <br /> elements inside it, so this is now 3 separate
                stacked motion.p/TypewriterFade lines instead (each
                naturally its own line via normal block flow — visually
                identical to the old <br />-separated version). Outer
                staggerContainer(0.15) types the 3 short lines in with
                their own visible cascade, same idea as the paragraphs
                above, just faster between lines since each line itself
                is short.
                mt-6 -> mt-10 per follow-up ("clearer visual hierarchy...
                final emotional statement") — the biggest gap in the
                column now sits right here, marking the turn from the
                narrative paragraphs into this closing statement as its
                own deliberate beat, not just another block in the same
                uniform rhythm. */}
            <motion.div variants={staggerContainer(0.15)} className="mt-10 max-w-md">
              <span className="bg-accent/40 block h-px w-10" aria-hidden="true" />
              {OUR_STORY_STATEMENT.map((line, index) => (
                <motion.p
                  key={line}
                  variants={staggerContainer(0.02)}
                  className={cn('text-ink font-serif text-xl leading-snug', index === 0 && 'mt-4')}
                >
                  <TypewriterFade text={line} />
                </motion.p>
              ))}
            </motion.div>

            {/* The emphasized closing beat — now AFTER the 3-line
                statement (was right before it), per this rewrite's own
                paragraph order: story -> statement -> "This is Vainav's."
                Still visually distinct from the paragraphs above (accent
                color, serif, a touch larger). Now types in too, same
                follow-up as the rest of this section.
                mt-6 -> mt-8 per follow-up ("clearer visual hierarchy") —
                a bit more room before this final one-line beat, so it
                reads as its own emphasized moment rather than sitting
                right up against the statement above it. */}
            <motion.p
              variants={staggerContainer(0.025)}
              className="text-accent mt-8 max-w-lg font-serif text-2xl leading-snug"
            >
              <TypewriterFade text={OUR_STORY_CLOSING_LINE} />
            </motion.p>
          </motion.div>

          {/* RIGHT — the one photograph, permanently on this side, capped
              size, framed like a kept memory, vertically balanced within
              its own column. mt-10 on mobile (where the grid collapses
              and this becomes a normal stacked block) gives it breathing
              room from the intro above; lg:mt-0 removes that once it's
              sitting in its own column.
              max-w-[420px] -> 460px per follow-up ("increase the second
              image size... keep the first image as the dominant one") —
              this cap governs the MAIN photo below; the second, smaller
              photo has its own separate cap further down.
              lg:flex-1 (new) — the parent switched from grid to flex (see
              its own comment above), so this replaces the old implicit
              1fr track: grow to fill the remaining ~45% of the row next
              to the left column's now-explicit lg:w-[55%]. */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: EASE_LUXURY_OUT }}
            className="mx-auto mt-10 w-full max-w-[460px] lg:mx-0 lg:mt-0 lg:flex-1"
          >
            {/* The "memory frame" — a cream mat with real padding around
                the photo (not the photo itself touching the edges) and a
                subtle shadow. Premium editorial detail, not a polaroid/
                scrapbook effect: no texture, no tape, no handwriting-style
                caption — just a clean warm border and a quiet type label
                beneath.
                -rotate-1 removed per follow-up ("both need to be
                straightened... find the issue and fix proper") — the
                second photo's own frame and the caption below were
                already leveled in an earlier pass; this was the one
                remaining tilted element in the section. Dead level now,
                matching both.
                rounded-md -> heritage-card-frame per follow-up ("change
                both photo frame... with our design") — swaps the plain
                rounded-rectangle mat for the site's own signature
                hand-cut clip-path silhouette (see base.css; the exact
                same shape Heritage.jsx's own photo cards use, right
                above this section), so this frame reads as the site's
                established handcrafted language instead of a generic
                polaroid corner-radius.
                shadow-soft -> shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)] ->
                shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] per two
                follow-ups — the site's own shadow-soft token is tuned for
                light-card-on-light-page contexts (Heritage, Menu);
                against this section's own dark photo background it read
                as too faint. Second pass deepened it further ("subtle
                warm drop shadow so they feel like physical Polaroid
                photos resting on top of the dark backdrop") — larger
                spread, softer/further offset, higher opacity than the
                first attempt.
                bg-cream-50 -> bg-[#E8D8BD] per follow-up ("replace the
                current pure white frame with a warm vintage cream/
                parchment color... inspired by an old family photograph").
                Same swap on the second photo's own frame below — the
                site's shared bg-cream-50 token reads closer to pure white
                against this section's dark backdrop than the warm,
                slightly-aged parchment the brief calls for; this exact hex
                sits warmer/deeper without going tan/brown enough to lose
                mat contrast against the photos. Frame-color-only change —
                layout, sizes, rotation, shadow, and everything else on
                this mat is untouched. */}
            <div className="heritage-card-frame bg-[#E8D8BD] p-3 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] sm:p-4">
              <div
                ref={frameRef}
                // A real <img> can't carry a CSS background-image/
                // bg-cover treatment; role="img" on a div is the correct
                // pattern here, same one ImagePlaceholder.jsx already
                // uses.
                // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
                role="img"
                aria-label={OUR_STORY_IMAGE.alt}
                className="relative aspect-[8/9] overflow-hidden rounded-sm"
              >
                <motion.div
                  style={{ y, backgroundImage: `url(${OUR_STORY_IMAGE.src})` }}
                  className="absolute inset-x-0 -top-6 -bottom-6 bg-cover bg-center"
                />
              </div>
            </div>

            {/* Small elegant caption beneath the frame — kept perfectly
                level. A `rotate-1` was carried here for a while on the
                theory that it "cancelled" the frame div's own -rotate-1
                above, but that frame div is this <p>'s PREVIOUS SIBLING,
                not its parent — this <p> was never inside the rotated
                element, so that rotate-1 was never cancelling anything; it
                was quietly applying its own independent 1° tilt to the
                caption text the whole time. Found and removed per
                follow-up ("straighten this... find and fix the issue").
                italic removed earlier per follow-up ("straight this
                line") — plain upright type.
                text-amber-400/80 -> #D4A373 -> #F3EAD8 -> #FFF6E9, three
                follow-ups in a row ("boost lightness/opacity", "lighten...
                bright warm cream", "still a bit dim... brighten slightly")
                — each pass warmer/lighter than the last; this one is about
                as close to a warm off-white as it can get while still
                reading as "cream" rather than plain white. */}
            <p className="mt-4 text-center font-serif text-sm text-[#FFF6E9]">
              {OUR_STORY_IMAGE.caption}
            </p>

            {/* Second, smaller photo — per follow-up ("under [the caption]
                also I need to add image"). Same "memory frame" treatment
                as the main photo above (cream mat, shadow), no caption of
                its own — a quiet second glimpse, not a second
                equally-weighted "moment."
                max-w 260 -> 330 -> 385px, this latest bump per follow-up
                ("increase the width... around 15-20%... slightly smaller
                [than the main image], just wider than it is now") — 330
                -> 385 is +17%, inside that range; still clearly smaller
                than the main photo's 460px (16% narrower), not equal
                weight.
                rotate-1 removed per the same follow-up ("straighten it
                completely so its frame is level") — was intentionally
                rotated the opposite way from the main photo's -rotate-1
                before; now both the rotation-mismatch and the tilt itself
                are gone, dead level.
                lg:-ml-4 (a left offset) then lg:ml-auto (right-aligned,
                flush with the main photo's right edge) were both tried,
                then plain mx-auto (centered) per a follow-up after that.
                Per the MOST RECENT follow-up ("align the right edge of
                both images consistently so they feel like they belong to
                the same visual column") — back to lg:ml-auto: right-
                aligned at lg (flush with the main photo's own right edge,
                since both boxes sit inside the same 460px-capped parent),
                mx-auto still centers it on mobile/tablet where the grid
                has collapsed to one stacked column and "right-aligned"
                doesn't mean anything.
                max-w 385 -> 415px + aspect-4/3 -> aspect-3/2, per earlier
                follow-up ("increase the 2nd image size horizontally") —
                a wider box AND a wider (shorter) aspect ratio, growing
                the photo specifically in the horizontal dimension rather
                than scaling both axes proportionally again. Still
                clearly smaller than the main photo's 460px (~10%
                narrower).
                rounded-md -> heritage-card-frame per follow-up ("change
                both photo frame... with our design") — same hand-cut
                clip-path swap as the main photo's frame above, so the
                pair now shares one consistent, on-brand frame silhouette
                instead of a plain rounded-rectangle.
                mt-6 -> mt-4 (tightened) -> mt-12 (loosened again), two
                follow-ups pulling opposite directions: first "moved a
                tiny bit upward", then "around 25-35px more vertical space
                between the first image/caption and the second image" —
                16px -> 48px is a +32px increase, inside that range.
                mt-12 -> mt-10 per a later follow-up ("refine the vertical
                spacing... so they feel intentionally connected") — 48px
                had drifted toward reading as two separate floating
                photos rather than one staggered pair; pulled back in by
                8px, still clearly more breathing room than the original
                16px, just a touch closer now.
                rotate-1 — removed, then explicitly restored ("keep the
                very subtle natural rotation/tilt"), now removed again per
                the most recent follow-up ("the second image straighten
                fix the issue"), which supersedes that restore. Dead level
                now, matching the caption fix right above (a separate,
                unrelated bug — that one was a sibling <p> never actually
                inside the rotated frame in the first place).
                p-2.5/sm:p-3 -> p-3/sm:p-4 (matches the main photo's own
                mat padding now, already >= the "12px" asked for in a
                later follow-up) + backgroundPosition 'center 30%' (was
                plain center) + the same shadow escalation as the main
                frame above (0.4 opacity -> 0.5, larger/softer spread),
                per two follow-ups ("cropped very tightly... a touch more
                headroom or padding... add a soft drop shadow so they
                pop", then "subtle warm drop shadow... physical Polaroid
                photos") — more matting reads as less compressed even at
                the same crop, and shifting the visible window up (30%
                from the top, not 50%) gives literal extra headroom above
                the subject's head instead of a dead-center crop that
                cuts close to it. */}
            <div className="mx-auto mt-10 w-full max-w-[415px] lg:mx-0 lg:ml-auto">
              <div className="heritage-card-frame bg-[#E8D8BD] p-3 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] sm:p-4">
                <div
                  // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
                  role="img"
                  aria-label={OUR_STORY_SECOND_IMAGE.alt}
                  className="aspect-3/2 overflow-hidden rounded-sm bg-cover"
                  style={{
                    backgroundImage: `url(${OUR_STORY_SECOND_IMAGE.src})`,
                    backgroundPosition: 'center 30%',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { DURATION, EASE_LUXURY_OUT } from '@animations/motion.config'

// DURATION.fast/0.25s per character, same EASE_LUXURY_OUT as everywhere
// else on the site — DURATION.slow/0.9s would make many overlapping
// per-character fades read as one long blur rather than a snappy "typing"
// cadence.
const CHAR_FADE = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE_LUXURY_OUT } },
}

/**
 * Per-character "typing" reveal — originally built for Heritage.jsx's
 * heading/subtitle, extracted here so other sections (SignatureMenu's card
 * names, then OurStoryHero's own heading/subtitle) can reuse the exact same
 * effect instead of a second hand-rolled copy. Not a hard-cut monospace
 * typewriter cursor effect — each character gets its own fade (opacity
 * 0->1, CHAR_FADE above), staggered one after another, so it reads as a
 * soft, sequential "typing" reveal rather than an abrupt one.
 *
 * Characters are grouped per WORD (each word its own `inline-block
 * whitespace-nowrap` span) rather than flattened into one long run of
 * individual character spans — per follow-up on OurStoryHero's own heading
 * ("Became...alignment fix needed": "A Dream That Became Vainav's." was
 * wrapping mid-word, as "A Dream That B" / "ecame Vainav's."). Every
 * character being its own separate inline-block box, with nothing marking
 * which ones belong to the same word, gives the browser a valid line-break
 * opportunity BETWEEN ANY two characters, not just at real word boundaries
 * — wrapping a word's own characters together in one non-breaking unit
 * restores normal word-boundary wrapping while each character inside still
 * animates individually exactly as before. The space between word-units is
 * a plain text node (not its own animated span, and not a non-breaking
 * space) — a real, ordinary space renders and collapses exactly like any
 * other text-node space (no reason to special-case it once it's outside
 * the no-wrap word unit), and being invisible either way, animating it
 * would have made zero visual difference.
 *
 * Renders as the DIRECT children of a `motion.*` element that itself
 * carries `variants={staggerContainer(...)}` and drives `initial`/
 * `animate` (or `whileInView`) — this component renders no wrapping motion
 * element and takes no variants prop of its own, so the parent supplies
 * both and this just cascades into individual characters (the plain word-
 * grouping <span> and the plain space text nodes don't carry variants
 * either, so they don't interrupt that cascade — Framer Motion's stagger
 * only counts descendants that actually declare variants, in document
 * order, regardless of what plain markup sits between them).
 *
 * Accessible: the real string renders once, plainly, in a sr-only span (so
 * screen readers get the normal sentence, not dozens of separate
 * characters); the animated per-character spans are aria-hidden.
 *
 * splitGraphemes() below, not Array.from(word) (fixed after "This is
 * Vainav's. ❤️" — the closing line's own emoji — rendered as a plain
 * outline heart instead of the intended red one once it went through this
 * component). Array.from splits by Unicode CODE POINT, which is finer than
 * a UTF-16 code unit but still wrong for "❤️": that glyph is actually TWO
 * code points, U+2764 (heart) + U+FE0F (variation selector-16, the part
 * that specifically requests the colorful emoji-style glyph over the
 * default plain text-style one). Array.from tore those two code points
 * into separate spans, so the selector was no longer adjacent to the heart
 * in the same text node and the browser fell back to the plain glyph.
 * Intl.Segmenter's grapheme granularity groups by user-perceived character
 * instead, keeping any such combining sequence (variation selectors, ZWJ
 * emoji, skin-tone modifiers, accents) together as one unit — the safe,
 * general fix rather than a one-off workaround for this one emoji. Falls
 * back to Array.from only if Intl.Segmenter isn't available.
 */
const segmenter =
  typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function'
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : null

function splitGraphemes(word) {
  if (segmenter) return Array.from(segmenter.segment(word), (s) => s.segment)
  return Array.from(word)
}

export function TypewriterFade({ text }) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {splitGraphemes(word).map((char, charIndex) => (
              <motion.span
                // oxlint-disable-next-line react/no-array-index-key -- static
                // text, characters never reorder/insert/remove, so the index
                // is a perfectly stable key here.
                key={charIndex}
                variants={CHAR_FADE}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIndex < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  )
}

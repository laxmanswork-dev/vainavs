import { ourStoryAtmosphere, ourStoryBackground, ourStoryMoment } from '@assets'

/**
 * Vainav's "Our Story" content — a first-person account from the café
 * owner, not a third-person biography. Renders as ONE section on Home,
 * right after Heritage (see OurStoryHero.jsx, and Home.jsx for the
 * ordering) — originally its own /our-story page, that route was removed.
 *
 * Content replaced several times per explicit follow-up rewrite
 * instructions (unlike most other revisions on this section, which only
 * restructured presentation and kept wording verbatim, these were
 * deliberate "replace the text" requests, wording and all, given
 * directly by the user, each one explicitly superseding the last). The
 * version below is the most recent one given ("replace the story with
 * this"). The old numbered "01 THE DREAM / 02 THE LEAP / 03 THE ROOTS"
 * structure is gone too, per an earlier follow-up in this same chain
 * ("they make the story feel like an AI-generated timeline") — just
 * plain short paragraphs.
 */

export const OUR_STORY_HERO = {
  eyebrow: 'OUR STORY',
  heading: 'A Dream That Became Vainav’s.',
  supporting: 'What began as a simple dream became a place built with family, courage, and love.',
}

/**
 * The story, one short paragraph per array item — no numbering/labels, no
 * surrounding quote marks (the previous version wrapped these as a
 * first-person quoted testimonial; this rewrite reads as plain narrative
 * text instead — see OurStoryHero.jsx, the paragraph-rendering quote
 * marks were removed to match).
 */
export const OUR_STORY_PARAGRAPHS = [
  'After years of working in a private company, I chose to leave my job and build something of my own — something that would make my family proud.',
  'My father’s small chips shop taught me the value of hard work. My mother’s love gave me the strength to keep going.',
  'Today, Vainav’s brings the flavours I grew up with, given a fresh touch and served with the same care that started it all.',
]

/**
 * The emphasized closing line — moved to AFTER the 3-line statement below
 * (was right before it) per this rewrite's own paragraph order, and now
 * carries the 🤍. See OurStoryHero.jsx for the matching render-order move.
 */
export const OUR_STORY_CLOSING_LINE = 'This is Vainav’s. 🤍'

/**
 * The one large photo, framed like a kept memory — per follow-up ("one
 * strong café/family photograph," "do not use unnecessary decorative
 * cards"), the page's only image.
 */
export const OUR_STORY_IMAGE = {
  src: ourStoryAtmosphere,
  alt: 'The warm atmosphere at Vainav’s Cafeteria',
  caption: 'Where the dream became real.',
}

/**
 * A second, smaller photo — per follow-up ("under [the caption] also I
 * need to add image"), sitting right below OUR_STORY_IMAGE's own caption
 * in the same right-hand column (see OurStoryHero.jsx). No caption of its
 * own — reads as a quiet second glimpse, not a second full "moment" with
 * equal weight to the first.
 */
export const OUR_STORY_SECOND_IMAGE = {
  src: ourStoryMoment,
  alt: 'A quiet moment at Vainav’s Cafeteria',
}

/**
 * Full-section background photo — per the same follow-up ("background
 * image i need to add"), the same "photo behind the whole section, dimmed
 * + overlaid for legibility" technique Heritage.jsx already uses (see
 * HERITAGE background handling there) rather than a new one-off pattern.
 */
export const OUR_STORY_BACKGROUND = ourStoryBackground

/**
 * The final closing statement — now rendered at the bottom of this one
 * section (was briefly a separate full-size OurStoryStatement.jsx section
 * right after it, with its own CTA; removed per this follow-up, which
 * explicitly asks for one self-contained section, not a second one
 * repeating the same lines).
 */
export const OUR_STORY_STATEMENT = ['Traditional at heart.', 'Fresh in taste.', 'Made with love.']

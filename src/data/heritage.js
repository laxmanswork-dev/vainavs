import { heritageCraft, heritageKan, heritageStory, heritageTable } from '@assets'

/**
 * "Our Heritage" main heading + supporting line — sit between the "Our
 * Heritage" eyebrow and the three cards below.
 * Per follow-up, this section is scoped tightly to "where Vainav's comes
 * from" (Kanyakumari/home/roots) — NOT why the café was started (that's
 * the separate "Our Story" section) — so the heading dropped its second
 * line ("Built to be shared.", which read as edging into founder-story
 * territory) down to one line, with a new, softer supporting line
 * carrying the "for everyone" idea instead.
 */
export const HERITAGE_HEADING = 'Born in Kanyakumari.'
export const HERITAGE_SUPPORTING = 'A little piece of home, shared with everyone.'

/**
 * "Our Heritage" three-card section — each card is now IMAGE + EYEBROW +
 * HEADING + DESCRIPTION (was IMAGE + HEADING + one sentence, no eyebrow) —
 * per follow-up, exact content given directly by the user, not rewritten/
 * shortened/paraphrased. `eyebrow`/`heading`/`description` field names
 * (was `title`/`body`) match this new shape; see Heritage.jsx's
 * HeritageCard for the added eyebrow-label markup this content needs.
 * All three carry a photo (kan.png / story.png / table.png), unchanged by
 * this pass — content-only update, images/layout/design untouched.
 */
export const HERITAGE_CARDS = [
  {
    eyebrow: '01 — Our Roots',
    heading: 'This is where we come from.',
    description:
      'Kanyakumari has always been a part of our story — the place we grew up in and call home.',
    image: {
      src: heritageKan,
      alt: "Kanyakumari's coastal heritage and traditional filter coffee culture",
    },
  },
  {
    eyebrow: '02 — Our Home',
    heading: 'A place we’re proud to call home.',
    description:
      'The sea, the streets, the people, and the everyday life of Kanyakumari are close to our hearts.',
    image: {
      src: heritageStory,
      alt: "A little piece of home in every dish at Vainav's Cafeteria",
    },
    // imageClassName (optional field, read by Heritage.jsx's
    // HeritageCard) — this specific photo (≈1.9:1, wider than the card's
    // 3:2 image box) already shows its full height under plain
    // object-fit:cover, so object-position's Y axis can't trim any sky
    // (no vertical overflow for it to redistribute). scale-[1.2]
    // origin-bottom adds a real extra zoom anchored at the box's bottom
    // edge — keeps the coastline/water fully framed (zero crop there)
    // while trimming ~20% of the box's height off the top, safely below
    // where the Thiruvalluvar Statue's head sits in frame. Per follow-up
    // ("no excessive empty sky... keep landmarks visible").
    // sepia-[0.18] saturate-[0.9] — added per final-polish follow-up: this
    // photo's natural blue/cyan sea tone read visibly cooler than cards 1
    // and 3's warm sepia/amber tones. A light sepia cast + a slight pull
    // back on saturation nudges it toward the same warm family without
    // flattening it into full sepia or losing the sea's actual color —
    // still clearly a color coastal photo, just tonally unified with its
    // siblings. Composes fine alongside the scale/origin transform above
    // — filter and transform are separate CSS properties.
    imageClassName: 'scale-[1.2] origin-bottom sepia-[0.18] saturate-[0.9]',
  },
  {
    eyebrow: '03 — Our Place',
    heading: 'And this is what we built.',
    description:
      'Vainav’s is our own little place in Kanyakumari — created with care, good food, and a dream of our own.',
    image: {
      src: heritageTable,
      alt: "People sharing a table in the warm, welcoming Vainav's Cafeteria atmosphere",
    },
  },
]

// heritageCraft is reserved for a future fourth card / gallery use — kept
// out of HERITAGE_CARDS for now since the approved design is a 3-card grid.
export { heritageCraft }

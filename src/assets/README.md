# assets/

Every binary asset the site uses — images, video, fonts, brand icon SVGs —
lives here, organized by the section/purpose that consumes it.

## The rule

**Components never import from these folders directly.** Everything is
re-exported through [`index.js`](index.js):

```js
// ✅ correct
import { heroBurger } from '@assets'

// ❌ wrong — never do this
import heroBurger from '@assets/images/hero/hero-burger.png'
```

Data files under `src/data/` follow the same rule — they import from
`@assets`, then components import the _data_, not the asset path. See
[`src/data/README.md`](../data/README.md).

This indirection is what makes the swap-in-real-files step at the end
painless: replace the bytes at a given path, keep the filename identical,
and every page that renders that export updates automatically. No import
ever needs to change.

## Current state: placeholders

Every file below is an intentional **0-byte placeholder** — not an AI
mock, not a stock photo, not a broken download. They exist so the import
graph, layout boxes and aspect ratios are all correct _before_ real
photography/video/fonts exist. Until replaced, `<img>`/`<video>` elements
using them fail to load, which `ResponsiveImage`/`LazyImage`
(`src/components/common/`) treat as an expected state — they render the
same warm placeholder box (`ui/ImagePlaceholder`) already used across the
homepage sections, not a broken-image icon.

**To ship a real asset:** overwrite the placeholder file in place — same
filename, same folder. Do not rename it and do not add a new export unless
the design genuinely adds a new image slot.

## Folders

| Folder                   | Used by                                                                                                                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `images/logo/`           | `Logo.jsx` currently renders a text/CSS wordmark by design (see its file comment) — these are ready for when a final logo file replaces it.                                                                                                                                                                              |
| `images/hero/`           | `sections/Hero.jsx` collage                                                                                                                                                                                                                                                                                              |
| `images/categories/`     | `data/categories.js` (`CATEGORIES[].image`)                                                                                                                                                                                                                                                                              |
| `images/heritage/`       | `data/heritage.js` (`HERITAGE_CARDS[].image`)                                                                                                                                                                                                                                                                            |
| `images/our-story/`      | `data/ourStory.js` (`OUR_STORY_IMAGE`)                                                                                                                                                                                                                                                                                   |
| `images/signature-menu/` | `data/signatureMenu.js` (`SIGNATURE_MENU[].image`)                                                                                                                                                                                                                                                                       |
| `images/footer/`         | `data/footer.js` (`FOOTER_BACKGROUND`)                                                                                                                                                                                                                                                                                   |
| `images/patterns/`       | Decorative textures/dividers — not yet wired into any section                                                                                                                                                                                                                                                            |
| `videos/`                | `components/common/BackgroundVideo.jsx` — one `-bg.mp4` per section that wants a cinematic background, plus `steam.mp4`/`coffee-pour.mp4` for close-up detail loops                                                                                                                                                      |
| `fonts/`                 | Brand-supplied `heading.ttf`/`body.ttf`, exported as URLs for a future `@font-face`. **Not wired into `styles/fonts.css` yet** — the active type system is still the self-hosted Fontsource fonts. Swapping typefaces is a deliberate design decision, not a placeholder-fill, so it's left for whoever makes that call. |
| `icons/`                 | Brand-specific SVG marks, for cases a generic icon set (`lucide-react`/`react-icons`, used everywhere else) can't match                                                                                                                                                                                                  |

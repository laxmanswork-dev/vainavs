# data/

Static content collections consumed by page sections — as opposed to
`constants/`, which holds site-wide configuration (nav links, routes, brand
info).

Each file exports plain arrays/objects only — no components, no JSX — so
content can later move to a CMS/API without touching the components that
render it.

Any file that carries an `image`/`avatar`/`photo` field imports the asset
from [`@assets`](../assets/index.js), never from a raw `assets/images/...`
path — see [`src/assets/README.md`](../assets/README.md) for why.

## Existing files

- `hero.js` — homepage hero collage (one entry per grid area) + background video
- `categories.js` — homepage menu category bar (icon, image, label, description)
- `heritage.js` — "Our Heritage" three-card section
- `signatureMenu.js` — "Our Signature Menu" showcase cards
- `stories.js` — "Where Every Table Holds a Story" moments list + gallery
- `footer.js` — footer background image/video
- `testimonials.js` — customer quotes (name, role, quote, rating, avatar)
- `team.js` — staff/founder profiles (name, role, photo, bio)
- `faqs.js` — frequently asked questions (question, answer)

# Vainav's Cafeteria

Premium, production-grade website for Vainav's Cafeteria — built with React 19,
Vite and Tailwind CSS v4.

> **Status:** Project architecture and app shell are complete (routing, layout,
> SEO, animation infrastructure, design tokens). Page content/sections —
> starting with the homepage — are built next.

## Tech Stack

React 19 · Vite · Tailwind CSS v4 · Framer Motion · GSAP · React Router DOM ·
Lenis · Lucide React · React Icons · React Helmet Async · Swiper.js ·
React CountUp · React Intersection Observer · React Fast Marquee ·
React Hot Toast · React Hook Form · Zod · Axios

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in real values before deploying
npm run dev
```

| Script                 | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                   |
| `npm run build`        | Production build to `dist/`                 |
| `npm run preview`      | Preview the production build locally        |
| `npm run lint`         | Lint with oxlint (React, a11y, correctness) |
| `npm run lint:fix`     | Lint and auto-fix                           |
| `npm run format`       | Format the codebase with Prettier           |
| `npm run format:check` | Check formatting without writing            |

## Project Structure

```
src/
├── assets/          Images, icons, videos, fonts (raw files)
├── components/
│   ├── common/       Cross-cutting components (Seo, Logo, ErrorBoundary, ...)
│   ├── layout/        App shell (Navbar, Footer, Layout)
│   ├── ui/             Reusable primitives (Button, Container, ...)
│   └── sections/    Homepage/page section components (added per page)
├── pages/                One file per route, composes sections
├── hooks/                 Reusable stateful logic (useLenis, useMediaQuery, ...)
├── context/              React context providers (SmoothScrollProvider)
├── services/            API clients (Axios instance + future endpoints)
├── data/                    Static content collections (menu, testimonials, ...)
├── utils/                  Stateless helpers (cn, formatters, structuredData)
├── constants/          Site-wide config (site info, nav, routes, SEO defaults)
├── styles/                Global CSS — fonts.css, theme.css (design tokens), base.css
├── animations/       Framer Motion variants + GSAP setup
├── routes/               React Router route tree
└── App.jsx / main.jsx
```

**Path aliases** (`@components`, `@pages`, `@hooks`, `@utils`, etc.) are
configured in both `vite.config.js` (build) and `jsconfig.json` (editor
IntelliSense) — always import through them instead of relative `../../../`.

## Design System

All design tokens (colors, fonts, motion, radii, shadows) live in
[`src/styles/theme.css`](src/styles/theme.css) as Tailwind v4 `@theme`
variables — this is the single source of truth. Change a value there and
every utility class using it (`bg-espresso-800`, `text-accent`,
`ease-luxury`, ...) updates automatically.

- **Palette:** `espresso` (deep coffee brown → dark espresso), `cream`
  (base surface), `amber` (warm orange accent), `gold` (brass accent) — plus
  semantic aliases `surface`, `ink`, `accent`, `luxury`, `line`.
- **Type:** Montserrat for both headings (semibold/bold) and body/UI
  (regular/medium) + Great Vibes for handwritten accent lines, used
  sparingly, self-hosted via `@fontsource-variable` — no external font
  requests.
- **Motion:** slow, smooth, cinematic by design. Shared easing/duration
  tokens live in both CSS (`--ease-luxury`, `--duration-*`) and JS
  (`src/animations/motion.config.js`) so Framer Motion and CSS transitions
  stay visually identical. GSAP is set up in `src/animations/gsap.js` for
  scroll-pinning/timeline work Framer doesn't cover.
- **Reduced motion:** `usePrefersReducedMotion` gates Lenis smooth scroll
  (falls back to native scroll) and should gate any large-motion animation
  you add.

## Smooth Scroll (Lenis + GSAP)

`SmoothScrollProvider` (`src/context/SmoothScrollProvider.jsx`) wraps the app
in `App.jsx`, drives Lenis off GSAP's ticker for frame-perfect sync with
`ScrollTrigger`, and is skipped entirely when the user prefers reduced
motion. Use `useLenis()` (`src/hooks/useLenis.js`) to access the instance,
e.g. `lenis?.scrollTo('#menu')`.

## SEO

Drop `<Seo title="..." description="..." path="/menu" />`
(`src/components/common/Seo.jsx`) once per page. It sets title, meta
description, canonical URL, Open Graph/Twitter tags, and a
`CafeOrCoffeeShop` JSON-LD schema built from `src/constants/site.js` —
update that file, not individual pages, for hours/address/contact changes.

## Before Launch — Known Placeholders

- `public/favicon.svg` is still the default Vite icon — swap for the real
  brand mark.
- All pages currently render `<ComingSoon>` — replace with real sections as
  each page is designed, starting with the homepage.
- `src/constants/seo.js` → `ogImage` points at `/og-image.jpg`, which
  doesn't exist yet — add a real 1200×630 social share image.
- `src/constants/site.js` has placeholder phone/address/social links — swap
  for the real business details.

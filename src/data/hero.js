import {
  heroFilterCoffee,
  heroMojito,
  heroFalooda,
  heroBurger,
  heroTea,
  heroWrap,
  videoHeroBg,
} from '@assets'

/**
 * Homepage hero collage — one entry per named grid area in
 * `sections/Hero.jsx`'s `collageAreas` (`coffee`, `mojito`, `dessert`,
 * `burger`, `tea`, `wrap`). Order matters for the mobile 3-image fallback
 * grid, which takes the first three entries.
 */
export const HERO_COLLAGE = [
  {
    area: 'coffee',
    image: heroFilterCoffee,
    alt: "Traditional filter coffee at Vainav's Cafeteria",
  },
  { area: 'mojito', image: heroMojito, alt: 'Virgin mojito, chilled and garnished' },
  { area: 'dessert', image: heroFalooda, alt: 'Royal falooda layered in a tall glass' },
  { area: 'burger', image: heroBurger, alt: 'Loaded burger stacked high' },
  { area: 'tea', image: heroTea, alt: "Hot tea served at Vainav's Cafeteria" },
  { area: 'wrap', image: heroWrap, alt: 'Grilled chicken wrap sliced in half' },
]

/** Optional cinematic loop behind the hero — see `common/BackgroundVideo`. */
export const HERO_BACKGROUND_VIDEO = videoHeroBg

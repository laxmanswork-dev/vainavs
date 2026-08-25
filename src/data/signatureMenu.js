import {
  menuChickenWrap,
  menuRoyalFalooda,
  menuMonsterShake,
  menuLoadedBurger,
  menuChickenPopcorn,
  menuSizzlingBrownie,
} from '@assets'

/**
 * "A Taste of Vainav's" showcase cards on the homepage — a curated 6-item
 * "best of" preview, NOT the full menu (see data/menu.js for that, and
 * pages/Menu.jsx/MenuShowcase.jsx for where it's rendered). Order is
 * deliberate, per follow-up: main food -> burger -> snack -> drink ->
 * speciality -> dessert, chosen to read as a strong food-variety arc that
 * makes visitors want to see the rest of the menu.
 *
 * Every item now has its own asset slot (see assets/index.js) — the last
 * two (Chicken Popcorn, Sizzling Brownie) reused file slots that used to
 * belong to items no longer in this curated list (Premium Coffee, Virgin
 * Mojito) rather than adding new orphaned files. Still 0-byte placeholders
 * per this project's convention until a real photo is dropped in for each.
 */
export const SIGNATURE_MENU = [
  {
    name: 'Chicken Wraps',
    description: 'Grilled to perfection. Wrapped with love.',
    image: { src: menuChickenWrap, alt: 'Chicken Wraps' },
  },
  {
    name: 'Loaded Burger',
    description: 'Layers of flavour. Made to crave.',
    image: { src: menuLoadedBurger, alt: 'Loaded Burger' },
  },
  {
    name: 'Chicken Popcorn',
    description: 'Bite-sized. Perfectly spiced.',
    image: { src: menuChickenPopcorn, alt: 'Chicken Popcorn' },
  },
  {
    name: 'Monster Shake',
    description: 'Thick, creamy. Totally irresistible.',
    image: { src: menuMonsterShake, alt: 'Monster Shake' },
  },
  {
    name: 'Royal Falooda',
    description: 'A royal treat for every sweet tooth.',
    image: { src: menuRoyalFalooda, alt: 'Royal Falooda' },
  },
  {
    name: 'Sizzling Brownie',
    description: 'Warm, gooey, straight off the sizzler.',
    image: { src: menuSizzlingBrownie, alt: 'Sizzling Brownie' },
  },
]

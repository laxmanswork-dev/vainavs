import { Coffee, Hamburger, Sandwich, Soup, CupSoda, IceCreamBowl } from 'lucide-react'
import {
  categoryCoffee,
  categoryBurger,
  categoryWraps,
  categoryNoodles,
  categoryDrinks,
  categoryDesserts,
} from '@assets'

/**
 * Menu category bar shown near the top of the homepage. `icon` (lucide) is
 * what `sections/Categories.jsx` currently renders; `image` is wired and
 * ready for whenever that card design grows a photo (swap the lucide icon
 * for `<LazyImage src={image} .../>` — no data change needed).
 */
export const CATEGORIES = [
  {
    icon: Hamburger,
    image: categoryBurger,
    label: 'Burgers',
    description: 'Big, Juicy, Satisfying.',
  },
  { icon: Sandwich, image: categoryWraps, label: 'Wraps', description: 'Fresh & Flavorful.' },
  { icon: Soup, image: categoryNoodles, label: 'Noodles', description: 'Hot, Spicy, Delicious.' },
  {
    icon: CupSoda,
    image: categoryDrinks,
    label: 'Drinks',
    description: 'Refreshing & Coolers.',
  },
  // Coffee moved here, second-to-last (was first) — per follow-up, before
  // Desserts, not after it.
  { icon: Coffee, image: categoryCoffee, label: 'Coffee', description: 'Classics & more' },
  {
    icon: IceCreamBowl,
    image: categoryDesserts,
    label: 'Desserts',
    description: 'Sweet moments made better.',
  },
]

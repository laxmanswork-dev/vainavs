import {
  menuChickenWrap,
  menuMonsterShake,
  menuSizzlingBrownie,
  menuChickenWrapCheese,
  menuPrawnLollipop4,
  menuPrawnLollipop5,
  menuPopcornMedium,
  menuPopcornLarge,
  menuVegBurger,
  menuChickenBurger,
  menuBreadOmelette,
  menuVegSandwich,
  menuChickenSandwich,
  menuCheeseSandwich,
  menuCheeseChickenSandwich,
  menuFriesSmall,
  menuFriesMedium,
  menuFriesLarge,
  menuCheeseFries,
  menuLoadedFries,
  menuMaggiNormal,
  menuMaggiVeg,
  menuMaggiPaneer,
  menuShakeBanana,
  menuShakeStrawberry,
  menuShakeChocolate,
  menuShakeVanilla,
  menuShakeButterscotch,
  menuShakeMango,
  menuShakeOreo,
  menuShake5Star,
  menuShakeBlueberry,
  menuShakeTenderCoconut,
  menuShakeDryFruit,
  menuSmoothieStrawberry,
  menuSmoothieMango,
  menuSmoothieBlueberry,
  menuDessertMexicanBrownie,
  menuDessertDeadByChocolate,
  menuDessertMississippiMud,
} from '@assets'

/**
 * The full Vainav's menu — ONE centralized data source for the /menu page
 * (see components/sections/MenuShowcase.jsx). Every item follows the exact
 * shape given in the brief: { name, description, image, price, category }.
 * `price: null` everywhere on purpose — prices aren't finalized yet and
 * will be added/edited here later, one place, without touching any
 * component. `description: ''` where the brief gave no description of its
 * own — MenuShowcase only renders the description paragraph when it's
 * non-empty, so a blank one just means "no description line for this
 * item," not a layout gap.
 *
 * `image` — per follow-up ("create files to add images, wire up all"),
 * every item now has its own photo slot (see assets/index.js's own "Full
 * Menu" section for the full list of new 0-byte placeholder files, one per
 * item, in assets/images/menu/). Three items are the one exception and
 * deliberately reuse an existing Signature Menu photo instead of a new
 * file — Chicken Wraps, Monster Shake, and Sizzling Brownie are exact
 * name-matches for dishes already photographed for that section, so
 * reusing avoids a duplicate/orphaned file for the same physical dish.
 * Every other item's image is still a 0-byte placeholder for now (per
 * this project's convention, see assets/README.md) — MenuItemCard shows a
 * quiet category icon until a real photo replaces each file; drop a real
 * photo into its file under assets/images/menu/ and it starts rendering,
 * nothing else here needs to change.
 */

export const MENU_CATEGORIES = [
  { id: 'starters', label: 'Starters' },
  { id: 'burgers', label: 'Burgers & Sandwiches' },
  { id: 'fries', label: 'Fries & Snacks' },
  { id: 'maggi', label: 'Maggi & Noodles' },
  { id: 'shakes', label: 'Milk Shakes' },
  { id: 'smoothies', label: 'Smoothies' },
  { id: 'desserts', label: 'Desserts' },
]

export const MENU_ITEMS = [
  // Chicken Wraps & Starters
  {
    name: 'Chicken Wraps',
    description: '',
    image: { src: menuChickenWrap, alt: 'Chicken Wraps' },
    price: null,
    category: 'starters',
  },
  {
    name: 'Chicken Wraps Cheese',
    description: '',
    image: { src: menuChickenWrapCheese, alt: 'Chicken Wraps Cheese' },
    price: null,
    category: 'starters',
  },
  {
    name: 'Prawn Lolipops (4 Pcs)',
    description: '',
    image: { src: menuPrawnLollipop4, alt: 'Prawn Lolipops (4 Pcs)' },
    price: null,
    category: 'starters',
  },
  {
    name: 'Prawn Lolipops (5 Pcs)',
    description: '',
    image: { src: menuPrawnLollipop5, alt: 'Prawn Lolipops (5 Pcs)' },
    price: null,
    category: 'starters',
  },
  {
    name: 'Chicken Popcorn Medium',
    description: '',
    image: { src: menuPopcornMedium, alt: 'Chicken Popcorn Medium' },
    price: null,
    category: 'starters',
  },
  {
    name: 'Chicken Popcorn Large',
    description: '',
    image: { src: menuPopcornLarge, alt: 'Chicken Popcorn Large' },
    price: null,
    category: 'starters',
  },

  // Burgers & Sandwiches
  {
    name: 'Veg Burger',
    description: '',
    image: { src: menuVegBurger, alt: 'Veg Burger' },
    price: null,
    category: 'burgers',
  },
  {
    name: 'Chicken Burger',
    description: '',
    image: { src: menuChickenBurger, alt: 'Chicken Burger' },
    price: null,
    category: 'burgers',
  },
  {
    name: 'Bread Omelette',
    description: '',
    image: { src: menuBreadOmelette, alt: 'Bread Omelette' },
    price: null,
    category: 'burgers',
  },
  {
    name: 'Veg Sandwich',
    description: '',
    image: { src: menuVegSandwich, alt: 'Veg Sandwich' },
    price: null,
    category: 'burgers',
  },
  {
    name: 'Chicken Sandwich',
    description: '',
    image: { src: menuChickenSandwich, alt: 'Chicken Sandwich' },
    price: null,
    category: 'burgers',
  },
  {
    name: 'Cheese Sandwich',
    description: '',
    image: { src: menuCheeseSandwich, alt: 'Cheese Sandwich' },
    price: null,
    category: 'burgers',
  },
  {
    name: 'Cheese Chicken Sandwich',
    description: '',
    image: { src: menuCheeseChickenSandwich, alt: 'Cheese Chicken Sandwich' },
    price: null,
    category: 'burgers',
  },

  // French Fries & Snacks
  {
    name: 'Small',
    description: 'French Fries',
    image: { src: menuFriesSmall, alt: 'Small French Fries' },
    price: null,
    category: 'fries',
  },
  {
    name: 'Medium',
    description: 'French Fries',
    image: { src: menuFriesMedium, alt: 'Medium French Fries' },
    price: null,
    category: 'fries',
  },
  {
    name: 'Large',
    description: 'French Fries',
    image: { src: menuFriesLarge, alt: 'Large French Fries' },
    price: null,
    category: 'fries',
  },
  {
    name: 'Cheese Fries',
    description: '',
    image: { src: menuCheeseFries, alt: 'Cheese Fries' },
    price: null,
    category: 'fries',
  },
  {
    name: 'Chicken Loaded Fries',
    description: '',
    image: { src: menuLoadedFries, alt: 'Chicken Loaded Fries' },
    price: null,
    category: 'fries',
  },

  // Maggi & Noodles
  {
    name: 'Normal Maggi',
    description: '',
    image: { src: menuMaggiNormal, alt: 'Normal Maggi' },
    price: null,
    category: 'maggi',
  },
  {
    name: 'Veg Maggi',
    description: '',
    image: { src: menuMaggiVeg, alt: 'Veg Maggi' },
    price: null,
    category: 'maggi',
  },
  {
    name: 'Paneer Maggi',
    description: '',
    image: { src: menuMaggiPaneer, alt: 'Paneer Maggi' },
    price: null,
    category: 'maggi',
  },

  // Milk Shakes
  {
    name: 'Banana Shake',
    description: '',
    image: { src: menuShakeBanana, alt: 'Banana Shake' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Strawberry Milk Shake',
    description: '',
    image: { src: menuShakeStrawberry, alt: 'Strawberry Milk Shake' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Chocolate Milk Shake',
    description: '',
    image: { src: menuShakeChocolate, alt: 'Chocolate Milk Shake' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Vanilla Milk Shake',
    description: '',
    image: { src: menuShakeVanilla, alt: 'Vanilla Milk Shake' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Butter Scotch Milk Shake',
    description: '',
    image: { src: menuShakeButterscotch, alt: 'Butter Scotch Milk Shake' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Mango Milk Shake',
    description: '',
    image: { src: menuShakeMango, alt: 'Mango Milk Shake' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Oreo Milk Shake',
    description: '',
    image: { src: menuShakeOreo, alt: 'Oreo Milk Shake' },
    price: null,
    category: 'shakes',
  },
  {
    name: '5 Star Milk Shake',
    description: '',
    image: { src: menuShake5Star, alt: '5 Star Milk Shake' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Blueberry Shake',
    description: '',
    image: { src: menuShakeBlueberry, alt: 'Blueberry Shake' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Tender Coconut',
    description: '',
    image: { src: menuShakeTenderCoconut, alt: 'Tender Coconut' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Dry Fruit',
    description: '',
    image: { src: menuShakeDryFruit, alt: 'Dry Fruit' },
    price: null,
    category: 'shakes',
  },
  {
    name: 'Monster Shake',
    description: 'Thick, creamy. Totally irresistible.',
    image: { src: menuMonsterShake, alt: 'Monster Shake' },
    price: null,
    category: 'shakes',
  },

  // Smoothies
  {
    name: 'Strawberry Smoothie',
    description: '',
    image: { src: menuSmoothieStrawberry, alt: 'Strawberry Smoothie' },
    price: null,
    category: 'smoothies',
  },
  {
    name: 'Mango Smoothie',
    description: '',
    image: { src: menuSmoothieMango, alt: 'Mango Smoothie' },
    price: null,
    category: 'smoothies',
  },
  {
    name: 'Blueberry Smoothie',
    description: '',
    image: { src: menuSmoothieBlueberry, alt: 'Blueberry Smoothie' },
    price: null,
    category: 'smoothies',
  },

  // Desserts
  {
    name: 'Mexican Brownie',
    description: '',
    image: { src: menuDessertMexicanBrownie, alt: 'Mexican Brownie' },
    price: null,
    category: 'desserts',
  },
  {
    name: 'Dead by Chocolate',
    description: '',
    image: { src: menuDessertDeadByChocolate, alt: 'Dead by Chocolate' },
    price: null,
    category: 'desserts',
  },
  {
    name: 'A Mississippi Mud Shake',
    description: '',
    image: { src: menuDessertMississippiMud, alt: 'A Mississippi Mud Shake' },
    price: null,
    category: 'desserts',
  },
  {
    name: 'Sizzling Brownie',
    description: '',
    image: { src: menuSizzlingBrownie, alt: 'Sizzling Brownie' },
    price: null,
    category: 'desserts',
  },
]

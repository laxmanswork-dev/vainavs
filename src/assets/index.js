/**
 * Single entry point for every static asset in the project (images, videos,
 * fonts, icons). Components must always import from here —
 * `import { heroBurger } from '@assets'` — and never reach into
 * `assets/images/...` directly. That indirection is the whole point of this
 * file: when a real photo/video/font replaces one of the empty placeholder
 * files under `assets/`, nothing in `components/`, `pages/` or `data/` has
 * to change — the export name and its consumers stay put, only the bytes
 * behind the path change.
 *
 * All placeholder files are currently 0 bytes on purpose (see
 * `assets/README.md`). Vite resolves these as static asset URLs regardless
 * of file content, so every import below already works — the images/video/
 * fonts just render empty/broken until real files are dropped in place.
 *
 * Naming: exports are prefixed by their folder (`logo*`, `hero*`, `menu*`,
 * `story*`, `icon*`, `video*`, `font*`, `pattern*`) so two files that happen
 * to share a base name (e.g. `icons/coffee.svg` vs `categories/coffee.png`)
 * never collide.
 */

// ---------------------------------------------------------------- Logo ----
export { default as logo } from './images/logo/logo.png'
export { default as logoWhite } from './images/logo/logo-white.png'
export { default as logoFavicon } from './images/logo/favicon.png'

// ---------------------------------------------------------------- Hero ----
export { default as heroBurger } from './images/hero/hero-burger.png'
export { default as heroWrap } from './images/hero/hero-wrap.png'
export { default as heroNoodles } from './images/hero/hero-noodles.png'
export { default as heroTea } from './images/hero/hero-tea.png'
export { default as heroMojito } from './images/hero/hero-mojito.png'
export { default as heroFalooda } from './images/hero/hero-falooda.png'
export { default as heroFilterCoffee } from './images/hero/hero-filter-coffee.png'
export { default as heroCoffeePour } from './images/hero/hero-coffee-pour.png'

// --------------------------------------------------------- Categories ----
export { default as categoryCoffee } from './images/categories/coffee.png'
export { default as categoryBurger } from './images/categories/burger.png'
export { default as categoryWraps } from './images/categories/wraps.png'
export { default as categoryNoodles } from './images/categories/noodles.png'
export { default as categoryDrinks } from './images/categories/drinks.png'
export { default as categoryDesserts } from './images/categories/desserts.png'

// ----------------------------------------------------------- Heritage ----
export { default as heritageBrewing } from './images/heritage/heritage-brewing.jpg'
export { default as heritageCraft } from './images/heritage/heritage-craft.jpg'
export { default as heritageFlavours } from './images/heritage/heritage-flavours.jpg'
// The three "Our Heritage" card photos (see data/heritage.js), one per
// card in that exact order.
export { default as heritageKan } from './images/heritage/kan.png'
export { default as heritageStory } from './images/heritage/story.png'
// Card 3's photo — file renamed table.png -> cafe.png per follow-up
// (table.png itself was emptied out separately, when its real content
// got moved to new.png for the section background instead).
export { default as heritageTable } from './images/heritage/cafe.png'
// Full-section background image for the "Our Heritage" section itself
// (see Heritage.jsx) — per follow-up ("add background image holistically"),
// distinct from the three card photos above. 0-byte placeholder for now,
// same convention as every other asset here.
export { default as heritageBackground } from './images/heritage/new.png'

// ---------------------------------------------------------- Our Story ----
// The one photo for the "Our Story" section on Home (see
// data/ourStory.js) — per follow-up ("one strong café/family
// photograph... do not use unnecessary decorative cards"), down from an
// earlier two-photo version (a small inset "chips shop" photo was
// dropped). Still a 0-byte placeholder for now, same convention as every
// other asset here. (This started as a standalone /our-story page, first
// with a 5-photo, 5-chapter version, then shorter ones — all replaced;
// the content now lives inside Home instead, no route of its own
// anymore.) File renamed atmosphere.jpg -> add.png per follow-up — same
// image slot, same export name (still accurate to what it shows), just
// the underlying placeholder file's name changed.
export { default as ourStoryAtmosphere } from './images/our-story/add.png'
// Full-section background photo — per follow-up ("background image... add
// image for that"), the same "photo behind the whole section, dimmed +
// overlaid for legibility" technique Heritage.jsx already uses for its
// own section (see heritageBackground above), not a new pattern. 0-byte
// placeholder for now, same convention as every other asset here.
export { default as ourStoryBackground } from './images/our-story/background.png'
// A second, smaller photo — per the same follow-up ("under [the caption]
// also I need to add image"), sitting below the existing framed photo's
// caption in the right column. 0-byte placeholder for now.
export { default as ourStoryMoment } from './images/our-story/moment.png'

// ------------------------------------------------------- Signature Menu --
// .jpg -> .png per follow-up ("change all jpg to png") — file extensions
// only, same export names, so nothing outside this barrel needed to change.
// menuPremiumCoffee removed — Premium Coffee isn't part of the curated
// SIGNATURE_MENU list anymore (see data/signatureMenu.js) and its asset
// file no longer exists on disk. menuVirginMojito -> menuSizzlingBrownie
// per follow-up ("create Sizzling Brownie.png replacing virgin mojito
// place") — Virgin Mojito is unused the same way, so its file slot was
// repurposed (renamed on disk) for Sizzling Brownie's photo instead of
// leaving one dead export and adding an unrelated new file.
export { default as menuChickenWrap } from './images/signature-menu/chicken-wrap.png'
export { default as menuSizzlingBrownie } from './images/signature-menu/sizzling-brownie.png'
export { default as menuRoyalFalooda } from './images/signature-menu/royal-falooda.png'
export { default as menuMonsterShake } from './images/signature-menu/monster-shake.png'
export { default as menuLoadedBurger } from './images/signature-menu/loaded-burger.png'
export { default as menuChickenPopcorn } from './images/signature-menu/chicken-popcorn.png'
// Full-section background photo — per follow-up ("i need to add
// background for this create file ground.png"), same "dimmed/blurred
// photo behind the whole section + warm overlay on top" technique
// Heritage.jsx and OurStoryHero.jsx already use for their own section
// backdrops, not a new pattern. Lives in this same signature-menu/ folder
// (not a new subfolder) since it's still this section's own asset, just a
// second image slot alongside the six card photos above. 0-byte
// placeholder for now, same convention as every other asset here.
export { default as signatureMenuBackground } from './images/signature-menu/ground.png'

// ------------------------------------------------------------ Full Menu --
// Per follow-up ("create files to add images, wire up all, should be
// png, names need [to be] short, create folder and files") — one
// dedicated 0-byte .png placeholder per /menu item that doesn't already
// have a photo (see data/menu.js), in its own folder so it never collides
// with the unrelated Signature Menu preview assets above. Short kebab-case
// names, not the full item name (e.g. "prawn-lollipop-4", not "prawn-
// lolipops-4-pcs") — still unambiguous per item, just shorter to type/
// scan in a 37-file folder. Chicken Wraps, Monster Shake, and Sizzling
// Brownie are NOT duplicated here — those three /menu items are exact
// name-matches for existing Signature Menu photos (menuChickenWrap /
// menuMonsterShake / menuSizzlingBrownie above), so data/menu.js reuses
// those same three exports instead of adding duplicate orphan files.
export { default as menuChickenWrapCheese } from './images/menu/chicken-wrap-cheese.png'
export { default as menuPrawnLollipop4 } from './images/menu/prawn-lollipop-4.png'
export { default as menuPrawnLollipop5 } from './images/menu/prawn-lollipop-5.png'
export { default as menuPopcornMedium } from './images/menu/popcorn-medium.png'
export { default as menuPopcornLarge } from './images/menu/popcorn-large.png'
export { default as menuVegBurger } from './images/menu/veg-burger.png'
export { default as menuChickenBurger } from './images/menu/chicken-burger.png'
export { default as menuBreadOmelette } from './images/menu/bread-omelette.png'
export { default as menuVegSandwich } from './images/menu/veg-sandwich.png'
export { default as menuChickenSandwich } from './images/menu/chicken-sandwich.png'
export { default as menuCheeseSandwich } from './images/menu/cheese-sandwich.png'
export { default as menuCheeseChickenSandwich } from './images/menu/cheese-chicken-sandwich.png'
export { default as menuFriesSmall } from './images/menu/fries-small.png'
export { default as menuFriesMedium } from './images/menu/fries-medium.png'
export { default as menuFriesLarge } from './images/menu/fries-large.png'
export { default as menuCheeseFries } from './images/menu/cheese-fries.png'
export { default as menuLoadedFries } from './images/menu/loaded-fries.png'
export { default as menuMaggiNormal } from './images/menu/maggi-normal.png'
export { default as menuMaggiVeg } from './images/menu/maggi-veg.png'
export { default as menuMaggiPaneer } from './images/menu/maggi-paneer.png'
export { default as menuShakeBanana } from './images/menu/shake-banana.png'
export { default as menuShakeStrawberry } from './images/menu/shake-strawberry.png'
export { default as menuShakeChocolate } from './images/menu/shake-chocolate.png'
export { default as menuShakeVanilla } from './images/menu/shake-vanilla.png'
export { default as menuShakeButterscotch } from './images/menu/shake-butterscotch.png'
export { default as menuShakeMango } from './images/menu/shake-mango.png'
export { default as menuShakeOreo } from './images/menu/shake-oreo.png'
export { default as menuShake5Star } from './images/menu/shake-5star.png'
export { default as menuShakeBlueberry } from './images/menu/shake-blueberry.png'
export { default as menuShakeTenderCoconut } from './images/menu/shake-tender-coconut.png'
export { default as menuShakeDryFruit } from './images/menu/shake-dry-fruit.png'
export { default as menuSmoothieStrawberry } from './images/menu/smoothie-strawberry.png'
export { default as menuSmoothieMango } from './images/menu/smoothie-mango.png'
export { default as menuSmoothieBlueberry } from './images/menu/smoothie-blueberry.png'
export { default as menuDessertMexicanBrownie } from './images/menu/dessert-mexican-brownie.png'
export { default as menuDessertDeadByChocolate } from './images/menu/dessert-dead-by-chocolate.png'
export { default as menuDessertMississippiMud } from './images/menu/dessert-mississippi-mud.png'
// Full-section background photo for the /menu page itself (MenuShowcase.jsx)
// — per follow-up ("i need to add background in the menu section create one
// file add.png"), the same "dimmed/blurred photo behind the whole section +
// warm overlay on top" technique Heritage.jsx/OurStoryHero.jsx/
// SignatureMenu.jsx already use for their own sections (see
// heritageBackground/ourStoryBackground/signatureMenuBackground above), not
// a new pattern. 0-byte placeholder for now, same convention as every other
// asset here.
export { default as menuShowcaseBackground } from './images/menu/add.png'

// ----------------------------------------------------------- Contact ---
// Full-section background photo for the /contact page itself
// (ContactVisit.jsx) — per follow-up ("i need to add background image
// create file lam.png"), the same "dimmed/blurred photo behind the whole
// section + warm overlay on top" technique Heritage.jsx/OurStoryHero.jsx/
// SignatureMenu.jsx/MenuShowcase.jsx already use for their own sections,
// not a new pattern. Scoped to the contact-info area only — the large
// Google Maps section on this page is explicitly locked/untouched, so
// this background does not extend behind or affect it. 0-byte placeholder
// for now, same convention as every other asset here.
export { default as contactVisitBackground } from './images/contact/lam.png'

// -------------------------------------------------------------- Footer ---
export { default as footerCafeFront } from './images/footer/cafe-front.jpg'

// ------------------------------------------------------------ Patterns ---
export { default as patternTexture } from './images/patterns/texture.png'
export { default as patternDivider } from './images/patterns/divider.png'
export { default as patternLeaf } from './images/patterns/leaf.png'
export { default as patternCoffeeBeans } from './images/patterns/coffee-beans.png'

// --------------------------------------------------------------- Video ---
export { default as videoHeroBg } from './videos/hero-bg.mp4'
export { default as videoCoffeeStoryBg } from './videos/coffee-story-bg.mp4'
export { default as videoHeritageBg } from './videos/heritage-bg.mp4'
export { default as videoSignatureBg } from './videos/signature-bg.mp4'
export { default as videoFooterBg } from './videos/footer-bg.mp4'
export { default as videoSteam } from './videos/steam.mp4'
export { default as videoCoffeePour } from './videos/coffee-pour.mp4'

// --------------------------------------------------------------- Fonts ---
// URLs only (for @font-face `src: url(...)` or font-preload links written
// in JS). The active type system still runs through @fontsource in
// styles/fonts.css — see assets/README.md before wiring these in.
export { default as fontHeading } from './fonts/heading.ttf'
export { default as fontBody } from './fonts/body.ttf'

// --------------------------------------------------------------- Icons ---
// Raw SVG URLs (for <img src>/CSS use). Most UI icons in this project come
// from lucide-react/react-icons instead — these are for brand-specific
// marks a design file supplies that a generic icon set can't match 1:1.
export { default as iconCoffee } from './icons/coffee.svg'
export { default as iconBurger } from './icons/burger.svg'
export { default as iconWrap } from './icons/wrap.svg'
export { default as iconNoodles } from './icons/noodles.svg'
export { default as iconDrink } from './icons/drink.svg'
export { default as iconDessert } from './icons/dessert.svg'
export { default as iconLocation } from './icons/location.svg'
export { default as iconPhone } from './icons/phone.svg'
export { default as iconClock } from './icons/clock.svg'
export { default as iconArrow } from './icons/arrow.svg'
export { default as iconInstagram } from './icons/instagram.svg'
export { default as iconFacebook } from './icons/facebook.svg'
export { default as iconWhatsapp } from './icons/whatsapp.svg'
export { default as iconMenu } from './icons/menu.svg'
export { default as iconClose } from './icons/close.svg'
// Swiggy's brand mark — the real official icon (148x148 PNG), not a
// placeholder or a redrawn approximation. Used by the Swiggy order icon
// in Navbar.jsx.
export { default as iconSwiggy } from './icons/swiggy.png'

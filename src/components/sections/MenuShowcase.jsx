import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Utensils, Sandwich, Flame, Soup, Milk, Citrus, Cake } from 'lucide-react'
import { Container } from '@components/ui/Container'
import { Kicker } from '@components/ui/Kicker'
import { ResponsiveImage } from '@components/common/ResponsiveImage'
import { menuShowcaseBackground } from '@assets'
import { MENU_CATEGORIES, MENU_ITEMS } from '@data/menu'
import { fadeUp, staggerContainer, viewportOnce } from '@animations/variants'
import { EASE_LUXURY_OUT } from '@animations/motion.config'
import { cn } from '@utils/cn'

// Card text fade+rise — per follow-up ("the content need to animate"),
// now covers BOTH the name and the description (name only, previously) —
// matching SignatureMenu's own swap from letter-by-letter typing to a
// single calm fade. A variants object (not raw initial/animate), same
// reasoning as ITEM_SHIMMER_VARIANTS below: neither motion.p declares its
// own initial/animate/whileInView, so each inherits its hidden->visible
// trigger by propagation — from the outer grid's whileInView stagger,
// cascading through the small text-block stagger below (see
// TEXT_BLOCK_STAGGER) so the name settles fractionally before the
// description follows, not both popping at once. 8px rise, not the
// shared fadeUp variant's 32px REVEAL_OFFSET — that distance is tuned for
// section-level headings; inside a compact card it reads as an odd jump
// rather than a subtle lift.
const CARD_TEXT_FADE_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_LUXURY_OUT } },
}

// Small stagger between the name and description within one card (~90ms)
// — see CARD_TEXT_FADE_VARIANTS above.
const TEXT_BLOCK_STAGGER = staggerContainer(0.09)

// Light-sweep shimmer, as a variants object (not raw initial/animate props
// like SignatureMenu's own version) — see MenuItemCard below for why: this
// page's grid has no Swiper involved, so a plain nested-variants cascade
// (outer scroll-triggered stagger -> card -> this) reaches every card
// reliably on its own, the same technique Heritage.jsx's own
// TypewriterFade nesting already relies on. duration 0.6 -> 0.85s per
// follow-up ("the animation can little bit reduce pace") — still far
// short of Signature Menu's 1.6s (this page still has up to 40 cards to
// get through, a slow multi-second sweep per card would make browsing/
// filtering feel sluggish), just a touch less hurried than the first pass.
const ITEM_SHIMMER_VARIANTS = {
  hidden: { backgroundPositionX: '-70%' },
  visible: {
    backgroundPositionX: '170%',
    transition: { duration: 0.85, ease: [0.65, 0, 0.35, 1] },
  },
}

// The image's own hover/tap "pop" — per explicit follow-up ("when the
// user touches each box, the image needs to pop up"). whileTap (not just
// whileHover) specifically because a touch tap doesn't reliably trigger
// CSS :hover on mobile — Framer Motion's whileTap fires on real
// pointerdown/touchstart regardless of device, which is what actually
// gives a touch a tactile response. Spring (not the site's usual
// EASE_LUXURY_OUT tween) on purpose: a "pop" reads as a springy, slightly
// overshooting snap, not a smooth eased glide — the two are deliberately
// different animation *languages* for a reason (reveal = calm/premium,
// interaction feedback = alive/tactile).
const IMAGE_POP_TRANSITION = { type: 'spring', stiffness: 320, damping: 20, mass: 0.6 }

/**
 * Full Menu page (/menu) — redesigned per follow-up ("the current version
 * looks like a generic ecommerce card-grid... must feel handcrafted,
 * belong to the same brand as the homepage"). Data/functionality
 * untouched (still data/menu.js's own MENU_CATEGORIES/MENU_ITEMS, still
 * category filtering + an "All" grouped view + AnimatePresence
 * transitions) — this pass is entirely the visual language:
 * - Category filter buttons use the new `category-tab` clip-path (see
 *   base.css) instead of rounded-full pills — a small hand-cut-label
 *   shape, not a generic pill.
 * - Item cards use three new `menu-item-frame-{1,2,3}` clip-path variants
 *   (see base.css) — the *same construction technique* as the homepage's
 *   own menu-card-frame-{1..6}, just built at a shallower depth suited to
 *   these much shorter, scan-first cards (reusing the tall-card depth
 *   here would look broken, not handcrafted, on a ~100px mobile row).
 * - No price anywhere on this page, per explicit follow-up ("prices must
 *   remain data-ready but NOT displayed anywhere on the public menu
 *   UI") — MENU_ITEMS still carries `price: null` per item in the data,
 *   this component just never reads that field.
 * - No per-card rotation — unlike the homepage's 6-card curated preview,
 *   this page scans 40 items at once; the brief itself frames rotation as
 *   optional and warns against irregularity strong enough to look messy
 *   at density, so the handcrafted read comes from the clip-path
 *   variation alone here, not from tilting every card too.
 */

// One quiet icon per category — the image fallback for the large majority
// of items that don't have a real photo loading yet (see data/menu.js's
// own doc comment: every item now has its own file slot, but only 3 —
// Chicken Wraps, Monster Shake, Sizzling Brownie — reuse an existing
// genuine photo; the rest are still 0-byte placeholders). Integrated
// into a soft tinted paper chip below, not a broken-image box.
const CATEGORY_ICONS = {
  starters: Utensils,
  burgers: Sandwich,
  fries: Flame,
  maggi: Soup,
  shakes: Milk,
  smoothies: Citrus,
  desserts: Cake,
}

const ALL_ID = 'all'

// Literal class names, not a template-literal-built string — Tailwind's
// build-time scanner only picks up whole, literally-written class names
// in source; `menu-item-frame-${n}` would never generate any CSS at all
// (confirmed the hard way: it silently compiled to nothing on the first
// pass here).
const ITEM_FRAME_VARIANTS = ['menu-item-frame-1', 'menu-item-frame-2', 'menu-item-frame-3']

/** The small hand-cut-label tag — shared by the category filter buttons and the "All" view's group headings (same shape, two call sites). */
function PaperTag({ active, className, children, ...props }) {
  const isButton = Boolean(props.onClick)
  const Tag = isButton ? 'button' : 'span'
  return (
    <Tag
      type={isButton ? 'button' : undefined}
      className={cn(
        'category-tab ease-luxury-out border px-4 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap uppercase transition-[transform,box-shadow,background-color,color] duration-[var(--duration-fast)] sm:text-sm',
        active
          ? 'border-accent-strong bg-accent text-cream-50 shadow-gold'
          : 'border-espresso-900/15 bg-surface-raised text-espresso-800 shadow-soft hover:-translate-y-0.5 hover:rotate-[0.6deg] hover:shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/**
 * One compact handcrafted card. Same responsive trick as the previous
 * version — the outer article switches `flex` (row) on mobile to
 * `sm:flex-col` on tablet/desktop, and because image/text are plain
 * DOM-order siblings that alone turns "[image] name/description" into
 * "image on top / name / description" with no duplicated markup.
 */
function MenuItemCard({ name, description, image, category, frameClass }) {
  const Icon = CATEGORY_ICONS[category] ?? Utensils
  // Every item now has its own `image` object (see data/menu.js), but most
  // still point at a 0-byte placeholder file until a real photo is dropped
  // in — so "does this card have a usable photo" has to be judged by
  // whether the file actually loads, not just by `image` being non-null
  // (that would just be true for all 40 now, and hideOnError would leave a
  // blank box). Starts optimistic (true) whenever `image` exists; flips to
  // false the moment ResponsiveImage reports the file failed to load,
  // which re-shows the same tinted category-icon chip null used to.
  const [hasPhoto, setHasPhoto] = useState(Boolean(image))

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        'group border-espresso-900/12 bg-surface-raised shadow-soft ease-luxury-out relative flex items-center gap-3 overflow-hidden border p-3 transition-shadow duration-[var(--duration-base)] hover:shadow-md sm:flex-col sm:items-stretch sm:gap-0 sm:p-0',
        frameClass,
      )}
    >
      {/* Fine paper-grain texture — same low-opacity radial-dot technique
          used on the homepage's own paper cards, so this page's material
          reads as the same paper, not a different one. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgb(94 48 35) 0.6px, transparent 0.6px)',
          backgroundSize: '8px 8px',
        }}
      />

      {/* Image, or — for items with no *loadable* photo yet — the category
          icon on a soft tinted paper chip (the same warm Caramel tone the
          rest of the site's own accents use, at low opacity) instead of a
          flat gray box, so it reads as an intentional design choice, not
          a missing asset.
          whileHover/whileTap scale — the "pop up" touch feel (see
          IMAGE_POP_TRANSITION above). Scoped to just this box (own
          overflow-hidden + rounded-md/sm:rounded-none), not the whole
          card — only the photo itself should feel alive under a finger,
          the name/description stay put so nothing shifts unexpectedly.
          zIndex only during the interaction, not otherwise — lets the
          zoomed edge sit cleanly above a neighbouring card in the grid
          for the moment it's touched, without permanently changing this
          card's stacking at rest. */}
      <motion.div
        className="bg-accent/[0.07] relative size-16 shrink-0 overflow-hidden rounded-md sm:aspect-[16/10] sm:size-auto sm:w-full sm:rounded-none"
        whileHover={{ scale: 1.08, zIndex: 30 }}
        whileTap={{ scale: 1.12, zIndex: 30 }}
        transition={IMAGE_POP_TRANSITION}
      >
        {hasPhoto ? (
          <ResponsiveImage
            src={image.src}
            alt={image.alt}
            onLight
            hideOnError
            className="size-full"
            onStatusChange={(status) => {
              if (status === 'error') setHasPhoto(false)
            }}
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Icon
              className="text-accent/50 size-6 sm:size-7"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </div>
        )}
      </motion.div>

      {/* Name + description both fade up now (description was static
          before) — see CARD_TEXT_FADE_VARIANTS/TEXT_BLOCK_STAGGER above.
          This wrapper carries the small stagger between the two; it
          declares no initial/animate/whileInView of its own either, so
          the whole thing still inherits its hidden->visible trigger by
          propagation from the outer grid's own whileInView stagger (see
          MenuShowcase below) — the same nested-variant technique
          Heritage.jsx's heading already uses, just one level deeper now. */}
      <motion.div variants={TEXT_BLOCK_STAGGER} className="relative min-w-0 flex-1 sm:p-4">
        {/* truncate (unchanged) still clips overlong names at the box edge. */}
        <motion.p
          variants={CARD_TEXT_FADE_VARIANTS}
          className="text-ink-inverse truncate text-sm font-semibold sm:text-base"
        >
          {name}
        </motion.p>
        {description && (
          <motion.p
            variants={CARD_TEXT_FADE_VARIANTS}
            className="text-espresso-700/75 mt-0.5 line-clamp-1 text-xs sm:line-clamp-2"
          >
            {description}
          </motion.p>
        )}
      </motion.div>

      {/* Thin inner border following the exact card silhouette — the
          brief's own "thin inner border... slightly imperfect, as if
          printed onto real paper." Reusing the same frameClass on a
          smaller, inset box (inset-1) scales the identical curve down
          proportionally with it — no second hand-tuned shape needed,
          same technique the homepage's own double-layered cards use. */}
      <div
        aria-hidden="true"
        className={cn(
          frameClass,
          'border-espresso-800/20 pointer-events-none absolute inset-1 border',
        )}
      />

      {/* Light-sweep shimmer — the other half of the borrowed Signature
          Menu effect (see ITEM_SHIMMER_VARIANTS above for the pacing
          rationale). mix-blend-screen, not -overlay — confirmed on
          Signature Menu that overlay barely lightens already-bright
          photo pixels; screen reads clearly regardless of what's under
          it. frameClass clip-path trims the sweep to this card's own
          hand-cut silhouette, same as the inner-border layer above. z-20
          — above the inner border (implicit stacking) and the photo, but
          the name/description text block still has its own `relative`
          stacking context above this since it comes later in DOM order
          within the same parent... no: this is the LAST child, so it
          paints last/on top of everything, including the text — exactly
          right, the sweep should cross the text too, not just the photo. */}
      <motion.div
        aria-hidden="true"
        variants={ITEM_SHIMMER_VARIANTS}
        className={cn(frameClass, 'pointer-events-none absolute inset-0 z-20 mix-blend-screen')}
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 42%, rgb(255 244 214 / 0.9) 50%, transparent 58%)',
          backgroundSize: '260% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </motion.article>
  )
}

export function MenuShowcase() {
  const [activeCategory, setActiveCategory] = useState(ALL_ID)

  const itemsByCategory = useMemo(() => {
    const groups = new Map()
    for (const category of MENU_CATEGORIES) groups.set(category.id, [])
    for (const item of MENU_ITEMS) groups.get(item.category)?.push(item)
    return groups
  }, [])

  const visibleCategories =
    activeCategory === ALL_ID
      ? MENU_CATEGORIES
      : MENU_CATEGORIES.filter((c) => c.id === activeCategory)

  return (
    // relative overflow-hidden — required for the absolutely-positioned
    // background layer below to stay scoped to this section, same as
    // Heritage.jsx/SignatureMenu.jsx's own background sections. (Wired in,
    // reverted for looking like an unwanted colour change while add.png
    // was still an empty placeholder, now wired back in per follow-up now
    // that add.png holds a real photo.)
    <section className="bg-atmosphere relative overflow-hidden py-16 lg:py-20">
      {/* The background photo — inset-0, behind everything. brightness
          (0.47) blur(2px) + the 0.72 overlay below are Heritage.jsx's own
          exact values, reused as-is (same technique SignatureMenu.jsx
          already shares) rather than re-deriving a new recipe — this
          page's cream cards/light text need the exact same dimming to
          stay legible regardless of what the photo looks like. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${menuShowcaseBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.47) blur(2px)',
        }}
      />
      {/* Warm overlay on top of the photo — same espresso-toned family
          (rgb(27 18 12)) every other section's own background overlay
          uses, keeping the cream cards/light text exactly as legible as
          they were on the flat bg-atmosphere background regardless of
          what the photo looks like. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[rgb(27_18_12_/_0.72)]" />

      <Container className="relative z-10">
        {/* Editorial intro — "THE VAINIVAS MENU" per follow-up (was the
            more generic "Menu" / "Something delicious for everyone."). */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          <Kicker className="justify-center">Menu</Kicker>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">The Vainav's Menu</h1>
          <p className="text-ink-muted mx-auto mt-4 max-w-md text-lg">
            From comforting classics to indulgent favourites, discover something made for every
            craving.
          </p>
        </motion.div>

        {/* Category filter — hand-cut PaperTag labels, not rounded-full
            pills. Horizontally scrollable + no-scrollbar on mobile
            (bleeds to the true screen edge via -mx-6/px-6, matching
            Container's own gutter, so the scroll affordance actually
            reads as scrollable instead of clipped); wraps to a centered
            multi-row block once there's room, sm+. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="no-scrollbar -mx-6 mt-10 flex gap-2.5 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          {[{ id: ALL_ID, label: 'All' }, ...MENU_CATEGORIES].map((category) => (
            <PaperTag
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
            >
              {category.label}
            </PaperTag>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_LUXURY_OUT }}
            className="mt-10"
          >
            {visibleCategories.map((category, categoryIndex) => {
              const items = itemsByCategory.get(category.id) ?? []
              if (items.length === 0) return null

              return (
                <div key={category.id} className={categoryIndex > 0 ? 'mt-12 lg:mt-14' : undefined}>
                  {/* Only in the "All" view — a single selected category
                      already announces itself via the pressed filter tab
                      above, so a second repeated label here would be
                      redundant. Same PaperTag shape as the filter row
                      (the brief's own "decorative paper... label behind
                      the category heading"), just non-interactive
                      (rendered as a plain span, not a button). */}
                  {activeCategory === ALL_ID && (
                    <PaperTag className="mb-4 inline-block">{category.label}</PaperTag>
                  )}

                  {/* staggerContainer 0.04 -> 0.06 per follow-up ("reduce
                      pace" a little) — each card starts a touch later
                      than the one before it, a bit less rushed on a
                      category with many items. */}
                  <motion.div
                    variants={staggerContainer(0.06)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {items.map((item, itemIndex) => (
                      <MenuItemCard
                        key={item.name}
                        {...item}
                        frameClass={ITEM_FRAME_VARIANTS[itemIndex % ITEM_FRAME_VARIANTS.length]}
                      />
                    ))}
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}

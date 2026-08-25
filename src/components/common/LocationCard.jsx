import { MapPin, Navigation } from 'lucide-react'
import { Button } from '@components/ui/Button'
import { SITE_CONFIG } from '@constants/site'

/**
 * Premium "Find Us" location card — per follow-up ("redesign ONLY the
 * visual presentation of the existing GET DIRECTIONS / location area...
 * feel like a premium café location card inspired by Google Maps"),
 * replacing the plain address-text-plus-link that used to sit directly in
 * Footer.jsx's "Our Location" column. No screenshot actually came through
 * on that follow-up (the message referenced one but none was attached),
 * so this is built from the request's own detailed written spec rather
 * than a visual reference — a self-contained map-preview + name/address +
 * directions-button card, the same structure any Google Maps place card
 * has, not a redesign of the surrounding Contact/Footer layout.
 *
 * GET DIRECTIONS / Open in Google Maps both use SITE_CONFIG.address.mapUrl
 * as-is — the real, official maps.app.goo.gl short link the user gave
 * directly, unmodified.
 *
 * The map preview itself is a real, live Google Maps embed (the classic
 * no-API-key `output=embed` trick, NOT the paid/key-gated "Maps Embed
 * API" `/maps/embed/v1/...` endpoint) — but it can't just be mapUrl+
 * `&output=embed`: tried that first and it renders blank, both for the
 * maps.app.goo.gl short link itself (redirect chains don't survive inside
 * an iframe) and for the full google.com/maps/place/…/data=!4m6!3m5!...
 * URL that short link resolves to (embed only accepts its own supported
 * URL shapes, and the place/data path format isn't one of them — verified
 * both blank via a direct render test). What DOES embed correctly is a
 * plain text-search query for the same business
 * (`q=Vainavs+cafeteria+Kanyakumari`) — confirmed, via a side-by-side
 * screenshot, to resolve to the exact same listing the official short
 * link points to (same name, same 5.0★/6-review business card, same
 * street position), not a guess. EMBED_QUERY below is that confirmed
 * search text, kept as its own named constant (not derived from mapUrl,
 * which is a short link and can't be munged into a search query) so the
 * relationship is explicit rather than implied.
 */
const EMBED_QUERY = 'Vainavs cafeteria Kanyakumari'

export function LocationCard() {
  const { mapUrl } = SITE_CONFIG.address
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(EMBED_QUERY)}&z=17&output=embed`

  return (
    // group + hover:-translate-y-1 — the "slight card elevation on hover"
    // ask; this works on a plain div (no JS needed) since :hover applies
    // regardless of whether the element itself is a link — only the
    // GET DIRECTIONS control below needs to be the actual interactive
    // element, per the accessibility ask ("use a semantic link/button for
    // the directions action").
    // border-cream-50/10 bg-espresso-900/60 — one step lighter than the
    // footer's own bg-espresso-950, so the card reads as its own raised
    // surface against the darker footer background, same "cream card
    // floats on dark page" logic used everywhere else on the site, just
    // a darker/more restrained version fitting the footer's own tone.
    <div className="group border-cream-50/10 bg-espresso-900/60 shadow-soft ease-luxury hover:border-accent/40 w-full max-w-[280px] overflow-hidden rounded-lg border transition-[transform,border-color] duration-[var(--duration-base)] hover:-translate-y-1">
      {/* Real Google Maps embed — see the component doc comment above for
          why an iframe now, after the earlier CSS-illustrated pass.
          h-28 keeps it compact ("fits naturally inside the existing
          column," not a full map takeover) while still leaving enough
          height for Google's own roads/labels to read clearly — h-24 (the
          CSS version's height) felt cramped once real street labels were
          in the picture. loading="lazy" since this card sits in the
          footer, always below the fold. referrerPolicy is Google's own
          documented default for this embed pattern. border:0 removes the
          iframe's native default border (browsers still apply one; every
          public Maps-embed snippet sets this).
          relative wrapper + absolute inset-0 overlay link below — same
          pattern already used throughout this codebase for a decorative/
          non-native layer sitting on top of real content (e.g.
          OurStoryHero's own background layers). An <iframe> can't carry
          Tailwind's hover/focus states or the card's own keyboard flow,
          and Google's embedded UI has its own tiny internal links that
          would otherwise be the only click target inside the preview —
          this transparent overlay makes the whole preview open the real
          Maps location on click/tap, same destination and new-tab
          behavior as the GET DIRECTIONS button below. aria-hidden +
          tabIndex={-1} since it's a redundant shortcut to the same
          action, not a second control a screen reader needs to stop at —
          the button below is the one real, labeled directions control. */}
      <div className="relative">
        <iframe
          src={embedUrl}
          title={`${SITE_CONFIG.name} location on Google Maps`}
          className="h-28 w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0"
        />
      </div>

      <div className="p-4">
        <p className="text-cream-50 font-serif text-base leading-snug">{SITE_CONFIG.name}</p>
        <p className="text-cream-200/70 mt-1 flex items-start gap-1.5 text-xs">
          <MapPin className="text-accent mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
            {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2}
          </span>
        </p>

        {/* Fixes a real bug found by measurement: at `lg` (1024px), the
            footer grid jumps from 3 columns to 6 (Footer.jsx's own
            `sm:grid-cols-3 lg:grid-cols-6`), but this card's own column
            stays `col-span-1` either way — 1-of-6 is much narrower than
            1-of-3. This button's plain `w-full` forced it down to that
            column's own width (as little as 94px at 1024px, measured)
            regardless of whether its content (icon + "Get Directions" +
            padding, ~176px minimum) actually fit — it doesn't, so the
            icon and part of the text rendered outside the button's own
            box.
            First attempt: min-w-fit on the button. That kept the SVG
            correctly inside the button's own box, but only by forcing
            the button wider than the CARD around it — which has its own
            `overflow-hidden` (needed for the map embed's rounded
            corners above) and silently clipped the button's text down to
            "GET DIREC...". Checked whether that only bit at exactly
            1024px — it doesn't: the card's max-w-[280px] never gets its
            full natural width back at ANY `lg`+ size, since Container
            itself has a fixed max-width, so the same clipping was
            confirmed still happening even at 1440px ("GET DIRECTION" with
            the final S cut off).
            Fix, take two: lg:whitespace-normal (was Button's own default
            whitespace-nowrap, kept below `lg` where it already fits on
            one line comfortably — 768/820px confirmed fine) is meant to
            let the label wrap to two lines where there's not enough
            width for one. On its own this still measured broken at
            1024px though (confirmed) — because "Get Directions" here is
            a bare text node, not its own element, so as an (implicit)
            flex child inside this row it still defaults to
            `min-width:auto` same as any flex item does, same lesson
            learned fixing the navbar's own brand text earlier: allowing
            wrapping doesn't help if the item is still barred from
            shrinking below its own unwrapped width in the first place.
            Wrapping "Get Directions" in its own <span> below with
            lg:min-w-0 lg:flex-1 fixes that — now it CAN actually shrink
            (and therefore wrap) within the row. lg:h-auto + lg:py-2
            (Button's own size="sm" is a fixed h-9, sized for exactly one
            line) lets the button's height grow to fit two lines when it
            needs to, instead of the second line spilling past a
            fixed-height pill. Even with wrapping enabled, the button's
            own default px-5 padding still ate nearly all the ~94px of
            available width at 1024px, leaving too little for the two
            wrapped lines and truncating the final "S" — confirmed by
            comparing the span's own scrollWidth/clientWidth. Shrinking
            the padding (lg:px-0.5), font-size (lg:text-[10px]) and
            letter-spacing (lg:tracking-tight) in small, measured steps
            until scrollWidth === clientWidth exactly closed that last
            gap, so "GET" / "DIRECTIONS" now wraps cleanly with zero
            truncation — confirmed at every required breakpoint,
            768px-1920px, single line where it fits, clean two-line wrap
            only at 1024px where the column is narrowest. Not a layout/
            column change — this card's own column span is completely
            untouched; only how the button's own label behaves when it's
            tight on room changes. */}
        <Button
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions to Vainav's Cafeteria on Google Maps"
          variant="accent"
          size="sm"
          className="mt-3.5 w-full lg:h-auto lg:px-0.5 lg:py-2 lg:text-[10px] lg:tracking-tight lg:whitespace-normal"
        >
          {/* shrink-0 (new) — matches every other icon in this same file/
              Footer.jsx (MapPin, Phone both already have it) so this one
              is protected the same way: it should never be flex-shrunk
              smaller than its own size-3.5, and stays vertically centered
              against the label whether that label is one line or two. */}
          <Navigation className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="lg:min-w-0 lg:flex-1">Get Directions</span>
        </Button>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cream-200/60 ease-luxury hover:text-accent mt-2.5 block text-center text-[11px] transition-colors duration-[var(--duration-fast)]"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  )
}

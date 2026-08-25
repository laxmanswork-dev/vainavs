import { Seo } from '@components/common/Seo'
import { Hero } from '@components/sections/Hero'
import { Heritage } from '@components/sections/Heritage'
import { OurStoryHero } from '@components/sections/OurStoryHero'
import { SignatureMenu } from '@components/sections/SignatureMenu'

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="A premium coffeehouse in Kanyakumari serving artisanal coffee, burgers, wraps and handcrafted desserts."
        path="/"
      />
      {/* Categories now renders inside Hero (an overlay near the bottom of
          the video, under the CTA buttons) — see Hero.jsx. */}
      <Hero />
      <Heritage />
      {/* "Our Story" — was a standalone /our-story page; per follow-up
          that page/route was removed entirely and its content (the
          founder's story + the "Traditional at heart..." statement)
          moved here instead, right after Heritage, as normal in-page
          scroll. The Navbar's "Our Story" link now scrolls to
          OurStoryHero's `id="our-story"` instead of navigating
          elsewhere — see Navbar.jsx's ScrollLink.
          One section only — a separate OurStoryStatement section used to
          follow this one (same "Traditional at heart..." lines, full
          size, with its own CTA); removed per explicit follow-up asking
          for one self-contained Our Story section, not content split
          across two — those lines now render at the bottom of
          OurStoryHero's own left column instead. */}
      <OurStoryHero />
      {/* SignatureMenu is now the last Home section before the shared
          Footer (Layout.jsx) — per follow-up ("remove... 'Where Every
          Table Holds A Story'... remove... 'Before You Leave'..."),
          TableStory and FinalCta (both fully deleted, see
          components/sections/) used to follow here. Final page flow:
          Hero -> Heritage -> Our Story -> Signature Menu -> Footer. */}
      <SignatureMenu />
    </>
  )
}

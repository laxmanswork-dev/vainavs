import { Seo } from '@components/common/Seo'
import { MenuShowcase } from '@components/sections/MenuShowcase'

export default function Menu() {
  return (
    <>
      <Seo
        title="Menu"
        description="Explore our menu of artisanal coffee, all-day brunch and handcrafted desserts."
        path="/menu"
      />
      <MenuShowcase />
    </>
  )
}

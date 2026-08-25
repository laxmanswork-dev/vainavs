import { Seo } from '@components/common/Seo'
import { ContactVisit } from '@components/sections/ContactVisit'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Call, WhatsApp, or get directions to Vainav's Cafeteria in Kanyakumari."
        path="/contact"
      />
      <ContactVisit />
    </>
  )
}

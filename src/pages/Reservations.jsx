import { Seo } from '@components/common/Seo'
import { ComingSoon } from '@components/common/ComingSoon'

export default function Reservations() {
  return (
    <>
      <Seo
        title="Reservations"
        description="Reserve a table at Vainav's Cafeteria."
        path="/reservations"
      />
      <ComingSoon
        title="Table Booking is Being Set"
        description="Online reservations will be available here shortly. Call us in the meantime."
      />
    </>
  )
}

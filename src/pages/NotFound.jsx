import { Coffee } from 'lucide-react'
import { Seo } from '@components/common/Seo'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { ROUTES } from '@constants/routes'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" noIndex />
      <div className="flex min-h-[70vh] items-center">
        <Container className="py-24 text-center">
          <Coffee
            className="mx-auto mb-6 size-8 text-amber-400"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-kicker mb-4 text-amber-400">404</p>
          <h1 className="mb-4 text-4xl sm:text-5xl">This Table Isn't Set</h1>
          <p className="text-ink-muted mx-auto mb-10 max-w-md">
            The page you're looking for doesn't exist or has moved.
          </p>
          <Button to={ROUTES.HOME}>Back to Home</Button>
        </Container>
      </div>
    </>
  )
}

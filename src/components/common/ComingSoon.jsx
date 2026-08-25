import { Coffee } from 'lucide-react'
import { Container } from '@components/ui/Container'
import { Button } from '@components/ui/Button'
import { ROUTES } from '@constants/routes'

/**
 * Temporary placeholder body used by pages whose real design hasn't been
 * built yet (see each file in src/pages/). Swap the page's content for the
 * finished section composition when that page is designed — nothing else
 * needs to change since routing/SEO/layout already point at these files.
 */
export function ComingSoon({ title, description }) {
  return (
    <div className="flex min-h-[70vh] items-center">
      <Container className="py-24 text-center">
        <Coffee
          className="mx-auto mb-6 size-8 text-amber-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className="text-kicker mb-4 text-amber-400">Coming Soon</p>
        <h1 className="mb-4 text-4xl sm:text-5xl">{title}</h1>
        <p className="text-ink-muted mx-auto mb-10 max-w-md">{description}</p>
        <Button to={ROUTES.HOME} variant="outline">
          Back to Home
        </Button>
      </Container>
    </div>
  )
}

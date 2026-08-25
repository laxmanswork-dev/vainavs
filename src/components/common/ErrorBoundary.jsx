import { Component } from 'react'
import { Button } from '@components/ui/Button'
import { Container } from '@components/ui/Container'

/**
 * Catches render errors anywhere below it in the tree and shows a branded
 * fallback instead of a blank white screen. Must be a class component —
 * React has no hook equivalent for componentDidCatch/getDerivedStateFromError.
 * Wrap the whole route tree with this once in App.jsx.
 */
export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Swap for a real error-reporting service (Sentry, etc.) before launch.
    console.error('Unhandled UI error:', error, errorInfo)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <main className="bg-atmosphere flex min-h-screen items-center">
        <Container className="py-24 text-center">
          <p className="text-kicker mb-4 text-amber-400">Something went wrong</p>
          <h1 className="mb-4 text-4xl">We lost our train of thought.</h1>
          <p className="text-ink-muted mx-auto mb-10 max-w-md">
            Please refresh the page. If the problem continues, come back a little later.
          </p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </Container>
      </main>
    )
  }
}

import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from '@components/common/ErrorBoundary'
import { SmoothScrollProvider } from '@context/SmoothScrollProvider'
import { AppRoutes } from '@routes/AppRoutes'
import { BrandIntro } from '@components/common/BrandIntro'

export default function App() {
  return (
    <ErrorBoundary>
      {/* Mounted outside SmoothScrollProvider/Lenis on purpose — the intro
          is a plain fixed-position overlay that locks native scroll
          itself for its own short life (see BrandIntro.jsx), so it has no
          dependency on the Lenis/GSAP scroll stack below. Sits above
          every route/page from the very first paint, once per browser
          tab session. */}
      <BrandIntro />
      <SmoothScrollProvider>
        <AppRoutes />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              // Colors mirror the current theme.css palette (Brownie surface,
              // Cream ink, Caramel/Coffee accents) — react-hot-toast renders
              // via a portal outside the app tree, so it can't read Tailwind
              // classes and has to hardcode the same hex values instead.
              background: '#5e3023',
              color: '#f7ece0',
              fontFamily: "'Montserrat Variable', sans-serif",
              fontSize: '0.875rem',
              borderRadius: '0.75rem',
              padding: '0.875rem 1rem',
            },
            success: { iconTheme: { primary: '#c08552', secondary: '#f7ece0' } },
            error: { iconTheme: { primary: '#895737', secondary: '#f7ece0' } },
          }}
        />
      </SmoothScrollProvider>
    </ErrorBoundary>
  )
}

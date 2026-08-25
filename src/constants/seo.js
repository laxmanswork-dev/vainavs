import { SITE_CONFIG } from './site'

/**
 * Fallback SEO values used whenever a page doesn't override them via <Seo>.
 */
export const DEFAULT_SEO = {
  titleTemplate: `%s | ${SITE_CONFIG.name}`,
  defaultTitle: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  // Replace with a real 1200x630 social share image before launch.
  ogImage: `${SITE_CONFIG.url}/og-image.jpg`,
  locale: 'en_IN',
  twitterHandle: '@vainivascafe',
}

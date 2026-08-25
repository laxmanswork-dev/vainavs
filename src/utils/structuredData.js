import { SITE_CONFIG } from '@constants/site'

/**
 * Builds the JSON-LD schema.org/CafeOrCoffeeShop graph embedded on every
 * page via <Seo>. This is what lets Google show rich results (hours,
 * rating, address) for the business in search.
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.line1,
      addressLocality: SITE_CONFIG.address.line2,
      addressCountry: SITE_CONFIG.address.country,
    },
    openingHoursSpecification: SITE_CONFIG.hours.map(({ days, opens, closes }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens,
      closes,
    })),
    sameAs: Object.values(SITE_CONFIG.social),
  }
}

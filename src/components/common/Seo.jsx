import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '@constants/site'
import { DEFAULT_SEO } from '@constants/seo'
import { getLocalBusinessSchema } from '@utils/structuredData'

/**
 * Drop this once per page (inside each page component, not per section) to
 * set that page's title/description/canonical/social preview tags.
 *
 *   <Seo title="Menu" description="..." path="/menu" />
 */
export function Seo({
  title,
  description = DEFAULT_SEO.description,
  image = DEFAULT_SEO.ogImage,
  path = '/',
  noIndex = false,
}) {
  const pageTitle = title ? `${title} | ${SITE_CONFIG.name}` : DEFAULT_SEO.defaultTitle
  const canonicalUrl = `${SITE_CONFIG.url}${path === '/' ? '' : path}`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={DEFAULT_SEO.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULT_SEO.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Local business rich results */}
      <script type="application/ld+json">{JSON.stringify(getLocalBusinessSchema())}</script>
    </Helmet>
  )
}

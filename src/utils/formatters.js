/**
 * Formats a number as Indian Rupees, e.g. formatCurrency(450) -> "₹450".
 * Uses the `en-IN` locale so larger amounts get correct lakh/crore grouping.
 */
export function formatCurrency(amount, { withDecimals = false } = {}) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  }).format(amount)
}

/** Strips a phone number down to a tel: href, e.g. "+91 90000 00000" -> "+919000000000". */
export function toTelHref(phone) {
  return `tel:${phone.replace(/[\s-]/g, '')}`
}

/** Builds a mailto: href, optionally pre-filling a subject line. */
export function toMailHref(email, subject) {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`
}

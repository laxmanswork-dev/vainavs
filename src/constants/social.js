import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import { MapPin } from 'lucide-react'
import { SITE_CONFIG } from './site'

/**
 * Social/contact links paired with their icon component, ready to `.map()`
 * over in the Footer's circular icon row (and FullscreenMenu's own, same
 * array). Lucide has no brand marks, so Instagram/WhatsApp come from
 * react-icons (Font Awesome 6 brand set); "Directions" uses a plain Lucide
 * icon since it isn't a social link.
 *
 * Facebook removed per follow-up ("remove that facebook link") — this is
 * the single shared list both the Footer and the mobile FullscreenMenu
 * render from, so removing it here takes it out of both places at once
 * rather than leaving it live in one and gone from the other.
 * SITE_CONFIG.social.facebook itself is left as-is in site.js — no other
 * code reads it, but it's harmless config, not a broken reference.
 */
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: SITE_CONFIG.social.instagram, icon: FaInstagram },
  { label: 'WhatsApp', href: SITE_CONFIG.social.whatsapp, icon: FaWhatsapp },
  { label: 'Get Directions', href: SITE_CONFIG.address.mapUrl, icon: MapPin },
]

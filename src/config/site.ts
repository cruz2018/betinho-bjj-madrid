// Official contact details — single source of truth for the whole site.

// Canonical production origin (no trailing slash). The apex domain 308-redirects here.
// index.html, public/robots.txt and public/sitemap.xml are static and repeat this URL:
// update them too if it ever changes.
export const SITE_URL = 'https://www.betinhobjjmadrid.com'

const WHATSAPP_NUMBER = '34652386903'

const WHATSAPP_MESSAGE =
  'Hola Betinho, me gustaría reservar una clase de prueba de jiu-jitsu en Madrid.'

export const WHATSAPP_DISPLAY_NUMBER = '+34 652 386 903'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

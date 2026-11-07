// Official contact details — single source of truth for the whole site.

const WHATSAPP_NUMBER = '34652386903'

const WHATSAPP_MESSAGE =
  'Hola Betinho, me gustaría reservar una clase de prueba de jiu-jitsu en Madrid.'

export const WHATSAPP_DISPLAY_NUMBER = '+34 652 386 903'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

// Official training venues. Addresses match each venue's Google Business listing.
// Venue phone numbers are intentionally omitted: the only contact channel is WhatsApp.

export interface ScheduleSlot {
  days: string
  time: string
}

export interface Venue {
  name: string
  address: string
  schedule: ScheduleSlot[]
}

export const VENUES: Venue[] = [
  {
    name: 'Gym Clásico',
    address: 'C. de la Arquitectura, 11, Arganzuela, 28005 Madrid',
    schedule: [{ days: 'Lunes, miércoles y viernes', time: '21:00 - 22:30' }],
  },
  {
    name: 'Gimnasio CrossTraining 645 Retiro',
    address: 'C/ de Fernán González, 41, Retiro, 28009 Madrid',
    schedule: [
      { days: 'Martes y jueves', time: '20:45 - 22:15' },
      { days: 'Viernes', time: '15:45 - 17:00' },
      { days: '2 sábados al mes · Open Mat', time: '17:30 - 19:30' },
    ],
  },
]

export function getDirectionsUrl(venue: Venue): string {
  const query = `${venue.name}, ${venue.address}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

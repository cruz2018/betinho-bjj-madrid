import { WHATSAPP_URL } from '../config/site'

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-floating-button"
      aria-label="Abrir WhatsApp para reservar una clase de prueba"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-black text-white text-xs uppercase tracking-widest px-5 py-3 shadow-lg hover:bg-gray-800 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      WhatsApp
    </a>
  )
}

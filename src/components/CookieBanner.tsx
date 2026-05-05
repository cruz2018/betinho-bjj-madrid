import { useState } from 'react'

const STORAGE_KEY = 'cookie-choice'

export default function CookieBanner() {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem(STORAGE_KEY)
  )

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'rejected')
    setVisible(false)
  }

  function manage() {
    localStorage.setItem(STORAGE_KEY, 'managed')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      data-testid="cookie-banner"
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="text-sm text-gray-600 leading-relaxed flex-1">
          Utilizamos cookies y tecnologías similares para mejorar tu experiencia
          de navegación, seguridad, análisis y personalización.
        </p>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            data-testid="accept-cookies-button"
            onClick={accept}
            className="bg-black text-white text-xs uppercase tracking-widest px-6 py-2.5 transition-colors duration-150 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Aceptar todo
          </button>
          <button
            onClick={reject}
            className="border border-gray-300 text-gray-700 text-xs uppercase tracking-widest px-6 py-2.5 transition-colors duration-150 hover:border-black hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Rechazar
          </button>
          <button
            onClick={manage}
            className="text-gray-500 text-xs uppercase tracking-widest px-4 py-2.5 underline underline-offset-4 hover:text-black transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Gestionar cookies
          </button>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import gilbertoLogo from '../assets/images/betinho-logo.svg'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Profesor', href: '#profesor' },
  { label: 'Clases', href: '#clases' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 shrink-0" aria-label="Gilberto García Brazilian Martial Arts — Inicio">
          <img
            src={gilbertoLogo}
            alt=""
            width={559}
            height={534}
            className="h-11 lg:h-14 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contacto"
          className="hidden lg:inline-flex items-center bg-black text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-gray-800 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:outline-offset-[-3px] shrink-0"
        >
          Clase de prueba
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="lg:hidden flex flex-col gap-1.5 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <span
            className={`block w-6 h-px bg-black transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-black transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-1" aria-label="Menú móvil">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-sm uppercase tracking-widest text-gray-600 hover:text-black py-3 border-b border-gray-100 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={closeMenu}
              className="mt-4 inline-flex justify-center bg-black text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-gray-800 transition-colors duration-150"
            >
              Clase de prueba
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

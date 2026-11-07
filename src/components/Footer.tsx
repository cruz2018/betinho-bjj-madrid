import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_URL } from '../config/site'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-black text-white py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-10 border-b border-gray-800">
          {/* Brand */}
          <div>
            <p className="text-sm font-medium tracking-tight mb-2">
              Gilberto García Brazilian Martial Arts
            </p>
            <p className="text-xs text-gray-500 font-light">
              Jiu-Jitsu / Luta Livre / Judo
            </p>
            <p className="text-xs text-gray-500 font-light mt-1">
              Madrid, España
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navegación del pie de página">
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-4">
              Navegación
            </p>
            <ul className="flex flex-col gap-2">
              {[
                ['Inicio', '#inicio'],
                ['Profesor', '#profesor'],
                ['Clases', '#clases'],
                ['Galería', '#galeria'],
                ['Contacto', '#contacto'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-xs text-gray-500 hover:text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-4">
              Contacto
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {WHATSAPP_DISPLAY_NUMBER}
            </a>
            <p className="text-xs text-gray-500 font-light mt-2">
              Madrid, España
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-gray-600 font-light">
            &copy; {currentYear} Gilberto García Cerqueira. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-700 font-light">
            Jiu-Jitsu / Luta Livre / Judo
          </p>
        </div>
      </div>
    </footer>
  )
}

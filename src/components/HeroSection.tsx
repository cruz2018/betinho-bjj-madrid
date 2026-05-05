import gilbertoLogo from '../assets/images/betinho_logo_01.jpeg'
import heroGroupPhoto from '../assets/images/betinho_equipo_01.jpeg'

const WHATSAPP_URL =
  'https://wa.me/34652386903?text=Hola%20Betinho%2C%20me%20gustar%C3%ADa%20reservar%20una%20clase%20de%20prueba%20de%20jiu-jitsu%20en%20Madrid.'

export default function HeroSection() {
  return (
    <section id="inicio" data-testid="hero-section">
      {/* Centered hero content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-6 pt-20 pb-16">
        <img
          src={gilbertoLogo}
          alt="Gilberto García Brazilian Martial Arts"
          className="h-20 md:h-28 lg:h-36 w-auto object-contain mb-10 lg:mb-14"
        />

        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-6">
          Jiu-Jitsu &nbsp;/&nbsp; Luta Livre &nbsp;/&nbsp; Judo &mdash; Madrid
        </p>

        <h1 className="text-5xl md:text-6xl lg:text-8xl font-light tracking-tight text-black leading-[1.05] mb-6 max-w-4xl">
          Jiu-Jitsu brasileño
          <br />
          en Madrid
        </h1>

        <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mb-10 font-light">
          Entrena con el profesor Gilberto García &ldquo;Betinho&rdquo;,
          cinturón negro de jiu-jitsu, 3º Dan en luta livre y 3º Dan en judo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="#contacto"
            data-testid="hero-primary-cta"
            className="bg-black text-white text-xs uppercase tracking-widest px-8 py-4 hover:bg-gray-800 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Reservar clase de prueba
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-hero-cta"
            aria-label="Abrir WhatsApp para reservar una clase de prueba"
            className="border border-black text-black text-xs uppercase tracking-widest px-8 py-4 hover:bg-black hover:text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>

      {/* Full-width hero image */}
      <div className="w-full h-[50vh] md:h-[65vh] lg:h-[80vh] overflow-hidden">
        <img
          src={heroGroupPhoto}
          alt="Alumnos del profesor Gilberto García Betinho entrenando jiu-jitsu en Madrid"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  )
}

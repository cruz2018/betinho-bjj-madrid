import heroGroupPhoto from '../assets/images/betinho_equipo_01.jpeg'
import galleryGroupPhoto from '../assets/images/betinho_equipo_01.jpeg'

export default function GallerySection() {
  return (
    <section
      id="galeria"
      data-testid="gallery-section"
      className="bg-white py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
            Academia
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black leading-tight">
            Galería
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          <div className="overflow-hidden h-72 md:h-96 lg:h-[500px]">
            <img
              src={heroGroupPhoto}
              alt="Grupo de alumnos entrenando jiu-jitsu brasileño en Madrid con el profesor Betinho"
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
          <div className="overflow-hidden h-72 md:h-96 lg:h-[500px]">
            <img
              src={galleryGroupPhoto}
              alt="Clase de jiu-jitsu brasileño y luta livre en Madrid — Gilberto García Cerqueira Betinho"
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

import teamPhoto from '../assets/images/betinho_equipo_01.jpeg'
import academyLogo from '../assets/images/betinho_logo_01.jpeg'

const galleryItems = [
  {
    src: teamPhoto,
    alt: 'Grupo de alumnos de Betinho BJJ Madrid después de una clase de jiu-jitsu brasileño',
    caption: 'Equipo Betinho BJJ Madrid',
    className: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    src: academyLogo,
    alt: 'Logo de Betinho BJJ Madrid para la academia de jiu-jitsu brasileño y luta livre en Madrid',
    caption: 'Academia de jiu-jitsu brasileño y luta livre',
    className: '',
  },
  {
    src: teamPhoto,
    alt: 'Alumnos entrenando jiu-jitsu brasileño y lucha en Madrid con el equipo de Betinho',
    caption: 'Entrenamiento para todos los niveles',
    className: '',
  },
]

export default function GallerySection() {
  return (
    <section
      id="galeria"
      data-testid="gallery-section"
      className="bg-white py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
            Academia
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black leading-tight">
            Galería
          </h2>
          <p className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed font-light">
            Momentos de entrenamiento, equipo y vida diaria en el tatami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[260px] md:auto-rows-[320px] gap-3 lg:gap-4">
          {galleryItems.map((item) => (
            <figure
              key={`${item.caption}-${item.alt}`}
              className={`group relative overflow-hidden bg-gray-100 ${item.className}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/70 px-5 py-4 text-sm text-white leading-snug opacity-100 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

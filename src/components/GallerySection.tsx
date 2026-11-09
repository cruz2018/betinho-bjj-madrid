import { useCallback, useState } from 'react'
import { GALLERY_PAGE_SIZE } from '../config/gallery'
import { galleryPhotos } from '../lib/galleryPhotos'
import GalleryLightbox from './GalleryLightbox'

export default function GallerySection() {
  const [visibleCount, setVisibleCount] = useState(GALLERY_PAGE_SIZE)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeLightbox = useCallback(() => setOpenIndex(null), [])

  const visiblePhotos = galleryPhotos.slice(0, visibleCount)
  const hasMore = visibleCount < galleryPhotos.length

  if (galleryPhotos.length === 0) return null

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

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
          {visiblePhotos.map((photo, index) => (
            <li key={photo.id}>
              <figure className="group relative aspect-square overflow-hidden bg-gray-100">
                <button
                  type="button"
                  className="block h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  aria-label={`Ampliar foto: ${photo.alt}`}
                  onClick={() => setOpenIndex(index)}
                >
                  <img
                    src={photo.thumbSrc}
                    alt={photo.alt}
                    width={photo.thumbWidth}
                    height={photo.thumbHeight}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </button>
                {photo.caption && (
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 text-sm text-white leading-snug opacity-100 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              className="border border-black px-8 py-3 text-sm uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white"
              onClick={() => setVisibleCount((count) => count + GALLERY_PAGE_SIZE)}
            >
              Ver más fotos
            </button>
          </div>
        )}
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          photos={galleryPhotos}
          index={openIndex}
          onClose={closeLightbox}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  )
}

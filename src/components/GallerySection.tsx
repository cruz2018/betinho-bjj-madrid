import { useCallback, useState } from 'react'
import { GALLERY_PAGE_SIZE } from '../config/gallery'
import {
  GALLERY_FILTERS,
  availableCategories,
  eventsForFilter,
  showTrainingFor,
  visibleFilters,
} from '../lib/galleryModel'
import type { GalleryFilter, GalleryPhoto } from '../lib/galleryModel'
import { galleryEvents, trainingPhotos } from '../lib/galleryPhotos'
import EventCard from './EventCard'
import GalleryFilters from './GalleryFilters'
import GalleryLightbox from './GalleryLightbox'
import PhotoGrid from './PhotoGrid'

interface LightboxState {
  photos: GalleryPhoto[]
  index: number
  label: string
}

const TRAINING_LABEL = 'Entrenamientos'

// Gallery content is static, so the available filters are computed once.
const filters = visibleFilters(availableCategories(trainingPhotos, galleryEvents))

export default function GallerySection() {
  const [filter, setFilter] = useState<GalleryFilter>('todos')
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const navigateLightbox = useCallback(
    (index: number) => setLightbox((current) => (current ? { ...current, index } : current)),
    [],
  )
  const openLightbox = useCallback(
    (photos: GalleryPhoto[], index: number, label: string) => setLightbox({ photos, index, label }),
    [],
  )

  const events = eventsForFilter(galleryEvents, filter)
  const showTraining = showTrainingFor(filter) && trainingPhotos.length > 0
  const activeLabel = GALLERY_FILTERS.find((option) => option.value === filter)?.label

  if (trainingPhotos.length === 0 && galleryEvents.length === 0) return null

  return (
    <section id="galeria" data-testid="gallery-section" aria-labelledby="galeria-titulo" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">Academia</p>
          <h2
            id="galeria-titulo"
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black leading-tight"
          >
            Galería
          </h2>
          <p className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed font-light">
            {galleryEvents.length > 0
              ? 'Graduaciones, eventos y momentos de entrenamiento en el tatami.'
              : 'Momentos de entrenamiento, equipo y vida diaria en el tatami.'}
          </p>
        </div>

        <GalleryFilters filters={filters} active={filter} onChange={setFilter} />
        {filters.length > 0 && (
          <p className="sr-only" aria-live="polite">
            Mostrando: {activeLabel}
          </p>
        )}

        {events.length > 0 && (
          <div className="space-y-20 lg:space-y-28">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onOpen={openLightbox} />
            ))}
          </div>
        )}

        {showTraining && (
          <div className={events.length > 0 ? 'mt-20 lg:mt-28 border-t border-black pt-10 lg:pt-14' : undefined}>
            {/* Only add a sub-heading when training photos share the page with events. */}
            {galleryEvents.length > 0 && (
              <h3 className="mb-10 text-3xl md:text-4xl font-light tracking-tight text-black leading-tight">
                {TRAINING_LABEL}
              </h3>
            )}
            <PhotoGrid
              key={filter}
              photos={trainingPhotos}
              pageSize={GALLERY_PAGE_SIZE}
              onOpen={(index) => openLightbox(trainingPhotos, index, TRAINING_LABEL)}
            />
          </div>
        )}
      </div>

      {lightbox && (
        <GalleryLightbox
          photos={lightbox.photos}
          index={lightbox.index}
          label={lightbox.label}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  )
}

import type { EventCollection, GalleryEvent, GalleryPhoto } from '../lib/galleryModel'
import PhotoGrid from './PhotoGrid'

interface EventCardProps {
  event: GalleryEvent
  /** Opens the lightbox on `photos[index]`, labelled with the collection title. */
  onOpen: (photos: GalleryPhoto[], index: number, label: string) => void
}

export default function EventCard({ event, onOpen }: EventCardProps) {
  const headingId = `evento-${event.id}`

  return (
    <article aria-labelledby={headingId} className="border-t border-black pt-10 lg:pt-14">
      <header className="mb-10 max-w-3xl lg:mb-14">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gray-400">
          <time dateTime={event.dateTime}>{event.dateLabel}</time>
        </p>
        <h3 id={headingId} className="text-3xl font-light leading-tight tracking-tight text-black md:text-4xl">
          {event.title}
        </h3>
        {event.description.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-base font-light leading-relaxed text-gray-500 md:text-lg">
            {paragraph}
          </p>
        ))}
      </header>

      <div className={`grid gap-14 ${event.collections.length > 1 ? 'lg:grid-cols-2 lg:gap-12' : ''}`}>
        {event.collections.map((collection) => (
          <EventGallery
            key={collection.id}
            collection={collection}
            onOpen={(index) => onOpen(collection.photos, index, collection.title)}
          />
        ))}
      </div>
    </article>
  )
}

interface EventGalleryProps {
  collection: EventCollection
  onOpen: (index: number) => void
}

function EventGallery({ collection, onOpen }: EventGalleryProps) {
  const { featured, photos } = collection
  const rest = photos.slice(1)
  const headingId = `coleccion-${collection.id}`

  return (
    <section aria-labelledby={headingId}>
      <h4 id={headingId} className="mb-2 text-lg font-normal tracking-tight text-black md:text-xl">{collection.title}</h4>
      <p className="mb-5 text-sm font-light text-gray-400">
        {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
      </p>
      {collection.description && (
        <p className="mb-6 text-base font-light leading-relaxed text-gray-500">{collection.description}</p>
      )}

      {/* Featured photos share one 3:2 frame so collections line up side by side;
          the lightbox always shows the complete, uncropped photo. */}
      <figure className="group mb-3 md:mb-4">
        <button
          type="button"
          className="block w-full cursor-zoom-in overflow-hidden bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          aria-label={`Ampliar foto: ${featured.alt}`}
          onClick={() => onOpen(0)}
        >
          <img
            src={featured.src}
            srcSet={`${featured.thumbSrc} ${featured.thumbWidth}w, ${featured.src} ${featured.width}w`}
            sizes="(min-width: 1024px) 45vw, 100vw"
            alt={featured.alt}
            width={featured.width}
            height={featured.height}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] h-auto w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </button>
        {/* Captions sit below the photo so they never depend on hover. */}
        {featured.caption && (
          <figcaption className="mt-3 text-sm font-light leading-snug text-gray-500">{featured.caption}</figcaption>
        )}
      </figure>

      {rest.length > 0 && (
        <PhotoGrid
          photos={rest}
          onOpen={(index) => onOpen(index + 1)}
          columnsClassName="grid-cols-2 sm:grid-cols-4"
          showCaptions={false}
        />
      )}
    </section>
  )
}

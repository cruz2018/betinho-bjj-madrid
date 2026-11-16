import { Fragment } from 'react'
import type { EventCollection, GalleryEvent, GalleryPhoto } from '../lib/galleryModel'
import PhotoGrid from './PhotoGrid'

interface EventCardProps {
  event: GalleryEvent
  /** Opens the lightbox on `photos[index]`, labelled with the collection title. */
  onOpen: (photos: GalleryPhoto[], index: number, label: string) => void
}

// Editorial layout for events with exactly two collections (lg and up):
//
//   [ featured A ] [ featured B ]     row 1: featured photos side by side
//   [ more photos of A (full width) ] row 2
//   [ more photos of B (full width) ] row 3
//
// In the DOM each collection's extra photos follow its own featured photo, so
// on tablet and mobile (single column) the reading order stays per collection.
const EDITORIAL_PLACEMENT = [
  { featured: 'lg:col-start-1 lg:row-start-1', more: 'lg:col-span-2 lg:row-start-2' },
  { featured: 'lg:col-start-2 lg:row-start-1', more: 'lg:col-span-2 lg:row-start-3' },
] as const

export default function EventCard({ event, onOpen }: EventCardProps) {
  const headingId = `evento-${event.id}`
  const editorial = event.collections.length === 2

  return (
    <article aria-labelledby={headingId} className="border-t border-black pt-10 lg:pt-14">
      <header className="mb-8 max-w-3xl lg:mb-10">
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

      <div className={`grid gap-y-10 ${editorial ? 'lg:grid-cols-2 lg:gap-x-8 lg:gap-y-8' : ''}`}>
        {event.collections.map((collection, index) => {
          const open = (photoIndex: number) => onOpen(collection.photos, photoIndex, collection.title)
          const placement = editorial ? EDITORIAL_PLACEMENT[index] : undefined
          return (
            <Fragment key={collection.id}>
              <CollectionFeature collection={collection} onOpen={open} className={placement?.featured} />
              {collection.photos.length > 1 && (
                <CollectionMore collection={collection} onOpen={open} className={placement?.more} />
              )}
            </Fragment>
          )
        })}
      </div>
    </article>
  )
}

interface CollectionPartProps {
  collection: EventCollection
  /** Index within `collection.photos`. */
  onOpen: (index: number) => void
  className?: string
}

/** Collection title, photo count and the featured photo with its caption. */
function CollectionFeature({ collection, onOpen, className = '' }: CollectionPartProps) {
  const { featured, photos } = collection
  const headingId = `coleccion-${collection.id}`

  return (
    <section aria-labelledby={headingId} className={className}>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h4 id={headingId} className="text-lg font-normal tracking-tight text-black md:text-xl">
          {collection.title}
        </h4>
        <p className="shrink-0 text-xs uppercase tracking-[0.2em] text-gray-400">
          {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
        </p>
      </div>
      {collection.description && (
        <p className="mb-5 text-base font-light leading-relaxed text-gray-500">{collection.description}</p>
      )}

      {/* Featured photos share one 3:2 frame so collections line up side by side;
          the lightbox always shows the complete, uncropped photo. */}
      <figure className="group">
        <button
          type="button"
          className="block w-full cursor-zoom-in overflow-hidden bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          aria-label={`Ampliar foto: ${featured.alt}`}
          onClick={() => onOpen(0)}
        >
          <img
            src={featured.src}
            srcSet={`${featured.thumbSrc} ${featured.thumbWidth}w, ${featured.src} ${featured.width}w`}
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
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
          <figcaption className="mt-3 border-l border-black pl-3 text-sm leading-snug text-gray-700">
            {featured.caption}
          </figcaption>
        )}
      </figure>
    </section>
  )
}

/** The rest of a collection's photos, as a labelled thumbnail grid. */
function CollectionMore({ collection, onOpen, className = '' }: CollectionPartProps) {
  const labelId = `coleccion-${collection.id}-mas`
  const rest = collection.photos.slice(1)

  return (
    <div role="group" aria-labelledby={labelId} className={className}>
      <p id={labelId} className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-400">
        Más fotos · {collection.title}
      </p>
      <PhotoGrid
        photos={rest}
        onOpen={(index) => onOpen(index + 1)}
        columnsClassName={rest.length >= 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'}
        aspectClassName="aspect-[4/3]"
        showCaptions={false}
      />
    </div>
  )
}

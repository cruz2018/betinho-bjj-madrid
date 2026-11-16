import { useState } from 'react'
import type { GalleryPhoto } from '../lib/galleryModel'

interface PhotoGridProps {
  photos: GalleryPhoto[]
  /** Called with the index of the clicked photo within `photos`. */
  onOpen: (index: number) => void
  /** Photos shown per "Ver más fotos" step. Omit to show every photo. */
  pageSize?: number
  /** Tailwind grid-column classes. */
  columnsClassName?: string
  /**
   * Overlay captions on the tiles. Turn off for small tiles, where the caption
   * would cover the photo; captions are always shown in the lightbox.
   */
  showCaptions?: boolean
}

export default function PhotoGrid({
  photos,
  onOpen,
  pageSize,
  columnsClassName = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  showCaptions = true,
}: PhotoGridProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize ?? photos.length)
  const visiblePhotos = pageSize ? photos.slice(0, visibleCount) : photos
  const hasMore = visiblePhotos.length < photos.length

  return (
    <>
      <ul className={`grid gap-2 md:gap-3 lg:gap-4 ${columnsClassName}`}>
        {visiblePhotos.map((photo, index) => (
          <li key={photo.id}>
            <figure className="group relative aspect-square overflow-hidden bg-gray-100">
              <button
                type="button"
                className="block h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-label={`Ampliar foto: ${photo.alt}`}
                onClick={() => onOpen(index)}
              >
                <img
                  src={photo.thumbSrc}
                  alt={photo.alt}
                  width={photo.thumbWidth}
                  height={photo.thumbHeight}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </button>
              {showCaptions && photo.caption && (
                // Always visible on touch screens; on larger screens it appears on hover
                // and on keyboard focus. The caption is also shown in the lightbox.
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 text-sm text-white leading-snug opacity-100 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      {hasMore && pageSize && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="min-h-11 border border-black px-8 py-3 text-sm uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:transition-none"
            onClick={() => setVisibleCount((count) => count + pageSize)}
          >
            Ver más fotos
          </button>
        </div>
      )}
    </>
  )
}

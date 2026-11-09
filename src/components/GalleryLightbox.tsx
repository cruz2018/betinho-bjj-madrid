import { useEffect, useRef } from 'react'
import type { TouchEvent } from 'react'
import type { GalleryPhoto } from '../lib/galleryPhotos'

interface GalleryLightboxProps {
  photos: GalleryPhoto[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const SWIPE_THRESHOLD_PX = 50

export default function GalleryLightbox({ photos, index, onClose, onNavigate }: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const photo = photos[index]
  const total = photos.length
  const showPrevious = () => onNavigate((index - 1 + total) % total)
  const showNext = () => onNavigate((index + 1) % total)

  // Keyboard: Esc closes, arrows navigate.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowLeft') onNavigate((index - 1 + total) % total)
      else if (event.key === 'ArrowRight') onNavigate((index + 1) % total)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [index, total, onClose, onNavigate])

  // Lock page scroll, move focus into the dialog and give it back on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [])

  // Preload the neighbours so navigating feels instant.
  useEffect(() => {
    for (const neighbour of [photos[(index + 1) % total], photos[(index - 1 + total) % total]]) {
      const image = new Image()
      image.src = neighbour.src
    }
  }, [photos, index, total])

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) < Math.abs(deltaY)) return
    if (deltaX < 0) showNext()
    else showPrevious()
  }

  const buttonClass =
    'flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotos"
      data-testid="gallery-lightbox"
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm text-white/60">
        <span aria-live="polite">
          {index + 1} / {total}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Cerrar"
          className={buttonClass}
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-16">
        <button
          type="button"
          aria-label="Foto anterior"
          className={`${buttonClass} absolute left-2 top-1/2 hidden -translate-y-1/2 md:flex`}
          onClick={(event) => {
            event.stopPropagation()
            showPrevious()
          }}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <figure className="flex max-h-full flex-col items-center" onClick={(event) => event.stopPropagation()}>
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            decoding="async"
            className="max-h-[calc(100vh-9rem)] w-auto max-w-full select-none object-contain"
            draggable={false}
          />
          {photo.caption && (
            <figcaption className="mt-3 text-center text-sm font-light text-white/70">{photo.caption}</figcaption>
          )}
        </figure>

        <button
          type="button"
          aria-label="Foto siguiente"
          className={`${buttonClass} absolute right-2 top-1/2 hidden -translate-y-1/2 md:flex`}
          onClick={(event) => {
            event.stopPropagation()
            showNext()
          }}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="py-3 text-center text-xs text-white/40 md:hidden">Desliza para ver más</p>
    </div>
  )
}

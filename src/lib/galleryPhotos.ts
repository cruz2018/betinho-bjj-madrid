import { galleryManifest } from '../assets/gallery/manifest'
import { GALLERY_FALLBACK_ALT, galleryOverrides } from '../config/gallery'
import { galleryEvents as galleryEventConfigs } from '../config/galleryEvents'
import { eventPhotoContext, eventPhotoIds, resolveEvents } from './galleryModel'
import type { GalleryPhoto } from './galleryModel'

export type { GalleryPhoto } from './galleryModel'

const files = import.meta.glob<string>('../assets/gallery/**/*.webp', {
  eager: true,
  import: 'default',
})

const THUMB_SUFFIX = '-thumb'

// Default names from phones, cameras and messaging apps say nothing about the photo.
const NON_DESCRIPTIVE_NAME =
  /^(whatsapp-image|whatsapp-video|img|image|imagen|dsc|dscn|dscf|pxl|mvimg|photo|foto|screenshot|captura|signal|telegram)(-|$)|^[\d-]+$/

function humanize(slug: string): string {
  const text = slug.replace(/[-_]+/g, ' ').trim()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function buildPhotos(): GalleryPhoto[] {
  const eventContext = eventPhotoContext(galleryEventConfigs)
  const fullByName = new Map<string, string>()
  const thumbByName = new Map<string, string>()

  for (const [filePath, url] of Object.entries(files)) {
    const name = filePath.split('/').pop()!.replace(/\.webp$/, '')
    if (name.endsWith(THUMB_SUFFIX)) thumbByName.set(name.slice(0, -THUMB_SUFFIX.length), url)
    else fullByName.set(name, url)
  }

  const names = [...fullByName.keys()].sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))

  return names.map((name, index) => {
    const src = fullByName.get(name)!
    const size = galleryManifest[name]
    const override = galleryOverrides[name] ?? {}
    const event = eventContext.get(name)
    // Event photos only get the captions written in galleryOverrides: a file name
    // is not a reliable description of a ceremony (and may contain dates).
    const nameCaption = event || NON_DESCRIPTIVE_NAME.test(name) ? undefined : humanize(name)
    const caption = override.caption ?? nameCaption
    const fallbackAlt = event
      ? `${event.collectionTitle} en Betinho BJJ Madrid (foto ${event.position} de ${event.total})`
      : `${GALLERY_FALLBACK_ALT} (foto ${index + 1} de ${names.length})`

    return {
      id: name,
      src,
      width: size?.width ?? 1600,
      height: size?.height ?? 1200,
      thumbSrc: thumbByName.get(name) ?? src,
      thumbWidth: size?.thumbWidth ?? 600,
      thumbHeight: size?.thumbHeight ?? 450,
      alt: override.alt ?? caption ?? fallbackAlt,
      caption,
    }
  })
}

/** Every optimized photo, in file-name order. */
export const galleryPhotos = buildPhotos()

const photosById = new Map(galleryPhotos.map((photo) => [photo.id, photo]))
const assignedToEvents = eventPhotoIds(galleryEventConfigs)

/** Events that have at least one photo available. */
export const galleryEvents = resolveEvents(galleryEventConfigs, photosById)

/** Photos not assigned to any event: shown under "Entrenamientos". */
export const trainingPhotos = galleryPhotos.filter((photo) => !assignedToEvents.has(photo.id))

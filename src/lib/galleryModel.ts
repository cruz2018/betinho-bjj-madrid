// Pure gallery logic: types, event resolution and category filtering.
//
// This module has no Vite- or browser-specific imports so it can be unit
// tested directly with `node --test` (see tests/galleryModel.test.ts).

export interface GalleryPhoto {
  id: string
  src: string
  width: number
  height: number
  thumbSrc: string
  thumbWidth: number
  thumbHeight: number
  alt: string
  caption?: string
}

/** Content categories. "Todos" is a filter value, not a category. */
export type GalleryCategory = 'entrenamientos' | 'graduaciones' | 'eventos'
export type GalleryFilter = 'todos' | GalleryCategory

export const GALLERY_FILTERS: readonly { value: GalleryFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'entrenamientos', label: 'Entrenamientos' },
  { value: 'graduaciones', label: 'Graduaciones' },
  { value: 'eventos', label: 'Eventos' },
]

/** A photo collection inside an event, as written in the config. */
export interface EventCollectionConfig {
  id: string
  title: string
  description?: string
  /** Optimized photo ids (file name without extension), in display order. */
  photoIds: string[]
  /** Photo shown large at the top of the collection. Defaults to the first photo. */
  featuredPhotoId?: string
}

/** An academy event (graduation, competition, seminar…), as written in the config. */
export interface GalleryEventConfig {
  id: string
  category: Exclude<GalleryCategory, 'entrenamientos'>
  title: string
  /** Machine-readable date for <time>: "YYYY-MM" when the day is not confirmed, or "YYYY-MM-DD". */
  dateTime: string
  /** Visible date, e.g. "Noviembre de 2026". */
  dateLabel: string
  /** Paragraphs of the event description. */
  description: string[]
  collections: EventCollectionConfig[]
}

export interface EventCollection {
  id: string
  title: string
  description?: string
  featured: GalleryPhoto
  /** All photos of the collection in display order, featured photo first. */
  photos: GalleryPhoto[]
}

export interface GalleryEvent extends Omit<GalleryEventConfig, 'collections'> {
  collections: EventCollection[]
}

/**
 * Links event configs to the photos that actually exist.
 *
 * Unknown photo ids are dropped, collections without photos are dropped and
 * events without collections are dropped, so an event never renders empty
 * while its photographs are still pending.
 */
export function resolveEvents(
  configs: readonly GalleryEventConfig[],
  photosById: ReadonlyMap<string, GalleryPhoto>,
): GalleryEvent[] {
  const events: GalleryEvent[] = []

  for (const config of configs) {
    const collections: EventCollection[] = []

    for (const collection of config.collections) {
      const uniqueIds = [...new Set(collection.photoIds)]
      const found = uniqueIds
        .map((id) => photosById.get(id))
        .filter((photo): photo is GalleryPhoto => photo !== undefined)
      if (found.length === 0) continue

      const featured =
        (collection.featuredPhotoId && found.find((photo) => photo.id === collection.featuredPhotoId)) ||
        found[0]

      collections.push({
        id: collection.id,
        title: collection.title,
        description: collection.description,
        featured,
        photos: [featured, ...found.filter((photo) => photo !== featured)],
      })
    }

    if (collections.length > 0) events.push({ ...config, collections })
  }

  return events
}

/** Ids of every photo assigned to an event, so they are not repeated among training photos. */
export function eventPhotoIds(configs: readonly GalleryEventConfig[]): Set<string> {
  return new Set(configs.flatMap((event) => event.collections.flatMap((collection) => collection.photoIds)))
}

export interface EventPhotoContext {
  collectionTitle: string
  position: number
  total: number
}

/**
 * Where each event photo sits (collection title, 1-based position, total), used
 * to give event photos a meaningful fallback alt text instead of the generic
 * training description. Ids repeated across collections keep the first one.
 */
export function eventPhotoContext(configs: readonly GalleryEventConfig[]): Map<string, EventPhotoContext> {
  const context = new Map<string, EventPhotoContext>()
  for (const event of configs) {
    for (const collection of event.collections) {
      const ids = [...new Set(collection.photoIds)]
      ids.forEach((id, index) => {
        if (!context.has(id)) context.set(id, { collectionTitle: collection.title, position: index + 1, total: ids.length })
      })
    }
  }
  return context
}

/** Categories that currently have something to show. */
export function availableCategories(
  trainingPhotos: readonly GalleryPhoto[],
  events: readonly GalleryEvent[],
): GalleryCategory[] {
  const present = new Set<GalleryCategory>()
  if (trainingPhotos.length > 0) present.add('entrenamientos')
  for (const event of events) present.add(event.category)
  return GALLERY_FILTERS.map((filter) => filter.value).filter(
    (value): value is GalleryCategory => value !== 'todos' && present.has(value),
  )
}

/**
 * Filter buttons worth showing: "Todos" plus each category with content.
 * Empty when there is only one category, since filtering would do nothing.
 */
export function visibleFilters(categories: readonly GalleryCategory[]): typeof GALLERY_FILTERS {
  if (categories.length < 2) return []
  return GALLERY_FILTERS.filter((filter) => filter.value === 'todos' || categories.includes(filter.value))
}

export function eventsForFilter(events: readonly GalleryEvent[], filter: GalleryFilter): GalleryEvent[] {
  return filter === 'todos' ? [...events] : events.filter((event) => event.category === filter)
}

export function showTrainingFor(filter: GalleryFilter): boolean {
  return filter === 'todos' || filter === 'entrenamientos'
}

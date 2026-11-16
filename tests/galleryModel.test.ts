import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  availableCategories,
  eventPhotoContext,
  eventPhotoIds,
  eventsForFilter,
  resolveEvents,
  showTrainingFor,
  visibleFilters,
} from '../src/lib/galleryModel.ts'
import type { GalleryEventConfig, GalleryPhoto } from '../src/lib/galleryModel.ts'
import { galleryEvents } from '../src/config/galleryEvents.ts'

function photo(id: string): GalleryPhoto {
  return { id, src: `${id}.webp`, width: 1600, height: 1200, thumbSrc: `${id}-thumb.webp`, thumbWidth: 600, thumbHeight: 450, alt: id }
}

const photos = new Map(['a', 'b', 'c', 'd'].map((id) => [id, photo(id)]))

function event(overrides: Partial<GalleryEventConfig> = {}): GalleryEventConfig {
  return {
    id: 'grad',
    category: 'graduaciones',
    title: 'Graduación',
    dateTime: '2026-11',
    dateLabel: 'Noviembre de 2026',
    description: ['Texto'],
    collections: [
      { id: 'bjj', title: 'BJJ', photoIds: ['a', 'b'] },
      { id: 'll', title: 'Luta Livre', photoIds: ['c'] },
    ],
    ...overrides,
  }
}

describe('resolveEvents', () => {
  it('links collections to existing photos in order', () => {
    const [resolved] = resolveEvents([event()], photos)
    assert.deepEqual(resolved.collections.map((c) => c.photos.map((p) => p.id)), [['a', 'b'], ['c']])
    assert.equal(resolved.collections[0].featured.id, 'a')
  })

  it('puts the chosen featured photo first without duplicating it', () => {
    const [resolved] = resolveEvents(
      [event({ collections: [{ id: 'bjj', title: 'BJJ', photoIds: ['a', 'b', 'c'], featuredPhotoId: 'b' }] })],
      photos,
    )
    assert.deepEqual(resolved.collections[0].photos.map((p) => p.id), ['b', 'a', 'c'])
  })

  it('falls back to the first photo when the featured id does not exist', () => {
    const [resolved] = resolveEvents(
      [event({ collections: [{ id: 'bjj', title: 'BJJ', photoIds: ['a'], featuredPhotoId: 'missing' }] })],
      photos,
    )
    assert.equal(resolved.collections[0].featured.id, 'a')
  })

  it('ignores unknown and repeated photo ids', () => {
    const [resolved] = resolveEvents(
      [event({ collections: [{ id: 'bjj', title: 'BJJ', photoIds: ['a', 'zzz', 'a', 'b'] }] })],
      photos,
    )
    assert.deepEqual(resolved.collections[0].photos.map((p) => p.id), ['a', 'b'])
  })

  it('drops collections without photos and events without collections', () => {
    const partial = resolveEvents(
      [event({ collections: [{ id: 'bjj', title: 'BJJ', photoIds: [] }, { id: 'll', title: 'LL', photoIds: ['c'] }] })],
      photos,
    )
    assert.deepEqual(partial[0].collections.map((c) => c.id), ['ll'])

    const empty = resolveEvents([event({ collections: [{ id: 'bjj', title: 'BJJ', photoIds: ['missing'] }] })], photos)
    assert.deepEqual(empty, [])
  })
})

describe('filters', () => {
  const resolved = resolveEvents([event()], photos)

  it('lists only categories with content, in display order', () => {
    assert.deepEqual(availableCategories([photo('d')], resolved), ['entrenamientos', 'graduaciones'])
    assert.deepEqual(availableCategories([], resolved), ['graduaciones'])
    assert.deepEqual(availableCategories([photo('d')], []), ['entrenamientos'])
  })

  it('hides the filter bar when there is a single category', () => {
    assert.deepEqual(visibleFilters(['entrenamientos']), [])
    assert.deepEqual(
      visibleFilters(['entrenamientos', 'graduaciones']).map((f) => f.label),
      ['Todos', 'Entrenamientos', 'Graduaciones'],
    )
  })

  it('selects events and training photos for each filter', () => {
    assert.equal(eventsForFilter(resolved, 'todos').length, 1)
    assert.equal(eventsForFilter(resolved, 'graduaciones').length, 1)
    assert.equal(eventsForFilter(resolved, 'eventos').length, 0)
    assert.equal(eventsForFilter(resolved, 'entrenamientos').length, 0)
    assert.equal(showTrainingFor('todos'), true)
    assert.equal(showTrainingFor('entrenamientos'), true)
    assert.equal(showTrainingFor('graduaciones'), false)
  })

  it('collects event photo ids so they are not repeated among training photos', () => {
    assert.deepEqual([...eventPhotoIds([event()])].sort(), ['a', 'b', 'c'])
  })
})

describe('eventPhotoContext', () => {
  it('gives each event photo its collection title and position', () => {
    const context = eventPhotoContext([event()])
    assert.deepEqual(context.get('b'), { collectionTitle: 'BJJ', position: 2, total: 2 })
    assert.deepEqual(context.get('c'), { collectionTitle: 'Luta Livre', position: 1, total: 1 })
    assert.equal(context.get('d'), undefined)
  })
})

describe('galleryEvents config', () => {
  it('uses month-only or full ISO dates', () => {
    for (const config of galleryEvents) assert.match(config.dateTime, /^\d{4}-\d{2}(-\d{2})?$/)
  })

  it('has unique event and collection ids', () => {
    const ids = galleryEvents.flatMap((e) => [e.id, ...e.collections.map((c) => `${e.id}/${c.id}`)])
    assert.equal(new Set(ids).size, ids.length)
  })

  it('hides configured events whose photos are not available', () => {
    assert.deepEqual(resolveEvents(galleryEvents, photos), [])
  })
})

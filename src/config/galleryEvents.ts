// Academy events shown in the gallery (graduations, competitions, seminars…).
//
// How to publish an event's photos:
//   1. Put the original photos in photos-originals/ with short names,
//      e.g. "graduacion-bjj-01.jpg" or "graduacion-luta-livre-01.jpg", and run
//      `npm run photos`.
//   2. Add the optimized ids (file name without extension) to `photoIds` below.
//   3. Add alt text and captions in src/config/gallery.ts (galleryOverrides).
//      Event photos never take their caption from the file name; without an
//      override their alt text is "<collection title> en Betinho BJJ Madrid
//      (foto N de M)" and they have no visible caption.
//
// Photos assigned to an event are not repeated among the training photos.
// An event, or one of its collections, stays hidden until at least one of its
// photos exists, so the site never shows an empty or placeholder gallery.
//
// Do not add names, belt grades or dates that the academy has not confirmed.

import type { GalleryEventConfig } from '../lib/galleryModel'

export const galleryEvents: GalleryEventConfig[] = [
  {
    id: 'graduacion-bjj-luta-livre-2026-11',
    category: 'graduaciones',
    title: 'Graduación de Jiu-Jitsu Brasileño y Luta Livre Esportiva',
    // Exact day pending confirmation: keep the month only until it is confirmed.
    dateTime: '2026-11',
    dateLabel: 'Noviembre de 2026',
    description: [
      'En noviembre de 2026 celebramos las graduaciones de nuestros alumnos de Jiu-Jitsu Brasileño y Luta Livre Esportiva en Betinho BJJ Madrid.',
      'Un momento especial para reconocer su esfuerzo, disciplina, constancia y evolución sobre el tatami.',
      '¡Enhorabuena a todos los alumnos por sus logros!',
    ],
    collections: [
      {
        id: 'graduacion-bjj',
        title: 'Graduación de Jiu-Jitsu Brasileño',
        // Photos supplied by the academy (November 2026). Publication of the
        // photos showing minors was authorized by the academy on 2026-11-16.
        photoIds: [
          'graduacion-bjj-grupo',
          'graduacion-bjj-01',
          'graduacion-bjj-02',
          'graduacion-bjj-03',
          'graduacion-bjj-04',
        ],
        featuredPhotoId: 'graduacion-bjj-grupo',
      },
      {
        id: 'graduacion-luta-livre',
        title: 'Graduación de Luta Livre Esportiva',
        // Photo supplied by the academy (November 2026).
        photoIds: ['graduacion-luta-livre-grupo'],
        featuredPhotoId: 'graduacion-luta-livre-grupo',
      },
    ],
  },
]

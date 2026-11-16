import type { GalleryFilter } from '../lib/galleryModel'

interface GalleryFiltersProps {
  filters: readonly { value: GalleryFilter; label: string }[]
  active: GalleryFilter
  onChange: (filter: GalleryFilter) => void
}

export default function GalleryFilters({ filters, active, onChange }: GalleryFiltersProps) {
  if (filters.length === 0) return null

  return (
    <div role="group" aria-label="Filtrar galería por categoría" className="mb-12 flex flex-wrap gap-2 md:gap-3">
      {filters.map((filter) => {
        const isActive = filter.value === active
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(filter.value)}
            className={`min-h-11 border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:transition-none ${
              isActive
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:border-black hover:text-black'
            }`}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}

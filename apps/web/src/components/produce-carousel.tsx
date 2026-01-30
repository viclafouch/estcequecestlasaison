import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Month, Produce } from '@estcequecestlasaison/shared'
import { useCarouselScroll } from '../hooks/use-carousel-scroll'
import { ProduceCard } from './produce-card'

type ProduceCarouselProps = {
  title: string
  subtitle?: string
  produceList: Produce[]
  month: Month
  variant?: 'default' | 'muted'
}

export const ProduceCarousel = ({
  title,
  subtitle,
  produceList,
  month,
  variant = 'default'
}: ProduceCarouselProps) => {
  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollByDirection
  } = useCarouselScroll()

  const countLabel = produceList.length === 1 ? 'produit' : 'produits'

  return (
    <section className="relative">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <span className="text-sm text-gray-500">
              {produceList.length} {countLabel}
            </span>
          </div>
          {subtitle ? (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              return scrollByDirection('left')
            }}
            disabled={!canScrollLeft}
            aria-label="Défiler vers la gauche"
            className="btn-icon-sm focus-ring border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              return scrollByDirection('right')
            }}
            disabled={!canScrollRight}
            aria-label="Défiler vers la droite"
            className="btn-icon-sm focus-ring border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 sm:gap-6"
      >
        {produceList.map((produce) => {
          return (
            <div
              key={produce.id}
              className={`w-36 shrink-0 snap-start sm:w-40 md:w-44 lg:w-48 ${
                variant === 'muted' ? 'opacity-50 grayscale' : ''
              }`}
            >
              <ProduceCard produce={produce} month={month} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

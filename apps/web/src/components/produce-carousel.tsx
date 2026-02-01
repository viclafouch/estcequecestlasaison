import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type {
  Month,
  Produce,
  ProduceSection
} from '@estcequecestlasaison/shared'
import { useCarouselScroll } from '../hooks/use-carousel-scroll'
import { ProduceCard } from './produce-card'
import { CountingNumber } from './ui/counting-number'

type ProduceCarouselProps = {
  title: string
  subtitle?: string
  produceList: Produce[]
  month: Month
  section: ProduceSection
  variant?: 'default' | 'muted'
}

export const ProduceCarousel = ({
  title,
  subtitle,
  produceList,
  month,
  section,
  variant = 'default'
}: ProduceCarouselProps) => {
  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollByDirection
  } = useCarouselScroll()

  React.useEffect(() => {
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'instant' })
  }, [produceList, scrollContainerRef])

  const countLabel = produceList.length === 1 ? 'produit' : 'produits'

  return (
    <section className="relative">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <span className="text-sm text-gray-500">
              <CountingNumber number={produceList.length} /> {countLabel}
            </span>
          </div>
          {subtitle ? (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          ) : null}
        </div>
        <div className="hidden gap-2 md:flex">
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
        className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-6 px-6 sm:gap-3"
      >
        {produceList.map((produce) => {
          return (
            <div
              key={produce.id}
              data-muted={variant === 'muted' || undefined}
              className="w-36 max-w-42.5 shrink-0 snap-start data-muted:opacity-50 data-muted:grayscale sm:w-40 md:w-44 lg:w-48"
            >
              <ProduceCard produce={produce} month={month} section={section} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

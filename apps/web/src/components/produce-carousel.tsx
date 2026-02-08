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
import { IconButton } from './ui/icon-button'
import './produce-carousel.css'

const PRIORITY_COUNT = 4

type ProduceCarouselProps = {
  title: string
  subtitle?: string
  produceList: Produce[]
  month: Month
  section: ProduceSection
  variant?: 'default' | 'muted'
  priority?: boolean
  hero?: boolean
}

export const ProduceCarousel = ({
  title,
  subtitle,
  produceList,
  month,
  section,
  variant = 'default',
  priority,
  hero
}: ProduceCarouselProps) => {
  const {
    scrollContainerRef,
    hasOverflow,
    canScrollLeft,
    canScrollRight,
    scrollByDirection
  } = useCarouselScroll()

  React.useEffect(() => {
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'instant' })
  }, [produceList, scrollContainerRef])

  const countLabel = produceList.length === 1 ? 'produit' : 'produits'

  return (
    <section className="relative" aria-label={title}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-3">
            {hero ? (
              <h1 className="text-xl font-semibold text-gray-900 md:text-2xl md:font-bold">
                {title}
              </h1>
            ) : (
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            )}
            <span className="text-sm text-gray-500">
              <CountingNumber number={produceList.length} /> {countLabel}
            </span>
          </div>
          {subtitle ? (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          ) : null}
        </div>
        {hasOverflow ? (
          <div className="hidden gap-2 md:flex">
            <IconButton
              size="sm"
              variant="outline"
              onClick={() => {
                scrollByDirection('left')
              }}
              disabled={!canScrollLeft}
              aria-label="Défiler vers la gauche"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </IconButton>
            <IconButton
              size="sm"
              variant="outline"
              onClick={() => {
                scrollByDirection('right')
              }}
              disabled={!canScrollRight}
              aria-label="Défiler vers la droite"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </IconButton>
          </div>
        ) : null}
      </div>
      <div className="-mx-6 overflow-x-clip">
        <div
          ref={scrollContainerRef}
          role="region"
          aria-label={`${title}, défilable horizontalement`}
          tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
          className="focus-ring scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-6 px-6 sm:gap-3"
        >
          {produceList.map((produce, index) => {
            return (
              <div
                key={produce.id}
                data-muted={variant === 'muted' || undefined}
                className="carousel-card-fade w-36 max-w-42.5 shrink-0 snap-start data-muted:opacity-50 data-muted:grayscale sm:w-40 md:w-44 lg:w-48"
              >
                <div className="carousel-card-reveal">
                  <ProduceCard
                    produce={produce}
                    month={month}
                    section={section}
                    priority={priority ? index < PRIORITY_COUNT : undefined}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

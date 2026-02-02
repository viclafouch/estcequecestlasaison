import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { NotFound } from '@/components/not-found'
import { ProduceCarousel } from '@/components/produce-carousel'
import { ProduceImage } from '@/components/produce-image'
import { SeasonCalendar } from '@/components/season-calendar'
import { SiteHeader } from '@/components/site-header'
import { produceSeo } from '@/lib/seo'
import { getSlugPageData } from '@/server/produce'
import type {
  BadgeVariant,
  Month,
  Produce,
  ProduceBadge
} from '@estcequecestlasaison/shared'
import {
  getDefaultProduceBadge,
  matchIsInSeason,
  matchIsInSeasonAllYear
} from '@estcequecestlasaison/shared'
import { createFileRoute, notFound } from '@tanstack/react-router'

type SeasonDisplay = {
  label: string
  detail: string | null
  variant: BadgeVariant
}

type GetSeasonDisplayParams = {
  produce: Produce
  month: Month
  badge: ProduceBadge
}

function getSeasonDisplay({
  produce,
  month,
  badge
}: GetSeasonDisplayParams): SeasonDisplay {
  if (matchIsInSeasonAllYear(produce)) {
    return {
      label: "Disponible toute l'ann\u00E9e",
      detail: null,
      variant: 'positive'
    }
  }

  if (matchIsInSeason(produce, month)) {
    return {
      label: 'En saison',
      detail: badge.label,
      variant: badge.variant
    }
  }

  return {
    label: 'Hors saison',
    detail: badge.label,
    variant: 'neutral'
  }
}

const ProductPage = () => {
  const { produce, relatedProduce, currentMonth, jsonLd } =
    Route.useLoaderData()
  const [isDetailsExpanded, setIsDetailsExpanded] = React.useState(false)

  const badge = getDefaultProduceBadge({ produce, month: currentMonth })
  const typeLabel = produce.type === 'fruit' ? 'Fruit' : 'L\u00E9gume'
  const seasonDisplay = getSeasonDisplay({
    produce,
    month: currentMonth,
    badge
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      {jsonLd.map((schema, index) => {
        return (
          <script
            key={index}
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: schema }}
          />
        )
      })}
      <main className="mx-auto max-w-7xl space-y-12 px-6 pt-8 pb-24 md:pt-12 md:pb-20">
        <section className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_2fr] md:items-stretch md:gap-12">
          <div className="size-40 self-center overflow-hidden rounded-3xl bg-gray-100 md:size-auto md:self-stretch">
            <ProduceImage
              produce={produce}
              altSuffix={`${typeLabel} de saison`}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 160px, 288px"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 text-center md:text-left">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {produce.name}
              </h1>
              <p className="text-sm text-gray-500">{typeLabel}</p>
            </div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span
                data-variant={seasonDisplay.variant}
                className="size-2.5 rounded-full data-[variant=positive]:bg-primary-500 data-[variant=warning]:bg-amber-400 data-[variant=neutral]:bg-gray-300"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-gray-900">
                {seasonDisplay.label}
              </span>
              {seasonDisplay.detail ? (
                <>
                  <span className="text-gray-300" aria-hidden="true">
                    &mdash;
                  </span>
                  <span
                    data-variant={seasonDisplay.variant}
                    className="text-sm data-[variant=positive]:text-primary-700 data-[variant=warning]:text-amber-600 data-[variant=neutral]:text-gray-500"
                  >
                    {seasonDisplay.detail}
                  </span>
                </>
              ) : null}
            </div>
            <dl className="grid grid-cols-2 gap-3 text-left">
              <div className="flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-3">
                <dt className="text-xs font-medium text-gray-500">Calories</dt>
                <dd className="text-base font-semibold text-gray-900">
                  {produce.nutrition.calories}{' '}
                  <span className="text-xs font-normal text-gray-500">
                    kcal
                  </span>
                </dd>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-3">
                <dt className="text-xs font-medium text-gray-500">Vitamines</dt>
                <dd className="flex flex-wrap gap-1">
                  {produce.nutrition.vitamins.map((vitamin) => {
                    return (
                      <span
                        key={vitamin}
                        className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700"
                      >
                        {vitamin}
                      </span>
                    )
                  })}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              aria-expanded={isDetailsExpanded}
              aria-controls="product-details"
              data-expanded={isDetailsExpanded || undefined}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-600 md:hidden"
              onClick={() => {
                setIsDetailsExpanded((prev) => {
                  return !prev
                })
              }}
            >
              {isDetailsExpanded
                ? "Moins d'informations"
                : "Plus d'informations"}
              <ChevronDown
                className="size-4 transition-transform data-expanded:rotate-180"
                data-expanded={isDetailsExpanded || undefined}
                aria-hidden="true"
              />
            </button>
            <dl
              id="product-details"
              data-expanded={isDetailsExpanded || undefined}
              className="hidden grid-cols-2 gap-3 text-left data-expanded:grid md:grid"
            >
              <div className="flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-3">
                <dt className="text-xs font-medium text-gray-500">Origine</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {produce.origin}
                </dd>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-3">
                <dt className="text-xs font-medium text-gray-500">
                  Conservation
                </dt>
                <dd className="text-sm text-gray-900">
                  {produce.conservation}
                </dd>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-3">
                <dt className="text-xs font-medium text-gray-500">
                  Bien choisir
                </dt>
                <dd className="text-sm text-gray-900">{produce.buyingTip}</dd>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-3">
                <dt className="text-xs font-medium text-gray-500">Bienfaits</dt>
                <dd className="text-sm text-gray-900">
                  {produce.nutrition.benefits}
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <SeasonCalendar produce={produce} currentMonth={currentMonth} />
        {relatedProduce.length > 0 ? (
          <ProduceCarousel
            title="Aussi de saison"
            subtitle="Autres produits disponibles ce mois-ci"
            produceList={relatedProduce}
            month={currentMonth}
            section="in-season"
          />
        ) : null}
      </main>
    </div>
  )
}

export const Route = createFileRoute('/$slug')({
  loader: async ({ params }) => {
    const data = await getSlugPageData({ data: { slug: params.slug } })

    if (!data) {
      throw notFound()
    }

    return data
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ name: 'robots', content: 'noindex,nofollow' }]
      }
    }

    return produceSeo({
      produce: loaderData.produce,
      month: loaderData.currentMonth
    })
  },
  notFoundComponent: NotFound,
  component: ProductPage
})

import * as React from 'react'
import { ChevronDown, Share2 } from 'lucide-react'
import { NotFound } from '@/components/not-found'
import { ProduceCarousel } from '@/components/produce-carousel'
import { ProduceImage } from '@/components/produce-image'
import { SeasonAlternatives } from '@/components/season-alternatives'
import { SeasonCalendar } from '@/components/season-calendar'
import { SiteHeader } from '@/components/site-header'
import { IconButton } from '@/components/ui/icon-button'
import { clientEnv } from '@/constants/env'
import { BADGE_VARIANT_TO_SEASON, SEASON_DOT_STYLES } from '@/constants/season'
import { SITE_DOMAIN } from '@/constants/site'
import { useCanShare } from '@/hooks/use-can-share'
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
  getPreviousMonth,
  getShareText,
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

  const intensity = produce.seasons[month]

  if (intensity === 'peak') {
    return {
      label: 'En pleine saison',
      detail: badge.label,
      variant: badge.variant
    }
  }

  if (intensity === 'partial') {
    const previousMonth = getPreviousMonth(month)
    const wasInSeasonLastMonth = matchIsInSeason(produce, previousMonth)
    const label = wasInSeasonLastMonth ? 'Fin de saison' : 'Début de saison'

    return {
      label,
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
  const { produce, relatedProduce, currentMonth, jsonLd, alternatives } =
    Route.useLoaderData()
  const [isDetailsExpanded, setIsDetailsExpanded] = React.useState(false)
  const canShare = useCanShare()

  const badge = getDefaultProduceBadge({ produce, month: currentMonth })
  const isInSeason = matchIsInSeason(produce, currentMonth)
  const typeLabel = produce.type === 'fruit' ? 'Fruit' : 'L\u00E9gume'
  const seasonDisplay = getSeasonDisplay({
    produce,
    month: currentMonth,
    badge
  })

  const handleShare = () => {
    navigator
      .share({
        title: produce.name,
        text: getShareText({
          produceName: produce.name,
          isInSeason,
          siteDomain: SITE_DOMAIN
        }),
        url: `${clientEnv.VITE_SITE_URL}/${produce.slug}`
      })
      .catch(() => {})
  }

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
      <main
        id="main-content"
        className="mx-auto max-w-7xl space-y-12 overflow-x-clip px-6 pt-8 pb-24 md:pt-12 md:pb-20"
      >
        <section className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_2fr] md:items-stretch md:gap-12">
          <div className="aspect-square w-full max-w-125 self-center overflow-hidden rounded-3xl bg-gray-100 md:aspect-auto md:max-w-none md:w-auto md:self-stretch">
            <ProduceImage
              produce={produce}
              altSuffix={`${typeLabel} de saison`}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) calc(100vw - 48px), 288px"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 text-center md:text-left">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  {produce.name}
                </h1>
                {canShare ? (
                  <IconButton
                    variant="ghost"
                    className="md:hidden"
                    aria-label={`Partager ${produce.name}`}
                    onClick={handleShare}
                  >
                    <Share2 className="size-5" aria-hidden="true" />
                  </IconButton>
                ) : null}
              </div>
              <p className="text-sm text-gray-500">{typeLabel}</p>
            </div>
            <div className="flex flex-col items-center gap-1 md:flex-row md:items-center md:gap-2.5 md:justify-start">
              <div className="flex items-center gap-2.5">
                <span
                  className={`size-3 shrink-0 ${SEASON_DOT_STYLES[BADGE_VARIANT_TO_SEASON[seasonDisplay.variant]].className}`}
                  aria-hidden="true"
                />
                <span className="text-lg font-bold text-gray-900">
                  {seasonDisplay.label}
                </span>
              </div>
              {seasonDisplay.detail ? (
                <div className="flex items-center gap-2.5">
                  <span
                    className="hidden text-gray-300 md:inline"
                    aria-hidden="true"
                  >
                    &mdash;
                  </span>
                  <span
                    data-variant={seasonDisplay.variant}
                    className="text-sm font-medium text-gray-500 md:text-base data-[variant=positive]:text-primary-700 data-[variant=warning]:text-warning-600 data-[variant=neutral]:text-gray-500"
                  >
                    {seasonDisplay.detail}
                  </span>
                </div>
              ) : null}
            </div>
            {alternatives.length > 0 ? (
              <SeasonAlternatives alternatives={alternatives} />
            ) : null}
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

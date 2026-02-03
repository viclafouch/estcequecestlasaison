import * as React from 'react'
import { z } from 'zod'
import { MonthBar } from '@/components/month-bar'
import { MonthDrawer } from '@/components/month-drawer'
import { ProduceCarousel } from '@/components/produce-carousel'
import { SearchBar } from '@/components/search-bar'
import { SearchDrawer } from '@/components/search-drawer'
import { SiteHeader } from '@/components/site-header'
import { groupedProduceOptions, monthStatsOptions } from '@/constants/queries'
import { seo } from '@/lib/seo'
import type { ProduceType } from '@estcequecestlasaison/shared'
import {
  getCurrentMonth,
  getMonthName,
  getNextMonth
} from '@estcequecestlasaison/shared'
import { useDebouncedValue } from '@tanstack/react-pacer'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const homeSearchSchema = z.object({
  q: z.string().optional()
})

const CATEGORY_SUBTITLE_LABELS = {
  all: 'Fruits et légumes',
  fruit: 'Fruits',
  vegetable: 'Légumes'
} as const satisfies Record<ProduceType | 'all', string>

const Home = () => {
  const { q } = Route.useSearch()
  const [activeCategory, setActiveCategory] = React.useState<
    ProduceType | 'all'
  >('all')
  const [searchQuery, setSearchQuery] = React.useState(q ?? '')
  const [currentMonth] = React.useState(getCurrentMonth)
  const [selectedMonth, setSelectedMonth] = React.useState(getCurrentMonth)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  const [debouncedSearch] = useDebouncedValue(searchQuery, { wait: 200 })

  const groupedProduceQuery = useQuery({
    ...groupedProduceOptions({
      searchQuery: debouncedSearch,
      category: activeCategory,
      month: selectedMonth
    }),
    placeholderData: keepPreviousData
  })

  const monthStatsQuery = useQuery({
    ...monthStatsOptions(selectedMonth),
    placeholderData: keepPreviousData
  })

  const isCurrentMonth = selectedMonth === currentMonth
  const nextMonth = getNextMonth(selectedMonth)
  const currentMonthName = getMonthName(selectedMonth)
  const nextMonthName = getMonthName(nextMonth)
  const categoryLabel = CATEGORY_SUBTITLE_LABELS[activeCategory]
  const hasMonthVowelStart = /^[aeiouàâéèêëïîôùûü]/i.test(currentMonthName)
  const seasonTitle = `En pleine saison d${hasMonthVowelStart ? '\u2019' : 'e '}${currentMonthName}`

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true)
  }

  const handleOpenSearch = () => {
    setIsSearchOpen(true)
  }

  const hasInSeason = (groupedProduceQuery.data?.inSeason.length ?? 0) > 0
  const hasOffSeason = (groupedProduceQuery.data?.offSeason.length ?? 0) > 0
  const hasComingNextMonth =
    isCurrentMonth &&
    (groupedProduceQuery.data?.comingNextMonth.length ?? 0) > 0

  const hasResults = hasInSeason || hasComingNextMonth || hasOffSeason

  return (
    <div className="bg-hero min-h-screen bg-gray-50">
      <SiteHeader
        categoryTabs={{
          activeCategory,
          onCategoryChange: setActiveCategory
        }}
        searchDrawer={{ onOpen: handleOpenSearch }}
      />
      <SearchDrawer
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isOpen={isSearchOpen}
        onOpenChange={setIsSearchOpen}
      />
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentMonth={selectedMonth}
        onMonthClick={handleOpenDrawer}
      />
      <MonthDrawer
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        stats={monthStatsQuery.data}
      />
      <main
        id="main-content"
        className="mx-auto max-w-7xl space-y-12 px-6 pt-6 pb-24 md:pt-0 md:pb-20"
      >
        <h1 className="sr-only">Fruits et legumes de saison</h1>
        {hasResults ? (
          <>
            {hasInSeason ? (
              <ProduceCarousel
                title={seasonTitle}
                subtitle={`${categoryLabel} disponibles en ${currentMonthName}`}
                produceList={groupedProduceQuery.data!.inSeason}
                month={selectedMonth}
                section="in-season"
                priority
              />
            ) : null}
            {hasComingNextMonth ? (
              <ProduceCarousel
                title={`Nouveautés en ${nextMonthName}`}
                subtitle="Bientôt de saison, à découvrir le mois prochain"
                produceList={groupedProduceQuery.data!.comingNextMonth}
                month={nextMonth}
                section="coming-next-month"
              />
            ) : null}
            {hasOffSeason ? (
              <ProduceCarousel
                title="Hors saison"
                subtitle="Pas disponibles en ce moment"
                produceList={groupedProduceQuery.data!.offSeason}
                month={selectedMonth}
                section="off-season"
              />
            ) : null}
          </>
        ) : (
          <div
            role="status"
            className="flex flex-col items-center gap-2 py-20 text-center"
          >
            <p className="text-lg font-semibold text-gray-900">
              Aucun produit trouvé
            </p>
            <p className="text-sm text-gray-500">
              Essayez avec un autre terme de recherche
            </p>
          </div>
        )}
      </main>
      <MonthBar
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onMonthClick={handleOpenDrawer}
      />
    </div>
  )
}

export const Route = createFileRoute('/')({
  validateSearch: (search) => {
    return homeSearchSchema.parse(search)
  },
  loaderDeps: ({ search }) => {
    return { q: search.q }
  },
  loader: async ({ context: { queryClient }, deps: { q } }) => {
    const month = getCurrentMonth()

    await Promise.all([
      queryClient.ensureQueryData(
        groupedProduceOptions({
          searchQuery: q ?? '',
          category: 'all',
          month
        })
      ),
      queryClient.ensureQueryData(monthStatsOptions(month))
    ])
  },
  head: () => {
    const headData = seo({
      title: 'Fruits et légumes de saison en France',
      description:
        'Découvrez quels fruits et légumes sont de saison en France. Calendrier interactif mois par mois pour manger local et de saison toute l\u2019année.',
      keywords:
        'fruits de saison, légumes de saison, est-ce que c\u2019est la saison, calendrier fruits et légumes, produits de saison france, manger de saison, fruits et légumes du mois, saison fruits france, saison légumes france, alimentation locale',
      pathname: '/'
    })

    return {
      ...headData,
      links: [
        ...headData.links,
        {
          rel: 'preload',
          as: 'image',
          type: 'image/webp',
          href: '/images/background.webp',
          media: '(min-width: 1280px)'
        }
      ]
    }
  },
  component: Home
})

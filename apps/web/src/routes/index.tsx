import * as React from 'react'
import type { Month, ProduceType } from '@estcequecestlasaison/shared'
import {
  getCurrentMonth,
  getMonthName,
  getNextMonth
} from '@estcequecestlasaison/shared'
import { useDebouncedValue } from '@tanstack/react-pacer'
import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/header'
import { MonthBar } from '../components/month-bar'
import { MonthDrawer } from '../components/month-drawer'
import { ProduceCarousel } from '../components/produce-carousel'
import { SearchBar } from '../components/search-bar'
import { PRODUCE_LIST } from '../constants/produce'
import { getGroupedProduce } from '../helpers/produce'

const Home = () => {
  const [activeCategory, setActiveCategory] = React.useState<
    ProduceType | 'all'
  >('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [currentMonth] = React.useState<Month>(getCurrentMonth)
  const [selectedMonth, setSelectedMonth] =
    React.useState<Month>(getCurrentMonth)
  const [currentYear] = React.useState(() => {
    return new Date().getFullYear()
  })
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const [debouncedSearch] = useDebouncedValue(searchQuery, { wait: 200 })
  const carouselKey = `${debouncedSearch}-${activeCategory}-${selectedMonth}`

  const isCurrentMonth = selectedMonth === currentMonth
  const nextMonth = getNextMonth(selectedMonth)
  const currentMonthName = getMonthName(selectedMonth)
  const nextMonthName = getMonthName(nextMonth)

  const groupedProduce = getGroupedProduce({
    searchQuery: debouncedSearch,
    category: activeCategory,
    month: selectedMonth
  })

  const showComingNextMonth =
    isCurrentMonth && groupedProduce.comingNextMonth.length > 0

  const hasResults =
    groupedProduce.inSeason.length > 0 ||
    showComingNextMonth ||
    groupedProduce.offSeason.length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentMonth={selectedMonth}
        onMonthClick={() => {
          setIsDrawerOpen(true)
        }}
      />
      <MonthDrawer
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        produceList={PRODUCE_LIST}
      />
      <main className="mx-auto max-w-7xl space-y-12 px-6 pb-24 md:pb-20">
        {hasResults ? (
          <>
            {groupedProduce.inSeason.length > 0 ? (
              <ProduceCarousel
                key={`in-season-${carouselKey}`}
                title="En pleine saison"
                subtitle={`Fruits et légumes disponibles en ${currentMonthName}`}
                produceList={groupedProduce.inSeason}
                month={selectedMonth}
                section="in-season"
              />
            ) : null}
            {showComingNextMonth ? (
              <ProduceCarousel
                key={`coming-${carouselKey}`}
                title={`Nouveautés en ${nextMonthName}`}
                subtitle="Bientôt de saison, à découvrir le mois prochain"
                produceList={groupedProduce.comingNextMonth}
                month={nextMonth}
                section="coming-next-month"
              />
            ) : null}
            {groupedProduce.offSeason.length > 0 ? (
              <ProduceCarousel
                key={`off-season-${carouselKey}`}
                title="Hors saison"
                subtitle="Pas disponibles en ce moment"
                produceList={groupedProduce.offSeason}
                month={selectedMonth}
                section="off-season"
                variant="muted"
              />
            ) : null}
          </>
        ) : (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-lg font-semibold text-gray-900">
              Aucun produit trouvé
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Essayez avec un autre terme de recherche
            </p>
          </div>
        )}
      </main>
      <MonthBar
        selectedMonth={selectedMonth}
        currentYear={currentYear}
        onMonthChange={setSelectedMonth}
        onMonthClick={() => {
          setIsDrawerOpen(true)
        }}
      />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home
})

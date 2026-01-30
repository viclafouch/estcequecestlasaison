import * as React from 'react'
import type { Month, ProduceType } from '@estcequecestlasaison/shared'
import {
  getCurrentMonth,
  getMonthName,
  getNextMonth
} from '@estcequecestlasaison/shared'
import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/header'
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
  const [selectedMonth, setSelectedMonth] =
    React.useState<Month>(getCurrentMonth)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const nextMonth = getNextMonth(selectedMonth)
  const currentMonthName = getMonthName(selectedMonth)
  const nextMonthName = getMonthName(nextMonth)

  const groupedProduce = getGroupedProduce({
    searchQuery,
    category: activeCategory,
    month: selectedMonth
  })

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
      <main className="mx-auto max-w-7xl space-y-12 px-6 pb-20">
        {groupedProduce.inSeason.length > 0 ? (
          <ProduceCarousel
            title="En pleine saison"
            subtitle={`Fruits et légumes disponibles en ${currentMonthName}`}
            produceList={groupedProduce.inSeason}
            month={selectedMonth}
          />
        ) : null}
        {groupedProduce.comingNextMonth.length > 0 ? (
          <ProduceCarousel
            title={`Arrive en ${nextMonthName}`}
            subtitle="Bientôt de saison, à découvrir le mois prochain"
            produceList={groupedProduce.comingNextMonth}
            month={nextMonth}
          />
        ) : null}
        {groupedProduce.offSeason.length > 0 ? (
          <ProduceCarousel
            title="Hors saison"
            subtitle="Pas disponibles en ce moment"
            produceList={groupedProduce.offSeason}
            month={selectedMonth}
            variant="muted"
          />
        ) : null}
      </main>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home
})

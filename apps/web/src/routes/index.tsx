import * as React from 'react'
import type { ProduceType } from '@estcequecestlasaison/shared'
import { getCurrentMonth } from '@estcequecestlasaison/shared'
import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/header'
import { ProduceGrid } from '../components/produce-grid'
import { SearchBar } from '../components/search-bar'
import { getFilteredProduce, getInSeasonCount } from '../helpers/produce'

const Home = () => {
  const [activeCategory, setActiveCategory] = React.useState<
    ProduceType | 'all'
  >('all')
  const [searchQuery, setSearchQuery] = React.useState('')

  const currentMonth = getCurrentMonth()

  const filteredProduce = getFilteredProduce({
    searchQuery,
    category: activeCategory,
    month: currentMonth
  })

  const inSeasonCount = getInSeasonCount(filteredProduce, currentMonth)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentMonth={currentMonth}
      />
      <main className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {inSeasonCount} produits de saison
          </h1>
        </div>
        <ProduceGrid produceList={filteredProduce} month={currentMonth} />
      </main>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home
})

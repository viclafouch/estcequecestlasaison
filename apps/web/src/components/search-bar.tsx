import { Search } from 'lucide-react'
import type { Month } from '@estcequecestlasaison/shared'
import { getMonthName } from '@estcequecestlasaison/shared'
import { ProduceIcon } from './icons'

type SearchBarProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
  currentMonth: Month
  onMonthClick: () => void
}

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  currentMonth,
  onMonthClick
}: SearchBarProps) => {
  const monthName = getMonthName(currentMonth)

  return (
    <div className="flex justify-center px-6 py-8">
      <div className="flex w-full max-w-2xl items-center rounded-full border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
        <button
          type="button"
          onClick={onMonthClick}
          className="focus-ring-inset flex w-40 items-center gap-3 rounded-l-full border-r border-gray-200 py-3 pl-6 pr-6 transition-colors hover:bg-gray-50"
        >
          <ProduceIcon
            name="calendar"
            className="size-5 shrink-0"
            aria-hidden="true"
          />
          <div className="flex flex-col text-left">
            <span className="text-xs text-gray-500">Mois</span>
            <span className="text-sm font-semibold capitalize text-gray-900">
              {monthName}
            </span>
          </div>
        </button>
        <div className="flex-1 px-4">
          <input
            id="search-produce"
            type="search"
            name="search"
            autoComplete="off"
            value={searchQuery}
            onChange={(event) => {
              return onSearchChange(event.target.value)
            }}
            placeholder="Rechercher un fruit ou légume…"
            aria-label="Rechercher un fruit ou légume"
            className="w-full bg-transparent py-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none"
          />
        </div>
        <button
          type="button"
          className="btn-icon-lg focus-ring m-2 bg-accent text-white hover:bg-accent/90"
          aria-label="Rechercher"
        >
          <Search className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

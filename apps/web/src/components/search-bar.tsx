import * as React from 'react'
import { X } from 'lucide-react'
import type { Month } from '@estcequecestlasaison/shared'
import { getMonthName } from '@estcequecestlasaison/shared'
import { ProduceIcon } from './icons'
import { SearchSuggestions } from './search-suggestions'
import { IconButton } from './ui/icon-button'

type SearchBarProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
  currentMonth: Month
  onMonthClick: () => void
  debouncedQuery: string
}

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  currentMonth,
  onMonthClick,
  debouncedQuery
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const monthName = getMonthName(currentMonth)

  const hasSuggestions = isFocused && debouncedQuery.trim().length > 0

  const handleSelect = () => {
    setIsFocused(false)
    onSearchChange('')
  }

  return (
    <div className="relative hidden justify-center px-6 py-8 md:flex">
      <div className="flex w-full max-w-2xl items-center rounded-full border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
        <button
          type="button"
          onClick={onMonthClick}
          className="focus-ring-inset hidden w-44 items-center gap-3 rounded-l-full border-r border-gray-200 px-6 py-4 transition-colors hover:bg-gray-50 md:flex"
        >
          <ProduceIcon
            name="calendar"
            className="size-6 shrink-0"
            aria-hidden="true"
          />
          <div className="flex flex-col text-left">
            <span className="text-sm text-gray-500">Mois</span>
            <span className="text-base font-semibold capitalize text-gray-900">
              {monthName}
            </span>
          </div>
        </button>
        <div className="flex-1 pl-6 pr-4 md:px-6">
          <input
            id="search-produce"
            type="search"
            name="search"
            autoComplete="off"
            value={searchQuery}
            onChange={(event) => {
              return onSearchChange(event.target.value)
            }}
            onFocus={() => {
              setIsFocused(true)
            }}
            onBlur={() => {
              setIsFocused(false)
            }}
            placeholder="Rechercher un fruit ou légume…"
            aria-label="Rechercher un fruit ou légume"
            className="w-full bg-transparent py-4 text-lg text-gray-900 placeholder:text-gray-400 focus-visible:outline-none"
          />
        </div>
        {searchQuery ? (
          <IconButton
            variant="ghost-muted"
            onClick={() => {
              return onSearchChange('')
            }}
            className="m-2.5"
            aria-label="Effacer la recherche"
          >
            <X className="size-5" aria-hidden="true" />
          </IconButton>
        ) : null}
      </div>
      {hasSuggestions ? (
        <SearchSuggestions query={debouncedQuery} onSelect={handleSelect} />
      ) : null}
    </div>
  )
}

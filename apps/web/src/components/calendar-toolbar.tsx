import * as React from 'react'
import { ArrowUpDown, Search, X } from 'lucide-react'
import type { Month } from '@estcequecestlasaison/shared'
import { getMonthName } from '@estcequecestlasaison/shared'
import { SORT_OPTIONS, type SortOption } from './calendar-table-helpers'

type CalendarToolbarParams = {
  globalFilter: string
  sortOption: SortOption
  selectedMonth: Month | null
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onClearSelectedMonth: () => void
}

export const CalendarToolbar = ({
  globalFilter,
  sortOption,
  selectedMonth,
  onSearchChange,
  onSortChange,
  onClearSelectedMonth
}: CalendarToolbarParams) => {
  return (
    <div className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row print:hidden">
      <div className="relative md:flex-1">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
        <label htmlFor="calendar-search" className="sr-only">
          Rechercher un produit
        </label>
        <input
          id="calendar-search"
          type="search"
          placeholder="Rechercher un produit..."
          value={globalFilter}
          onChange={onSearchChange}
          className="focus-ring-inset w-full rounded-full border border-gray-200 bg-white py-2.5 pr-5 pl-11 text-sm text-gray-900 placeholder:text-gray-400"
        />
      </div>
      {selectedMonth === null ? (
        <div className="relative md:shrink-0">
          <ArrowUpDown
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <label htmlFor="calendar-sort" className="sr-only">
            Trier les produits
          </label>
          <select
            id="calendar-sort"
            value={sortOption}
            onChange={onSortChange}
            className="focus-ring-inset h-full w-full appearance-none rounded-full border border-gray-200 bg-white py-2.5 pr-8 pl-9 text-sm text-gray-700"
          >
            {SORT_OPTIONS.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </select>
        </div>
      ) : (
        <button
          type="button"
          onClick={onClearSelectedMonth}
          className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full bg-active-100 py-2.5 pr-3 pl-4 text-sm font-medium text-active-700"
          aria-label={`Retirer le filtre ${getMonthName(selectedMonth)}`}
        >
          <span className="capitalize">{getMonthName(selectedMonth)}</span>
          <X className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

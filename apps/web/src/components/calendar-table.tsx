import * as React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Month, SeasonStatus } from '@estcequecestlasaison/shared'
import {
  getMonthName,
  SEASON_STATUS_LABELS
} from '@estcequecestlasaison/shared'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { PrintLegend, SeasonLegend } from './calendar-legend'
import {
  buildColumns,
  type CalendarColumnMeta,
  type CalendarItem,
  globalFilterFn,
  INSTANT_TRANSITION,
  type SortOption,
  sortProduceList,
  SPRING_TRANSITION,
  SPRING_TRANSITION_STIFF,
  TOTAL_COLUMNS
} from './calendar-table-helpers'
import { CalendarToolbar } from './calendar-toolbar'

type CalendarTableProps = {
  produceList: CalendarItem[]
  currentMonth: Month
}

export const CalendarTable = ({
  produceList,
  currentMonth
}: CalendarTableProps) => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [sortOption, setSortOption] = React.useState<SortOption>('name')
  const [selectedMonth, setSelectedMonth] = React.useState<Month | null>(null)
  const isReducedMotion = useReducedMotion()

  const hasSelectedMonth = selectedMonth !== null
  const effectiveSortMonth = selectedMonth ?? currentMonth
  const effectiveSortOption = hasSelectedMonth ? 'season' : sortOption

  // eslint-disable-next-line no-restricted-syntax -- required: unstable references cause TanStack Table infinite re-render loop
  const sortedData = React.useMemo(() => {
    return sortProduceList({
      produceList,
      currentMonth: effectiveSortMonth,
      sortOption: effectiveSortOption
    })
  }, [produceList, effectiveSortMonth, effectiveSortOption])

  // eslint-disable-next-line no-restricted-syntax -- required: unstable references cause TanStack Table infinite re-render loop
  const columns = React.useMemo(() => {
    return buildColumns()
  }, [])

  const table = useReactTable({
    data: sortedData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    getRowId: (row) => {
      return row.slug
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  const { rows } = table.getRowModel()
  const hasNoResults = rows.length === 0
  const isFiltered = rows.length !== produceList.length

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption)
  }

  const handleClearSelectedMonth = () => {
    setSelectedMonth(null)
  }

  const handleMonthToggle = (month: Month) => {
    setSelectedMonth((prev) => {
      return prev === month ? null : month
    })
  }

  return (
    <div>
      <CalendarToolbar
        globalFilter={globalFilter}
        sortOption={sortOption}
        selectedMonth={selectedMonth}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onClearSelectedMonth={handleClearSelectedMonth}
      />
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {hasNoResults
          ? 'Aucun produit trouv\u00e9'
          : `${rows.length} produits affich\u00e9s sur ${produceList.length}`}
      </span>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white print:overflow-visible print:rounded-none print:border-none">
        <div
          className="overflow-auto max-h-[calc(100vh-13rem)] md:max-h-[calc(100vh-11rem)] print:overflow-visible print:max-h-none"
          tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
          role="region"
          aria-label="Tableau du calendrier, d&eacute;filable horizontalement"
        >
          <table
            aria-describedby="calendar-legend"
            className="w-full min-w-175 border-collapse text-sm"
          >
            <caption className="sr-only">
              Calendrier de saisonnalit&eacute;
            </caption>
            <thead className="sticky top-0 z-30 print:static">
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      if (header.column.id === 'name') {
                        return (
                          <th
                            key={header.id}
                            scope="col"
                            className="sticky left-0 z-40 w-28 min-w-28 bg-gray-50 py-3 pr-2 pl-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 md:w-auto md:min-w-0 md:pr-4 md:pl-4 print:static"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </th>
                        )
                      }

                      const meta = header.column.columnDef
                        .meta as CalendarColumnMeta
                      const isCurrentMonth = meta.month === currentMonth
                      const isSelectedMonth = meta.month === selectedMonth
                      const isHighlightedAsCurrent =
                        isCurrentMonth && !hasSelectedMonth
                      const shouldShowIndicator =
                        isHighlightedAsCurrent || isSelectedMonth

                      return (
                        <th
                          key={header.id}
                          scope="col"
                          data-current={isHighlightedAsCurrent || undefined}
                          data-selected={isSelectedMonth || undefined}
                          className="bg-gray-50 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-600 data-current:bg-active-50 data-current:text-active-700 data-selected:bg-active-50 data-selected:text-active-700"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              handleMonthToggle(meta.month)
                            }}
                            aria-pressed={isSelectedMonth}
                            aria-label={`Filtrer par ${getMonthName(meta.month)}`}
                            className="focus-ring inline-flex min-h-11 min-w-11 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm"
                          >
                            <motion.span
                              animate={
                                isReducedMotion
                                  ? undefined
                                  : { y: shouldShowIndicator ? -2 : 0 }
                              }
                              transition={
                                isReducedMotion
                                  ? INSTANT_TRANSITION
                                  : SPRING_TRANSITION
                              }
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </motion.span>
                            {shouldShowIndicator ? (
                              <motion.span
                                layoutId="calendar-month-indicator"
                                data-selected={isSelectedMonth || undefined}
                                className="size-1 rounded-full bg-active-500"
                                aria-hidden="true"
                                transition={
                                  isReducedMotion
                                    ? INSTANT_TRANSITION
                                    : SPRING_TRANSITION_STIFF
                                }
                              />
                            ) : null}
                          </button>
                        </th>
                      )
                    })}
                  </tr>
                )
              })}
            </thead>
            <tbody>
              {rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className="group border-t border-gray-100 transition-colors hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.column.id === 'name') {
                        return (
                          <th
                            key={cell.id}
                            scope="row"
                            className="sticky left-0 z-10 w-28 min-w-28 bg-white py-2 pr-2 pl-3 text-left font-normal shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)] transition-colors group-hover:bg-gray-50 md:w-auto md:min-w-0 md:py-2.5 md:pr-4 md:pl-4 print:static print:shadow-none"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </th>
                        )
                      }

                      const meta = cell.column.columnDef
                        .meta as CalendarColumnMeta
                      const seasonType = cell.getValue() as SeasonStatus
                      const isCurrentMonth = meta.month === currentMonth
                      const isSelectedMonth = meta.month === selectedMonth
                      const isHighlightedAsCurrent =
                        isCurrentMonth && !hasSelectedMonth

                      return (
                        <td
                          key={cell.id}
                          data-season={seasonType}
                          data-current={isHighlightedAsCurrent || undefined}
                          data-selected={isSelectedMonth || undefined}
                          className="py-2 text-center md:py-2.5 data-current:bg-active-50/50 data-selected:bg-active-50/50"
                          aria-label={SEASON_STATUS_LABELS[seasonType]}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
              {hasNoResults ? (
                <tr>
                  <td
                    colSpan={TOTAL_COLUMNS}
                    className="py-12 text-center text-sm text-gray-600"
                  >
                    Aucun produit trouv&eacute;
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 py-3 rounded-b-xl print:static print:rounded-none print:border-none">
          <SeasonLegend />
          {isFiltered ? (
            <span
              className="shrink-0 text-xs tabular-nums text-gray-600 print:hidden"
              aria-label={`${rows.length} produits affich\u00e9s sur ${produceList.length}`}
            >
              {rows.length}&nbsp;/&nbsp;{produceList.length}
            </span>
          ) : null}
        </div>
      </div>
      <PrintLegend />
    </div>
  )
}

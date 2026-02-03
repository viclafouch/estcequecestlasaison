import type { Transition } from 'motion/react'
import { SEASON_DOT_STYLES } from '@/constants/season'
import { getProduceImageSrc } from '@/helpers/produce-image'
import type {
  Month,
  Produce,
  Seasons,
  SeasonStatus
} from '@estcequecestlasaison/shared'
import { ALL_MONTHS, getShortMonthName } from '@estcequecestlasaison/shared'
import { Link } from '@tanstack/react-router'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'

export type CalendarItem = Pick<Produce, 'slug' | 'name' | 'type' | 'seasons'>

export type SortOption = 'name' | 'season'

type SortOptionConfig = {
  value: SortOption
  label: string
}

export type CalendarColumnMeta = {
  month: Month
}

export const SORT_OPTIONS = [
  { value: 'name', label: 'A - Z' },
  { value: 'season', label: 'Saison du mois' }
] as const satisfies readonly SortOptionConfig[]

export const TOTAL_COLUMNS = 1 + ALL_MONTHS.length

export const SEASON_PRIORITY = {
  peak: 0,
  partial: 1,
  off: 2
} as const satisfies Record<SeasonStatus, number>

export const SEASON_DOT_CLASSES: Record<SeasonStatus, string> = {
  peak: `inline-block size-2.5 ${SEASON_DOT_STYLES.peak.className}`,
  partial: `inline-block size-2.5 ${SEASON_DOT_STYLES.partial.className}`,
  off: `inline-block size-1.5 ${SEASON_DOT_STYLES.off.className}`
}

export const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 500,
  damping: 30
} as const satisfies Transition

export const SPRING_TRANSITION_STIFF = {
  type: 'spring',
  stiffness: 500,
  damping: 50
} as const satisfies Transition

export const INSTANT_TRANSITION = {
  duration: 0
} as const satisfies Transition

export function getSeasonType(seasons: Seasons, month: Month) {
  return seasons[month] ?? 'off'
}

type SortProduceListParams = {
  produceList: CalendarItem[]
  currentMonth: Month
  sortOption: SortOption
}

export function sortProduceList({
  produceList,
  currentMonth,
  sortOption
}: SortProduceListParams) {
  if (sortOption === 'name') {
    return produceList
  }

  return produceList.toSorted((itemA, itemB) => {
    const seasonA = getSeasonType(itemA.seasons, currentMonth)
    const seasonB = getSeasonType(itemB.seasons, currentMonth)
    const priorityDiff = SEASON_PRIORITY[seasonA] - SEASON_PRIORITY[seasonB]

    if (priorityDiff !== 0) {
      return priorityDiff
    }

    return itemA.name.localeCompare(itemB.name, 'fr')
  })
}

export const globalFilterFn: FilterFn<CalendarItem> = (
  row,
  _columnId,
  filterValue
) => {
  return row
    .getValue<string>('name')
    .toLowerCase()
    .includes(String(filterValue).toLowerCase().trim())
}

export function buildColumns(): ColumnDef<CalendarItem>[] {
  const productColumn: ColumnDef<CalendarItem> = {
    accessorKey: 'name',
    enableGlobalFilter: true,
    header: () => {
      return 'Produit'
    },
    cell: ({ row }) => {
      return (
        <Link
          to="/$slug"
          params={{ slug: row.original.slug }}
          className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-sm text-gray-900 hover:text-primary-600 md:gap-3"
        >
          <img
            src={getProduceImageSrc(row.original.slug)}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            className="hidden size-8 shrink-0 rounded-full object-cover md:block print:hidden"
          />
          <span className="truncate text-xs font-medium md:text-sm">
            {row.original.name}
          </span>
        </Link>
      )
    }
  }

  const monthColumns = ALL_MONTHS.map((month): ColumnDef<CalendarItem> => {
    return {
      id: `month-${month}`,
      accessorFn: (row) => {
        return getSeasonType(row.seasons, month)
      },
      meta: { month } as CalendarColumnMeta,
      enableGlobalFilter: false,
      header: () => {
        return getShortMonthName(month)
      },
      cell: ({ getValue }) => {
        const seasonType = getValue() as SeasonStatus

        return (
          <span className={SEASON_DOT_CLASSES[seasonType]} aria-hidden="true" />
        )
      }
    }
  })

  return [productColumn, ...monthColumns]
}

import type { Month, Produce, SeasonStatus } from '../types'
import {
  ALL_MONTHS,
  getMonthName,
  getNextMonth,
  getPreviousMonth
} from './date'

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export type ProduceSection = 'in-season' | 'coming-next-month' | 'off-season'

export type BadgeVariant = 'positive' | 'warning' | 'neutral'

export type ProduceBadge = {
  label: string
  variant: BadgeVariant
}

export const SEASON_STATUS_LABELS = {
  peak: 'Pleine saison',
  partial: 'Début ou fin de saison',
  off: 'Hors saison'
} as const satisfies Record<SeasonStatus, string>

function getSeasonIntensity(produce: Produce, month: Month) {
  return produce.seasons[month]
}

export function matchIsInSeason(produce: Produce, month: Month) {
  const intensity = getSeasonIntensity(produce, month)

  return intensity === 'peak' || intensity === 'partial'
}

export type FilterProduceByTypeParams = {
  produceList: Produce[]
  type: Produce['type'] | 'all'
}

export function filterProduceByType({
  produceList,
  type
}: FilterProduceByTypeParams) {
  if (type === 'all') {
    return produceList
  }

  return produceList.filter((produce) => {
    return produce.type === type
  })
}

export type GroupProduceBySeasonParams = {
  produceList: Produce[]
  currentMonth: Month
}

export type GroupedProduce = {
  inSeason: Produce[]
  comingNextMonth: Produce[]
  offSeason: Produce[]
}

export function groupProduceBySeason({
  produceList,
  currentMonth
}: GroupProduceBySeasonParams) {
  const nextMonth = getNextMonth(currentMonth)

  return {
    inSeason: produceList.filter((produce) => {
      return matchIsInSeason(produce, currentMonth)
    }),
    comingNextMonth: produceList.filter((produce) => {
      return (
        !matchIsInSeason(produce, currentMonth) &&
        matchIsInSeason(produce, nextMonth)
      )
    }),
    offSeason: produceList.filter((produce) => {
      return (
        !matchIsInSeason(produce, currentMonth) &&
        !matchIsInSeason(produce, nextMonth)
      )
    })
  }
}

export type GetArrivingProduceParams = {
  produceList: Produce[]
  month: Month
}

export function getArrivingProduce({
  produceList,
  month
}: GetArrivingProduceParams) {
  const previousMonth = getPreviousMonth(month)

  return produceList.filter((produce) => {
    const wasInSeasonLastMonth = matchIsInSeason(produce, previousMonth)
    const isInSeasonThisMonth = matchIsInSeason(produce, month)

    return !wasInSeasonLastMonth && isInSeasonThisMonth
  })
}

export type GetLeavingProduceParams = {
  produceList: Produce[]
  month: Month
}

export function getLeavingProduce({
  produceList,
  month
}: GetLeavingProduceParams) {
  const nextMonth = getNextMonth(month)

  return produceList.filter((produce) => {
    const isInSeasonThisMonth = matchIsInSeason(produce, month)
    const willBeInSeasonNextMonth = matchIsInSeason(produce, nextMonth)

    return isInSeasonThisMonth && !willBeInSeasonNextMonth
  })
}

export type MonthStats = {
  fruits: number
  vegetables: number
  total: number
  arriving: Produce[]
  leaving: Produce[]
}

export type GetMonthStatsParams = {
  produceList: Produce[]
  month: Month
}

export function getMonthStats({ produceList, month }: GetMonthStatsParams) {
  const inSeason = produceList.filter((produce) => {
    return matchIsInSeason(produce, month)
  })

  const fruits = inSeason.filter((produce) => {
    return produce.type === 'fruit'
  }).length

  const vegetables = inSeason.filter((produce) => {
    return produce.type === 'vegetable'
  }).length

  return {
    fruits,
    vegetables,
    total: fruits + vegetables,
    arriving: getArrivingProduce({ produceList, month }),
    leaving: getLeavingProduce({ produceList, month })
  }
}

function getMonthDistance(from: Month, to: Month) {
  return to >= from ? to - from : 12 - from + to
}

export type SortProduceBySeasonEndParams = {
  produceList: Produce[]
  month: Month
}

type ProduceSortKey = {
  produce: Produce
  isAllYear: boolean
  isNew: boolean
  endDistance: number
}

export function sortProduceBySeasonEnd({
  produceList,
  month
}: SortProduceBySeasonEndParams) {
  const previousMonth = getPreviousMonth(month)

  const keyed: ProduceSortKey[] = produceList.map((produce) => {
    const isAllYear = matchIsInSeasonAllYear(produce)
    const isNew = !matchIsInSeason(produce, previousMonth)
    const endMonth = getSeasonEndMonth({ produce, fromMonth: month })

    return {
      produce,
      isAllYear,
      isNew,
      endDistance: getMonthDistance(month, endMonth)
    }
  })

  return keyed
    .toSorted((left, right) => {
      if (left.isAllYear !== right.isAllYear) {
        return right.isAllYear ? -1 : 1
      }

      if (left.isNew !== right.isNew) {
        return left.isNew ? -1 : 1
      }

      return left.endDistance - right.endDistance
    })
    .map(({ produce }) => {
      return produce
    })
}

export function matchIsInSeasonAllYear(produce: Produce) {
  return ALL_MONTHS.every((month) => {
    return matchIsInSeason(produce, month)
  })
}

type GetSeasonEndMonthParams = {
  produce: Produce
  fromMonth: Month
}

export function getSeasonEndMonth({
  produce,
  fromMonth
}: GetSeasonEndMonthParams) {
  let current = fromMonth

  for (
    let next = getNextMonth(current);
    next !== fromMonth && matchIsInSeason(produce, next);
    next = getNextMonth(current)
  ) {
    current = next
  }

  return current
}

function getSeasonRanges(produce: Produce) {
  const ranges: { start: Month; end: Month }[] = []
  const visited = new Set<Month>()

  for (const month of ALL_MONTHS) {
    if (visited.has(month) || !matchIsInSeason(produce, month)) {
      continue
    }

    if (matchIsInSeason(produce, getPreviousMonth(month))) {
      continue
    }

    let end = month
    visited.add(end)

    while (
      matchIsInSeason(produce, getNextMonth(end)) &&
      !visited.has(getNextMonth(end))
    ) {
      end = getNextMonth(end)
      visited.add(end)
    }

    ranges.push({ start: month, end })
  }

  return ranges
}

function formatSeasonRange({ start, end }: { start: Month; end: Month }) {
  if (start === end) {
    return capitalize(getMonthName(start))
  }

  return `${capitalize(getMonthName(start))} à ${capitalize(getMonthName(end))}`
}

export function getSeasonRangeLabel(produce: Produce) {
  return getSeasonRanges(produce).map(formatSeasonRange).join(', ')
}

type GetProduceBadgeParams = {
  produce: Produce
  month: Month
  section: ProduceSection
}

export function getProduceBadge({
  produce,
  month,
  section
}: GetProduceBadgeParams) {
  if (section === 'off-season') {
    return { label: getSeasonRangeLabel(produce), variant: 'neutral' as const }
  }

  if (section === 'coming-next-month') {
    const endMonth = getSeasonEndMonth({ produce, fromMonth: month })
    const label =
      endMonth === month
        ? `En ${capitalize(getMonthName(month))}`
        : `${capitalize(getMonthName(month))} à ${capitalize(getMonthName(endMonth))}`

    return { label, variant: 'positive' as const }
  }

  if (matchIsInSeasonAllYear(produce)) {
    return { label: "Toute l'année", variant: 'positive' as const }
  }

  const previousMonth = getPreviousMonth(month)
  const wasInSeasonLastMonth = matchIsInSeason(produce, previousMonth)

  if (!wasInSeasonLastMonth) {
    return { label: 'Nouveau', variant: 'positive' as const }
  }

  const nextMonth = getNextMonth(month)
  const willBeInSeasonNextMonth = matchIsInSeason(produce, nextMonth)

  if (!willBeInSeasonNextMonth) {
    return { label: 'Dernier mois', variant: 'warning' as const }
  }

  const endMonth = getSeasonEndMonth({ produce, fromMonth: month })

  return {
    label: `Jusqu'en ${capitalize(getMonthName(endMonth))}`,
    variant: 'positive' as const
  }
}

const MAX_ALTERNATIVES = 4

export type GetSeasonAlternativesParams = {
  produce: Produce
  month: Month
  allProduce: Produce[]
}

export function getSeasonAlternatives({
  produce,
  month,
  allProduce
}: GetSeasonAlternativesParams) {
  if (matchIsInSeason(produce, month)) {
    return []
  }

  return allProduce
    .filter((item) => {
      return (
        item.id !== produce.id &&
        item.type === produce.type &&
        matchIsInSeason(item, month)
      )
    })
    .toSorted((left, right) => {
      return left.name.localeCompare(right.name, 'fr')
    })
    .slice(0, MAX_ALTERNATIVES)
}

type GetDefaultProduceBadgeParams = {
  produce: Produce
  month: Month
}

export function getDefaultProduceBadge({
  produce,
  month
}: GetDefaultProduceBadgeParams) {
  const isInSeason = matchIsInSeason(produce, month)

  if (!isInSeason) {
    return { label: getSeasonRangeLabel(produce), variant: 'neutral' as const }
  }

  return getProduceBadge({ produce, month, section: 'in-season' })
}

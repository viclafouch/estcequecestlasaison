import { format, getMonth } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { Month, Produce } from '../types'

export type SeasonStatus = 'peak' | 'start' | 'end' | 'off'

const SEASON_LABELS = {
  peak: 'En pleine saison',
  start: 'Début de saison',
  end: 'Fin de saison',
  off: 'Hors saison'
} as const satisfies { [K in SeasonStatus]: string }

const SEASON_PRIORITY = {
  peak: 0,
  start: 1,
  end: 2,
  off: 3
} as const satisfies { [K in SeasonStatus]: number }

const ALL_MONTHS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
] as const satisfies Month[]

export function getCurrentMonth() {
  return (getMonth(new Date()) + 1) as Month
}

export function getSeasonIntensity(produce: Produce, month: Month) {
  return produce.seasons[month]
}

export function getPreviousMonth(month: Month) {
  return (month === 1 ? 12 : month - 1) as Month
}

export function getSeasonStatus(produce: Produce, month: Month): SeasonStatus {
  const intensity = getSeasonIntensity(produce, month)

  if (!intensity) {
    return 'off'
  }

  if (intensity === 'peak') {
    return 'peak'
  }

  const prevMonth = getPreviousMonth(month)
  const nextMonth = getNextMonth(month)
  const prevIntensity = getSeasonIntensity(produce, prevMonth)
  const nextIntensity = getSeasonIntensity(produce, nextMonth)

  const wasInSeasonLastMonth =
    prevIntensity === 'peak' || prevIntensity === 'partial'
  const willBeInSeasonNextMonth =
    nextIntensity === 'peak' || nextIntensity === 'partial'

  if (!wasInSeasonLastMonth && willBeInSeasonNextMonth) {
    return 'start'
  }

  if (wasInSeasonLastMonth && !willBeInSeasonNextMonth) {
    return 'end'
  }

  return 'start'
}

export function getSeasonLabel(status: SeasonStatus) {
  return SEASON_LABELS[status]
}

export function matchIsInSeason(produce: Produce, month: Month) {
  const intensity = getSeasonIntensity(produce, month)

  return intensity === 'peak' || intensity === 'partial'
}

export function matchIsInPeakSeason(produce: Produce, month: Month) {
  return getSeasonIntensity(produce, month) === 'peak'
}

export type FilterProduceByMonthParams = {
  produceList: Produce[]
  month: Month
}

export function filterProduceByMonth({
  produceList,
  month
}: FilterProduceByMonthParams) {
  return produceList.filter((produce) => {
    return matchIsInSeason(produce, month)
  })
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

export type SortProduceBySeasonParams = {
  produceList: Produce[]
  month: Month
}

export function sortProduceBySeason({
  produceList,
  month
}: SortProduceBySeasonParams) {
  return produceList.toSorted((produceA, produceB) => {
    const statusA = getSeasonStatus(produceA, month)
    const statusB = getSeasonStatus(produceB, month)

    return SEASON_PRIORITY[statusA] - SEASON_PRIORITY[statusB]
  })
}

export function getProduceSeasonMonths(produce: Produce) {
  return ALL_MONTHS.filter((month) => {
    return produce.seasons[month] !== undefined
  })
}

export function getNextSeasonMonth(produce: Produce, fromMonth: Month) {
  const startIndex = ALL_MONTHS.indexOf(fromMonth)
  const orderedMonths = [
    ...ALL_MONTHS.slice(startIndex),
    ...ALL_MONTHS.slice(0, startIndex)
  ]

  return orderedMonths.find((month) => {
    return month !== fromMonth && matchIsInSeason(produce, month)
  })
}

export function getNextMonth(month: Month) {
  return (month === 12 ? 1 : month + 1) as Month
}

export function getMonthName(month: Month) {
  const date = new Date(2024, month - 1, 1)

  return format(date, 'MMMM', { locale: fr })
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

  const inSeason: Produce[] = []
  const nextMonthSeason: Produce[] = []
  const offSeason: Produce[] = []

  for (const produce of produceList) {
    const isCurrentlyInSeason = matchIsInSeason(produce, currentMonth)
    const isInSeasonNextMonth = matchIsInSeason(produce, nextMonth)

    if (isCurrentlyInSeason) {
      inSeason.push(produce)
    }

    if (isInSeasonNextMonth) {
      nextMonthSeason.push(produce)
    }

    if (!isCurrentlyInSeason && !isInSeasonNextMonth) {
      offSeason.push(produce)
    }
  }

  return { inSeason, comingNextMonth: nextMonthSeason, offSeason }
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

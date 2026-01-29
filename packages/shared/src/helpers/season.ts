import { getMonth } from 'date-fns'
import type { Month, Produce } from '../types'

export type SeasonStatus = 'peak' | 'partial' | 'off'

const SEASON_LABELS = {
  peak: 'En pleine saison',
  partial: 'Début/fin de saison',
  off: 'Hors saison'
} as const satisfies { [K in SeasonStatus]: string }

const SEASON_PRIORITY = {
  peak: 0,
  partial: 1,
  off: 2
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

export function getSeasonStatus(produce: Produce, month: Month) {
  const intensity = getSeasonIntensity(produce, month)

  if (intensity === 'peak') {
    return 'peak' as const
  }

  if (intensity === 'partial') {
    return 'partial' as const
  }

  return 'off' as const
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

import { getMonth } from 'date-fns'
import type { Produce, SeasonIntensity } from '../types'

export function getCurrentMonth() {
  return getMonth(new Date()) + 1
}

export function getSeasonStatus(produce: Produce, month: number): SeasonIntensity | null {
  return produce.seasons[month] ?? null
}

export function isInSeason(produce: Produce, month: number) {
  return produce.seasons[month] !== undefined
}

export function getProduceInSeason(produceList: Produce[], month: number) {
  return produceList.filter((p) => isInSeason(p, month))
}

export function getSeasonLabel(intensity: SeasonIntensity | null) {
  switch (intensity) {
    case 'peak':
      return 'Pleine saison'
    case 'partial':
      return 'Début/fin de saison'
    default:
      return 'Hors saison'
  }
}

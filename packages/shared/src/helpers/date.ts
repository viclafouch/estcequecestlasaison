import type { Month } from '../types'

const PARIS_TIMEZONE = 'Europe/Paris'

export const ALL_MONTHS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
] as const satisfies Month[]

export function getCurrentMonth() {
  const parisMonth = new Intl.DateTimeFormat('fr-FR', {
    timeZone: PARIS_TIMEZONE,
    month: 'numeric'
  }).format(new Date())

  return Number(parisMonth) as Month
}

export function getCurrentYear() {
  return Number(
    new Intl.DateTimeFormat('fr-FR', {
      timeZone: PARIS_TIMEZONE,
      year: 'numeric'
    }).format(new Date())
  )
}

export function getPreviousMonth(month: Month) {
  return (month === 1 ? 12 : month - 1) as Month
}

export function getNextMonth(month: Month) {
  return (month === 12 ? 1 : month + 1) as Month
}

export function getMonthName(month: Month) {
  return new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(
    new Date(2024, month - 1, 1)
  )
}

export function getShortMonthName(month: Month) {
  return getMonthName(month).slice(0, 3)
}

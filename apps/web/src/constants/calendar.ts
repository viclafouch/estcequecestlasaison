import type { ProduceType } from '@estcequecestlasaison/shared'

type BreadcrumbItem = {
  name: string
  pathname: string
}

type CalendarRouteConfig = {
  calendarType: 'all' | ProduceType
  title: string
  description: string
  keywords: string
  pathname: string
  breadcrumbs: BreadcrumbItem[]
}

export const CALENDAR_ALL_CONFIG = {
  calendarType: 'all',
  title: 'Calendrier des fruits et l\u00e9gumes de saison en France',
  description:
    'Tous les fruits et l\u00e9gumes de saison en France, mois par mois.',
  keywords:
    'calendrier fruits l\u00e9gumes saison, calendrier saisonnalit\u00e9, fruits de saison, l\u00e9gumes de saison, calendrier annuel',
  pathname: '/calendrier',
  breadcrumbs: [
    { name: 'Accueil', pathname: '/' },
    { name: 'Calendrier', pathname: '/calendrier' }
  ]
} as const satisfies CalendarRouteConfig

export const CALENDAR_FRUITS_CONFIG = {
  calendarType: 'fruit',
  title: 'Calendrier des fruits de saison en France',
  description: 'Tous les fruits de saison en France, mois par mois.',
  keywords:
    'calendrier fruits saison, fruits de saison france, calendrier saisonnalit\u00e9 fruits, fruits par mois',
  pathname: '/calendrier/fruits',
  breadcrumbs: [
    { name: 'Accueil', pathname: '/' },
    { name: 'Calendrier', pathname: '/calendrier' },
    { name: 'Fruits', pathname: '/calendrier/fruits' }
  ]
} as const satisfies CalendarRouteConfig

export const CALENDAR_LEGUMES_CONFIG = {
  calendarType: 'vegetable',
  title: 'Calendrier des l\u00e9gumes de saison en France',
  description: 'Tous les l\u00e9gumes de saison en France, mois par mois.',
  keywords:
    'calendrier l\u00e9gumes saison, l\u00e9gumes de saison france, calendrier saisonnalit\u00e9 l\u00e9gumes, l\u00e9gumes par mois',
  pathname: '/calendrier/legumes',
  breadcrumbs: [
    { name: 'Accueil', pathname: '/' },
    { name: 'Calendrier', pathname: '/calendrier' },
    { name: 'L\u00e9gumes', pathname: '/calendrier/legumes' }
  ]
} as const satisfies CalendarRouteConfig

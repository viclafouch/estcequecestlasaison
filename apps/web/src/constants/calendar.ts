type BreadcrumbItem = {
  name: string
  pathname: string
}

type CalendarRouteConfig = {
  title: string
  description: string
  keywords: string
  pathname: string
  breadcrumbs: BreadcrumbItem[]
}

export const CALENDAR_ALL_CONFIG = {
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

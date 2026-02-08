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
  title: 'Calendrier des fruits et légumes de saison en France',
  description: 'Tous les fruits et légumes de saison en France, mois par mois.',
  keywords:
    'calendrier fruits légumes saison, calendrier saisonnalité, fruits de saison, légumes de saison, calendrier annuel',
  pathname: '/calendrier',
  breadcrumbs: [
    { name: 'Accueil', pathname: '/' },
    { name: 'Calendrier', pathname: '/calendrier' }
  ]
} as const satisfies CalendarRouteConfig

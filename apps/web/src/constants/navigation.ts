import type { LinkOptions } from '@tanstack/react-router'

type NavLink = LinkOptions & {
  label: string
  exact: boolean
}

export const BURGER_NAV_LINKS = [
  { to: '/', label: 'Rechercher', exact: true },
  { to: '/calendrier', label: 'Calendrier', exact: true },
  { to: '/faq', label: 'FAQ', exact: true }
] as const satisfies readonly NavLink[]

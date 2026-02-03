import type { LucideIcon } from 'lucide-react'
import { CalendarDays, HelpCircle } from 'lucide-react'
import type { LinkOptions } from '@tanstack/react-router'

type NavLink = LinkOptions & {
  label: string
  description: string
  icon: LucideIcon
  exact: boolean
}

export const BURGER_NAV_LINKS = [
  {
    to: '/calendrier',
    label: 'Calendrier',
    description: 'Voir par mois',
    icon: CalendarDays,
    exact: true
  },
  {
    to: '/faq',
    label: 'FAQ',
    description: 'Questions fréquentes',
    icon: HelpCircle,
    exact: true
  }
] as const satisfies readonly NavLink[]

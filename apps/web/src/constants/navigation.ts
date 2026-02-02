import type { LinkOptions } from '@tanstack/react-router'

type NavLink = LinkOptions & {
  label: string
  exact: boolean
}

export const HEADER_NAV_LINKS = [
  { to: '/faq', label: 'FAQ', exact: true }
] as const satisfies readonly NavLink[]

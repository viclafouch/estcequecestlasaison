import type { BadgeVariant } from '@estcequecestlasaison/shared'

export const BADGE_DOT_CLASSES = {
  positive: 'bg-badge-positive',
  warning: 'bg-badge-warning',
  neutral: 'bg-badge-neutral'
} as const satisfies Record<BadgeVariant, string>

export const BADGE_TEXT_CLASSES = {
  positive: 'text-badge-text-positive',
  warning: 'text-badge-text-warning',
  neutral: 'text-badge-text-neutral'
} as const satisfies Record<BadgeVariant, string>

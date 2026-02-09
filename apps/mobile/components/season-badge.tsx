import React from 'react'
import { Chip } from 'heroui-native'
import type { BadgeVariant } from '@estcequecestlasaison/shared'

const BADGE_CHIP_COLOR = {
  positive: 'success',
  warning: 'warning',
  neutral: 'default'
} as const satisfies Record<BadgeVariant, 'success' | 'warning' | 'default'>

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

type SeasonChipProps = {
  label: string
  variant: BadgeVariant
}

export const SeasonChip = React.memo(({ label, variant }: SeasonChipProps) => {
  return (
    <Chip
      size="sm"
      variant="soft"
      color={BADGE_CHIP_COLOR[variant]}
      animation="disable-all"
    >
      <Chip.Label numberOfLines={1}>{label}</Chip.Label>
    </Chip>
  )
})

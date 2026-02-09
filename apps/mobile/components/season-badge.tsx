import React from 'react'
import { Chip } from 'heroui-native'
import { colors } from '@/constants/theme'
import type { BadgeVariant } from '@estcequecestlasaison/shared'

type BadgeVariantColors = {
  dot: string
  text: string
  chip: 'success' | 'warning' | 'default'
}

export const BADGE_VARIANT_COLORS = {
  positive: {
    dot: colors.badgeDotPositive,
    text: colors.badgeTextPositive,
    chip: 'success'
  },
  warning: {
    dot: colors.badgeDotWarning,
    text: colors.badgeTextWarning,
    chip: 'warning'
  },
  neutral: {
    dot: colors.badgeDotNeutral,
    text: colors.badgeTextNeutral,
    chip: 'default'
  }
} as const satisfies Record<BadgeVariant, BadgeVariantColors>

export const BADGE_PILL_BACKGROUND = colors.badgePillBackground
export const BADGE_PILL_BORDER = colors.badgePillBorder

type SeasonChipProps = {
  label: string
  variant: BadgeVariant
}

export const SeasonChip = React.memo(({ label, variant }: SeasonChipProps) => {
  return (
    <Chip
      size="sm"
      variant="soft"
      color={BADGE_VARIANT_COLORS[variant].chip}
      animation="disable-all"
    >
      <Chip.Label numberOfLines={1}>{label}</Chip.Label>
    </Chip>
  )
})

import type { BadgeVariant, SeasonStatus } from '@estcequecestlasaison/shared'

type SeasonDotStyle = {
  className: string
  label: string
}

export const SEASON_DOT_STYLES = {
  peak: {
    className: 'rounded-full bg-primary-500',
    label: 'Pleine saison'
  },
  partial: {
    className: 'rounded-full border-2 border-warning-400',
    label: 'D\u00e9but/fin de saison'
  },
  off: {
    className: 'rounded-full bg-gray-300',
    label: 'Hors saison'
  }
} as const satisfies Record<SeasonStatus, SeasonDotStyle>

export const BADGE_VARIANT_TO_SEASON = {
  positive: 'peak',
  warning: 'partial',
  neutral: 'off'
} as const satisfies Record<BadgeVariant, SeasonStatus>

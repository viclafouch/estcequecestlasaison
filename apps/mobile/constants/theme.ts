import type { ViewStyle } from 'react-native'

type ThemeColors = {
  primary: string
  background: string
  text: string
  textMuted: string
  border: string
  muted: string
  gradientTransparent: string
  gradientDark: string
  gradientHeroDark: string
  gradientCarousel: string
  cardTextPrimary: string
  cardTextSecondary: string
  cardTextTertiary: string
  shareButtonBackground: string
  badgeDotPositive: string
  badgeDotWarning: string
  badgeDotNeutral: string
  badgeTextPositive: string
  badgeTextWarning: string
  badgeTextNeutral: string
  badgePillBackground: string
  badgePillBorder: string
  seasonDetailPositive: string
  seasonDetailWarning: string
  seasonDetailNeutral: string
}

export const colors = {
  primary: '#10b981',
  background: '#ffffff',
  text: '#000000',
  textMuted: '#6b7280',
  border: '#e5e7eb',
  muted: '#d1d5db',
  gradientTransparent: 'transparent',
  gradientDark: 'rgba(0, 0, 0, 0.65)',
  gradientHeroDark: 'rgba(0, 0, 0, 0.7)',
  gradientCarousel: 'rgba(0, 0, 0, 0.55)',
  cardTextPrimary: '#ffffff',
  cardTextSecondary: 'rgba(255, 255, 255, 0.5)',
  cardTextTertiary: 'rgba(255, 255, 255, 0.7)',
  shareButtonBackground: 'rgba(0, 0, 0, 0.25)',
  badgeDotPositive: '#10b981',
  badgeDotWarning: '#f59e0b',
  badgeDotNeutral: '#9ca3af',
  badgeTextPositive: '#047857',
  badgeTextWarning: '#b45309',
  badgeTextNeutral: '#6b7280',
  badgePillBackground: 'rgba(255, 255, 255, 0.85)',
  badgePillBorder: 'rgba(0, 0, 0, 0.08)',
  seasonDetailPositive: '#6ee7b7',
  seasonDetailWarning: '#fcd34d',
  seasonDetailNeutral: 'rgba(255, 255, 255, 0.5)'
} as const satisfies ThemeColors

export const squircle = {
  borderCurve: 'continuous'
} as const satisfies Pick<ViewStyle, 'borderCurve'>

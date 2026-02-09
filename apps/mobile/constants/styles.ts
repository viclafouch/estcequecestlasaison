import type { ViewStyle } from 'react-native'

export const squircle = {
  borderCurve: 'continuous'
} as const satisfies Pick<ViewStyle, 'borderCurve'>

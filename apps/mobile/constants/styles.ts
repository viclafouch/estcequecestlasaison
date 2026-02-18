import { Platform, type ViewStyle } from 'react-native'

export const squircle = {
  borderCurve: 'continuous'
} as const satisfies Pick<ViewStyle, 'borderCurve'>

export const SUPPORTS_TOOLBAR =
  Platform.OS === 'ios' && Number(Platform.Version) >= 26

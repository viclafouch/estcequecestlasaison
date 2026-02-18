import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect'

type GlassSheetBackgroundProps = {
  style?: StyleProp<ViewStyle>
}

const BORDER_RADIUS = 16

export const GlassSheetBackground = ({ style }: GlassSheetBackgroundProps) => {
  if (isGlassEffectAPIAvailable()) {
    return (
      <GlassView style={[style, styles.glass]} glassEffectStyle="regular" />
    )
  }

  return (
    <BlurView style={[style, styles.glass]} tint="extraLight" intensity={90} />
  )
}

const styles = StyleSheet.create({
  // BlurView/GlassView need overflow hidden + borderRadius for proper clipping
  glass: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    overflow: 'hidden'
  }
})

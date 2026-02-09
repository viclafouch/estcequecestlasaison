import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import {
  BADGE_PILL_BACKGROUND,
  BADGE_PILL_BORDER,
  BADGE_VARIANT_COLORS
} from '@/components/season-badge'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'
import { colors } from '@/constants/theme'
import {
  getProduceBadge,
  type Month,
  type Produce,
  type ProduceSection
} from '@estcequecestlasaison/shared'

type ProduceCardProps = {
  produce: Produce
  month: Month
  section: ProduceSection
}

const MAX_VITAMINS_DISPLAYED = 3

const formatVitamins = (vitamins: string[]) => {
  const displayed = vitamins.slice(0, MAX_VITAMINS_DISPLAYED)

  return `Vit. ${displayed.join(', ')}`
}

export const ProduceCard = ({ produce, month, section }: ProduceCardProps) => {
  const badge = getProduceBadge({ produce, month, section })
  const imageSource = getProduceImage(produce.slug as ProduceImageSlug)
  const typeLabel = produce.type === 'fruit' ? 'FRUIT' : 'LÉGUME'
  const variantColors = BADGE_VARIANT_COLORS[badge.variant]
  const hasVitamins = produce.nutrition.vitamins.length > 0

  return (
    <Link href={`/product/${produce.slug}`} asChild>
      <Pressable
        style={StyleSheet.absoluteFill}
        accessibilityRole="link"
        accessibilityLabel={produce.name}
      >
        <Image
          source={imageSource}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          accessibilityLabel={produce.name}
        />
        <LinearGradient
          colors={[colors.gradientTransparent, colors.gradientDark]}
          style={styles.gradient}
        />
        <View
          className="absolute top-4 left-4 flex-row items-center gap-2 rounded-full border px-4 py-2"
          style={styles.badgePill}
        >
          <View
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: variantColors.dot }}
          />
          <Text
            className="text-sm font-semibold"
            style={{ color: variantColors.text }}
          >
            {badge.label}
          </Text>
        </View>
        <View className="absolute bottom-7 left-6 right-6">
          <Text
            className="text-[11px] font-semibold mb-1"
            style={styles.typeLabel}
          >
            {typeLabel}
          </Text>
          <Text
            className="text-[30px] font-extrabold text-white"
            numberOfLines={1}
          >
            {produce.name}
          </Text>
          <Text
            className="text-[13px] font-medium mt-1.5"
            style={styles.nutritionLine}
            numberOfLines={1}
          >
            {produce.nutrition.calories} kcal
            {hasVitamins
              ? ` · ${formatVitamins(produce.nutrition.vitamins)}`
              : ''}
          </Text>
        </View>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  // Percentage height on LinearGradient doesn't resolve via Uniwind className
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%'
  },
  // rgba backgroundColor/borderColor crash Uniwind opacity modifiers
  badgePill: {
    backgroundColor: BADGE_PILL_BACKGROUND,
    borderColor: BADGE_PILL_BORDER
  },
  // letterSpacing crashes Uniwind serializer (tracking-[2px]),
  // rgba color crashes Uniwind opacity modifiers
  typeLabel: {
    letterSpacing: 2,
    color: colors.cardTextSecondary
  },
  // rgba color crashes Uniwind opacity modifiers
  nutritionLine: {
    color: colors.cardTextTertiary
  }
})

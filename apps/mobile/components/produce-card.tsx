import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { cn } from 'heroui-native'
import { useCSSVariable } from 'uniwind'
import {
  BADGE_DOT_CLASSES,
  BADGE_TEXT_CLASSES
} from '@/components/season-badge'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'
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
  const hasVitamins = produce.nutrition.vitamins.length > 0
  const [gradientDark] = useCSSVariable(['--color-gradient-dark'])

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
          colors={['transparent', String(gradientDark)]}
          style={styles.gradient}
        />
        <View className="absolute top-4 left-4 flex-row items-center gap-2 rounded-full border px-4 py-2 bg-pill-bg border-pill-border">
          <View
            className={cn(
              'w-2 h-2 rounded-full',
              BADGE_DOT_CLASSES[badge.variant]
            )}
          />
          <Text
            className={cn(
              'text-sm font-semibold',
              BADGE_TEXT_CLASSES[badge.variant]
            )}
          >
            {badge.label}
          </Text>
        </View>
        <View className="absolute bottom-7 left-6 right-6">
          <Text
            className="text-[11px] font-semibold mb-1 text-text-on-image"
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
            className="text-[13px] font-medium mt-1.5 text-text-on-image-strong"
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
  // letterSpacing crashes Uniwind serializer (tracking-[2px])
  typeLabel: {
    letterSpacing: 2
  }
})

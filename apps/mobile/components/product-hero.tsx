import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { cn } from 'heroui-native'
import { useCSSVariable } from 'uniwind'
import { BADGE_DOT_CLASSES } from '@/components/season-badge'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'
import {
  type BadgeVariant,
  getDefaultProduceBadge,
  getPreviousMonth,
  matchIsInSeason,
  matchIsInSeasonAllYear,
  type Month,
  type Produce,
  type ProduceBadge
} from '@estcequecestlasaison/shared'

const HERO_HEIGHT = 400

type SeasonDisplay = {
  label: string
  detail: string | null
  variant: BadgeVariant
}

type GetSeasonDisplayParams = {
  produce: Produce
  month: Month
  badge: ProduceBadge
}

const getSeasonDisplay = ({
  produce,
  month,
  badge
}: GetSeasonDisplayParams): SeasonDisplay => {
  if (matchIsInSeasonAllYear(produce)) {
    return {
      label: "Disponible toute l'année",
      detail: null,
      variant: 'positive'
    }
  }

  const intensity = produce.seasons[month]

  if (intensity === 'peak') {
    return {
      label: 'En pleine saison',
      detail: badge.label,
      variant: badge.variant
    }
  }

  if (intensity === 'partial') {
    const previousMonth = getPreviousMonth(month)
    const wasInSeasonLastMonth = matchIsInSeason(produce, previousMonth)
    const label = wasInSeasonLastMonth ? 'Fin de saison' : 'Début de saison'

    return {
      label,
      detail: badge.label,
      variant: badge.variant
    }
  }

  return {
    label: 'Hors saison',
    detail: badge.label,
    variant: 'neutral'
  }
}

const SEASON_DETAIL_CLASSES = {
  positive: 'text-season-positive',
  warning: 'text-season-warning',
  neutral: 'text-text-on-image'
} as const satisfies Record<BadgeVariant, string>

type ProductHeroProps = {
  produce: Produce
  currentMonth: Month
}

export const ProductHero = ({ produce, currentMonth }: ProductHeroProps) => {
  const badge = getDefaultProduceBadge({ produce, month: currentMonth })
  const typeLabel = produce.type === 'fruit' ? 'FRUIT' : 'LÉGUME'
  const seasonDisplay = getSeasonDisplay({
    produce,
    month: currentMonth,
    badge
  })
  const imageSource = getProduceImage(produce.slug as ProduceImageSlug)
  const [gradientHero] = useCSSVariable(['--color-gradient-hero'])

  return (
    <View className="overflow-hidden" style={styles.container}>
      <Link.AppleZoomTarget>
        <Image
          source={imageSource}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          accessibilityLabel={`${produce.name}, ${typeLabel}`}
        />
      </Link.AppleZoomTarget>
      <LinearGradient
        colors={['transparent', String(gradientHero)]}
        style={styles.gradient}
      />
      <View className="absolute bottom-6 left-6 right-6">
        <Text
          className="text-[11px] font-semibold mb-1 text-text-on-image"
          style={styles.typeLabel}
        >
          {typeLabel}
        </Text>
        <Text
          className="text-[34px] font-extrabold text-white mb-2"
          accessibilityRole="header"
        >
          {produce.name}
        </Text>
        <View className="flex-row items-center gap-2">
          <View
            className={cn(
              'w-2.5 h-2.5 rounded-full',
              BADGE_DOT_CLASSES[seasonDisplay.variant]
            )}
            importantForAccessibility="no"
          />
          <Text className="text-[15px] font-bold text-white">
            {seasonDisplay.label}
          </Text>
        </View>
        {seasonDisplay.detail ? (
          <Text
            className={cn(
              'text-[13px] font-medium mt-1',
              SEASON_DETAIL_CLASSES[seasonDisplay.variant]
            )}
          >
            {seasonDisplay.detail}
          </Text>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // Height needed as StyleSheet: child gradient uses percentage height
  // which doesn't resolve when parent height is set via Uniwind className
  container: {
    height: HERO_HEIGHT
  },
  // Percentage height on LinearGradient doesn't resolve via Uniwind className
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%'
  },
  // letterSpacing crashes Uniwind serializer (tracking-[2px])
  typeLabel: {
    letterSpacing: 2
  }
})

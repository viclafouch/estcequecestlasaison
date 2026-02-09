import { Pressable, Share, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { BADGE_VARIANT_COLORS } from '@/components/season-badge'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'
import { colors } from '@/constants/theme'
import {
  type BadgeVariant,
  getDefaultProduceBadge,
  getPreviousMonth,
  getShareText,
  matchIsInSeason,
  matchIsInSeasonAllYear,
  type Month,
  type Produce,
  type ProduceBadge
} from '@estcequecestlasaison/shared'
import Ionicons from '@expo/vector-icons/Ionicons'

const SITE_DOMAIN = 'estcequecestlasaison.fr'
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

const SEASON_DETAIL_COLORS = {
  positive: colors.seasonDetailPositive,
  warning: colors.seasonDetailWarning,
  neutral: colors.seasonDetailNeutral
} as const satisfies Record<BadgeVariant, string>

type ProductHeroProps = {
  produce: Produce
  currentMonth: Month
}

export const ProductHero = ({ produce, currentMonth }: ProductHeroProps) => {
  const badge = getDefaultProduceBadge({ produce, month: currentMonth })
  const isInSeason = matchIsInSeason(produce, currentMonth)
  const typeLabel = produce.type === 'fruit' ? 'FRUIT' : 'LÉGUME'
  const seasonDisplay = getSeasonDisplay({
    produce,
    month: currentMonth,
    badge
  })
  const dotColor = BADGE_VARIANT_COLORS[seasonDisplay.variant].dot
  const detailColor = SEASON_DETAIL_COLORS[seasonDisplay.variant]
  const imageSource = getProduceImage(produce.slug as ProduceImageSlug)

  const handleShare = () => {
    const shareText = getShareText({
      produceName: produce.name,
      isInSeason,
      siteDomain: SITE_DOMAIN
    })

    void Share.share({
      message: shareText,
      url: `https://${SITE_DOMAIN}/${produce.slug}`
    })
  }

  return (
    <View className="overflow-hidden" style={styles.container}>
      <Image
        source={imageSource}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        accessibilityLabel={`${produce.name}, ${typeLabel}`}
      />
      <LinearGradient
        colors={[colors.gradientTransparent, colors.gradientHeroDark]}
        style={styles.gradient}
      />
      <Pressable
        className="absolute top-4 right-4 w-10 h-10 rounded-full items-center justify-center"
        style={styles.shareButton}
        onPress={handleShare}
        accessibilityLabel={`Partager ${produce.name}`}
        accessibilityRole="button"
      >
        <Ionicons
          name="share-outline"
          size={20}
          color={colors.cardTextPrimary}
        />
      </Pressable>
      <View className="absolute bottom-6 left-6 right-6">
        <Text
          className="text-[11px] font-semibold mb-1"
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
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: dotColor }}
            importantForAccessibility="no"
          />
          <Text className="text-[15px] font-bold text-white">
            {seasonDisplay.label}
          </Text>
        </View>
        {seasonDisplay.detail ? (
          <Text
            className="text-[13px] font-medium mt-1"
            style={{ color: detailColor }}
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
  // rgba backgroundColor crashes Uniwind opacity modifiers (bg-black/25)
  shareButton: {
    backgroundColor: colors.shareButtonBackground
  },
  // letterSpacing crashes Uniwind serializer (tracking-[2px]),
  // rgba color crashes Uniwind opacity modifiers
  typeLabel: {
    letterSpacing: 2,
    color: colors.cardTextSecondary
  }
})

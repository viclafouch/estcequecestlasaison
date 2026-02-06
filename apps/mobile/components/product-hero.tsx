import React from 'react'
import { Image, Pressable, Share, Text, View } from 'react-native'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'
import { BADGE_VARIANT_TO_SEASON, SEASON_DOT_STYLES } from '@/constants/season'
import { colors } from '@/constants/theme'
import type {
  BadgeVariant,
  Month,
  Produce,
  ProduceBadge
} from '@estcequecestlasaison/shared'
import {
  getDefaultProduceBadge,
  getPreviousMonth,
  getShareText,
  matchIsInSeason,
  matchIsInSeasonAllYear
} from '@estcequecestlasaison/shared'
import Ionicons from '@expo/vector-icons/Ionicons'

const SITE_DOMAIN = 'estcequecestlasaison.fr'
const IMAGE_SIZE = 200

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

function getSeasonDisplay({
  produce,
  month,
  badge
}: GetSeasonDisplayParams): SeasonDisplay {
  if (matchIsInSeasonAllYear(produce)) {
    return {
      label: "Disponible toute l'ann\u00e9e",
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
    const label = wasInSeasonLastMonth
      ? 'Fin de saison'
      : 'D\u00e9but de saison'

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

const DETAIL_VARIANT_CLASSES = {
  positive: 'text-primary-700',
  warning: 'text-warning-700',
  neutral: 'text-gray-500'
} as const satisfies Record<BadgeVariant, string>

type ProductHeroProps = {
  produce: Produce
  currentMonth: Month
}

export const ProductHero = ({ produce, currentMonth }: ProductHeroProps) => {
  const badge = getDefaultProduceBadge({ produce, month: currentMonth })
  const isInSeason = matchIsInSeason(produce, currentMonth)
  const typeLabel = produce.type === 'fruit' ? 'Fruit' : 'L\u00e9gume'
  const seasonDisplay = getSeasonDisplay({
    produce,
    month: currentMonth,
    badge
  })
  const seasonStatus = BADGE_VARIANT_TO_SEASON[seasonDisplay.variant]
  const dotStyle = SEASON_DOT_STYLES[seasonStatus]
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
    <View className="items-center gap-4 px-4 pt-4">
      <Image
        source={imageSource}
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          borderRadius: IMAGE_SIZE / 2
        }}
        className="bg-gray-100"
        accessibilityLabel={`${produce.name}, ${typeLabel}`}
      />
      <Text className="text-2xl font-bold text-black text-center">
        {produce.name}
      </Text>
      <Text className="text-sm text-gray-500 text-center -mt-2">
        {typeLabel}
      </Text>
      <View className="flex-row items-center gap-2.5">
        <View
          className={`w-3 h-3 ${dotStyle.className}`}
          importantForAccessibility="no"
        />
        <Text className="text-lg font-bold text-black">
          {seasonDisplay.label}
        </Text>
      </View>
      {seasonDisplay.detail ? (
        <Text
          className={`text-sm font-medium -mt-2 ${DETAIL_VARIANT_CLASSES[seasonDisplay.variant]}`}
        >
          {seasonDisplay.detail}
        </Text>
      ) : null}
      <Pressable
        onPress={handleShare}
        accessibilityRole="button"
        accessibilityLabel={`Partager ${produce.name}`}
        className="flex-row items-center gap-2 py-2 px-4 rounded-full border border-gray-200"
      >
        <Ionicons name="share-outline" size={18} color={colors.textMuted} />
        <Text className="text-sm font-medium text-gray-600">Partager</Text>
      </Pressable>
    </View>
  )
}

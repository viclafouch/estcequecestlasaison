import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { ProduceAvatar } from '@/components/produce-avatar'
import { ProduceBadge } from '@/components/produce-badge'
import type { ProduceImageSlug } from '@/constants/produce-images'
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

const CARD_WIDTH = 140

export const ProduceCard = ({ produce, month, section }: ProduceCardProps) => {
  const badge = getProduceBadge({ produce, month, section })

  return (
    <Link
      href={`/product/${produce.slug}`}
      style={{ width: CARD_WIDTH }}
      accessibilityRole="link"
      accessibilityLabel={produce.name}
    >
      <View className="items-center gap-2 py-3 px-2 rounded-xl bg-gray-50 border border-gray-100">
        <ProduceAvatar
          slug={produce.slug as ProduceImageSlug}
          name={produce.name}
          size="lg"
        />
        <Text
          className="text-xs font-semibold text-black text-center"
          numberOfLines={2}
        >
          {produce.name}
        </Text>
        <ProduceBadge label={badge.label} variant={badge.variant} />
      </View>
    </Link>
  )
}

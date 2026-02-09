import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { ProduceAvatar } from '@/components/produce-avatar'
import { SeasonChip } from '@/components/season-badge'
import type { ProduceImageSlug } from '@/constants/produce-images'
import {
  getDefaultProduceBadge,
  type Month,
  type Produce
} from '@estcequecestlasaison/shared'

type SearchResultRowProps = {
  produce: Produce
  month: Month
}

export const SearchResultRow = React.memo(
  ({ produce, month }: SearchResultRowProps) => {
    const badge = getDefaultProduceBadge({ produce, month })

    return (
      <Link
        href={`/product/${produce.slug}`}
        accessibilityRole="link"
        accessibilityLabel={produce.name}
      >
        <View className="flex-row items-center px-4 py-3 gap-3">
          <ProduceAvatar
            slug={produce.slug as ProduceImageSlug}
            name={produce.name}
            size="md"
          />
          <Text
            className="flex-1 text-base font-medium text-black"
            numberOfLines={1}
          >
            {produce.name}
          </Text>
          <SeasonChip label={badge.label} variant={badge.variant} />
        </View>
      </Link>
    )
  }
)

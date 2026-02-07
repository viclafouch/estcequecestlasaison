import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { ProduceAvatar } from '@/components/produce-avatar'
import { ProduceBadge } from '@/components/produce-badge'
import type { ProduceImageSlug } from '@/constants/produce-images'
import {
  getCurrentMonth,
  getDefaultProduceBadge,
  type Produce
} from '@estcequecestlasaison/shared'

type SearchResultRowProps = {
  produce: Produce
}

const month = getCurrentMonth()

export const SearchResultRow = React.memo(
  ({ produce }: SearchResultRowProps) => {
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
          <ProduceBadge label={badge.label} variant={badge.variant} />
        </View>
      </Link>
    )
  }
)

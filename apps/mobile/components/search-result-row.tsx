import React from 'react'
import { Pressable, Text } from 'react-native'
import { Link } from 'expo-router'
import { cn } from 'heroui-native'
import {
  getDefaultProduceBadge,
  type Month,
  type Produce
} from '@estcequecestlasaison/shared'
import { ProduceAvatar } from '@/components/produce-avatar'
import { BADGE_TEXT_CLASSES } from '@/components/season-badge'
import type { ProduceImageSlug } from '@/constants/produce-images'

type SearchResultRowProps = {
  produce: Produce
  month: Month
}

export const SearchResultRow = React.memo(
  ({ produce, month }: SearchResultRowProps) => {
    const badge = getDefaultProduceBadge({ produce, month })

    return (
      <Link href={`/product/${produce.slug}`} asChild>
        <Pressable
          className="flex-row items-center px-4 py-3.5 gap-3"
          accessibilityRole="link"
          accessibilityLabel={produce.name}
        >
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
          <Text
            className={cn(
              'text-sm font-medium',
              BADGE_TEXT_CLASSES[badge.variant]
            )}
            numberOfLines={1}
          >
            {badge.label}
          </Text>
        </Pressable>
      </Link>
    )
  }
)

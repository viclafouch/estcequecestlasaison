import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { cn } from 'heroui-native'
import { ProduceAvatar } from '@/components/produce-avatar'
import type { ProduceImageSlug } from '@/constants/produce-images'
import { SEASON_DOT_STYLES } from '@/constants/season'
import {
  ALL_MONTHS,
  type Month,
  type Seasons,
  type SeasonStatus
} from '@estcequecestlasaison/shared'

type CalendarRowProps = {
  slug: string
  name: string
  seasons: Seasons
  currentMonth: Month
}

function getSeasonStatus(seasons: Seasons, month: Month): SeasonStatus {
  return seasons[month] ?? 'off'
}

export const CalendarRow = React.memo(
  ({ slug, name, seasons, currentMonth }: CalendarRowProps) => {
    return (
      <Link
        href={`/product/${slug}`}
        accessibilityRole="link"
        accessibilityLabel={name}
      >
        <View className="flex-row items-center px-4 py-3 gap-3">
          <ProduceAvatar
            slug={slug as ProduceImageSlug}
            name={name}
            size="sm"
          />
          <Text
            className="flex-1 text-sm font-medium text-black"
            numberOfLines={1}
          >
            {name}
          </Text>
          <View className="flex-row items-center gap-1">
            {ALL_MONTHS.map((month) => {
              const status = getSeasonStatus(seasons, month)
              const isCurrent = month === currentMonth

              if (isCurrent) {
                return (
                  <View
                    key={month}
                    className="w-4 h-4 items-center justify-center rounded-full border border-gray-800"
                  >
                    <View
                      className={cn(
                        'w-2 h-2',
                        SEASON_DOT_STYLES[status].className
                      )}
                      importantForAccessibility="no"
                    />
                  </View>
                )
              }

              return (
                <View
                  key={month}
                  className={cn(
                    'w-2.5 h-2.5',
                    SEASON_DOT_STYLES[status].className
                  )}
                  importantForAccessibility="no"
                />
              )
            })}
          </View>
        </View>
      </Link>
    )
  }
)

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { cn } from 'heroui-native'
import { SEASON_DOT_STYLES } from '@/constants/season'
import { squircle } from '@/constants/theme'
import type { Month, Produce, SeasonStatus } from '@estcequecestlasaison/shared'
import {
  ALL_MONTHS,
  getSeasonRangeLabel,
  getShortMonthName,
  SEASON_STATUS_LABELS
} from '@estcequecestlasaison/shared'

type SeasonCalendarProps = {
  produce: Produce
  currentMonth: Month
}

function getSeasonType(produce: Produce, month: Month): SeasonStatus {
  return produce.seasons[month] ?? 'off'
}

const CELL_BG_CLASSES = {
  peak: 'bg-primary-100',
  partial: 'bg-warning-100',
  off: 'bg-gray-100'
} as const satisfies Record<SeasonStatus, string>

const CELL_TEXT_CLASSES = {
  peak: 'text-primary-700',
  partial: 'text-warning-700',
  off: 'text-gray-400'
} as const satisfies Record<SeasonStatus, string>

type LegendItem = {
  status: SeasonStatus
  style: (typeof SEASON_DOT_STYLES)[SeasonStatus]
}

const LEGEND_ITEMS = [
  { status: 'peak', style: SEASON_DOT_STYLES.peak },
  { status: 'partial', style: SEASON_DOT_STYLES.partial },
  { status: 'off', style: SEASON_DOT_STYLES.off }
] as const satisfies readonly LegendItem[]

export const SeasonCalendar = ({
  produce,
  currentMonth
}: SeasonCalendarProps) => {
  const seasonRange = getSeasonRangeLabel(produce)

  return (
    <View className="px-4 gap-4">
      <View>
        <Text
          className="text-xl font-semibold text-black"
          accessibilityRole="header"
        >
          Calendrier de saisonnalité
        </Text>
        <Text className="text-sm text-gray-500 mt-1">{seasonRange}</Text>
      </View>
      <View className="flex-row flex-wrap gap-2" accessibilityRole="list">
        {ALL_MONTHS.map((month) => {
          const seasonType = getSeasonType(produce, month)
          const isCurrent = month === currentMonth
          const bgClass = isCurrent
            ? 'bg-active-100'
            : CELL_BG_CLASSES[seasonType]
          const textClass = isCurrent
            ? 'text-active-700'
            : CELL_TEXT_CLASSES[seasonType]

          return (
            <View
              key={month}
              className={cn('items-center gap-1.5 rounded-2xl py-3', bgClass)}
              style={[styles.calendarCell, squircle]}
              accessibilityRole="text"
              accessibilityLabel={`${getShortMonthName(month)} - ${SEASON_STATUS_LABELS[seasonType]}`}
            >
              <Text
                className={cn('text-xs font-semibold uppercase', textClass)}
              >
                {getShortMonthName(month)}
              </Text>
              <View
                className={cn(
                  'w-2 h-2',
                  SEASON_DOT_STYLES[seasonType].className
                )}
                importantForAccessibility="no"
              />
            </View>
          )
        })}
      </View>
      <View className="flex-row flex-wrap items-center gap-4">
        {LEGEND_ITEMS.map((item) => {
          return (
            <View key={item.status} className="flex-row items-center gap-2">
              <View
                className={cn('w-2.5 h-2.5', item.style.className)}
                importantForAccessibility="no"
              />
              <Text className="text-xs text-gray-500">{item.style.label}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  calendarCell: {
    width: '23%'
  }
})

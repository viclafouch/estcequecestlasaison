import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { cn } from 'heroui-native'
import { colors } from '@/constants/theme'
import type { ProduceType } from '@estcequecestlasaison/shared'
import Ionicons from '@expo/vector-icons/Ionicons'

export type CategoryFilter = ProduceType | 'all'

type FilterChipsProps = {
  activeCategory: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  monthLabel: string
  onMonthPress: () => void
}

type CategoryOption = {
  value: CategoryFilter
  label: string
}

const CATEGORIES = [
  { value: 'all', label: 'Tous' },
  { value: 'fruit', label: 'Fruits' },
  { value: 'vegetable', label: 'Légumes' }
] as const satisfies readonly CategoryOption[]

export const FilterChips = ({
  activeCategory,
  onCategoryChange,
  monthLabel,
  onMonthPress
}: FilterChipsProps) => {
  return (
    <View className="flex-row items-center px-4 py-3 gap-2">
      <View className="flex-row gap-2 flex-1">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.value

          return (
            <Pressable
              key={category.value}
              onPress={() => {
                onCategoryChange(category.value)
              }}
              className={cn(
                'px-3.5 py-1.5 rounded-2xl border',
                isActive
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'bg-white border-gray-200'
              )}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                className={cn(
                  'text-xs',
                  isActive
                    ? 'font-semibold text-white'
                    : 'font-medium text-black'
                )}
              >
                {category.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
      <Pressable
        onPress={onMonthPress}
        className="flex-row items-center gap-1 bg-emerald-500 px-3 py-1.5 rounded-2xl"
        accessibilityRole="button"
        accessibilityLabel={`Statistiques de ${monthLabel}`}
        accessibilityHint="Ouvre les statistiques du mois"
        hitSlop={8}
      >
        <Ionicons name="calendar-outline" size={14} color={colors.background} />
        <Text className="text-xs font-semibold text-white">{monthLabel}</Text>
      </Pressable>
    </View>
  )
}

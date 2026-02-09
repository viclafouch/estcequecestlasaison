import React from 'react'
import { View } from 'react-native'
import { Button, Tabs, useThemeColor } from 'heroui-native'
import { CATEGORIES, type CategoryFilter } from '@/constants/categories'
import Ionicons from '@expo/vector-icons/Ionicons'

type FilterChipsProps = {
  activeCategory: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  monthLabel: string
  onMonthPress: () => void
}

export const FilterChips = ({
  activeCategory,
  onCategoryChange,
  monthLabel,
  onMonthPress
}: FilterChipsProps) => {
  const accentForeground = useThemeColor('accent-foreground')

  const handleValueChange = (value: string) => {
    onCategoryChange(value as CategoryFilter)
  }

  return (
    <View className="flex-row items-center px-4 py-3 gap-2">
      <Tabs
        value={activeCategory}
        onValueChange={handleValueChange}
        variant="primary"
        className="flex-1"
      >
        <Tabs.List>
          <Tabs.Indicator />
          {CATEGORIES.map((category) => {
            return (
              <Tabs.Trigger
                key={category.value}
                value={category.value}
                accessibilityLabel={category.label}
              >
                <Tabs.Label>{category.label}</Tabs.Label>
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
      </Tabs>
      <Button
        variant="primary"
        size="sm"
        onPress={onMonthPress}
        accessibilityLabel={`Statistiques de ${monthLabel}`}
        accessibilityHint="Ouvre les statistiques du mois"
      >
        <Ionicons name="calendar-outline" size={14} color={accentForeground} />
        <Button.Label>{monthLabel}</Button.Label>
      </Button>
    </View>
  )
}

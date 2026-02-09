import React from 'react'
import { Text, View } from 'react-native'
import { BottomSheet, Button, useThemeColor } from 'heroui-native'
import {
  getMonthName,
  getNextMonth,
  getPreviousMonth,
  type Month
} from '@estcequecestlasaison/shared'
import { getMonthStatsData } from '@estcequecestlasaison/shared/services'
import Ionicons from '@expo/vector-icons/Ionicons'

type MonthBottomSheetProps = {
  selectedMonth: Month
  onMonthChange: (month: Month) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const SNAP_POINTS = ['50%', '80%']

export const MonthBottomSheet = ({
  selectedMonth,
  onMonthChange,
  isOpen,
  onOpenChange
}: MonthBottomSheetProps) => {
  const defaultForeground = useThemeColor('default-foreground')
  const stats = getMonthStatsData({ month: selectedMonth })
  const previousMonth = getPreviousMonth(selectedMonth)
  const nextMonth = getNextMonth(selectedMonth)
  const monthName = getMonthName(selectedMonth)
  const previousMonthName = getMonthName(previousMonth)
  const nextMonthName = getMonthName(nextMonth)

  const statItems = [
    { label: 'Fruits', value: stats.fruits },
    { label: 'Légumes', value: stats.vegetables },
    { label: 'Total', value: stats.total }
  ]

  const handlePreviousMonth = () => {
    onMonthChange(previousMonth)
  }

  const handleNextMonth = () => {
    onMonthChange(nextMonth)
  }

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content snapPoints={SNAP_POINTS}>
          <View className="flex-row items-center justify-center gap-4 py-2">
            <Button
              variant="secondary"
              size="sm"
              isIconOnly
              onPress={handlePreviousMonth}
              accessibilityLabel={`Mois précédent : ${previousMonthName}`}
              accessibilityHint="Naviguer vers le mois précédent"
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={defaultForeground}
              />
            </Button>
            <Text
              className="text-xl font-bold text-black capitalize min-w-30 text-center"
              accessibilityRole="header"
              accessibilityLiveRegion="polite"
            >
              {monthName}
            </Text>
            <Button
              variant="secondary"
              size="sm"
              isIconOnly
              onPress={handleNextMonth}
              accessibilityLabel={`Mois suivant : ${nextMonthName}`}
              accessibilityHint="Naviguer vers le mois suivant"
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color={defaultForeground}
              />
            </Button>
          </View>
          <View className="flex-row justify-around py-4 px-4">
            {statItems.map((stat) => {
              return (
                <View key={stat.label} className="items-center gap-1">
                  <Text className="text-3xl font-bold text-primary-500">
                    {stat.value}
                  </Text>
                  <Text className="text-xs text-gray-500 font-medium">
                    {stat.label}
                  </Text>
                </View>
              )
            })}
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  )
}

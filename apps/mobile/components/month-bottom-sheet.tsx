import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { BottomSheet } from 'heroui-native'
import { colors } from '@/constants/theme'
import {
  getMonthName,
  getNextMonth,
  getPreviousMonth,
  type Month,
  type Produce
} from '@estcequecestlasaison/shared'
import { getMonthStatsData } from '@estcequecestlasaison/shared/services'
import Ionicons from '@expo/vector-icons/Ionicons'

type ProduceListSectionProps = {
  title: string
  items: Pick<Produce, 'id' | 'name' | 'slug'>[]
  emptyLabel: string
}

type MonthBottomSheetProps = {
  selectedMonth: Month
  onMonthChange: (month: Month) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const SNAP_POINTS = ['50%', '80%']

const ProduceListSection = ({
  title,
  items,
  emptyLabel
}: ProduceListSectionProps) => {
  return (
    <View className="px-4 py-2">
      <Text className="text-base font-semibold text-black mb-2">
        {title} ({items.length})
      </Text>
      {items.length > 0 ? (
        items.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="py-2 px-1"
              accessibilityRole="link"
            >
              <Text className="text-[15px] text-black">{item.name}</Text>
            </Link>
          )
        })
      ) : (
        <Text className="text-sm text-gray-500 italic">{emptyLabel}</Text>
      )}
    </View>
  )
}

export const MonthBottomSheet = ({
  selectedMonth,
  onMonthChange,
  isOpen,
  onOpenChange
}: MonthBottomSheetProps) => {
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
            <Pressable
              onPress={handlePreviousMonth}
              className="p-2 rounded-full bg-gray-200"
              accessibilityRole="button"
              accessibilityLabel={`Mois précédent : ${previousMonthName}`}
              hitSlop={8}
            >
              <Ionicons name="chevron-back" size={20} color={colors.text} />
            </Pressable>
            <Text className="text-xl font-bold text-black capitalize min-w-30 text-center">
              {monthName}
            </Text>
            <Pressable
              onPress={handleNextMonth}
              className="p-2 rounded-full bg-gray-200"
              accessibilityRole="button"
              accessibilityLabel={`Mois suivant : ${nextMonthName}`}
              hitSlop={8}
            >
              <Ionicons name="chevron-forward" size={20} color={colors.text} />
            </Pressable>
          </View>
          <View className="flex-row justify-around py-4 px-4">
            {statItems.map((stat) => {
              return (
                <View key={stat.label} className="items-center gap-1">
                  <Text className="text-3xl font-bold text-emerald-500">
                    {stat.value}
                  </Text>
                  <Text className="text-xs text-gray-500 font-medium">
                    {stat.label}
                  </Text>
                </View>
              )
            })}
          </View>
          <ProduceListSection
            title="Nouveautés"
            items={stats.arriving}
            emptyLabel="Aucune nouveauté"
          />
          <ProduceListSection
            title="Derniers jours"
            items={stats.leaving}
            emptyLabel="Aucun départ"
          />
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  )
}

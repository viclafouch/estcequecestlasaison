import React from 'react'
import { Pressable, Text } from 'react-native'
import { StyledIonicons } from '@/constants/styled'
import { squircle } from '@/constants/styles'

type MonthWidgetProps = {
  monthName: string
  onPress: () => void
}

export const MonthWidget = React.memo(
  ({ monthName, onPress }: MonthWidgetProps) => {
    return (
      <Pressable
        onPress={onPress}
        className="flex-1 flex-row items-center rounded-2xl bg-gray-100 px-3 gap-2"
        style={squircle}
        accessibilityRole="button"
        accessibilityLabel={`Mois : ${monthName}`}
        accessibilityHint="Ouvre le sélecteur de mois"
      >
        <StyledIonicons
          name="calendar-outline"
          className="text-lg text-gray-600"
        />
        <Text className="text-sm font-bold text-black" numberOfLines={1}>
          {monthName}
        </Text>
      </Pressable>
    )
  }
)

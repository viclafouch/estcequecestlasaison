import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CategoryToggleWidget } from '@/components/category-toggle-widget'
import { LastViewedWidget } from '@/components/last-viewed-widget'
import { MonthWidget } from '@/components/month-widget'
import type { Produce } from '@estcequecestlasaison/shared'

type BentoGridProps = {
  lastViewedSlug: string | null
  fallbackProduce: Produce | undefined
  monthName: string
  isFruitEnabled: boolean
  isVegetableEnabled: boolean
  onFruitToggle: () => void
  onVegetableToggle: () => void
  onMonthPress: () => void
}

const WIDGET_ROW_HEIGHT = 48
const WIDGET_GAP = 6
const GRID_TOTAL_HEIGHT = WIDGET_ROW_HEIGHT * 3 + WIDGET_GAP * 2
const CONTAINER_PADDING_VERTICAL = 8 + 12

export const BentoGrid = React.memo(
  ({
    lastViewedSlug,
    fallbackProduce,
    monthName,
    isFruitEnabled,
    isVegetableEnabled,
    onFruitToggle,
    onVegetableToggle,
    onMonthPress
  }: BentoGridProps) => {
    return (
      <View className="px-1.5 pt-2 pb-3" style={styles.container}>
        <View className="flex-row gap-3">
          <View style={styles.leftColumn}>
            <LastViewedWidget
              slug={lastViewedSlug}
              fallbackProduce={fallbackProduce}
            />
          </View>
          <View style={styles.rightColumn}>
            <CategoryToggleWidget
              label="Fruits"
              icon="nutrition-outline"
              isEnabled={isFruitEnabled}
              onToggle={onFruitToggle}
            />
            <CategoryToggleWidget
              label="Légumes"
              icon="leaf-outline"
              isEnabled={isVegetableEnabled}
              onToggle={onVegetableToggle}
            />
            <MonthWidget monthName={monthName} onPress={onMonthPress} />
          </View>
        </View>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  // Explicit heights for deterministic layout
  container: {
    height: GRID_TOTAL_HEIGHT + CONTAINER_PADDING_VERTICAL
  },
  leftColumn: {
    flex: 1,
    height: GRID_TOTAL_HEIGHT
  },
  rightColumn: {
    flex: 1,
    gap: WIDGET_GAP,
    height: GRID_TOTAL_HEIGHT
  }
})

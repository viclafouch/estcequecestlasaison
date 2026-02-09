import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { FaqSection } from '@/components/faq-section'
import { FilterChips } from '@/components/filter-chips'
import { MonthBottomSheet } from '@/components/month-bottom-sheet'
import { ProduceCard } from '@/components/produce-card'
import type { CategoryFilter } from '@/constants/categories'
import {
  getCurrentMonth,
  getMonthName,
  type Month
} from '@estcequecestlasaison/shared'
import { getGroupedProduce } from '@estcequecestlasaison/shared/services'

const WINDOW_HEIGHT = Dimensions.get('window').height
const CARD_HEIGHT = WINDOW_HEIGHT * 0.6

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] =
    React.useState<CategoryFilter>('all')
  const [selectedMonth, setSelectedMonth] =
    React.useState<Month>(getCurrentMonth())
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false)

  const scrollRef = React.useRef<ScrollView>(null)

  const { inSeason } = React.useMemo(() => {
    return getGroupedProduce({
      searchQuery: '',
      category: activeCategory,
      month: selectedMonth
    })
  }, [activeCategory, selectedMonth])

  const monthName = getMonthName(selectedMonth)

  const handleCategoryChange = React.useCallback((category: CategoryFilter) => {
    setActiveCategory(category)
    scrollRef.current?.scrollTo({ y: 0, animated: false })
  }, [])

  const handleMonthChange = React.useCallback((month: Month) => {
    setSelectedMonth(month)
    scrollRef.current?.scrollTo({ y: 0, animated: false })
  }, [])

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true)
  }

  return (
    <View className="flex-1 bg-white">
      <FilterChips
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        monthLabel={monthName}
        onMonthPress={handleOpenBottomSheet}
      />
      {inSeason.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-base text-gray-500 text-center">
            Aucun produit trouvé pour cette catégorie.
          </Text>
        </View>
      ) : (
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          contentInsetAdjustmentBehavior="automatic"
        >
          {inSeason.map((produce) => {
            return (
              <View
                key={produce.id}
                className="overflow-hidden"
                style={styles.cardContainer}
              >
                <ProduceCard
                  produce={produce}
                  month={selectedMonth}
                  section="in-season"
                />
              </View>
            )
          })}
          <FaqSection />
        </ScrollView>
      )}
      <MonthBottomSheet
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
        isOpen={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  // contentContainerStyle is a ScrollView prop, not className
  scrollContent: {
    paddingBottom: 32
  },
  // Runtime-computed value from Dimensions
  cardContainer: {
    height: CARD_HEIGHT
  }
})

export default HomeScreen

import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { FaqSection } from '@/components/faq-section'
import { FilterChips } from '@/components/filter-chips'
import { MonthBottomSheet } from '@/components/month-bottom-sheet'
import { ProduceCard } from '@/components/produce-card'
import type { CategoryFilter } from '@/constants/categories'
import {
  getCurrentMonth,
  getMonthName,
  type Month,
  type Produce
} from '@estcequecestlasaison/shared'
import { getGroupedProduce } from '@estcequecestlasaison/shared/services'
import {
  FlashList,
  type FlashListRef,
  type ListRenderItemInfo
} from '@shopify/flash-list'

const WINDOW_HEIGHT = Dimensions.get('window').height
const CARD_HEIGHT = WINDOW_HEIGHT * 0.6

const keyExtractor = (item: Produce) => {
  return item.id
}

const ListEmpty = () => {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <Text className="text-base text-gray-500 text-center">
        Aucun produit trouvé pour cette catégorie.
      </Text>
    </View>
  )
}

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] =
    React.useState<CategoryFilter>('all')
  const [selectedMonth, setSelectedMonth] =
    React.useState<Month>(getCurrentMonth())
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false)

  const listRef = React.useRef<FlashListRef<Produce>>(null)

  const { inSeason } = React.useMemo(() => {
    return getGroupedProduce({
      searchQuery: '',
      category: activeCategory,
      month: selectedMonth
    })
  }, [activeCategory, selectedMonth])

  const monthName = getMonthName(selectedMonth)

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<Produce>) => {
      return (
        <View className="overflow-hidden" style={styles.cardContainer}>
          <ProduceCard
            produce={item}
            month={selectedMonth}
            section="in-season"
          />
        </View>
      )
    },
    [selectedMonth]
  )

  const handleCategoryChange = React.useCallback((category: CategoryFilter) => {
    setActiveCategory(category)
    listRef.current?.scrollToOffset({ offset: 0, animated: false })
  }, [])

  const handleMonthChange = React.useCallback((month: Month) => {
    setSelectedMonth(month)
    listRef.current?.scrollToOffset({ offset: 0, animated: false })
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
      <FlashList
        ref={listRef}
        data={inSeason}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmpty}
        ListFooterComponent={inSeason.length > 0 ? <FaqSection /> : null}
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      />
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
  // contentContainerStyle is a FlashList prop, not className
  scrollContent: {
    paddingBottom: 32
  },
  // Runtime-computed value from Dimensions
  cardContainer: {
    height: CARD_HEIGHT
  }
})

export default HomeScreen

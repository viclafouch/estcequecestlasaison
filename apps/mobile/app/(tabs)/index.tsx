import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { FaqSection } from '@/components/faq-section'
import { type CategoryFilter, FilterChips } from '@/components/filter-chips'
import { MonthBottomSheet } from '@/components/month-bottom-sheet'
import { ProduceCarousel } from '@/components/produce-carousel'
import {
  getCurrentMonth,
  getMonthName,
  getNextMonth,
  type Month
} from '@estcequecestlasaison/shared'
import { getGroupedProduce } from '@estcequecestlasaison/shared/services'

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] =
    React.useState<CategoryFilter>('all')
  const [selectedMonth, setSelectedMonth] =
    React.useState<Month>(getCurrentMonth())
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false)

  const { inSeason, comingNextMonth, offSeason } = React.useMemo(() => {
    return getGroupedProduce({
      searchQuery: '',
      category: activeCategory,
      month: selectedMonth
    })
  }, [activeCategory, selectedMonth])

  const monthName = getMonthName(selectedMonth)
  const nextMonthName = getMonthName(getNextMonth(selectedMonth))
  const hasNoResults =
    inSeason.length === 0 &&
    comingNextMonth.length === 0 &&
    offSeason.length === 0

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true)
  }

  return (
    <View className="flex-1 bg-white">
      <FilterChips
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        monthLabel={monthName}
        onMonthPress={handleOpenBottomSheet}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        {hasNoResults ? (
          <View className="flex-1 items-center justify-center px-8 py-16">
            <Text className="text-base text-gray-500 text-center">
              Aucun produit trouvé pour cette catégorie.
            </Text>
          </View>
        ) : (
          <>
            <ProduceCarousel
              title={`En pleine saison de ${monthName}`}
              produceList={inSeason}
              month={selectedMonth}
              section="in-season"
            />
            <ProduceCarousel
              title={`Nouveautés en ${nextMonthName}`}
              subtitle="Bientôt de saison"
              produceList={comingNextMonth}
              month={selectedMonth}
              section="coming-next-month"
            />
            <ProduceCarousel
              title="Hors saison"
              produceList={offSeason}
              month={selectedMonth}
              section="off-season"
            />
            <FaqSection />
          </>
        )}
      </ScrollView>
      <MonthBottomSheet
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        isOpen={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
    gap: 24
  }
})

export default HomeScreen

import React from 'react'
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { BentoGrid } from '@/components/bento-grid'
import { CompactProduceCard } from '@/components/compact-produce-card'
import { FaqSection } from '@/components/faq-section'
import { MonthBottomSheet } from '@/components/month-bottom-sheet'
import type { CategoryFilter } from '@/constants/categories'
import { SUPPORTS_TOOLBAR } from '@/constants/styles'
import { getLastViewedSlug } from '@/utils/last-viewed'
import {
  getCurrentMonth,
  getMonthName,
  type Month,
  type Produce
} from '@estcequecestlasaison/shared'
import { getGroupedProduce } from '@estcequecestlasaison/shared/services'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list'

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

const deriveCategoryFilter = (
  isFruitEnabled: boolean,
  isVegetableEnabled: boolean
): CategoryFilter => {
  if (isFruitEnabled && isVegetableEnabled) {
    return 'all'
  }

  if (isFruitEnabled) {
    return 'fruit'
  }

  return 'vegetable'
}

const HomeScreen = () => {
  'use no memo'

  const router = useRouter()
  const [isFruitEnabled, setIsFruitEnabled] = React.useState(true)
  const [isVegetableEnabled, setIsVegetableEnabled] = React.useState(true)
  const [selectedMonth, setSelectedMonth] =
    React.useState<Month>(getCurrentMonth())
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false)
  const [lastViewedSlug, setLastViewedSlug] = React.useState(() => {
    return getLastViewedSlug()
  })

  const scrollY = useSharedValue(0)

  const handleListScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      // eslint-disable-next-line react-hooks/immutability -- Reanimated SharedValue is designed to be mutable
      scrollY.value = event.nativeEvent.contentOffset.y
    },
    [scrollY]
  )

  const activeCategory = deriveCategoryFilter(
    isFruitEnabled,
    isVegetableEnabled
  )

  const { inSeason } = React.useMemo(() => {
    return getGroupedProduce({
      searchQuery: '',
      category: activeCategory,
      month: selectedMonth
    })
  }, [activeCategory, selectedMonth])

  const fallbackProduce = React.useMemo(() => {
    return getGroupedProduce({
      searchQuery: '',
      category: 'all',
      month: selectedMonth
    }).inSeason[0]
  }, [selectedMonth])

  const monthName = getMonthName(selectedMonth)

  useFocusEffect(
    React.useCallback(() => {
      setLastViewedSlug(getLastViewedSlug())
    }, [])
  )

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<Produce>) => {
      return (
        <View className="px-1.5 pb-3">
          <CompactProduceCard produce={item} month={selectedMonth} />
        </View>
      )
    },
    [selectedMonth]
  )

  const handleFruitToggle = React.useCallback(() => {
    setIsFruitEnabled((prev) => {
      if (prev && !isVegetableEnabled) {
        return true
      }

      return !prev
    })
  }, [isVegetableEnabled])

  const handleVegetableToggle = React.useCallback(() => {
    setIsVegetableEnabled((prev) => {
      if (prev && !isFruitEnabled) {
        return true
      }

      return !prev
    })
  }, [isFruitEnabled])

  const handleOpenBottomSheet = React.useCallback(() => {
    setIsBottomSheetOpen(true)
  }, [])

  const handleFaqPress = React.useCallback(() => {
    router.push('/faq')
  }, [router])

  const listFooter = React.useMemo(() => {
    return inSeason.length > 0 ? <FaqSection /> : null
  }, [inSeason.length])

  return (
    <View className="flex-1 bg-white">
      {SUPPORTS_TOOLBAR ? (
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button
            icon="questionmark.circle"
            onPress={handleFaqPress}
            accessibilityLabel="Questions fréquentes"
          />
        </Stack.Toolbar>
      ) : (
        <Stack.Screen
          options={{
            headerRight: () => {
              return (
                <Pressable
                  onPress={handleFaqPress}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Questions fréquentes"
                >
                  <Ionicons
                    name="help-circle-outline"
                    size={24}
                    color="#000000"
                  />
                </Pressable>
              )
            }
          }}
        />
      )}
      <View className="px-4">
        <BentoGrid
          scrollY={scrollY}
          lastViewedSlug={lastViewedSlug}
          fallbackProduce={fallbackProduce}
          monthName={monthName}
          isFruitEnabled={isFruitEnabled}
          isVegetableEnabled={isVegetableEnabled}
          onFruitToggle={handleFruitToggle}
          onVegetableToggle={handleVegetableToggle}
          onMonthPress={handleOpenBottomSheet}
        />
      </View>
      <View className="flex-1">
        <FlashList
          key={`${selectedMonth}-${activeCategory}`}
          data={inSeason}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={keyExtractor}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={listFooter}
          contentContainerStyle={styles.scrollContent}
          contentInsetAdjustmentBehavior="automatic"
          onScroll={handleListScroll}
          scrollEventThrottle={16}
        />
      </View>
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
  // contentContainerStyle is a FlashList/ScrollView prop, not className
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32
  }
})

export default HomeScreen

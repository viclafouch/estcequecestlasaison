import React from 'react'
import { Pressable, Text, View } from 'react-native'
import {
  Button,
  cn,
  Input,
  Separator,
  Tabs,
  useThemeColor
} from 'heroui-native'
import { CalendarRow } from '@/components/calendar-row'
import { CATEGORIES, type CategoryFilter } from '@/constants/categories'
import { SEASON_DOT_STYLES } from '@/constants/season'
import { StyledIonicons } from '@/constants/styled'
import {
  getCurrentMonth,
  type SeasonStatus
} from '@estcequecestlasaison/shared'
import { getCalendarData } from '@estcequecestlasaison/shared/services'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  FlashList,
  type FlashListRef,
  type ListRenderItemInfo
} from '@shopify/flash-list'
import { useDebouncedValue } from '@tanstack/react-pacer'

type CalendarProduce = ReturnType<typeof getCalendarData>['produceList'][number]

type SortMode = 'alpha' | 'months'

const DEBOUNCE_WAIT = 150

const ItemSeparator = () => {
  return <Separator className="mx-4" />
}

const keyExtractor = (item: CalendarProduce) => {
  return item.slug
}

type LegendItem = {
  status: SeasonStatus
  style: (typeof SEASON_DOT_STYLES)[SeasonStatus]
}

const LEGEND_ITEMS = [
  { status: 'peak', style: SEASON_DOT_STYLES.peak },
  { status: 'partial', style: SEASON_DOT_STYLES.partial },
  { status: 'off', style: SEASON_DOT_STYLES.off }
] as const satisfies readonly LegendItem[]

const renderLegendItem = (item: LegendItem) => {
  return (
    <View key={item.status} className="flex-row items-center gap-2">
      <View
        className={cn('w-2.5 h-2.5', item.style.className)}
        importantForAccessibility="no"
      />
      <Text className="text-xs text-gray-500">{item.style.label}</Text>
    </View>
  )
}

const Legend = () => {
  return (
    <View className="px-4 py-4 gap-3">
      <View className="flex-row flex-wrap items-center gap-4">
        {LEGEND_ITEMS.map(renderLegendItem)}
      </View>
      <View className="flex-row items-center gap-2">
        <View className="w-4 h-4 items-center justify-center rounded-full border border-gray-800">
          <View
            className="w-2 h-2 rounded-full bg-gray-300"
            importantForAccessibility="no"
          />
        </View>
        <Text className="text-xs text-gray-500">Mois courant</Text>
      </View>
    </View>
  )
}

const SCROLL_TOP_THRESHOLD = 2

const DISABLE_MAINTAIN_POSITION = { disabled: true } as const satisfies {
  disabled: boolean
}

const CalendarScreen = () => {
  const currentMonth = getCurrentMonth()
  const defaultForeground = useThemeColor('default-foreground')
  const listRef = React.useRef<FlashListRef<CalendarProduce>>(null)
  const scrollOffsetRef = React.useRef(0)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [debouncedQuery] = useDebouncedValue(searchQuery, {
    wait: DEBOUNCE_WAIT
  })
  const [category, setCategory] = React.useState<CategoryFilter>('all')
  const [sortBy, setSortBy] = React.useState<SortMode>('alpha')

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<CalendarProduce>) => {
      return (
        <CalendarRow
          slug={item.slug}
          name={item.name}
          seasons={item.seasons}
          currentMonth={currentMonth}
        />
      )
    },
    [currentMonth]
  )

  const { produceList } = React.useMemo(() => {
    return getCalendarData({ type: category })
  }, [category])

  const query = debouncedQuery.trim().toLowerCase()
  const hasQuery = query.length > 0

  const filtered = React.useMemo(() => {
    if (!hasQuery) {
      return produceList
    }

    return produceList.filter((item) => {
      return item.name.toLowerCase().includes(query)
    })
  }, [produceList, hasQuery, query])

  const sorted = React.useMemo(() => {
    if (sortBy !== 'months') {
      return filtered
    }

    return filtered
      .map((item) => {
        return { item, seasonCount: Object.keys(item.seasons).length }
      })
      .toSorted((left, right) => {
        return right.seasonCount - left.seasonCount
      })
      .map(({ item }) => {
        return item
      })
  }, [filtered, sortBy])

  const hasNoResults = hasQuery && sorted.length === 0
  const hasSearchInput = searchQuery.length > 0

  const scrollToTopIfNeeded = () => {
    if (scrollOffsetRef.current > SCROLL_TOP_THRESHOLD) {
      listRef.current?.scrollToTop()
    }
  }

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
    scrollOffsetRef.current = event.nativeEvent.contentOffset.y
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value as CategoryFilter)
    scrollToTopIfNeeded()
  }

  const handleClear = () => {
    setSearchQuery('')
  }

  const handleToggleSort = () => {
    setSortBy((current) => {
      return current === 'alpha' ? 'months' : 'alpha'
    })
    scrollToTopIfNeeded()
  }

  return (
    <View className="flex-1 bg-white">
      <View
        className="mx-4 mt-2 flex-row items-center"
        accessibilityRole="search"
      >
        <Input
          variant="secondary"
          className="flex-1 px-10"
          placeholder="Rechercher..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Rechercher un produit"
          accessibilityHint="Filtrer la liste par nom"
        />
        <StyledIonicons
          name="search"
          size={18}
          className="absolute left-3.5 text-muted"
          pointerEvents="none"
        />
        {hasSearchInput ? (
          <Pressable
            onPress={handleClear}
            className="absolute right-4"
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Effacer la recherche"
          >
            <StyledIonicons
              name="close-circle"
              size={18}
              className="text-muted"
            />
          </Pressable>
        ) : null}
      </View>
      <View className="flex-row items-center px-4 py-3 gap-2">
        <Tabs
          value={category}
          onValueChange={handleCategoryChange}
          variant="primary"
          className="flex-1"
        >
          <Tabs.List>
            <Tabs.Indicator />
            {CATEGORIES.map((categoryOption) => {
              return (
                <Tabs.Trigger
                  key={categoryOption.value}
                  value={categoryOption.value}
                  accessibilityLabel={categoryOption.label}
                >
                  <Tabs.Label>{categoryOption.label}</Tabs.Label>
                </Tabs.Trigger>
              )
            })}
          </Tabs.List>
        </Tabs>
        <Button
          variant="outline"
          size="sm"
          onPress={handleToggleSort}
          accessibilityLabel={
            sortBy === 'alpha' ? 'Tri alphabétique' : 'Tri par mois de saison'
          }
          accessibilityHint="Basculer entre tri alphabétique et tri par nombre de mois"
        >
          <Ionicons
            name={sortBy === 'alpha' ? 'text-outline' : 'leaf-outline'}
            size={14}
            color={defaultForeground}
          />
          <Button.Label>{sortBy === 'alpha' ? 'A-Z' : 'Saison'}</Button.Label>
        </Button>
      </View>
      {hasNoResults ? (
        <View
          className="flex-1 items-center justify-center px-8"
          accessibilityLiveRegion="assertive"
        >
          <Text className="text-base text-gray-500 text-center">
            {`Aucun résultat pour « ${debouncedQuery.trim()} »`}
          </Text>
        </View>
      ) : (
        <FlashList
          ref={listRef}
          data={sorted}
          onScroll={handleScroll}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={Legend}
          keyboardShouldPersistTaps="handled"
          maintainVisibleContentPosition={DISABLE_MAINTAIN_POSITION}
          accessibilityRole="list"
        />
      )}
    </View>
  )
}

export default CalendarScreen

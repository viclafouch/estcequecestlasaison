import React from 'react'
import type { TextInput } from 'react-native'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect } from 'expo-router'
import { Input, Separator } from 'heroui-native'
import { SearchResultRow } from '@/components/search-result-row'
import { StyledIonicons } from '@/constants/styled'
import { getCurrentMonth, type Produce } from '@estcequecestlasaison/shared'
import {
  getGroupedProduce,
  searchProduce
} from '@estcequecestlasaison/shared/services'
import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list'
import { useDebouncedValue } from '@tanstack/react-pacer'

const DEBOUNCE_WAIT = 150

const ItemSeparator = () => {
  return <Separator className="mx-4" />
}

const keyExtractor = (item: Produce) => {
  return item.id
}

const SearchScreen = () => {
  const insets = useSafeAreaInsets()
  const inputRef = React.useRef<TextInput>(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [debouncedQuery] = useDebouncedValue(searchQuery, {
    wait: DEBOUNCE_WAIT
  })

  useFocusEffect(
    React.useCallback(() => {
      inputRef.current?.focus()
    }, [])
  )

  const month = getCurrentMonth()

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<Produce>) => {
      return <SearchResultRow produce={item} month={month} />
    },
    [month]
  )

  const inSeasonProduce = getGroupedProduce({
    searchQuery: '',
    category: 'all',
    month
  }).inSeason

  const hasQuery = debouncedQuery.trim().length > 0
  const results = hasQuery ? searchProduce(debouncedQuery) : inSeasonProduce
  const hasNoResults = hasQuery && results.length === 0

  const handleClear = () => {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  const hasSearchInput = searchQuery.length > 0
  const headerText = hasQuery
    ? `${results.length} résultat${results.length !== 1 ? 's' : ''}`
    : 'En saison'

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View
        className="mx-4 mt-2 mb-3 flex-row items-center"
        accessibilityRole="search"
      >
        <Input
          ref={inputRef}
          variant="secondary"
          className="flex-1 px-10"
          placeholder="Rechercher un fruit ou légume"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Rechercher un fruit ou légume"
          accessibilityHint="Saisissez le nom d'un fruit ou légume"
        />
        <StyledIonicons
          name="search"
          size={20}
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
              size={20}
              className="text-muted"
            />
          </Pressable>
        ) : null}
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
        <>
          <Text
            className="text-sm font-semibold text-gray-500 px-4 mb-2"
            accessibilityLiveRegion="polite"
          >
            {headerText}
          </Text>
          <FlashList
            data={results}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparator}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
            accessibilityRole="list"
          />
        </>
      )}
    </View>
  )
}

export default SearchScreen

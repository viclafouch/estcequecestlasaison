import React from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect } from 'expo-router'
import { SearchResultRow } from '@/components/search-result-row'
import { colors } from '@/constants/theme'
import { getCurrentMonth, type Produce } from '@estcequecestlasaison/shared'
import {
  getGroupedProduce,
  searchProduce
} from '@estcequecestlasaison/shared/services'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FlashList } from '@shopify/flash-list'
import { useDebouncedValue } from '@tanstack/react-pacer'

const DEBOUNCE_WAIT = 150

const ItemSeparator = () => {
  return (
    <View className="h-px bg-gray-100 mx-4" importantForAccessibility="no" />
  )
}

const renderItem = ({ item }: { item: Produce }) => {
  return <SearchResultRow produce={item} />
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
        className="flex-row items-center mx-4 mt-2 mb-3 px-3 py-2 rounded-xl bg-gray-100 gap-2"
        accessibilityRole="search"
      >
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          ref={inputRef}
          className="flex-1 text-base text-black py-0"
          placeholder="Rechercher un fruit ou légume"
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Rechercher un fruit ou légume"
          accessibilityHint="Saisissez le nom d'un fruit ou légume"
        />
        {hasSearchInput ? (
          <Pressable
            onPress={handleClear}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Effacer la recherche"
          >
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
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
            accessibilityRole="list"
          />
        </>
      )}
    </View>
  )
}

export default SearchScreen

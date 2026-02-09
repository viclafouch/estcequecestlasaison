import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CarouselCard } from '@/components/carousel-card'
import { squircle } from '@/constants/theme'
import type { Produce } from '@estcequecestlasaison/shared'
import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list'

type ProduceCarouselProps = {
  title: string
  subtitle?: string
  produceList: Produce[]
}

const CAROUSEL_CARD_WIDTH = 140

const ItemSeparator = () => {
  return <View className="w-3" importantForAccessibility="no" />
}

const keyExtractor = (item: Produce) => {
  return item.id
}

export const ProduceCarousel = ({
  title,
  subtitle,
  produceList
}: ProduceCarouselProps) => {
  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<Produce>) => {
      return (
        <View style={[styles.cardWrapper, squircle]}>
          <CarouselCard slug={item.slug} name={item.name} />
        </View>
      )
    },
    []
  )

  if (produceList.length === 0) {
    return null
  }

  return (
    <View className="gap-3">
      <View className="px-4">
        <Text
          className="text-lg font-bold text-black"
          accessibilityRole="header"
        >
          {title} ({produceList.length})
        </Text>
        {subtitle ? (
          <Text className="text-sm text-gray-500 mt-0.5">{subtitle}</Text>
        ) : null}
      </View>
      <FlashList
        data={produceList}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.listContent}
        keyExtractor={keyExtractor}
        accessibilityRole="list"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  // contentContainerStyle is a FlashList prop, not className
  listContent: {
    paddingHorizontal: 16
  },
  // Style composition with squircle (borderCurve) requires style prop,
  // aspect ratio via Uniwind (aspect-[3/4]) not supported for computed ratios
  cardWrapper: {
    width: CAROUSEL_CARD_WIDTH,
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: 'hidden'
  }
})

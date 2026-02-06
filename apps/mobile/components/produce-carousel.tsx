import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ProduceCard } from '@/components/produce-card'
import type {
  Month,
  Produce,
  ProduceSection
} from '@estcequecestlasaison/shared'
import { FlashList } from '@shopify/flash-list'

type ProduceCarouselProps = {
  title: string
  subtitle?: string
  produceList: Produce[]
  month: Month
  section: ProduceSection
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16
  }
})

const ItemSeparator = () => {
  return <View className="w-1" />
}

const keyExtractor = (item: Produce) => {
  return item.id
}

export const ProduceCarousel = ({
  title,
  subtitle,
  produceList,
  month,
  section
}: ProduceCarouselProps) => {
  if (produceList.length === 0) {
    return null
  }

  const renderItem = ({ item }: { item: Produce }) => {
    return <ProduceCard produce={item} month={month} section={section} />
  }

  return (
    <View className="gap-3">
      <View className="px-4">
        <Text className="text-lg font-bold text-black">
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
      />
    </View>
  )
}

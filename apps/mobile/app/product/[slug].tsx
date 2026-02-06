import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ProduceCarousel } from '@/components/produce-carousel'
import { ProductHero } from '@/components/product-hero'
import { SeasonAlternatives } from '@/components/season-alternatives'
import { SeasonCalendar } from '@/components/season-calendar'
import { getProductBySlug } from '@estcequecestlasaison/shared/services'

const NotFoundScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Stack.Screen options={{ title: 'Produit introuvable' }} />
      <Text className="text-lg font-semibold text-black text-center">
        Ce produit n&apos;existe pas.
      </Text>
    </View>
  )
}

const ProductScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const data = getProductBySlug({ slug })

  if (!data) {
    return <NotFoundScreen />
  }

  const { produce, currentMonth, relatedProduce, alternatives } = data
  const typeLabel = produce.type === 'fruit' ? 'Fruit' : 'L\u00e9gume'

  return (
    <ScrollView className="flex-1 bg-white">
      <Stack.Screen options={{ title: produce.name }} />
      <ProductHero produce={produce} currentMonth={currentMonth} />
      <View className="gap-6 mt-6">
        {alternatives.length > 0 ? (
          <View className="px-4">
            <SeasonAlternatives alternatives={alternatives} />
          </View>
        ) : null}
        <View className="px-4 gap-3">
          <View className="flex-row gap-3">
            <View className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 p-3 gap-1">
              <Text className="text-xs font-medium text-gray-500">
                Calories
              </Text>
              <Text className="text-base font-semibold text-black">
                {produce.nutrition.calories}{' '}
                <Text className="text-xs font-normal text-gray-500">kcal</Text>
              </Text>
            </View>
            <View className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 p-3 gap-1">
              <Text className="text-xs font-medium text-gray-500">
                Vitamines
              </Text>
              <View className="flex-row flex-wrap gap-1">
                {produce.nutrition.vitamins.map((vitamin) => {
                  return (
                    <View
                      key={vitamin}
                      className="rounded-full bg-primary-50 px-2 py-0.5"
                    >
                      <Text className="text-xs font-medium text-primary-700">
                        {vitamin}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>
          <View className="rounded-2xl border border-gray-200 bg-gray-50 p-3 gap-1">
            <Text className="text-xs font-medium text-gray-500">Origine</Text>
            <Text className="text-sm font-medium text-black">
              {produce.origin}
            </Text>
          </View>
          <View className="rounded-2xl border border-gray-200 bg-gray-50 p-3 gap-1">
            <Text className="text-xs font-medium text-gray-500">
              Conservation
            </Text>
            <Text className="text-sm text-black">{produce.conservation}</Text>
          </View>
          <View className="rounded-2xl border border-gray-200 bg-gray-50 p-3 gap-1">
            <Text className="text-xs font-medium text-gray-500">
              Bien choisir
            </Text>
            <Text className="text-sm text-black">{produce.buyingTip}</Text>
          </View>
          <View className="rounded-2xl border border-gray-200 bg-gray-50 p-3 gap-1">
            <Text className="text-xs font-medium text-gray-500">Bienfaits</Text>
            <Text className="text-sm text-black">
              {produce.nutrition.benefits}
            </Text>
          </View>
        </View>
        <SeasonCalendar produce={produce} currentMonth={currentMonth} />
        {relatedProduce.length > 0 ? (
          <ProduceCarousel
            title="Aussi de saison"
            subtitle={`Autres ${typeLabel === 'Fruit' ? 'fruits et l\u00e9gumes' : 'produits'} disponibles ce mois-ci`}
            produceList={relatedProduce}
            month={currentMonth}
            section="in-season"
          />
        ) : null}
        <View className="h-8" />
      </View>
    </ScrollView>
  )
}

export default ProductScreen

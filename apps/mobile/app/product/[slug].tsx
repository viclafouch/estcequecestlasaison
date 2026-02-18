import React from 'react'
import { Pressable, ScrollView, Share, Text, View } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import * as StoreReview from 'expo-store-review'
import { Chip, Surface } from 'heroui-native'
import { ProduceCarousel } from '@/components/produce-carousel'
import { ProductHero } from '@/components/product-hero'
import { SeasonAlternatives } from '@/components/season-alternatives'
import { SeasonCalendar } from '@/components/season-calendar'
import { SUPPORTS_TOOLBAR } from '@/constants/styles'
import { saveLastViewedSlug } from '@/utils/last-viewed'
import {
  recordReviewRequest,
  shouldRequestReview,
  trackProductView
} from '@/utils/review-tracker'
import {
  getShareText,
  matchIsInSeason,
  SITE_DOMAIN
} from '@estcequecestlasaison/shared'
import { getProductBySlug } from '@estcequecestlasaison/shared/services'
import Ionicons from '@expo/vector-icons/Ionicons'

const NotFoundScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Stack.Screen options={{ title: 'Produit introuvable' }} />
      <Text className="text-lg font-semibold text-black text-center">
        Ce produit n'existe pas.
      </Text>
    </View>
  )
}

const ProductScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const data = getProductBySlug({ slug })

  React.useEffect(() => {
    trackProductView(slug)
    saveLastViewedSlug(slug)

    if (shouldRequestReview()) {
      void StoreReview.isAvailableAsync().then((isAvailable) => {
        if (isAvailable) {
          void StoreReview.requestReview()
          recordReviewRequest()
        }
      })
    }
  }, [slug])

  if (!data) {
    return <NotFoundScreen />
  }

  const { produce, currentMonth, relatedProduce, alternatives } = data
  const typeLabel = produce.type === 'fruit' ? 'Fruit' : 'Légume'

  const handleShare = () => {
    const isInSeason = matchIsInSeason(produce, currentMonth)
    const shareText = getShareText({
      produceName: produce.name,
      isInSeason
    })

    void Share.share({
      message: shareText,
      url: `https://${SITE_DOMAIN}/${produce.slug}`
    })
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-white"
        contentInsetAdjustmentBehavior="never"
      >
        <ProductHero produce={produce} currentMonth={currentMonth} />
        <View className="gap-6 mt-6">
          {alternatives.length > 0 ? (
            <View className="px-4">
              <SeasonAlternatives alternatives={alternatives} />
            </View>
          ) : null}
          <View className="px-4 gap-3">
            <View className="flex-row gap-3">
              <Surface variant="secondary" className="flex-1 gap-1">
                <Text className="text-xs font-medium text-gray-500">
                  Calories
                </Text>
                <Text className="text-base font-semibold text-black">
                  {produce.nutrition.calories}{' '}
                  <Text className="text-xs font-normal text-gray-500">
                    kcal
                  </Text>
                </Text>
              </Surface>
              <Surface variant="secondary" className="flex-1 gap-1">
                <Text className="text-xs font-medium text-gray-500">
                  Vitamines
                </Text>
                <View className="flex-row flex-wrap gap-1">
                  {produce.nutrition.vitamins.map((vitamin) => {
                    return (
                      <Chip
                        key={vitamin}
                        size="sm"
                        color="success"
                        variant="soft"
                        animation="disable-all"
                      >
                        <Chip.Label>{vitamin}</Chip.Label>
                      </Chip>
                    )
                  })}
                </View>
              </Surface>
            </View>
            <Surface variant="secondary" className="gap-1">
              <Text className="text-xs font-medium text-gray-500">Origine</Text>
              <Text className="text-sm font-medium text-black">
                {produce.origin}
              </Text>
            </Surface>
            <Surface variant="secondary" className="gap-1">
              <Text className="text-xs font-medium text-gray-500">
                Conservation
              </Text>
              <Text className="text-sm text-black">{produce.conservation}</Text>
            </Surface>
            <Surface variant="secondary" className="gap-1">
              <Text className="text-xs font-medium text-gray-500">
                Bien choisir
              </Text>
              <Text className="text-sm text-black">{produce.buyingTip}</Text>
            </Surface>
            <Surface variant="secondary" className="gap-1">
              <Text className="text-xs font-medium text-gray-500">
                Bienfaits
              </Text>
              <Text className="text-sm text-black">
                {produce.nutrition.benefits}
              </Text>
            </Surface>
          </View>
          <SeasonCalendar produce={produce} currentMonth={currentMonth} />
          {relatedProduce.length > 0 ? (
            <ProduceCarousel
              title="Aussi de saison"
              subtitle={`Autres ${typeLabel === 'Fruit' ? 'fruits et légumes' : 'produits'} disponibles ce mois-ci`}
              produceList={relatedProduce}
            />
          ) : null}
          <View className="h-8" />
        </View>
      </ScrollView>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: '#FFFFFF',
          headerRight: SUPPORTS_TOOLBAR
            ? undefined
            : () => {
                return (
                  <Pressable
                    onPress={handleShare}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={`Partager ${produce.name}`}
                  >
                    <Ionicons name="share-outline" size={22} color="#FFFFFF" />
                  </Pressable>
                )
              }
        }}
      />
      {SUPPORTS_TOOLBAR ? (
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button
            icon="square.and.arrow.up"
            onPress={handleShare}
            accessibilityLabel={`Partager ${produce.name}`}
          />
        </Stack.Toolbar>
      ) : null}
    </>
  )
}

export default ProductScreen

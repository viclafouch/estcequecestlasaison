import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { useCSSVariable } from 'uniwind'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'
import { squircle } from '@/constants/styles'
import type { Produce } from '@estcequecestlasaison/shared'
import { PRODUCE_LIST } from '@estcequecestlasaison/shared/services'

type LastViewedWidgetProps = {
  slug: string | null
  fallbackProduce: Produce | undefined
}

export const LastViewedWidget = React.memo(
  ({ slug, fallbackProduce }: LastViewedWidgetProps) => {
    const [gradientDark] = useCSSVariable(['--color-gradient-dark'])

    const targetProduce = slug
      ? PRODUCE_LIST.find((item) => {
          return item.slug === slug
        })
      : null

    const displayProduce = targetProduce ?? fallbackProduce

    if (!displayProduce) {
      return null
    }

    const isLastViewed = targetProduce !== null && targetProduce !== undefined
    const label = isLastViewed ? 'Vu récemment' : 'À découvrir'
    const imageSource = getProduceImage(displayProduce.slug as ProduceImageSlug)

    return (
      <View
        className="flex-1 rounded-2xl overflow-hidden"
        style={[styles.tallWidget, squircle]}
      >
        <Link href={`/product/${displayProduce.slug}`} asChild>
          <Link.Trigger withAppleZoom>
            <Pressable
              style={StyleSheet.absoluteFill}
              accessibilityRole="link"
              accessibilityLabel={`${label} : ${displayProduce.name}`}
            >
              <Image
                source={imageSource}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                accessibilityLabel={displayProduce.name}
              />
              <LinearGradient
                colors={['transparent', String(gradientDark)]}
                style={styles.gradient}
              />
              <View className="absolute top-3 left-3">
                <Text className="text-xs font-semibold text-white">
                  {label}
                </Text>
              </View>
              <Text
                className="absolute bottom-3 left-3 right-3 text-base font-bold text-white"
                numberOfLines={1}
              >
                {displayProduce.name}
              </Text>
            </Pressable>
          </Link.Trigger>
        </Link>
      </View>
    )
  }
)

const TALL_WIDGET_HEIGHT = 156

const styles = StyleSheet.create({
  // Computed height: 3 rows (48px each) + 2 gaps (6px each) = 156px
  tallWidget: {
    height: TALL_WIDGET_HEIGHT
  },
  // Percentage height on LinearGradient doesn't resolve via Uniwind className
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%'
  }
})

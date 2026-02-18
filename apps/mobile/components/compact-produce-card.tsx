import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { cn } from 'heroui-native'
import { useCSSVariable } from 'uniwind'
import {
  BADGE_DOT_CLASSES,
  BADGE_TEXT_CLASSES
} from '@/components/season-badge'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'
import { squircle } from '@/constants/styles'
import {
  getProduceBadge,
  type Month,
  type Produce
} from '@estcequecestlasaison/shared'

type CompactProduceCardProps = {
  produce: Produce
  month: Month
}

export const CompactProduceCard = React.memo(
  ({ produce, month }: CompactProduceCardProps) => {
    const badge = getProduceBadge({ produce, month, section: 'in-season' })
    const imageSource = getProduceImage(produce.slug as ProduceImageSlug)
    const [gradientDark] = useCSSVariable(['--color-gradient-dark'])

    return (
      <View
        className="rounded-2xl overflow-hidden"
        style={[styles.card, squircle]}
      >
        <Link href={`/product/${produce.slug}`} asChild>
          <Link.Trigger withAppleZoom>
            <Pressable
              style={StyleSheet.absoluteFill}
              accessibilityRole="link"
              accessibilityLabel={produce.name}
            >
              <Image
                source={imageSource}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                accessibilityLabel={produce.name}
              />
              <LinearGradient
                colors={['transparent', String(gradientDark)]}
                style={styles.gradient}
              />
              <View className="absolute top-2.5 left-2.5 flex-row items-center gap-1.5 rounded-full border px-2.5 py-1 bg-pill-bg border-pill-border">
                <View
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    BADGE_DOT_CLASSES[badge.variant]
                  )}
                />
                <Text
                  className={cn(
                    'text-xs font-semibold',
                    BADGE_TEXT_CLASSES[badge.variant]
                  )}
                  numberOfLines={1}
                >
                  {badge.label}
                </Text>
              </View>
              <Text
                className="absolute bottom-3 left-3 right-3 text-lg font-bold text-white"
                numberOfLines={1}
              >
                {produce.name}
              </Text>
            </Pressable>
          </Link.Trigger>
        </Link>
      </View>
    )
  }
)

const CARD_HEIGHT = 220

const styles = StyleSheet.create({
  // Runtime-computed fixed height for FlashList layout
  card: {
    height: CARD_HEIGHT
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

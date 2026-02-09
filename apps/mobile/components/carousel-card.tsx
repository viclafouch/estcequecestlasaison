import { Pressable, StyleSheet, Text } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'
import { colors } from '@/constants/theme'

type CarouselCardProps = {
  slug: string
  name: string
}

export const CarouselCard = ({ slug, name }: CarouselCardProps) => {
  const imageSource = getProduceImage(slug as ProduceImageSlug)

  return (
    <Link href={`/product/${slug}`} asChild>
      <Pressable
        style={StyleSheet.absoluteFill}
        accessibilityRole="link"
        accessibilityLabel={name}
      >
        <Image
          source={imageSource}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          accessibilityLabel={name}
        />
        <LinearGradient
          colors={[colors.gradientTransparent, colors.gradientCarousel]}
          style={styles.gradient}
        />
        <Text
          className="absolute bottom-3 left-3 right-3 text-[15px] font-bold text-white"
          numberOfLines={1}
        >
          {name}
        </Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  // Percentage height on LinearGradient doesn't resolve via Uniwind className
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%'
  }
})

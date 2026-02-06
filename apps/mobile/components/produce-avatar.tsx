import React from 'react'
import { Image, Text, View } from 'react-native'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'

type ProduceAvatarProps = {
  slug: ProduceImageSlug
  name: string
  icon: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = {
  sm: 32,
  md: 48,
  lg: 64
} as const satisfies Record<NonNullable<ProduceAvatarProps['size']>, number>

export const ProduceAvatar = ({
  slug,
  name,
  icon,
  size = 'md'
}: ProduceAvatarProps) => {
  const imageSource = getProduceImage(slug)
  const dimension = SIZE_MAP[size]

  const sizeStyle = {
    width: dimension,
    height: dimension,
    borderRadius: dimension / 2
  }

  return imageSource ? (
    <Image
      source={imageSource}
      className="bg-gray-200"
      style={sizeStyle}
      accessibilityLabel={name}
    />
  ) : (
    <View
      className="items-center justify-center bg-gray-200"
      style={sizeStyle}
      accessibilityLabel={name}
    >
      <Text className="text-xl">{icon}</Text>
    </View>
  )
}

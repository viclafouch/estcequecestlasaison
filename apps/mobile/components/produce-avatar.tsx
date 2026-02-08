import React from 'react'
import { Image } from 'expo-image'
import {
  getProduceImage,
  type ProduceImageSlug
} from '@/constants/produce-images'

type ProduceAvatarProps = {
  slug: ProduceImageSlug
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = {
  sm: 32,
  md: 48,
  lg: 64
} as const satisfies Record<NonNullable<ProduceAvatarProps['size']>, number>

export const ProduceAvatar = React.memo(
  ({ slug, name, size = 'md' }: ProduceAvatarProps) => {
    const imageSource = getProduceImage(slug)
    const dimension = SIZE_MAP[size]

    return (
      <Image
        source={imageSource}
        className="bg-gray-200"
        style={{
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2
        }}
        accessibilityLabel={name}
      />
    )
  }
)

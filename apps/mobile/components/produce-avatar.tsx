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

const createAvatarStyle = (dimension: number) => {
  return {
    width: dimension,
    height: dimension,
    borderRadius: dimension / 2
  }
}

const SIZE_STYLES = {
  sm: createAvatarStyle(SIZE_MAP.sm),
  md: createAvatarStyle(SIZE_MAP.md),
  lg: createAvatarStyle(SIZE_MAP.lg)
} as const satisfies Record<
  keyof typeof SIZE_MAP,
  ReturnType<typeof createAvatarStyle>
>

export const ProduceAvatar = React.memo(
  ({ slug, name, size = 'md' }: ProduceAvatarProps) => {
    const imageSource = getProduceImage(slug)

    return (
      <Image
        source={imageSource}
        className="bg-gray-200"
        style={SIZE_STYLES[size]}
        accessibilityLabel={name}
      />
    )
  }
)

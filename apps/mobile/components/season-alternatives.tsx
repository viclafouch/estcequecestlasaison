import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { useThemeColor } from 'heroui-native'
import { ProduceAvatar } from '@/components/produce-avatar'
import type { ProduceImageSlug } from '@/constants/produce-images'
import { squircle } from '@/constants/styles'
import Ionicons from '@expo/vector-icons/Ionicons'

type SeasonAlternativesProps = {
  alternatives: { slug: string; name: string }[]
}

export const SeasonAlternatives = ({
  alternatives
}: SeasonAlternativesProps) => {
  const mutedColor = useThemeColor('muted')

  return (
    <View
      className="rounded-2xl border border-primary-200 bg-primary-50 p-3"
      style={squircle}
    >
      <View className="flex-row items-center gap-2 mb-2.5">
        <View className="w-2 h-2 rounded-full bg-primary-500" />
        <Text className="text-xs font-medium text-primary-700">
          En saison en ce moment
        </Text>
      </View>
      <View className="flex-row flex-wrap gap-2">
        {alternatives.map((item) => {
          return (
            <Link
              key={item.slug}
              href={`/product/${item.slug}`}
              accessibilityRole="link"
              accessibilityLabel={item.name}
              style={styles.alternativeItem}
              asChild
            >
              <Pressable
                className="flex-row items-center gap-2 rounded-xl border border-gray-200 bg-white py-1.5 pr-2.5 pl-1.5"
                style={squircle}
              >
                <ProduceAvatar
                  slug={item.slug as ProduceImageSlug}
                  name={item.name}
                  size="sm"
                />
                <Text
                  className="text-sm font-medium text-black flex-1"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={String(mutedColor)}
                />
              </Pressable>
            </Link>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  alternativeItem: {
    width: '48%'
  }
})

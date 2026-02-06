import React from 'react'
import { Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

const ProductScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-black">{slug}</Text>
    </View>
  )
}

export default ProductScreen

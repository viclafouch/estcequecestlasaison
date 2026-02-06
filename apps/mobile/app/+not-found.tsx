import React from 'react'
import { Text, View } from 'react-native'
import { Link, Stack } from 'expo-router'

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Page introuvable' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold">Cette page n&apos;existe pas.</Text>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-sm text-emerald-500">
            Retour à l&apos;accueil
          </Text>
        </Link>
      </View>
    </>
  )
}

export default NotFoundScreen

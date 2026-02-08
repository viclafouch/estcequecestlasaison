import React from 'react'
import { Text, View } from 'react-native'
import { Link, Stack } from 'expo-router'

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Page introuvable' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold">Cette page n'existe pas.</Text>
        <Link
          href="/"
          className="mt-4 py-4"
          accessibilityRole="link"
          accessibilityLabel="Retour à l'accueil"
        >
          <Text className="text-sm text-primary-500">Retour à l'accueil</Text>
        </Link>
      </View>
    </>
  )
}

export default NotFoundScreen

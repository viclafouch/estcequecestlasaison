import React from 'react'
import { Text, View } from 'react-native'
import type { Href } from 'expo-router'
import { Link, Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { PRODUCE_LIST } from '@estcequecestlasaison/shared/services'

const WEB_ROUTE_ALIASES = {
  calendrier: '/(tabs)/calendar'
} as const satisfies Record<string, Href>

const DeepLinkRedirectScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()

  if (slug in WEB_ROUTE_ALIASES) {
    return (
      <Redirect
        href={WEB_ROUTE_ALIASES[slug as keyof typeof WEB_ROUTE_ALIASES]}
      />
    )
  }

  const isKnownProduct = PRODUCE_LIST.some((produce) => {
    return produce.slug === slug
  })

  if (isKnownProduct) {
    return <Redirect href={`/product/${slug}`} />
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Page introuvable' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold">Cette page n&apos;existe pas.</Text>
        <Link
          href="/"
          className="mt-4 py-4"
          accessibilityRole="link"
          accessibilityLabel="Retour à l'accueil"
        >
          <Text className="text-sm text-primary-500">
            Retour à l&apos;accueil
          </Text>
        </Link>
      </View>
    </>
  )
}

export default DeepLinkRedirectScreen

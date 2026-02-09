import React from 'react'
import { Pressable } from 'react-native'
import { Tabs, useRouter } from 'expo-router'
import { useThemeColor } from 'heroui-native'
import { useCSSVariable } from 'uniwind'
import Ionicons from '@expo/vector-icons/Ionicons'

type IoniconsName = React.ComponentProps<typeof Ionicons>['name']

type TabBarIconParams = {
  focused: boolean
  color: string
  size: number
}

type TabBarIconNames = {
  filled: IoniconsName
  outline: IoniconsName
}

const createTabBarIcon = ({ filled, outline }: TabBarIconNames) => {
  return ({ focused, color, size }: TabBarIconParams) => {
    return (
      <Ionicons name={focused ? filled : outline} size={size} color={color} />
    )
  }
}

const HeaderInfoButton = () => {
  const router = useRouter()
  const foregroundColor = useThemeColor('foreground')

  const handlePress = () => {
    router.push('/faq')
  }

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Questions fréquentes"
      accessibilityHint="Ouvre la page des questions fréquentes"
    >
      <Ionicons
        name="information-circle-outline"
        size={24}
        color={String(foregroundColor)}
      />
    </Pressable>
  )
}

const TabLayout = () => {
  const [surfaceColor, mutedColor, borderColor, foregroundColor] =
    useThemeColor(['surface', 'muted', 'border', 'foreground'])
  const [primaryColor] = useCSSVariable(['--color-primary-500'])

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: String(surfaceColor) },
        headerTintColor: String(foregroundColor),
        headerShadowVisible: false,
        tabBarActiveTintColor: String(primaryColor),
        tabBarInactiveTintColor: String(mutedColor),
        tabBarStyle: {
          backgroundColor: String(surfaceColor),
          borderTopColor: String(borderColor),
          borderTopWidth: 1
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          headerTitle: "Est-ce que c'est la saison ?",
          tabBarIcon: createTabBarIcon({
            filled: 'home',
            outline: 'home-outline'
          }),
          tabBarAccessibilityLabel: 'Accueil, carousels des produits de saison',
          headerRight: () => {
            return <HeaderInfoButton />
          },
          headerRightContainerStyle: { paddingRight: 16 }
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Recherche',
          headerShown: false,
          tabBarIcon: createTabBarIcon({
            filled: 'search',
            outline: 'search-outline'
          }),
          tabBarAccessibilityLabel: 'Recherche, rechercher un fruit ou légume'
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendrier',
          headerTitle: 'Calendrier',
          tabBarIcon: createTabBarIcon({
            filled: 'calendar',
            outline: 'calendar-outline'
          }),
          tabBarAccessibilityLabel: 'Calendrier, saisonnalité des 80 produits'
        }}
      />
    </Tabs>
  )
}

export default TabLayout

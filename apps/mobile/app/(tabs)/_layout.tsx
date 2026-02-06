import React from 'react'
import { Pressable } from 'react-native'
import { Tabs } from 'expo-router'
import { colors } from '@/constants/theme'
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
  const handlePress = () => {
    // TODO(M3): Navigate to FAQ screen
  }

  return (
    <Pressable onPress={handlePress} hitSlop={8}>
      <Ionicons
        name="information-circle-outline"
        size={24}
        color={colors.text}
      />
    </Pressable>
  )
}

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
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
          })
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
          })
        }}
      />
    </Tabs>
  )
}

export default TabLayout

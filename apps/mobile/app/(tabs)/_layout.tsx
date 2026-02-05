import React from 'react'
import { Tabs } from 'expo-router'
import { colors } from '@/constants/theme'

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil'
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Recherche',
          tabBarLabel: 'Recherche'
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendrier',
          tabBarLabel: 'Calendrier'
        }}
      />
    </Tabs>
  )
}

export default TabLayout

import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { HeroUINativeProvider } from 'heroui-native'
import 'react-native-reanimated'
import '../polyfills'
import '../global.css'

export { ErrorBoundary } from 'expo-router'

// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
export const unstable_settings = {
  initialRouteName: '(tabs)'
}

void SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  React.useEffect(() => {
    void SplashScreen.hideAsync()
  }, [])

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <HeroUINativeProvider>
          <Stack
            screenOptions={{
              animation: 'slide_from_right'
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="[slug]" options={{ headerShown: false }} />
            <Stack.Screen name="product/[slug]" options={{ title: '' }} />
          </Stack>
          {/* eslint-disable-next-line react/style-prop-object */}
          <StatusBar style="dark" />
        </HeroUINativeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default RootLayout

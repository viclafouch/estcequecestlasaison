import React from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { HeroUINativeProvider } from 'heroui-native'
import 'react-native-reanimated'
import '../global.css'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export { ErrorBoundary } from 'expo-router'

// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
export const unstable_settings = {
  initialRouteName: '(tabs)'
}

void SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({})

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  React.useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <HeroUINativeProvider>
          <Stack
            screenOptions={{
              animation: 'slide_from_right'
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          {/* eslint-disable-next-line react/style-prop-object */}
          <StatusBar style="dark" />
        </HeroUINativeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default RootLayout

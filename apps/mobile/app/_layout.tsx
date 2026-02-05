import React from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
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
    <GestureHandlerRootView style={styles.container}>
      <HeroUINativeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout

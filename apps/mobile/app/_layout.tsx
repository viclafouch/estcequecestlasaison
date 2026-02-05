import React from 'react'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import 'react-native-reanimated'

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
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  )
}

export default RootLayout

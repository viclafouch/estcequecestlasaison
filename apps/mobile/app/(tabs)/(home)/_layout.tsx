import { Stack } from 'expo-router'
import { HeaderInfoButton } from '@/components/header-info-button'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Est-ce que c'est la saison ?",
          headerRight: () => {
            return <HeaderInfoButton />
          }
        }}
      />
    </Stack>
  )
}

export default HomeLayout

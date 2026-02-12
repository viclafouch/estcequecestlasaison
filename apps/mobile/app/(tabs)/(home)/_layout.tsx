import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Est-ce que c'est la saison ?" }}
      />
    </Stack>
  )
}

export default HomeLayout

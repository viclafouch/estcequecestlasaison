import { Stack } from 'expo-router'

const CalendarLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'Calendrier' }} />
    </Stack>
  )
}

export default CalendarLayout

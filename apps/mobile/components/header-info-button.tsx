import { Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useThemeColor } from 'heroui-native'
import Ionicons from '@expo/vector-icons/Ionicons'

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
        name="help-circle-outline"
        size={24}
        color={String(foregroundColor)}
      />
    </Pressable>
  )
}

export { HeaderInfoButton }

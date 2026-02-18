import React from 'react'
import { Pressable, Text } from 'react-native'
import { cn } from 'heroui-native'
import { StyledIonicons } from '@/constants/styled'
import { squircle } from '@/constants/styles'

type CategoryToggleWidgetProps = {
  label: string
  icon: React.ComponentProps<typeof StyledIonicons>['name']
  isEnabled: boolean
  onToggle: () => void
}

export const CategoryToggleWidget = React.memo(
  ({ label, icon, isEnabled, onToggle }: CategoryToggleWidgetProps) => {
    return (
      <Pressable
        onPress={onToggle}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isEnabled }}
        accessibilityLabel={label}
        className={cn(
          'flex-1 flex-row items-center rounded-2xl border px-3 gap-2',
          isEnabled
            ? 'bg-primary-50 border-primary-500'
            : 'bg-gray-100 border-gray-200'
        )}
        style={squircle}
      >
        <StyledIonicons
          name={icon}
          className={cn(
            'text-lg',
            isEnabled ? 'text-primary-700' : 'text-gray-400'
          )}
        />
        <Text
          className={cn(
            'flex-1 text-sm font-semibold',
            isEnabled ? 'text-primary-700' : 'text-gray-400'
          )}
          numberOfLines={1}
        >
          {label}
        </Text>
        {isEnabled ? (
          <StyledIonicons
            name="checkmark-circle"
            className="text-base text-primary-500"
          />
        ) : null}
      </Pressable>
    )
  }
)

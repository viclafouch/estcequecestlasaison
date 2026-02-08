import React from 'react'
import { Text, View } from 'react-native'
import { cn } from 'heroui-native'
import { squircle } from '@/constants/theme'
import type { BadgeVariant } from '@estcequecestlasaison/shared'

type ProduceBadgeProps = {
  label: string
  variant: BadgeVariant
}

const VARIANT_CLASSES = {
  positive: { container: 'bg-primary-200', label: 'text-primary-900' },
  warning: { container: 'bg-warning-200', label: 'text-warning-900' },
  neutral: { container: 'bg-gray-200', label: 'text-gray-700' }
} as const satisfies Record<BadgeVariant, { container: string; label: string }>

export const ProduceBadge = React.memo(
  ({ label, variant }: ProduceBadgeProps) => {
    const variantClasses = VARIANT_CLASSES[variant]

    return (
      <View
        className={cn('px-2 py-0.5 rounded-xl', variantClasses.container)}
        style={squircle}
      >
        <Text
          className={cn('text-xs font-semibold', variantClasses.label)}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    )
  }
)

import React from 'react'
import { Text, View } from 'react-native'
import { Accordion } from 'heroui-native'
import { FAQ_ITEMS } from '@/constants/faq'

export const FaqSection = () => {
  return (
    <View className="px-4 py-6">
      <Text
        className="text-lg font-bold text-black mb-3"
        accessibilityRole="header"
      >
        Questions fréquentes
      </Text>
      <Accordion selectionMode="multiple" variant="surface">
        {FAQ_ITEMS.map((item) => {
          return (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Trigger>
                <Text className="text-foreground text-base flex-1">
                  {item.question}
                </Text>
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content className="px-4">
                <Text className="text-muted text-base leading-relaxed">
                  {item.answer}
                </Text>
              </Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion>
    </View>
  )
}

import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { Accordion } from 'heroui-native'
import { FAQ_ITEMS } from '@/constants/faq'

const FaqScreen = () => {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Stack.Screen options={{ title: 'FAQ' }} />
      <View className="px-4 py-6">
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
    </ScrollView>
  )
}

export default FaqScreen

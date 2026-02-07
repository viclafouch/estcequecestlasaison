import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Accordion } from 'heroui-native'
import { FAQ_ITEMS } from '@/constants/faq'

const FaqScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-4 py-6">
        <Text
          className="text-2xl font-bold text-black mb-4"
          accessibilityRole="header"
        >
          Questions fréquentes
        </Text>
        <Accordion selectionMode="multiple">
          {FAQ_ITEMS.map((item) => {
            return (
              <Accordion.Item key={item.value} value={item.value}>
                <Accordion.Trigger>
                  <Text>{item.question}</Text>
                  <Accordion.Indicator />
                </Accordion.Trigger>
                <Accordion.Content>
                  <Text>{item.answer}</Text>
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

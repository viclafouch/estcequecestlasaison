import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil</Text>
    </View>
  )
}

export default HomeScreen

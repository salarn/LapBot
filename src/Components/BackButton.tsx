import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton(props) {
  return (
    <TouchableOpacity onPress={() => {
      props.onPress()
    }} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../Assets/Images/arrow_back.png')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
})

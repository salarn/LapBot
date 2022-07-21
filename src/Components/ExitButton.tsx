import React, { useEffect } from 'react'
import { TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const ExitButton = (props) => {
  return (
    <TouchableOpacity onPress={() => {
      props.navigation.replace('RotatePhoneToPortrait')
    }} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../Assets/Images/ExitButton.png')}
      />
      <Text style={styles.ExitText}>
        Exit
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 30,
  },
  image: {
    width: 40,
    height: 40,
  },
  ExitText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    top: 6,
  },
})
export default ExitButton;
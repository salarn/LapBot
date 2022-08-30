import React, { useEffect } from 'react'
import { TouchableOpacity, Image, StyleSheet, ImageBackground, View } from 'react-native'
import { Text } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Icon } from 'react-native-elements'

const ExitButton = (props) => {
  return (
    <View style={styles.container}>
      <Icon reverse name="home" type="entypo" size={20} color='#ff5f56' onPress={() => {
        props.navigation.replace('RotatePhoneToPortrait')
      }} />
      <Text style={styles.ExitText}>
        Home
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: getStatusBarHeight() - 30,
    left: 25,
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
  ExitText: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})
export default ExitButton;
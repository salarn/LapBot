import React from 'react'
import { navigate } from '@/Navigators/Root'
import { StyleSheet, View } from 'react-native'
import { DefaultTheme } from 'react-native-paper'
import { Background, Brand, Button } from '@/Components'

const StartLoginScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.brandContainer}>
        <Brand />
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
const styles = StyleSheet.create({
  brandContainer: {
    width: '20%',
    height: '50%',
  },
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})
export default StartLoginScreen

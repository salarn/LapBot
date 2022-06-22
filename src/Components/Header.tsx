import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, DefaultTheme } from 'react-native-paper'

export default function Header(props: any) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 20,
    alignSelf: 'center',
  },
})

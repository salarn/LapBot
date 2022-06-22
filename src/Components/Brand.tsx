import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useTheme } from '@/Theme'

const Brand = () => {
  const { Layout, Images } = useTheme()

  return (
    <View style={styles.container}>
      <Image style={Layout.fullSize} source={Images.logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Brand

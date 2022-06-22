import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Theme'
import { useDispatch } from 'react-redux'
import InitStartup from '@/Store/Startup/Init'
import { Brand } from '@/Components'

const IndexStartupContainer = () => {
  const { Gutters, Fonts } = useTheme()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
        <Brand />
      </View>
      <ActivityIndicator
        size={'large'}
        style={[Gutters.largeVMargin, styles.ActivityIndicator]}
      />
      <Text style={[Fonts.titleLarge, styles.boldTitle]}>
        {'LapBot\nAI + AR'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f4255',
  },
  brandContainer: {
    flex: 3,
  },
  ActivityIndicator: {
    flex: 1,
  },
  boldTitle: {
    flex: 3,
    color: '#536fab',
  },
})

export default IndexStartupContainer

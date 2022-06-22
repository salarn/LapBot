import React, { useEffect, useState, FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  IndexStartupContainer,
  StartLoginScreen,
  RegisterScreen,
  LoginScreen,
} from '@/Containers'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { MainNavigator } from '@/Navigators'
import { navigationRef } from '@/Navigators/Root'
import { SafeAreaView } from 'react-native'
import { useTheme } from '@/Theme'
import { StartupState } from '@/Store/Startup'

const Stack = createStackNavigator()

let LoginRegisterNavigator: FunctionComponent | null
let justhelp: FunctionComponent | null

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme()
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false)
  const applicationIsLoading = useSelector(
    (state: { startup: StartupState }) => state.startup.loading,
  )

  useEffect(() => {
    if (LoginRegisterNavigator == null && !applicationIsLoading) {
      LoginRegisterNavigator =
        require('@/Containers/StartLoginScreen/Index').default
      // justhelp = require('@/Navigators/Main').default
      setIsApplicationLoaded(true)
    }
  }, [applicationIsLoading])

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false)
      LoginRegisterNavigator = null
    },
    [],
  )
  return (
    <SafeAreaView style={[Layout.fill, styles.safeArea]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Startup" component={IndexStartupContainer} />
          {isApplicationLoaded && LoginRegisterNavigator != null && (
            <Stack.Screen name="StartScreen" component={StartLoginScreen} />
          )}
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          
          <Stack.Screen name="Main" component={MainNavigator} />
          {/*
            /*<MainLogin Stack={Stack} />
            <Stack.Screen
              name="LoginRegister"
              component={LoginRegisterNavigator}
              options={{
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}
const styles = {
  safeArea: {
    backgroundColor: '#4c4f67',
  },
}

export default ApplicationNavigator

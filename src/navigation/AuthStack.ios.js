import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RegisterScreen from '@/screens/RegisterScreen'
import ConsentStudyScreen from '@/screens/ConsentStudy'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  let routeName

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunchedOnboarding').then((value) => {
      if (value == null) {
        // AsyncStorage.setItem('alreadyLaunchedOnboarding', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ header: () => null, orientation: 'portrait' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null, orientation: 'portrait' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ header: () => null, orientation: 'portrait' }}
      />
      <Stack.Screen
        name="StudyConsent"
        component={ConsentStudyScreen}
        options={{ header: () => null, orientation: 'portrait' }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ header: () => null, orientation: 'portrait' }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack

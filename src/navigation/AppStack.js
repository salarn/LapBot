import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'

import MainTabScreen from '../screens/MainTabScreen'
import GameScreen from '../screens/GameScreen'
import DemographicQuestionScreen from '@/screens/DemographicQuestionScreen'

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  let routeName

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunchedQuestioner').then((value) => {
      if (value == null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null
  } else if (isFirstLaunch == true) {
    routeName = 'Questioner';
  } else {
    routeName = 'MainTab';
  }
  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen name='Questioner'
        component={DemographicQuestionScreen}
        options={{ header: () => null, orientation: 'portrait' }} />
      <Stack.Screen name='MainTab' component={MainTabScreen}
        options={{ header: () => null, orientation: 'portrait' }} />
      <Stack.Screen name="Game" component={GameScreen} options={{
        header: () => null,
        orientation: 'landscape_right'
      }} />
    </Stack.Navigator>
  );
}

export default AppStack;
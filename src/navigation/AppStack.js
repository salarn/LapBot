import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native'
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
      <Stack.Screen name='Questioner' component={DemographicQuestionScreen} options={{
        header: () => null,
        orientation: 'portrait'
      }} />
      <Stack.Screen name='MainTab' component={MainTabScreen} options={{
        header: () => null,
        orientation: 'portrait'
      }} />
      <Stack.Screen name="Game" component={GameScreen} options={{
        header: () => null,
        orientation: 'landscape_right'
      }} />
      <Stack.Screen name='RotatePhoneToPortrait' component={RotatePhoneScreenToPortrait} options={{
        header: () => null,
        orientation: 'portrait'
      }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  rotateImageContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  rotatePhone: {
    height: 200,
    width: 250,
  },
})

export default AppStack;
const RotatePhoneScreenToPortrait = ({ navigation }) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.replace('MainTab')
    }, 2500)
    return () => clearTimeout(timer)
  })
  return (
    <View style={styles.rotateImageContainer}>
      <Image
        source={require('../Assets/Images/rotatePhone.png')}
        style={styles.rotatePhone}
      />
    </View>
  )
}
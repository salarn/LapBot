import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,

} from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { AuthContext } from '../Components/context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orientation from 'react-native-orientation';
import GamePlayScreen from '../screens/GamePlayScreen';
import FeedbackScreen from '../screens/FeedbackScreen'

const GameStack = createNativeStackNavigator();

const GameScreen = ({ navigation }) => {

  return (
    <GameStack.Navigator initialRouteName={'RotatePhone'}>
      <GameStack.Screen name='RotatePhone'
        component={RotatePhoneScreen}
        options={{ header: () => null }} />
      <GameStack.Screen name='GamePlay'
        component={GamePlayScreen}
        options={{ header: () => null }} />
      <GameStack.Screen name='Feedback'
        component={FeedbackScreen}
        options={{ header: () => null }} />
    </GameStack.Navigator>
  );
};


const styles = StyleSheet.create({
  rotatePhone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f7f7f7'
  },
})

export default GameScreen;

const RotatePhoneScreen = ({ navigation }) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.replace('GamePlay')
    }, 2500)
    return () => clearTimeout(timer)
  })
  return (
    <ImageBackground
      source={require('../Assets/Images/rotatePhone.png')}
      resizeMode="center"
      style={styles.rotatePhone}
    />
  )
}



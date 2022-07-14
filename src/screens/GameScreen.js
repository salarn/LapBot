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
import GamePlayScreen from '../screens/GamePlayScreen'
import FeedbackScreen from '../screens/FeedbackScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GameStack = createNativeStackNavigator();

const GameScreen = ({ navigation }) => {
  const [levelNumber, setLevelNumber] = useState(null)
  const [roundNumber, setRoundNumber] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('levelNumber').then((value) => {
      if (value == null) {
        setLevelNumber(parseInt(1));
        AsyncStorage.setItem('levelNumber', "1")
      } else {
        setLevelNumber(value);
      }
    })
    AsyncStorage.getItem('roundNumber').then((value) => {
      if (value == null) {
        setRoundNumber(parseInt(1));
        AsyncStorage.setItem('roundNumber', "1")
      } else {
        setRoundNumber(value);
      }
    })
  })

  return (
    <GameStack.Navigator initialRouteName={'RotatePhone'}>
      <GameStack.Screen name='RotatePhone'
        component={RotatePhoneScreen}
        options={{ header: () => null }} />
      <GameStack.Screen name='GamePlay'
        component={GamePlayScreen}
        options={{ header: () => null }}
        initialParams={{ levelNumber: levelNumber, roundNumber: roundNumber }} />
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



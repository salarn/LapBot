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
import NextLevelScreen from './NextLevelScreen';
import { Image } from 'react-native-elements';
import { BackgroundImage } from 'react-native-elements/dist/config';

const GameStack = createNativeStackNavigator();

const GameScreen = ({ navigation }) => {
  const [levelNumber, setLevelNumber] = useState(null)
  const [roundNumber, setRoundNumber] = useState(null)
  const [bingoNumber, setBingoNumber] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('levelNumber').then((value) => {
      if (value == null) {
        setLevelNumber(parseInt(0))
        AsyncStorage.setItem('levelNumber', "0")
      } else {
        setLevelNumber(value)
      }
    })
    AsyncStorage.getItem('roundNumber').then((value) => {
      if (value == null) {
        setRoundNumber(parseInt(1))
        AsyncStorage.setItem('roundNumber', "1")
      } else {
        setRoundNumber(value)
      }
    })
    AsyncStorage.getItem('bingoNumber').then((value) => {
      if (value == null) {
        setBingoNumber(parseInt(0))
        AsyncStorage.setItem('bingoNumber', "0")
      } else {
        setBingoNumber(value)
      }
    })
  })

  return (
    <GameStack.Navigator initialRouteName={'RotatePhoneToLandScape'}>
      <GameStack.Screen name='RotatePhoneToLandScape'
        component={RotatePhoneScreenToLandScape}
        options={{ header: () => null }} />
      <GameStack.Screen name='GamePlay'
        component={GamePlayScreen}
        options={{ header: () => null }}
        initialParams={{ levelNumber: levelNumber, roundNumber: roundNumber }} />
      <GameStack.Screen name='Feedback'
        component={FeedbackScreen}
        options={{ header: () => null }} />
      <GameStack.Screen name='NextLevel'
        component={NextLevelScreen}
        options={{ header: () => null }} />
    </GameStack.Navigator>
  );
};


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

export default GameScreen;

const RotatePhoneScreenToLandScape = ({ navigation }) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.replace('GamePlay')
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



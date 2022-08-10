import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  Image,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LevelsScreen = ({ navigation }) => {

  const [userToken, setUserToken] = useState(null)
  const [levelNumber, setLevelNumber] = useState(null)
  const circlePosision = [
    ['5%', '70%'],
    ['40%', '60%'],
    ['5%', '47%'],
    ['45%', '33%'],
    ['7%', '17%'],
    ['30%', '0%'],
  ]

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((value) => {
      setUserToken(value)
    })
    AsyncStorage.getItem('levelNumber').then((value) => {
      if (value == null) {
        setLevelNumber(1)
      } else {
        setLevelNumber(parseInt(value))
      }
    })
  })
  if (userToken == null || levelNumber == null) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#7ec5dc' }}>
        <ImageBackground
          source={require('../Assets/Images/levelsBackGround.png')}
          resizeMode="stretch"
          style={{ flex: 1 }}>
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#7ec5dc' }}>
      <ImageBackground
        source={require('../Assets/Images/levelsBackGround.png')}
        resizeMode="stretch"
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <TouchableOpacity style={{
            width: 200, height: 200, borderWidth: 6, borderRadius: 100, borderColor: 'rgba(30, 143, 4,0.4)', justifyContent: 'center', alignItems: 'center'
            , backgroundColor: 'rgba(30, 143, 4,0.3)', left: circlePosision[levelNumber - 1][0], top: circlePosision[levelNumber - 1][1]
          }} onPress={() => navigation.replace('Game')}>
            <Text style={{ fontSize: 50, color: '#f8f0e3' }} > Level {levelNumber}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  }
})

export default LevelsScreen;
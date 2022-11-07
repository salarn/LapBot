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
import { windowWidth } from '@/utils/Dimentions';

const circlePosision = [
  [null, null],
  ['5%', '70%'],
  ['40%', '56%'],
  ['5%', '43%'],
  ['45%', '30%'],
  ['7%', '12%'],
  ['30%', '0%'],
]
const levelGifs = [
  require('../Assets/Images/nurse-woman-relax-stock-gifs.gif'),
  require('../Assets/Images/nurse-woman-leaned-stock-gifs.gif'),
  require('../Assets/Images/nurse-woman-playing-guitar-stock-gifs.gif'),
  require('../Assets/Images/nurse-woman-exercise-stock-gifs.gif'),
  require('../Assets/Images/nurse-woman-evil-stock-gifs.gif'),
]
const levelGifStyles = [
  {}, { left: '-35%' }, {}, {}, {}
]

const LevelsScreen = ({ navigation }) => {

  // For rendering the level screen Gif to removing lags
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      AsyncStorage.setItem('TabOpen', 'LevelScreen')
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    var timer = setInterval(() => {
      AsyncStorage.getItem('TabOpen').then((value) => {
        if (value == 'LevelScreen')
          setTabCurrent(true)
        else
          setTabCurrent(false)
      })
    }, 500)
    return () => {
      clearInterval(timer)
    }
  })

  const [userToken, setUserToken] = useState(null)
  const [levelNumber, setLevelNumber] = useState(null)
  const [tabCurrent, setTabCurrent] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((value) => {
      setUserToken(value)
    })
    AsyncStorage.getItem('levelNumber').then((value) => {
      if (value == null) {
        setLevelNumber(0)
      } else {
        setLevelNumber(parseInt(value))
      }
    })
    AsyncStorage.setItem('TabOpen', 'LevelScreen')
  }, [])

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
  if (levelNumber == 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#7ec5dc' }}>
        <ImageBackground
          source={require('../Assets/Images/levelsBackGround.png')}
          resizeMode="stretch"
          imageStyle={{ opacity: 0.2 }}
          style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../Assets/Images/nurse-woman-meditation-stock-gifs.gif')}
              style={{ height: windowWidth * 0.8, width: windowWidth * 0.8 }} />
            <TouchableOpacity style={{
              width: 200, height: 200, borderWidth: 6, borderRadius: 100, borderColor: 'rgba(30, 143, 4,0.4)', justifyContent: 'center', alignItems: 'center'
              , backgroundColor: 'rgba(30, 143, 4,0.3)', marginTop: 50,
            }} onPress={() => navigation.replace('Game')}>
              <Text style={{ fontSize: 40, color: '#f8f0e3', textAlign: 'center' }} >Practice</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
  if (levelNumber >= 6) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#7ec5dc' }}>
        <ImageBackground
          source={require('../Assets/Images/levelsBackGround.png')}
          resizeMode="stretch"
          imageStyle={{ opacity: 0.2 }}
          style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../Assets/Images/nurse-woman-trophy-stock-gifs.gif')}
              style={{ height: windowWidth * 0.9, width: windowWidth * 0.9 }} />
            <TouchableOpacity style={{
              width: 200, height: 200, borderWidth: 6, borderRadius: 100, borderColor: 'rgba(254, 191, 62,0.7)', justifyContent: 'center', alignItems: 'center'
              , backgroundColor: 'rgba(254, 191, 62,0.5)', marginTop: 50,
            }} onPress={() => navigation.replace('Game')} disabled={true}>
              <Text style={{ fontSize: 35, color: '#fefefe', textAlign: 'center' }} >You Win!</Text>
            </TouchableOpacity>
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
        <GameButton levelNumber={levelNumber} navigation={navigation} tabCurrent={tabCurrent} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const GameButton = ({ levelNumber, navigation, tabCurrent }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        width: 200, height: 200, borderWidth: 6, borderRadius: 50, borderColor: 'rgba(32, 99, 121,1)', alignItems: 'center'
        , backgroundColor: 'rgba(54, 164, 201,0.6)', left: circlePosision[levelNumber][0], top: circlePosision[levelNumber][1]
      }} onPress={() => navigation.replace('Game')}>
        <Text style={{ fontSize: 35, color: 'white' }} >Level {levelNumber}</Text>
        {tabCurrent && <Image source={levelGifs[levelNumber - 1]}
          style={[{ position: 'absolute', height: '90%', width: '100%', bottom: 0 }, levelGifStyles[levelNumber - 1]]} />
        }
      </TouchableOpacity>
    </View>
  )
}

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
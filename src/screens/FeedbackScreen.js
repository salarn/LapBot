import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { Icon } from 'react-native-elements'
import Video from 'react-native-video'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { BackButton, ExitButton } from '@/Components';
import Images from '@/Theme/Images';
import ScoreCalculator from '@/helper/ScoreCalculator';
import EmojiFeedback from '@/helper/EmojiFeedback'
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormButton from '@/Components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Value } from 'react-native-reanimated';

const frameWidth = windowWidth * 0.8 * 1.25
const frameHeight = windowWidth * 0.8
const roundPassLimit = 80
const arr = [1, 2, 3, 4, 5]

const GamePlayScreen = ({ route, navigation }) => {
  const { lastScore, lastTouchX, lastTouchY, levelNumber, roundNumber } = route.params
  const [quizVisible, setQuizVisible] = useState(true)
  const [modalConfVisible, setModalConfVisible] = useState(false)
  const [bingoNumber, setBingoNumber] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('bingoNumber').then((value) => {
      setBingoNumber(parseInt(value))
    })
  })

  return (
    <ImageBackground
      source={require('../Assets/Images/background-gameplay.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.leftSideContainer}>
          <View style={styles.levelNumber}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'dimgrey' }}>Level   {levelNumber}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'dimgrey' }}>Round   {roundNumber}</Text>
          </View>
          <View style={styles.scoreContainer}>

            <ImageBackground source={lastScore >= roundPassLimit ? require('../Assets/Images/correct-feedback.gif') : require('../Assets/Images/smoke.gif')}
              rep
              style={styles.scoreGif}
              imageStyle={lastScore >= roundPassLimit ? {} : { opacity: 0.2 }} />
            <Text style={[styles.scoreNumber, lastScore >= roundPassLimit ? { color: '#0ca284' } : { color: '#c90504' }]}>
              {String(parseInt(lastScore))}%
            </Text>
            <Text style={styles.scoreText}>Round <Text style={lastScore >= roundPassLimit ? { color: '#0ca284' } : { color: '#c90504' }}>{lastScore >= roundPassLimit ? "passed" : "failed"}</Text> with accuracy:</Text>
          </View>
        </View>
        <View style={styles.animationGif}>
          <Image source={lastScore >= roundPassLimit ? require('../Assets/Images/correct-gif.gif') : require('../Assets/Images/wrong-gif.gif')}
            rep
            style={{
              height: '100%',
              width: '100%',
              marginTop: 70,
            }}
          />
        </View>
        <View style={{ marginLeft: 30, }}>
          <View style={styles.gallbladdersContainer}>
            {arr.map(i => {
              return <Image key={i} source={i > bingoNumber ?
                require('../Assets/Images/gallbladder-black.png') :
                require('../Assets/Images/gallbladder-colorful.png')}
                style={{ height: 40, width: 40 }} />
            })
            }
          </View>
          <View style={styles.IconsContainer}>
            <View style={styles.frameIcon}>
              <Icon reverse color="#972ba1" name="photo" type="font-awesome" size={50}
                onPress={() => setModalConfVisible(true)}
              />
              <Text style={{ alignSelf: 'center', marginTop: 6, fontSize: 15, fontWeight: 'bold' }}>Anotated Frame</Text>
            </View>
          </View>
          <View style={{ alignSelf: 'center', marginTop: 40 }}>
            <FormButton buttonTitle='Next Round' onPress={() => GoToNextRound(navigation, bingoNumber, levelNumber)} />
          </View>
        </View>
      </View>
      <ExitButton navigation={navigation} backLocationString="MainTab" />
      <Modal
        supportedOrientations={['landscape-right']}
        animationType='slide'
        transparent={true}
        visible={modalConfVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <BackButton onPress={() => setModalConfVisible(!modalConfVisible)} />
            {/*<Text>Heat Map</Text>*/}
            <View style={{
              height: frameHeight,
              width: frameWidth,
            }}>
              <Image source={require('../Assets/GameData/1.0_image_scaled_raw_heatmap.png')}
                style={styles.frame} />
              <Image source={require('../Assets/Images/crosshair.png')}
                style={[styles.crosshair,
                {
                  top: lastTouchY - windowWidth * 0.1 / 2,
                  left: lastTouchX - windowWidth * 0.1 / 2
                }]} />
              <Image source={require('../Assets/Images/scalpel.png')}
                style={[styles.scalpel, {
                  top: lastTouchY + windowWidth * 0.1 / 3,
                  left: lastTouchX + windowWidth * 0.1 / 3
                }]} />
            </View>
          </View>
        </View>

      </Modal>
    </ImageBackground >
  )

};

const GoToNextRound = (navigation, bingoNumber, levelNumber) => {
  //Going to next level
  if (bingoNumber == 5) {
    let nextLevel = parseInt(levelNumber) + 1;
    AsyncStorage.setItem('levelNumber', String(nextLevel))
    AsyncStorage.setItem('roundNumber', "1")
    AsyncStorage.setItem('bingoNumber', "0")

    navigation.replace('NextLevel', { levelNumber })
  }
  else {
    let freshLevelNumber = 0
    let freshRoundNumber = 0
    AsyncStorage.getItem('levelNumber').then((value) => {
      freshLevelNumber = value
    }).then(() => {
      AsyncStorage.getItem('roundNumber').then((value2) => {
        freshRoundNumber = value2
      }).then(() => {
        navigation.replace('GamePlay', { freshLevelNumber, freshRoundNumber })
      })
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    flexDirection: 'row',
    flexGrow: 20,
    //backgroundColor: "#F5FCFF",
  },
  leftSideContainer: {
    width: '40%',
    marginLeft: 30,
    //alignItems: "center",
  },
  IconsContainer: {
    //height: '50%',
    //width: '50%',
    //alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //alignItems: 'center',
    //justifyContent: 'center',
    //marginTop: 40,
    //marginRight: -60,
  },
  scoreText: {
    position: 'absolute',
    fontSize: 35,
    //color: 'green',
    alignSelf: 'center',
    textAlign: 'center',
    top: '15%',
    fontWeight: 'bold'
  },
  scoreNumber: {
    position: 'absolute',
    fontSize: 50,
    //color: '#0ca284',
    alignSelf: 'center',
    bottom: '15%',
    fontWeight: 'bold'
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  panelContainer: {
    flex: 1,
    justifyContent: "center",
  },
  scoreContainer: {
    height: windowWidth * 0.7,
    width: windowWidth * 0.7,
    alignSelf: 'center',
  },
  levelNumber: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top: -10,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  frame: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  scoreGif: {
    height: 300,
    width: 300,
    //resizeMode: 'cover',
    //position: 'absolute',
    marginTop: 60,
    alignSelf: 'center',
  },
  animationGif: {
    width: '30%',
    height: '60%',
    marginRight: -20,
    marginLeft: -40
  },
  crosshair: {
    tintColor: 'silver',
    position: 'absolute',
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
  },
  scalpel: {
    tintColor: 'silver',
    position: 'absolute',
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
  },

  repeatIcon: {
    //flex: 1,
    alignItems: 'center',
  },
  frameIcon: {
    //flex: 1,
    alignItems: 'center',
  },
  gallbladdersContainer: {
    flexDirection: 'row',
    borderLeftColor: '#fcf05a',
    borderBottomColor: '#fcf05a',
    borderTopColor: '#56b56a',
    borderRightColor: '#56b56a',
    borderWidth: 3,
    borderRadius: 10,
    padding: 5,
    marginTop: -20,
    marginBottom: 10,
    justifyContent: "center",
  },
  ///////////// Modal styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
    backgroundColor: 'rgba(215, 237, 244,0.7)',
  },
  modalView: {
    flexDirection: 'row',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonNext: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#0ca284",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

export default GamePlayScreen;
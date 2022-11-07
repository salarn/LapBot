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
import GameData from '../helper/GameData'
import RoundsCalculationMod from '@/helper/RoundsCalculationMod';

const roundPassLimit = 50
const arr = [1, 2, 3, 4, 5]

const GamePlayScreen = ({ route, navigation }) => {
  const { lastScore, lastTouchX, lastTouchY, levelNumber, roundNumber, GameFrameWidth, GameFrameHeight, userToken } = route.params
  const [AIFrameVisible, setAIFrameVisible] = useState(true)
  const [bingoNumber, setBingoNumber] = useState(null)
  const [clickedOnVideo, setClickedOnVideo] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('bingoNumber').then((value) => {
      setBingoNumber(parseInt(value))
    })
  })

  return (
    <View style={{ backgroundColor: 'rgba(0,0,0,1)', flex: 1 }}>
      <View style={styles.container}>
        <View style={[styles.leftSideContainer, { marginLeft: 25 }]}>
          <Text style={{ fontSize: 30, fontWeight: '600', color: 'rgb(243, 244, 244)', textAlign: 'center', marginTop: 8 }}>You {lastScore >= roundPassLimit ? <Text style={{ fontSize: 35, fontWeight: '900' }}>passed</Text> : <Text style={{ fontSize: 35, fontWeight: '900' }}>failed</Text>} with {String(parseInt(lastScore))}% accuracy!</Text>
          {AIFrameVisible ? (
            <View style={{ height: GameFrameHeight, width: GameFrameWidth, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={GameData.heatmapFrame[levelNumber][RoundsCalculationMod(levelNumber, roundNumber)]}
                style={{ height: GameFrameHeight, width: GameFrameWidth, borderRadius: 40 }} />
              <Image source={require('../Assets/Images/crosshair.png')}
                style={[styles.crosshair,
                {
                  top: lastTouchY - windowWidth * 0.1 / 2,
                  left: lastTouchX - windowWidth * 0.1 / 2
                }]} />
            </View>
          ) : (
            <View>
              <Video source={GameData.heatmapVideo[levelNumber][RoundsCalculationMod(levelNumber, roundNumber)]}
                style={{ height: GameFrameHeight, width: GameFrameWidth, borderRadius: 40 }}
                controls={true}
                muted={true}
                fullscreenAutorotate={false}
                repeat={true}
              />
            </View>
          )}
        </View>
        <View style={lastScore >= roundPassLimit ? styles.animationGifHappy : styles.animationGifSad}>
          <Image source={lastScore >= roundPassLimit ? require('../Assets/Images/nurse-woman-cheering-stock-gifs.gif') : require('../Assets/Images/nurse-woman-crying-stock-gifs.gif')}
            rep
            style={{
              height: '100%',
              width: '100%',
              marginTop: 20,
            }}
          />
        </View>
        <View style={{ height: '100%', width: 250, marginLeft: 60 }}>
          <View style={[styles.levelNumber, { marginTop: 18, marginBottom: 5 }]}>
            <Text style={{ fontSize: 25, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Level {levelNumber}</Text>
            <Text style={{ fontSize: 25, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Round {roundNumber}</Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.gallbladdersContainer}>
              {arr.map(i => {
                return <Image key={i} source={i > bingoNumber ?
                  require('../Assets/Images/gallbladder-black.png') :
                  require('../Assets/Images/gallbladder-colorful.png')}
                  style={(i > bingoNumber) ? { height: 45, width: 45, tintColor: 'white' } : { height: 45, width: 45 }} />
              })
              }
            </View>
            <View style={{ marginTop: 10, }}>
              {AIFrameVisible ? (
                <View style={{ alignItems: 'center' }}>
                  <Icon reverse name="video" type="entypo" size={45} color="#edeeee" reverseColor="#ea685e"
                    onPress={() => {
                      setAIFrameVisible(false)
                      if (clickedOnVideo == false) {
                        setClickedOnVideo(true)
                        sendVideoClickFeedbackToServer(levelNumber, roundNumber, bingoNumber, lastScore, userToken)
                      }
                    }} />
                  <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Feedback</Text>
                </View>
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <Icon reverse name="image" type="entypo" size={45} color="#edeeee" reverseColor="#ea685e"
                    onPress={() => { setAIFrameVisible(true) }} />
                  <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Feedback</Text>
                </View>
              )}
            </View>
            <View style={{ marginTop: 0, }}>
              <View style={{ alignItems: 'center' }}>
                <Icon reverse name="arrow-right" type="fontisto" size={45} color="#5e9cea" reverseColor="#002e52"
                  onPress={() => GoToNextRound(navigation, bingoNumber, levelNumber, roundNumber)}
                />
                <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Next</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )

};

const sendVideoClickFeedbackToServer = (levelNumber, roundNumber, bingoNumber, lastScore, userToken) => {
  var formdata = new FormData();
  var responseStatus = 0
  formdata.append("nickname", userToken)
  formdata.append("screen", "feedback")
  formdata.append("lastScore", lastScore)
  formdata.append("levelNumber", levelNumber)
  formdata.append("roundNumber", roundNumber)
  formdata.append("bingoNumber", bingoNumber)
  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  fetch('https://users.encs.concordia.ca/~m_orooz/videoFeedback.php', requestOptions)
    .then(response => {
      responseStatus = response.status
    })
    .catch(error => {
      console.error('video click feedback sending to server ERROR. Http server request Error: ', error.toString());
    });
}

const GoToNextRound = (navigation, bingoNumber, levelNumber, roundNumber) => {
  //Going to next level

  //Practice
  if (levelNumber == 0 && roundNumber == 2) {
    let nextLevel = parseInt(levelNumber) + 1;
    AsyncStorage.setItem('levelNumber', String(nextLevel))
    AsyncStorage.setItem('roundNumber', "1")
    AsyncStorage.setItem('bingoNumber', "0")

    navigation.replace('RotatePhoneToPortrait')
  }
  else if (bingoNumber == 5) {
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
    justifyContent: "space-evenly",
    alignItems: "center",
    //padding: 20,
    flexDirection: 'row',
    flexGrow: 1,
    //backgroundColor: "#F5FCFF",
  },
  leftSideContainer: {
    height: '100%'
    //alignItems: "center",
  },
  IconsContainer: {
    borderWidth: 2,
    borderColor: 'dimgrey',
    borderRadius: 10,
    paddingBottom: 20,
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
    justifyContent: 'space-around',
  },
  video: {
    width: "100%",
    height: "100%",
  },
  scoreGif: {
    height: 300,
    width: 300,
    //resizeMode: 'cover',
    //position: 'absolute',
    marginTop: '30%',
    alignSelf: 'center',
  },
  animationGifSad: {
    width: '25%',
    height: '75%',
    position: 'absolute',
    left: '57%',
    bottom: '7%',
  },
  animationGifHappy: {
    width: '25%',
    height: '90%',
    position: 'absolute',
    left: '57%',
    bottom: '0.5%',
  },
  crosshair: {
    tintColor: 'silver',
    position: 'absolute',
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
  },
  scalpel: {
    position: 'absolute',
    height: windowWidth * 0.5,
    width: windowWidth * 0.5,
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
    //marginTop: 20,
  },
  ///////////// Modal styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
    backgroundColor: 'rgba(255, 255, 255,0.3)',
  },
  modalView: {
    flexDirection: 'row',
    backgroundColor: "white",
    borderRadius: 30,
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
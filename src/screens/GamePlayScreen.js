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
import AsyncStorage from '@react-native-async-storage/async-storage'
import GameData from '../helper/GameData'
import RoundsCalculationMod from '../helper/RoundsCalculationMod'


let OriginalFrameWidth = 1
let OriginalFrameHeight = 1
let OriginalFrameWidthOnHeightRatio = 1.0

let OverFrameWidth = windowWidth * 0.85 * 1.5
let OverFrameHeight = windowWidth * 0.85
let OverFrameWidthOnHeightRatio = OverFrameWidth / OverFrameHeight

let GameFrameWidth = 1
let GameFrameHeight = 1

var userToken = null
const roundPassLimit = 50
const arr = [1, 2, 3, 4, 5]

const GamePlayScreen = ({ navigation, route }) => {
  const [lastTouchX, setLastTouchX] = useState(null)
  const [lastTouchY, setLastTouchY] = useState(null)
  const [lastScore, setLastScore] = useState(null)
  const [quizVisible, setQuizVisible] = useState(true)
  const [modalConfVisible, setModalConfVisible] = useState(false)
  const [confidentLevel, setConfidentLevel] = useState(3)
  const [bingoNumber, setBingoNumber] = useState(null)
  const [timerCount, setTimerCount] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const { levelNumber, roundNumber } = route.params
  const [clickedOnVideo, setClickedOnVideo] = useState(false)


  let temp = Image.resolveAssetSource(GameData.heatmapFrame[levelNumber][RoundsCalculationMod(levelNumber, roundNumber)])
  OriginalFrameWidth = temp.width
  OriginalFrameHeight = temp.height
  OriginalFrameWidthOnHeightRatio = temp.width / temp.height

  if (OriginalFrameWidthOnHeightRatio >= OverFrameWidthOnHeightRatio) {
    GameFrameWidth = OverFrameWidth
    GameFrameHeight = OverFrameWidth / OriginalFrameWidthOnHeightRatio
  }
  else {
    GameFrameWidth = OverFrameHeight * OriginalFrameWidthOnHeightRatio
    GameFrameHeight = OverFrameHeight
  }

  handleConfidentLevel = number => setConfidentLevel(number + 1)

  useEffect(() => {
    //Timer count up
    let interval = setInterval(() => {
      setTimerCount(timerCount + 1)
    }, 1000)

    if (modalConfVisible == true)
      clearInterval(interval)

    return () => clearInterval(interval)
  }, [timerCount, modalConfVisible])

  useEffect(async () => {
    if (lastTouchX != null) {
      let currentScore = await ScoreCalculator(lastTouchX / GameFrameWidth, lastTouchY / GameFrameHeight, levelNumber, roundNumber, OriginalFrameWidth, OriginalFrameHeight)
      //console.log("##" + currentScore)
      setLastScore(currentScore)
    }
  }, [lastTouchX])

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((value) => {
      userToken = value
    })

    AsyncStorage.getItem('bingoNumber').then((value) => {
      setBingoNumber(parseInt(value))
    })
  }, [])
  return (
    <View style={{ backgroundColor: 'rgba(0,0,0,1)', flex: 1 }}>
      <View style={styles.container}>
        <View style={{ height: '100%' }}>
          <Text style={{ fontSize: 25, fontWeight: '600', color: 'rgb(243, 244, 244)', textAlign: 'center', marginVertical: 8 }}>Choose where to dissect next</Text>
          <View style={[styles.examContainer, { alignItems: 'center', justifyContent: 'center' }]}>
            {quizVisible ? (
              <View>
                <View>
                  <Image source={GameData.rawFrame[levelNumber][RoundsCalculationMod(levelNumber, roundNumber)]}
                    style={{ height: GameFrameHeight, width: GameFrameWidth, borderRadius: 40 }} />
                </View>
                <Image source={require('../Assets/Images/crosshair.png')}
                  style={[styles.crosshair,
                  {
                    top: lastTouchY == null ? 220 - windowWidth * 0.1 / 2 : lastTouchY - windowWidth * 0.1 / 2,
                    left: lastTouchX == null ? 300 - windowWidth * 0.1 / 2 : lastTouchX - windowWidth * 0.1 / 2
                  }]} />
                <Image source={require('../Assets/Images/scalpel.png')}
                  style={[styles.scalpel, {
                    top: lastTouchY == null ? 220 - 40 : lastTouchY - 40,
                    left: lastTouchX == null ? 300 + 5 : lastTouchX + 5
                  }]} />
                <View style={{ position: 'absolute', left: 0, top: 0, width: GameFrameWidth, height: GameFrameHeight }}
                  onTouchStart={(e) => {
                    setLastTouchX(e.nativeEvent.locationX)
                    setLastTouchY(e.nativeEvent.locationY)
                  }} />
              </View>
            ) : (
              <View>
                <Video source={GameData.rawVideo[levelNumber][RoundsCalculationMod(levelNumber, roundNumber)]}
                  style={{ height: GameFrameHeight, width: GameFrameWidth, borderRadius: 40 }}
                  controls={true}
                  muted={true}
                  fullscreenAutorotate={false}
                  repeat={true}
                />
              </View>
            )}
          </View>
        </View>
        <View style={{ height: '100%', width: 200 }}>
          <View style={[styles.levelNumber, { marginTop: 8 }]}>
            <Text style={{ fontSize: 25, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Level {levelNumber}</Text>
            <Text style={{ fontSize: 25, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Round {roundNumber}</Text>
          </View>
          <View style={[styles.IconsContainer, { alignItems: 'center', justifyContent: 'center' }]}>
            <View style={styles.gallbladdersContainer}>
              {arr.map(i => {
                return <Image key={i} source={i > bingoNumber ?
                  require('../Assets/Images/gallbladder-black.png') :
                  require('../Assets/Images/gallbladder-colorful.png')}
                  style={(i > bingoNumber) ? { height: 45, width: 45, tintColor: 'white' } : { height: 45, width: 45 }} />
              })
              }
            </View>

            <View style={styles.repeatIcon}>
              {quizVisible ? (
                <View style={{ alignItems: 'center' }}>
                  <Icon reverse name="video" type="entypo" size={45} color="#edeeee" reverseColor="#ea685e"
                    onPress={() => {
                      setQuizVisible(false)
                      if (clickedOnVideo == false) {
                        setClickedOnVideo(true)
                        sendVideoClickFeedbackToServer(levelNumber, roundNumber, bingoNumber)
                      }
                    }} />
                  <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Video</Text>
                </View>
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <Icon reverse name="hair-cross" type="entypo" size={45} color="#edeeee" reverseColor="#ea685e"
                    onPress={() => { setQuizVisible(true) }} />
                  <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Target</Text>
                </View>
              )}
            </View>
            <View style={styles.doneIcon}>
              <View style={{ alignItems: 'center' }}>
                <Icon reverse name="check" type="font-awesome" size={45} color="#5e9cea" reverseColor="#002e52"
                  disabled={!quizVisible || lastScore == null}
                  //onPress={() => { Alert.alert("Score: " + String(parseInt(lastScore)) + "%") }}
                  onPress={() => setModalConfVisible(true)}
                  disabledStyle={{ backgroundColor: '#636969' }}
                />
                <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Confirm</Text>
              </View>
            </View>
          </View>
        </View>
        <ExitButton navigation={navigation} backLocationString="MainTab" />
      </View>
      <Modal
        supportedOrientations={['landscape-right']}
        animationType='slide'
        transparent={true}
        visible={modalConfVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <BackButton onPress={() => setModalConfVisible(!modalConfVisible)} />
            <EmojiFeedback onSetConfidentLevel={this.handleConfidentLevel} />
            <TouchableOpacity
              style={styles.buttonNext}
              //onPress={() => setModalConfVisible(!modalConfVisible)}
              onPress={() => GoToFeedbackScreen(navigation, lastScore, lastTouchX, lastTouchY, confidentLevel, levelNumber, roundNumber, bingoNumber, timerCount)}
            >
              <Text style={styles.textStyle}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </View >
  )

};
const sendVideoClickFeedbackToServer = (levelNumber, roundNumber, bingoNumber) => {
  var formdata = new FormData();
  var responseStatus = 0
  formdata.append("nickname", userToken)
  formdata.append("screen", "game")
  formdata.append("lastScore", 0)
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

// FeedBack Screen & Go to next Round
const GoToFeedbackScreen = (navigation, lastScore, lastTouchX, lastTouchY, confidentLevel, levelNumber, roundNumber, bingoNumber, timerCount) => {
  // next round
  let nextRound = parseInt(roundNumber) + 1;
  AsyncStorage.setItem('roundNumber', String(nextRound))

  // bingo plus
  if (lastScore >= roundPassLimit) {
    bingoNumber += 1;
    AsyncStorage.setItem('bingoNumber', String(bingoNumber))
  }
  else {
    AsyncStorage.setItem('bingoNumber', "0")
  }

  // Send the record to server
  sendRecordToServer(lastScore, lastTouchX, lastTouchY, confidentLevel, levelNumber, roundNumber, bingoNumber, timerCount)

  navigation.replace('Feedback', { lastScore, lastTouchX, lastTouchY, levelNumber, roundNumber, GameFrameWidth, GameFrameHeight, userToken })
}
const sendRecordToServer = (lastScore, lastTouchX, lastTouchY, confidentLevel, levelNumber, roundNumber, bingoNumber, timerCount) => {
  var formdata = new FormData();
  var responseStatus = 0
  formdata.append("nickname", userToken)
  formdata.append("lastScore", lastScore)
  formdata.append("lastTouchX", lastTouchX / GameFrameWidth)
  formdata.append("lastTouchY", lastTouchY / GameFrameHeight)
  formdata.append("confidentLevel", confidentLevel)
  formdata.append("levelNumber", levelNumber)
  formdata.append("roundNumber", roundNumber)
  formdata.append("bingoNumber", bingoNumber)
  formdata.append("timerCount", timerCount)
  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  fetch('https://users.encs.concordia.ca/~m_orooz/new-record.php', requestOptions)
    .then(response => {
      responseStatus = response.status
    })
    .catch(error => {
      console.error('record sending to server ERROR. Http server request Error: ', error.toString());
    });
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
  examContainer: {
    height: OverFrameHeight,
    width: OverFrameWidth,
  },
  levelNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  crosshair: {
    tintColor: 'white',
    position: 'absolute',
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
  },
  scalpel: {
    position: 'absolute',
    height: windowWidth * 0.5,
    width: windowWidth * 0.5,
  },
  IconsContainer: {
    height: OverFrameHeight,
  },
  repeatIcon: {
    marginTop: 10,
  },
  doneIcon: {
    marginTop: 5,
  },
  textOnFrame: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    fontSize: 18,
    textAlign: 'center',
    color: '#10313c',
    fontWeight: '700',
    fontFamily: 'Avenir',
    backgroundColor: 'rgba(235, 246, 250,0.8)'
  },
  gallbladdersContainer: {
    flexDirection: 'row',
    marginTop: 0,
  },
  ///////////// Modal styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(215, 237, 244,0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
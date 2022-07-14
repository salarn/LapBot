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

const frameWidth = windowWidth * 0.8 * 1.25
const frameHeight = windowWidth * 0.8

const GamePlayScreen = ({ navigation, route }) => {
  const [lastTouchX, setLastTouchX] = useState(null)
  const [lastTouchY, setLastTouchY] = useState(null)
  const [lastScore, setLastScore] = useState(null)
  const [quizVisible, setQuizVisible] = useState(true)
  const [modalConfVisible, setModalConfVisible] = useState(false);
  const { levelNumber, roundNumber } = route.params

  useEffect(async () => {
    if (lastTouchX != null) {
      let currentScore = await ScoreCalculator(lastTouchX / frameWidth, lastTouchY / frameHeight)
      setLastScore(currentScore)
    }
  })
  return (
    <ImageBackground
      source={require('../Assets/Images/background-gameplay.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <ExitButton navigation={navigation} backLocationString="MainTab" />
        <View>
          <View style={styles.levelNumber}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'dimgrey' }}>Level   {levelNumber}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'dimgrey' }}>Round   {roundNumber}</Text>
          </View>
          <View style={styles.examContainer}>
            {quizVisible ? (
              <View>
                <View onTouchStart={(e) => {
                  setLastTouchX(e.nativeEvent.locationX)
                  setLastTouchY(e.nativeEvent.locationY)
                }}
                >
                  <Image source={require('../Assets/GameData/1.0-image-clean.jpg')}
                    style={styles.frame} />
                </View>
                {lastScore == null &&
                  <Text style={styles.textOnFrame}>Choose a target point by clicking on this image</Text>
                }
                <Image source={require('../Assets/Images/crosshair.png')}
                  style={[styles.crosshair,
                  {
                    top: lastTouchY == null ? 200 - windowWidth * 0.1 / 2 : lastTouchY - windowWidth * 0.1 / 2,
                    left: lastTouchX == null ? 250 - windowWidth * 0.1 / 2 : lastTouchX - windowWidth * 0.1 / 2
                  }]} />
                <Image source={require('../Assets/Images/scalpel.png')}
                  style={[styles.scalpel, {
                    top: lastTouchY == null ? 200 + windowWidth * 0.1 / 3 : lastTouchY + windowWidth * 0.1 / 3,
                    left: lastTouchX == null ? 250 + windowWidth * 0.1 / 3 : lastTouchX + windowWidth * 0.1 / 3
                  }]} />

              </View>
            ) : (
              <View>
                <Video source={require('../Assets/Videos/1.0-video-clean.mp4')}
                  style={styles.video}
                  controls={true}
                  muted={true}
                  fullscreenAutorotate={false}
                  repeat={true}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.IconsContainer}>
          <View style={styles.doneIcon}>
            <Icon reverse color="#0ca284" name="check" type="font-awesome" size={50}
              disabled={!quizVisible || lastScore == null}
              //onPress={() => { Alert.alert("Score: " + String(parseInt(lastScore)) + "%") }}
              onPress={() => setModalConfVisible(true)}
            />
            <Text style={{ alignSelf: 'center', marginTop: 6, fontSize: 15, fontWeight: 'bold' }}>Confirm</Text>
          </View>
          <View style={styles.repeatIcon}>
            {quizVisible ? (
              <View>
                <Icon reverse name="video" type="entypo" size={50} onPress={() => { setQuizVisible(false) }} />
                <Text style={{ alignSelf: 'center', marginTop: 6, fontSize: 15, fontWeight: 'bold' }}>Play the Video</Text>
              </View>
            ) : (
              <View>
                <Icon reverse name="hair-cross" type="entypo" size={50} onPress={() => { setQuizVisible(true) }} />
                <Text style={{ alignSelf: 'center', marginTop: 6, fontSize: 15, fontWeight: 'bold' }}>Choose a Target</Text>
              </View>
            )}
          </View>
        </View>
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
            <EmojiFeedback />
            <TouchableOpacity
              style={styles.buttonNext}
              //onPress={() => setModalConfVisible(!modalConfVisible)}
              onPress={() => GoToFeedbackScreen(navigation, lastScore, lastTouchX, lastTouchY, roundNumber, levelNumber)}
            >
              <Text style={styles.textStyle}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </ImageBackground>
  )

};

// FeedBack Screen & Go to next Round
const GoToFeedbackScreen = (navigation, lastScore, lastTouchX, lastTouchY, roundNumber, levelNumber) => {
  let nextRound = parseInt(roundNumber) + 1;
  AsyncStorage.setItem('roundNumber', String(nextRound))

  navigation.replace('Feedback', { lastScore, lastTouchX, lastTouchY, roundNumber, levelNumber })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    flexDirection: 'row',
    flexGrow: 20,
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
    height: frameHeight,
    width: frameWidth,
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
  crosshair: {
    tintColor: 'white',
    position: 'absolute',
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
  },
  scalpel: {
    tintColor: 'white',
    position: 'absolute',
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
  },
  IconsContainer: {
    height: '100%',
    width: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginRight: -60,
  },
  repeatIcon: {
    flex: 1,
  },
  doneIcon: {
    flex: 1,
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
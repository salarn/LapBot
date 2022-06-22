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

const frameWidth = windowWidth * 0.8 * 1.25
const frameHeight = windowWidth * 0.8

const GamePlayScreen = ({ navigation }) => {
  const [isPaused, setIsPaused] = useState(false)
  const [lastTouchX, setLastTouchX] = useState(40)
  const [lastTouchY, setLastTouchY] = useState(40)
  const [lastScore, setLastScore] = useState(0)
  const [quizVisible, setQuizVisible] = useState(true)
  const [modalConfVisible, setModalConfVisible] = useState(false);

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
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'dimgrey' }}>Level 1</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'dimgrey' }}>Round 1</Text>
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
                <Image source={require('../Assets/Images/crosshair.png')}
                  style={[styles.crosshair, { top: lastTouchY - windowWidth * 0.1 / 2, left: lastTouchX - windowWidth * 0.1 / 2 }]} />
                <Image source={require('../Assets/Images/scalpel.png')}
                  style={[styles.scalpel, { top: lastTouchY + windowWidth * 0.1 / 3, left: lastTouchX + windowWidth * 0.1 / 3 }]} />

              </View>
            ) : (
              <View>
                <Video source={require('../Assets/Videos/1.0-video-clean.mp4')}
                  style={styles.video}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.IconsContainer}>
          <View style={styles.doneIcon}>
            <Icon reverse color="#0ca284" name="check" type="font-awesome" size={50}
              disabled={!quizVisible}
              //onPress={() => { Alert.alert("Score: " + String(parseInt(lastScore)) + "%") }}
              onPress={() => setModalConfVisible(true)}
            />
            <Text style={{ alignSelf: 'center', marginTop: 6, fontSize: 15, fontWeight: 'bold' }}>Confirm</Text>
          </View>
          <View style={styles.repeatIcon}>
            {quizVisible ? (
              <View>
                <Icon reverse name="video" type="entypo" size={50} onPress={() => { setQuizVisible(false) }} />
                <Text style={{ alignSelf: 'center', marginTop: 6, fontSize: 15, fontWeight: 'bold' }}>Video</Text>
              </View>
            ) : (
              <View>
                <Icon reverse name="game-controller" type="entypo" size={50} onPress={() => { setQuizVisible(true) }} />
                <Text style={{ alignSelf: 'center', marginTop: 6, fontSize: 15, fontWeight: 'bold' }}>Game</Text>
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
              onPress={() => setModalConfVisible(!modalConfVisible)}
            >
              <Text style={styles.textStyle}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    </ImageBackground>
  )

};

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
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

var userToken = null

const NextLevelScreen = ({ route, navigation }) => {
  const { levelNumber } = route.params
  const [modalConfVisible, setModalConfVisible] = useState(false)
  const [rankList, setRankList] = useState(null)
  const [currentUserScore, setCurrentUserScore] = useState(null)
  const [currentUserRank, setCurrentUserRank] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((value) => {
      userToken = value
    })
    loadSemiLeaderboardData(setRankList, setCurrentUserScore, setCurrentUserRank, levelNumber)
  }, [])

  return (
    <ImageBackground
      source={require('../Assets/Images/background-gameplay.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.congratsText}>Congrats on passing level {levelNumber}{'\n'}Your score was {currentUserScore ? currentUserScore.toFixed(0) : "--"}</Text>
          <Image source={require('../Assets/Images/trophy-onboarding.gif')}
            style={styles.congratsGif} />
        </View>
        <View>
          <View style={styles.IconsContainer}>
            <View style={styles.frameIcon}>
              <Icon reverse color="#972ba1" name="leaderboard" type="MaterialIcons" size={50}
                onPress={() => {

                  setModalConfVisible(!modalConfVisible)
                }}
              />
              <Text style={{ alignSelf: 'center', marginTop: 6, fontSize: 15, fontWeight: 'bold' }}>Mini LeaderBoard</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.ContinueButtonNext}
            onPress={() => { navigation.replace('RotatePhoneToPortrait') }}>
            <Text style={styles.ContinueTextStyle}>Continue</Text>
          </TouchableOpacity>
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
            <RankListReactComponant rankList={rankList} currentUserRank={currentUserRank} currentUserScore={currentUserScore} levelNumber={levelNumber} />
          </View>
        </View>

      </Modal>
    </ImageBackground >
  )

};

const RankListReactComponant = (props) => {
  const { rankList, currentUserRank, currentUserScore, levelNumber } = props
  let firstThreeUsers = []
  let medalImages = [
    require('../Assets/Images/medal1.png'),
    require('../Assets/Images/medal2.png'),
    require('../Assets/Images/medal3.png')
  ]
  for (let i = 0; i < 3; i++) {
    if (rankList.length <= i)
      firstThreeUsers.push(["-----", 0.00])
    else
      firstThreeUsers.push(rankList[i])
  }
  return (
    <View style={{ alignItems: 'center', }}>
      <Text style={{ marginBottom: 20, fontSize: 30 }}>Level {levelNumber}'s Leaderboard </Text>
      <Image source={require('../Assets/Images/Podium2.png')}
        style={styles.leaderBoardPNG} />
      <View style={{ borderWidth: 1, height: '60%', width: '100%', borderRadius: 15, paddingTop: 10 }}>
        {firstThreeUsers.map((oneUser, index) =>
          <View style={{ flexDirection: 'row', flex: 2 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Image source={medalImages[index]} style={{ height: 35, width: 21 }} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon color="#3fb3e6" name="user-md" type="font-awesome" size={25} />
            </View>
            <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={{ marginLeft: 20 }}>{oneUser[0]}</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: "#32815c" }}>{oneUser[1].toFixed(2)} xp</Text>
            </View>
          </View>
        )}
        <View style={{ flex: 3, }}>
          <View style={{ borderWidth: 1, flexDirection: 'row', flex: 1, marginTop: 10, borderRadius: 15, backgroundColor: "rgba(253, 236, 59,0.5)" }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Text>{currentUserRank}.</Text>
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ marginLeft: 20 }}>{userToken} (You)</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: "#32815c" }}>{currentUserScore.toFixed(2)} xp</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const loadSemiLeaderboardData = (setRankList, setCurrentUserScore, setCurrentUserRank, levelNumber) => {
  let recordsObjs = []
  fetch(`https://users.encs.concordia.ca/~m_orooz/levels/${levelNumber}.txt`)
    .then(response => response.text()).then(data => {
      let lines = data.split('\n')
      for (let i = 0; i < lines.length - 1; i++) {
        let line = lines[i]
        //jsonStr = "{"
        let obj = {}
        let words = line.split("&")
        for (let i = 0; i < words.length; i++) {
          let keyValue = words[i]
          let split = keyValue.split('=')
          if (split[0] == "ip") {
            continue;
          }
          //jsonStr += "\"" + split[0] + "\"" + ":" + "\"" + split[1] + "\"" + ","
          let key = split[0]
          let value = split[1]
          obj[key] = value
        }
        recordsObjs.push(obj)
      }
      processingRecordsData(recordsObjs, setRankList, setCurrentUserScore, setCurrentUserRank)
    })
}
const processingRecordsData = (recordsObjs, setRankList, setCurrentUserScore, setCurrentUserRank) => {
  let finishedLevel = {}
  let sumScores = {}
  let roundCounter = {}

  // set initial values
  for (let i = 0; i < recordsObjs.length; i++) {
    let userNickname = recordsObjs[i]["nickname"]
    finishedLevel[userNickname] = false
    sumScores[userNickname] = 0.0
    roundCounter[userNickname] = 0.0
  }
  // create the list
  for (let i = 0; i < recordsObjs.length; i++) {
    let userNickname = recordsObjs[i]["nickname"]
    let userScore = recordsObjs[i]["lastScore"]
    let recordBingoNum = recordsObjs[i]["bingoNumber"]
    let recordTimer = recordsObjs[i]["timerCount"]

    if (recordBingoNum == 5)
      finishedLevel[userNickname] = true

    sumScores[userNickname] += parseFloat(userScore) - (parseFloat(recordTimer) / 6.0)
    roundCounter[userNickname] += 1
  }

  let listOfUsers = Object.keys(finishedLevel)
  // normalize the scores
  for (let i = 0; i < listOfUsers.length; i++) {
    let userNickname = listOfUsers[i]
    sumScores[userNickname] /= roundCounter[userNickname]
  }

  let finalRankList = {}
  for (let i = 0; i < listOfUsers.length; i++) {
    let userNickname = listOfUsers[i]
    if (finishedLevel[userNickname] == true)
      finalRankList[userNickname] = sumScores[userNickname]
  }
  let sortedUserNames = Object.keys(finalRankList).sort(function (a, b) { return finalRankList[b] - finalRankList[a] })
  let result = []
  for (let i = 0; i < sortedUserNames.length; i++) {
    result.push([sortedUserNames[i], sumScores[sortedUserNames[i]]])
    if (sortedUserNames[i] == userToken)
      setCurrentUserRank(i + 1)
  }
  setRankList(result)
  setCurrentUserScore(sumScores[userToken])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    flexDirection: 'row',
    flexGrow: 20,
  },
  leftContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  congratsText: {
    fontSize: 35,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    color: '#0ca284',
    lineHeight: 50,
  },
  congratsGif: {
    width: 200,
    height: 200,
    marginTop: 0,
    marginBottom: -10
  },
  IconsContainer: {
    justifyContent: 'space-evenly',
  },
  frameIcon: {
    //flex: 1,
    alignItems: 'center',
  },
  ContinueButtonNext: {
    width: 180,
    marginTop: 80,
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#ffc702",
  },
  ContinueTextStyle: {
    color: "#003c4d",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
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
  leaderBoardPNG: {
    width: 150,
    height: 60,
    marginTop: 0,
  },
})

export default NextLevelScreen;
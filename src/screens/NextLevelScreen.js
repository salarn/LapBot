import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
  ActivityIndicator,
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
import { Rating, AirbnbRating } from 'react-native-ratings'

var userToken = null

const NextLevelScreen = ({ route, navigation }) => {
  const { levelNumber } = route.params
  const [modalConfVisible, setModalConfVisible] = useState(false)
  const [rankList, setRankList] = useState(null)
  const [currentUserScore, setCurrentUserScore] = useState(null)
  const [currentUserRank, setCurrentUserRank] = useState(null)
  const [firstFeedbackStar, setFirstFeedbackStar] = useState(3)
  const [secondFeedbackStar, setSecondFeedbackStar] = useState(3)
  const [thirdFeedbackStar, setThirdFeedbackStar] = useState(3)

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((value) => {
      userToken = value
    })
    loadSemiLeaderboardData(setRankList, setCurrentUserScore, setCurrentUserRank, levelNumber)
  }, [])

  if (rankList == null) {
    return (
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: 'rgba(0,0,0,1)', flex: 1 }}>
      <View style={styles.container}>
        <View style={{ height: '30%', justifyContent: 'center' }}>

          <Text style={[styles.congratsText, {
            shadowColor: '#55bf99',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 4,
          }]}>Level {levelNumber} completed</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.leftContainer}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', marginRight: '35%' }}>
              <RankListReactComponant rankList={rankList} currentUserRank={currentUserRank} currentUserScore={currentUserScore} levelNumber={levelNumber} />
            </View>
          </View>
          <View style={{ justifyContent: 'flex-end', paddingBottom: '6%' }}>
            <View style={{ alignItems: 'center' }}>
              <Icon reverse name="arrow-right" type="fontisto" size={45} color="#5e9cea" reverseColor="#002e52"
                onPress={() => {
                  if (levelNumber == 2)
                    setModalConfVisible(!modalConfVisible)
                  else
                    navigation.replace('RotatePhoneToPortrait')
                }}
              //onPress={() => setModalConfVisible(!modalConfVisible)}
              />
              <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '600', color: 'rgb(243, 244, 244)' }}>Next level</Text>
            </View>
          </View>
        </View>
        <View style={styles.animationGif}>
          <Image source={require('../Assets/Images/nurse-woman-happy-jump-stock-gifs.gif')}
            rep
            style={{
              height: '100%',
              width: '100%',
              marginTop: 20,
            }}
          />
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
            <Text style={{ fontSize: 35, color: '#525b60', marginBottom: 20 }}>Quick survey</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
              <View style={{ width: '70%' }}>
                <Text style={{ fontSize: 22, color: '#525b60', paddingBottom: 20 }}>LapBot is a fun way to learn about safe cholescystectomy:</Text>
              </View>
              <View style={{ width: '20%', bottom: '3%' }}>
                <AirbnbRating
                  count={5}
                  reviews={[]}
                  defaultRating={3}
                  onFinishRating={(rate) => setFirstFeedbackStar(rate)}
                  size={25}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
              <View style={{ width: '70%' }}>
                <Text style={{ fontSize: 22, color: '#525b60', paddingBottom: 20 }}>The feedbacks (videos/images) are helpful for learning:</Text>
              </View>
              <View style={{ width: '20%', bottom: '3%' }}>
                <AirbnbRating
                  count={5}
                  reviews={[]}
                  defaultRating={3}
                  onFinishRating={(rate) => setSecondFeedbackStar(rate)}
                  size={25}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: '70%' }}>
                <Text style={{ fontSize: 22, color: '#525b60', paddingBottom: 20 }}>Game elements (scores, leaderboards, consecutive gallbladders, etc) encourage me to play more:</Text>
              </View>
              <View style={{ width: '20%', bottom: '3%' }}>
                <AirbnbRating
                  count={5}
                  reviews={[]}
                  defaultRating={3}
                  onFinishRating={(rate) => setThirdFeedbackStar(rate)}
                  size={25}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() => {
                submitFeedbackDataToServer(firstFeedbackStar, secondFeedbackStar, thirdFeedbackStar)
                setModalConfVisible(!modalConfVisible)
                sleep(500).then(() => {
                  navigation.replace('RotatePhoneToPortrait')
                })
              }}
            >
              <Text style={styles.modalButtonTextStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View >
  )

};
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time)
  )
}

const submitFeedbackDataToServer = (firstFeedbackStar, secondFeedbackStar, thirdFeedbackStar) => {
  var formdata = new FormData();
  var responseStatus = 0
  formdata.append("nickname", userToken)
  formdata.append("firstFeedbackStar", firstFeedbackStar)
  formdata.append("secondFeedbackStar", secondFeedbackStar)
  formdata.append("thirdFeedbackStar", thirdFeedbackStar)
  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  fetch('https://users.encs.concordia.ca/~m_orooz/survey.php', requestOptions)
    .then(response => {
      responseStatus = response.status
    })
    .catch(error => {
      console.error('survey records sending to server get ERROR. Http server request Error: ', error.toString());
    });
}

const RankListReactComponant = (props) => {
  const { rankList, currentUserRank, currentUserScore, levelNumber } = props
  let firstThreeUsers = []
  let medalImages = [
    require('../Assets/Images/medal1.png'),
    require('../Assets/Images/medal2.png'),
    require('../Assets/Images/medal3.png')
  ]

  let miniLeaderboardAddresses = [
    require('../Assets/Images/miniLeaderboard1.png'),
    require('../Assets/Images/miniLeaderboard2.png'),
    require('../Assets/Images/miniLeaderboard3.png'),
    require('../Assets/Images/miniLeaderboard4.png'),
    require('../Assets/Images/miniLeaderboard5.png'),
    require('../Assets/Images/miniLeaderboard6.png')
  ]

  for (let i = 0; i < 3; i++) {
    if (rankList.length <= i)
      firstThreeUsers.push(["-----", 0.00])
    else
      firstThreeUsers.push(rankList[i])
  }
  return (
    <View style={{ alignItems: 'center', height: '100%', width: '50%' }}>
      <Text style={{ fontSize: 20, alignSelf: 'center', textAlign: 'center', fontWeight: '600', color: 'rgb(243, 244, 244)', marginTop: -5, marginBottom: 5 }}>Leaderboard</Text>
      <View style={{ borderWidth: 5, height: '70%', width: '100%', borderRadius: 20, paddingTop: 10, borderColor: '#5e9cea', backgroundColor: 'rgb(243, 244, 244)' }}>
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
          <View style={{ borderWidth: 1, flexDirection: 'row', flex: 1, marginTop: 10, borderRadius: 15, backgroundColor: "#28588a", borderColor: '#5e9cea' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ color: 'rgb(243, 244, 244)', }}>{currentUserRank}.</Text>
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'rgb(243, 244, 244)', marginLeft: 20 }}>{userToken} (You)</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'rgb(243, 244, 244)', }}>{currentUserScore != null ? currentUserScore.toFixed(2) : "0.00"} xp</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const loadSemiLeaderboardData = (setRankList, setCurrentUserScore, setCurrentUserRank, levelNumber) => {
  let recordsObjs = []
  fetch(`https://users.encs.concordia.ca/~m_orooz/levels/${levelNumber}.txt`, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }).then(response => response.text()).then(data => {
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

    //DELETE TIMER let recordTimer = recordsObjs[i]["timerCount"]

    if (recordBingoNum == 5)
      finishedLevel[userNickname] = true

    sumScores[userNickname] += parseFloat(userScore)
    //DELETE TIMER sumScores[userNickname] += parseFloat(userScore) - (parseFloat(recordTimer) / 6.0)
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
  animationGif: {
    width: '30%',
    height: '90%',
    position: 'absolute',
    left: '50%'
  },
  container: {
    flex: 1,
    alignItems: "center",
    //padding: 20,
    //flexDirection: 'row',
    flexGrow: 1,
  },
  leftContainer: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  congratsText: {
    fontSize: 45,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
  },
  congratsGif: {
    width: 200,
    height: '80%',
    //marginTop: -20,
    //marginBottom: -10
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
    //flexDirection: 'row',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    //paddingHorizontal: 70,
    paddingLeft: 30,
    paddingRight: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalButtonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  buttonNext: {
    marginTop: 0,
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 30,
    backgroundColor: "#5e9cea",
  },
  leaderBoardPNG: {
    width: 150,
    height: 60,
    marginTop: 0,
    marginBottom: 10,
  },
})

export default NextLevelScreen;
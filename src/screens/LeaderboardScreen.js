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
  Modal,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from 'react-native-elements'
import { BackButton, ExitButton } from '@/Components';

var userToken = null

const LeaderboardScreen = ({ navigation }) => {
  const [rankList, setRankList] = useState(null)
  const [currentUserScore, setCurrentUserScore] = useState(null)
  const [currentUserRank, setCurrentUserRank] = useState(null)
  const [currentUserLevelNumber, setCurrentUserLevelNumber] = useState(null)

  const [modalConfVisible, setModalConfVisible] = useState(false)
  const [modalLevelNumber, setModalLevelNumber] = useState(1)
  const [modalRankList, setModalRankList] = useState(null)
  const [modalCurrentUserScore, setModalCurrentUserScore] = useState(null)
  const [modalCurrentUserRank, setModalCurrentUserRank] = useState(null)

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      setRankList(null)
      loadGeneralLeaderboardData(setRankList, setCurrentUserScore, setCurrentUserRank)
    });

    AsyncStorage.getItem('levelNumber').then((value) => {
      if (value == null) {
        setCurrentUserLevelNumber(1)
      } else {
        setCurrentUserLevelNumber(parseInt(value))
      }
    })

    return unsubscribe;
  }, [navigation])
  useEffect(() => {
    AsyncStorage.getItem('userToken').then((value) => {
      userToken = value
    })
    loadGeneralLeaderboardData(setRankList, setCurrentUserScore, setCurrentUserRank)
  }, [])

  if (rankList == null) {
    return (
      <ImageBackground
        source={require('../Assets/Images/backgroundLeaderboard.png')}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      </ImageBackground>
    )
  }

  let firstThreeUsers = []
  let forthToTenthUsers = []
  let levels123 = [1, 2, 3]
  let levels456 = [4, 5, 6]
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
  for (let i = 3; i < 10; i++) {
    if (rankList.length <= i)
      forthToTenthUsers.push(["-----", 0.00])
    else
      forthToTenthUsers.push(rankList[i])
  }

  return (
    <ImageBackground
      source={require('../Assets/Images/backgroundLeaderboard.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { justifyContent: 'flex-end' }]}>
        <Image source={require('../Assets/Images/leaderboardPodiumGeneral.png')}
          style={styles.leaderBoardPNG} />
        <Image source={require('../Assets/Images/leaderboardText2.png')}
          style={{ width: 300, height: 47, marginBottom: 15 }} />
        <View style={{ flexDirection: 'row', width: '80%' }}>
          <Text style={{ position: 'absolute', left: '3%' }}>Rank</Text>
          <Text style={{ position: 'absolute', left: '27%' }}>Name</Text>
          <Text style={{ position: 'absolute', left: '62%' }}>Level</Text>
          <Text style={{ position: 'absolute', left: '82%' }}>Score</Text>
        </View>
        <View style={{ borderWidth: 1, height: '40%', width: '80%', borderRadius: 16, paddingTop: 10, marginTop: 20 }}>
          <ScrollView style={{ flex: 1 }}>
            {firstThreeUsers.map((oneUser, index) =>
              <View style={{ flexDirection: 'row', height: 35 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                  <Image source={medalImages[index]} style={{ height: '85%', width: 18 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon color="#3fb3e6" name="user-md" type="font-awesome" size={25} />
                </View>
                <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ marginLeft: 10, paddingRight: 10 }}>{oneUser[0]}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', }}>
                  <Text>{oneUser[2]}</Text>
                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: "#32815c" }}>{oneUser[1].toFixed(0)} xp</Text>
                </View>
              </View>
            )}
            {forthToTenthUsers.map((oneUser, index) =>
              <View style={{ flexDirection: 'row', height: 35 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                  <Text style={{ fontSize: 15 }}>{index + 4}.</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon color="#3fb3e6" name="user-md" type="font-awesome" size={25} />
                </View>
                <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ marginLeft: 10, paddingRight: 10 }}>{oneUser[0]}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text>{oneUser[2]}</Text>
                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: "#32815c" }}>{oneUser[1].toFixed(0)} xp</Text>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={{ borderWidth: 1, flexDirection: 'row', height: 50, borderRadius: 15, backgroundColor: "rgba(253, 236, 59,0.5)" }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: 15 }}>{currentUserRank != null ? currentUserRank + "." : "--"}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon color="#3fb3e6" name="user-md" type="font-awesome" size={25} />
            </View>
            <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={{ marginLeft: 10, paddingRight: 10 }}>{userToken} (You)</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text>{currentUserLevelNumber}</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: "#32815c" }}>{currentUserScore != null ? currentUserScore.toFixed(0) : "0"} xp</Text>
            </View>
          </View>

        </View>
        <View style={{ height: '10%', width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {levels123.map((levelNumber) =>
            <TouchableOpacity style={styles.levelButtonContainer} onPress={() => {
              setModalRankList(null)
              setModalLevelNumber(levelNumber)
              setModalCurrentUserScore(null)
              setModalCurrentUserRank(null)
              loadSemiLeaderboardData(setModalRankList, setModalCurrentUserScore, setModalCurrentUserRank, levelNumber)
              setModalConfVisible(!modalConfVisible)
            }}>
              <Text style={styles.levelButtonText}>Level {levelNumber}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ height: '10%', width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          {levels456.map((levelNumber) =>
            <TouchableOpacity style={styles.levelButtonContainer} onPress={() => {
              setModalRankList(null)
              setModalLevelNumber(levelNumber)
              setModalCurrentUserScore(null)
              setModalCurrentUserRank(null)
              loadSemiLeaderboardData(setModalRankList, setModalCurrentUserScore, setModalCurrentUserRank, levelNumber)
              setModalConfVisible(!modalConfVisible)
            }}>
              <Text style={styles.levelButtonText}>Level {levelNumber}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal
        supportedOrientations={['portrait']}
        animationType='slide'
        transparent={true}
        visible={modalConfVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MiniRankListReactComponant rankList={modalRankList} currentUserRank={modalCurrentUserRank} currentUserScore={modalCurrentUserScore} levelNumber={modalLevelNumber} />
            <BackButton onPress={() => setModalConfVisible(!modalConfVisible)} />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  leaderBoardPNG: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(127, 209, 155,0.4)',
  },
  modalView: {
    //flexDirection: 'row',
    height: '50%',
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    //paddingHorizontal: 10,
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
  levelButtonContainer: {
    width: '28%',
    height: '70%',
    backgroundColor: '#7fd19b',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
  },
  levelButtonText: {
    fontSize: 18,
    //fontWeight: 'bold',
    color: '#595959',
  }
})


const MiniRankListReactComponant = (props) => {
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

  if (rankList == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  for (let i = 0; i < 3; i++) {
    if (rankList.length <= i)
      firstThreeUsers.push(["-----", 0.00])
    else
      firstThreeUsers.push(rankList[i])
  }
  return (
    <View style={{ alignItems: 'center', }}>
      <Image source={require('../Assets/Images/Podium2.png')}
        style={{ width: 170, height: 70, marginBottom: 10, }} />
      <Image source={miniLeaderboardAddresses[levelNumber - 1]}
        style={{ width: 210, height: 40, marginBottom: 5 }} />
      <View style={{ borderWidth: 1, height: '60%', width: '100%', borderRadius: 16, paddingTop: 10, }}>
        {firstThreeUsers.map((oneUser, index) =>
          <View style={{ flexDirection: 'row', height: '25%', width: '100%' }}>
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
        <View style={{ borderWidth: 1, flexDirection: 'row', height: '25%', borderRadius: 15, backgroundColor: "rgba(253, 236, 59,0.5)", }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text>{currentUserRank != null ? currentUserRank + "." : "--"}</Text>
          </View>
          <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginLeft: 20 }}>{userToken} (You)</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: "#32815c" }}>{currentUserScore != null ? currentUserScore.toFixed(2) : "0.00"} xp</Text>
          </View>

        </View>
      </View>
    </View>
  )
}


const loadGeneralLeaderboardData = (setRankList, setCurrentUserScore, setCurrentUserRank) => {
  let recordsObjs = []
  fetch('https://users.encs.concordia.ca/~m_orooz/all-record.txt', {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }).then(response => response.text()).then(data => {
    let lines = data.split('\n')
    for (let i = 0; i < lines.length - 1; i++) {
      let line = lines[i]
      let obj = {}
      let words = line.split("&")
      for (let i = 0; i < words.length; i++) {
        let keyValue = words[i]
        let split = keyValue.split('=')
        if (split[0] == "ip") {
          continue;
        }
        let key = split[0]
        let value = split[1]
        obj[key] = value
      }
      recordsObjs.push(obj)
    }
    genreralProcessingRecordsData(recordsObjs, setRankList, setCurrentUserScore, setCurrentUserRank)
  })
}

const genreralProcessingRecordsData = (recordsObjs, setRankList, setCurrentUserScore, setCurrentUserRank) => {
  let finishedLevel = {}
  let sumScores = {}
  let roundCounter = {}

  // set initial values
  for (let i = 0; i < recordsObjs.length; i++) {
    let userNickname = recordsObjs[i]["nickname"]
    finishedLevel[userNickname] = [false, false, false, false, false, false]
    sumScores[userNickname] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    roundCounter[userNickname] = [0, 0, 0, 0, 0, 0]
  }
  // create the list
  for (let i = 0; i < recordsObjs.length; i++) {
    let userNickname = recordsObjs[i]["nickname"]
    let recordLevelNumber = recordsObjs[i]["levelNumber"]
    let userScore = recordsObjs[i]["lastScore"]
    let recordBingoNum = recordsObjs[i]["bingoNumber"]
    //let recordTimer = recordsObjs[i]["timerCount"]

    if (recordBingoNum == 5)
      finishedLevel[userNickname][recordLevelNumber] = true

    //sumScores[userNickname][recordLevelNumber] += parseFloat(userScore) - (parseFloat(recordTimer) / 6.0)
    sumScores[userNickname][recordLevelNumber] += parseFloat(userScore)
    roundCounter[userNickname][recordLevelNumber] += 1
  }

  let listOfUsers = Object.keys(finishedLevel)
  // normalize the scores
  for (let i = 0; i < listOfUsers.length; i++) {
    let userNickname = listOfUsers[i]
    for (let j = 0; j < 6; j++) {
      if (roundCounter[userNickname][j] != 0)
        sumScores[userNickname][j] /= roundCounter[userNickname][j]
    }
  }

  let finalRankList = {}
  let finalFinishedLevelNumber = {}
  for (let i = 0; i < listOfUsers.length; i++) {
    let userNickname = listOfUsers[i]
    for (let j = 0; j < 6; j++) {
      if (finishedLevel[userNickname][j] == true)
        finalFinishedLevelNumber[userNickname] = j + 1
    }
    if (finalFinishedLevelNumber[userNickname] == null || finalFinishedLevelNumber[userNickname] == 0) {
      continue
    }
    finalRankList[userNickname] = 0.0
    for (let j = 0; j < finalFinishedLevelNumber[userNickname]; j++) {
      finalRankList[userNickname] += sumScores[userNickname][j] * (1 + (0.1 * (j + 1)))
    }
  }
  let sortedUserNames = Object.keys(finalRankList).sort(function (a, b) { return finalRankList[b] - finalRankList[a] })
  let result = []
  for (let i = 0; i < sortedUserNames.length; i++) {
    result.push([sortedUserNames[i], finalRankList[sortedUserNames[i]], finalFinishedLevelNumber[sortedUserNames[i]]])
    if (sortedUserNames[i] == userToken) {
      setCurrentUserRank(i + 1)
      setCurrentUserScore(finalRankList[userToken])
    }
  }
  setRankList(result)
}

const loadSemiLeaderboardData = (setRankList, setCurrentUserScore, setCurrentUserRank, levelNumber) => {
  let recordsObjs = []
  fetch(`https://users.encs.concordia.ca/~m_orooz/levels/${levelNumber}.txt`, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }).then(response => response.text()).then(data => {
    console.log(data)
    let lines = data.split('\n')
    for (let i = 0; i < lines.length - 1; i++) {
      let line = lines[i]
      let obj = {}
      let words = line.split("&")
      for (let i = 0; i < words.length; i++) {
        let keyValue = words[i]
        let split = keyValue.split('=')
        if (split[0] == "ip") {
          continue;
        }
        let key = split[0]
        let value = split[1]
        obj[key] = value
      }
      recordsObjs.push(obj)
    }
    semiProcessingRecordsData(recordsObjs, setRankList, setCurrentUserScore, setCurrentUserRank)
  })
}
const semiProcessingRecordsData = (recordsObjs, setRankList, setCurrentUserScore, setCurrentUserRank) => {
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
    //let recordTimer = recordsObjs[i]["timerCount"]

    if (recordBingoNum == 5)
      finishedLevel[userNickname] = true

    //sumScores[userNickname] += parseFloat(userScore) - (parseFloat(recordTimer) / 6.0)
    sumScores[userNickname] += parseFloat(userScore)
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
  let currentUserRank = null

  for (let i = 0; i < sortedUserNames.length; i++) {
    result.push([sortedUserNames[i], sumScores[sortedUserNames[i]]])
    if (sortedUserNames[i] == userToken) {
      setCurrentUserRank(i + 1)
      currentUserRank = i + 1
    }
  }
  setRankList(result)
  if (currentUserRank != null)
    setCurrentUserScore(sumScores[userToken])
}

export default LeaderboardScreen;
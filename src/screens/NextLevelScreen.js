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


const NextLevelScreen = ({ route, navigation }) => {
  const { levelNumber } = route.params
  useEffect(() => {
  })

  return (
    <ImageBackground
      source={require('../Assets/Images/background-gameplay.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.congratsText}>Congradulation, level {levelNumber} passed with{'\n'} score 100</Text>
          <Image source={require('../Assets/Images/next-level.gif')}
            style={styles.congratsGif} />
        </View>
        <View>
          <View style={styles.IconsContainer}>
            <View style={styles.frameIcon}>
              <Icon reverse color="#972ba1" name="leaderboard" type="MaterialIcons" size={50}
                onPress={() => { }}
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

    </ImageBackground >
  )

};

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
    width: 330,
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
})

export default NextLevelScreen;
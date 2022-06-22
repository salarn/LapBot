import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  NativeScrollEvent,
  ImageBackground,
} from 'react-native'

const ConcentScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../Assets/Images/background-splashScreen.png')}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Terms and conditions</Text>
        <ScrollView
          style={styles.tcContainer}
        >
          <Text style={styles.tcP}>
            This game collects and uses data from the embedded questionnaires and game to enable
            core gameplay (e.g. saving your progress and score) and to answer research questions
            about the best way to display medical and surgical data. To help support our research,
            we ask for your consent to collect this in-app data.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} For more information please email gamification@ap-lab.ca
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'}  If you wish to have any data connected to you deleted prior to January 2023,
            please visit the player profile page or email us.
          </Text>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.replace("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>Accept</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const { height } = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginTop: 100,
    marginBottom: 100,
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  tcContainer: {
    marginBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
    width: '25%',
    alignItems: 'center',
    marginBottom: 40,
  },

  buttonHidden: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
    width: '25%',
    alignItems: 'center',
    marginBottom: 40,
  },

  buttonLabel: {
    fontSize: 18,
    color: '#FFF',
  },
}

export default ConcentScreen

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import FormButton from '../Components/FormButton';

const TutorialScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../Assets/Images/backGroundTutorial.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image style={{ top: -200 }} source={require('../Assets/Images/tutorialTextImage.png')} />
        {/*
        <Text style={styles.text}>Welcome to Tutorial screen</Text>
        <FormButton buttonTitle='Play Game' onPress={() => {
          navigation.replace('Game')
        }} />
      */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  }
})

export default TutorialScreen;
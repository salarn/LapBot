import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Linking,
} from 'react-native';
import Video from 'react-native-video';
import FormButton from '../Components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage'

const TutorialScreen = ({ navigation }) => {
  // For rendering the level screen Gif to removing lags
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      AsyncStorage.setItem('TabOpen', 'TutorialScreen')
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../Assets/Images/backGroundTutorial.png')}
      resizeMode="stretch"
      style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ fontFamily: 'GillSans-SemiBold', marginTop: 20, fontSize: 45, alignSelf: 'center' }}>Tutorial</Text>
        <ScrollView style={{ paddingTop: 0 }}>
        <Text style={styles.text}>All videos and annotations are from the work of  <Text style={{ color: '#3434fe' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/33196488/')}>
                        {''}A. Madani et al. 2022
                    </Text> </Text>
          <Text style={styles.text}>The objective of this game is to identify where it is safe to dissect during a laparoscopic cholecystectomy.</Text>
          <Image source={require('../Assets/Images/TutorialImage1.png')} style={{ width: '100%', height: 300, marginTop: 20, borderRadius: 20 }} />
          <Text style={styles.text}>You will be provided with a sample scenario - remember you can watch a video for that scenario before submitting your answer.</Text>
          <Image source={require('../Assets/Images/TutorialImage2.png')} style={{ width: 100, height: 120, marginTop: 20, alignSelf: 'center', borderRadius: 20 }} />
          <Video source={require('../Assets/QuestionBank/Level3-raw-video/1.mp4')}
            style={{ width: '100%', height: 240, marginTop: 20, borderRadius: 20 }} controls={true}
            muted={true}
            fullscreenAutorotate={false} />
          <Text style={styles.text}>Select by clicking directly on the surgical field where you feel is the best location to dissect next. BE CAREFUL - don't just follow the dissecting instruments in the video!</Text>
          <Image source={require('../Assets/Images/TutorialImage3.png')} style={{ width: 200, height: 110, marginTop: 20, alignSelf: 'center', backgroundColor: 'black', borderRadius: 20 }} />
          <Text style={styles.text}>Press confirm to submit your response.</Text>
          <Image source={require('../Assets/Images/TutorialImage4.png')} style={{ width: 100, height: 120, marginTop: 20, alignSelf: 'center', borderRadius: 20 }} />
          <Text style={styles.text}>You will get an accuracy score to see how you did. You can click on this button for a video feedback.</Text>
          <Image source={require('../Assets/Images/TutorialImage6.png')} style={{ width: 100, height: 120, marginTop: 20, alignSelf: 'center', borderRadius: 20 }} />
          <Image source={require('../Assets/Images/TutorialImage8.png')}
            style={{ width: '100%', height: 300, marginTop: 20, borderRadius: 20 }}
          />
          <Text style={styles.text}>You need to get 5 consecutive correct responses to pass each level.</Text>
          <Image source={require('../Assets/Images/TutorialImage7.png')} style={{ width: 320, height: 80, marginTop: 20, alignSelf: 'center', borderRadius: 20 }} />
          <Text style={[styles.text, { marginBottom: 20 }]}>There are 5 levels in this game.</Text>
          <Text style={[styles.text, { marginBottom: 50 }]}>Good Luck!</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: 'GillSans-SemiBoldItalic',
    color: '#333333',
    marginTop: 10,
  }
})

export default TutorialScreen;
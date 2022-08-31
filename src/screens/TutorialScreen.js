import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import Video from 'react-native-video';
import FormButton from '../Components/FormButton';

const TutorialScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../Assets/Images/backGroundTutorial.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image style={{ marginTop: 20 }} source={require('../Assets/Images/tutorialTextImage.png')} />
        <ScrollView style={{ paddingTop: 0 }}>
          <Text style={styles.text}>*Your job is to identify the safe area to dissect. You will be given a sample scenario. </Text>
          <Image source={require('../Assets/Images/TutorialImage1.png')} style={{ width: '100%', height: 240, marginTop: 20 }} />
          <Text style={styles.text}>*You can watch a video for that scenario.</Text>
          <Image source={require('../Assets/Images/TutorialImage2.png')} style={{ width: 100, height: 120, marginTop: 20, alignSelf: 'center' }} />
          <Video source={require('../Assets/Videos/1.0-video-clean.mp4')}
            style={{ width: '100%', height: 240, marginTop: 20 }} controls={true}
            muted={true}
            fullscreenAutorotate={false} />
          <Text style={styles.text}>*Select your target for dissection.</Text>
          <Image source={require('../Assets/Images/TutorialImage3.png')} style={{ width: 100, height: 100, marginTop: 20, alignSelf: 'center', backgroundColor: 'black' }} />
          <Text style={styles.text}>*Press Confirm.</Text>
          <Image source={require('../Assets/Images/TutorialImage4.png')} style={{ width: 100, height: 120, marginTop: 20, alignSelf: 'center' }} />
          <Text style={styles.text}>*Select your confidence level with your answer. </Text>
          <Image source={require('../Assets/Images/TutorialImage5.png')} style={{ width: '100%', height: 200, marginTop: 20 }} />
          <Text style={styles.text}>*Once you submit, click buttons for feedback.</Text>
          <Image source={require('../Assets/Images/TutorialImage6.png')} style={{ width: 150, height: 120, marginTop: 20, alignSelf: 'center' }} />
          <Image source={require('../Assets/GameData/1.0_image_scaled_raw_heatmap.png')}
            style={{ width: '100%', height: 240, marginTop: 20 }}
          />
          <Text style={styles.text}>*You need a total of 5 correct in a row to pass the level </Text>
          <Image source={require('../Assets/Images/TutorialImage7.png')} style={{ width: 320, height: 100, marginTop: 20, alignSelf: 'center' }} />
          <Text style={styles.text}>*Correct means accuracy more than 50%.</Text>
          <Text style={[styles.text, { marginBottom: 50 }]}>*There is 5 level in general.</Text>
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
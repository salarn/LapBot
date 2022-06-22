import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTheme } from '@/Theme'
import Video from 'react-native-video'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas'

function IndexVideoQuizLandContainer() {
  const [quizVisible, setQuizVisible] = useState(true)

  const { Images } = useTheme()
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  return (
    <View style={styles.mainContainer}>
      <View style={styles.menuContainer}>
        <View style={styles.doneIcon}>
          <Icon raised name="check" type="font-awesome" size={50} />
        </View>
        <View style={styles.repeatIcon}>
          {quizVisible ? (
            <Icon
              raised
              name="video"
              type="entypo"
              size={50}
              onPress={() => {
                setQuizVisible(false)
              }}
            />
          ) : (
            <Icon
              raised
              name="game-controller"
              type="entypo"
              size={50}
              onPress={() => {
                setQuizVisible(true)
              }}
            />
          )}
        </View>
        <View style={styles.closeIcon}>
          <Icon raised name="close" type="font-awesome" size={50} />
        </View>
      </View>
      <View style={styles.examContainer}>
        {quizVisible ? (
          <View style={styles.frameContainer}>
            <RNSketchCanvas
              containerStyle={{
                width: screenWidth * 0.6,
                height: screenHeight * 0.9,
              }}
              canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
              defaultStrokeIndex={0}
              defaultStrokeWidth={5}
              closeComponent={
                <View style={styles.functionButton}>
                  <Text style={{ color: 'white' }}>Close</Text>
                </View>
              }
              undoComponent={
                <View style={styles.functionButton}>
                  <Text style={{ color: 'white' }}>Undo</Text>
                </View>
              }
              clearComponent={
                <View style={styles.functionButton}>
                  <Text style={{ color: 'white' }}>Clear</Text>
                </View>
              }
              eraseComponent={
                <View style={styles.functionButton}>
                  <Text style={{ color: 'white' }}>Eraser</Text>
                </View>
              }
              strokeSelectedComponent={(color, _index) => {
                return (
                  <View
                    style={[
                      { backgroundColor: color, borderWidth: 2 },
                      styles.strokeColorButton,
                    ]}
                  />
                )
              }}
              strokeColors={[{ color: '#FFFFFF' }, { color: '#FF0000' }]}
              strokeComponent={color => (
                <View
                  style={[{ backgroundColor: color }, styles.strokeColorButton]}
                />
              )}
              strokeWidthComponent={w => {
                return (
                  <View style={styles.strokeWidthButton}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        marginHorizontal: 2.5,
                        width: Math.sqrt(w / 3) * 10,
                        height: Math.sqrt(w / 3) * 10,
                        borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                      }}
                    />
                  </View>
                )
              }}
              saveComponent={
                <View style={styles.functionButton}>
                  <Text style={{ color: 'white' }}>Save</Text>
                </View>
              }
              savePreference={() => {
                return {
                  folder: 'RNSketchCanvas',
                  filename: String(Math.ceil(Math.random() * 100000000)),
                  transparent: false,
                  imageType: 'png',
                }
              }}
              localSourceImage={{
                filename:
                  '/Users/salar/Desktop/MyApp/src/Assets/Images/frame.png',
                mode: 'AspectFill',
              }}
            />
          </View>
        ) : (
          <View style={styles.videoContainer}>
            <Video
              source={Images.video}
              style={{
                width: screenWidth * 0.6,
                height: screenHeight * 0.9,
              }}
              resizeMode={'contain'}
              controls={true}
            />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3f4255',
  },
  menuContainer: {
    height: '100%',
    width: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    flex: 1,
  },
  repeatIcon: {
    flex: 1,
  },
  doneIcon: {
    flex: 1,
  },
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  examContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videotitle: {
    marginBottom: '10%',
  },
  frametitle: {
    textAlign: 'center',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
})

export default IndexVideoQuizLandContainer

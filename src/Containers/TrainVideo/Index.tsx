import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Theme'
import Video from 'react-native-video'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas'

const IndexTrainVideoContainer = () => {
  const { Fonts, Images } = useTheme()

  return (
    <View style={styles.mainContainer}>
      <View style={styles.learningContainer}>
        <Text style={[Fonts.titleSmall, styles.videotitle]}>
          Watch the video
        </Text>
        <View style={styles.videoContainer}>
          <Video
            source={Images.video}
            style={styles.video}
            resizeMode={'cover'}
            controls={true}
          />
        </View>
      </View>
      <View style={styles.examContainer}>
        <Text style={[Fonts.titleSmall, styles.frametitle]}>
          Annotated the go/no-go zone
        </Text>
        <View style={styles.frameContainer}>
          <RNSketchCanvas
            containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
            canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
            defaultStrokeIndex={0}
            defaultStrokeWidth={5}
            closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
            undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
            clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
            eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
            strokeSelectedComponent={(color, index, changed) => {
              return (
                <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
              )
            }}
            strokeColors={[{ color: '#FFFFFF' }, { color: '#FF0000' }]}
            strokeComponent={color => (
              <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
            )}
            strokeWidthComponent={(w) => {
              return (<View style={styles.strokeWidthButton}>
                <View  style={{
                  backgroundColor: 'white', marginHorizontal: 2.5,
                  width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                }} />
              </View>
            )}}
            saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
            savePreference={() => {
              return {
                folder: 'RNSketchCanvas',
                filename: String(Math.ceil(Math.random() * 100000000)),
                transparent: false,
                imageType: 'png',
              }
            }}
            localSourceImage={{
              filename: '/Users/salar/Desktop/MyApp/src/Assets/Images/frame.png',
              mode: 'AspectFill',
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f4255',
  },
  learningContainer: {
    height: '50%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    width: '90%',
    height: '60%',
  },
  frameContainer: {
    width: '90%',
    height: '80%',
  },
  examContainer: {
    height: '50%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videotitle: {
    marginBottom: '10%',
  },
  frametitle: {
    textAlign: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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

export default IndexTrainVideoContainer

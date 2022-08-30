import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { DefaultTheme, Text } from 'react-native-paper'
import {
  Background,
  Brand,
  Header,
  BackButton,
  TextInput,
} from '@/Components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
import FormButton from '../Components/FormButton'
import SelectPicker from 'react-native-form-select-picker'
import { AuthContext } from '../Components/context'
import CountryPicker from 'react-native-country-picker-modal'

const DemographicQuestionScreen = ({ navigation }) => {
  const [answer1, setAnswer1] = useState({ value: '', error: '' })
  const [answer2, setAnswer2] = useState({ value: '', error: '' })
  const [answer3, setAnswer3] = useState({ value: '', error: '' })
  const [answer4, setAnswer4] = useState({ value: '', error: '' })
  const [answer5, setAnswer5] = useState({ value: 'CA', error: '' })
  const [answer6, setAnswer6] = useState({ value: '', error: '' })

  const [countryCode, setCountryCode] = useState('CA')
  const [visible, setVisible] = useState(false)
  var userToken = null

  const WhatAreyouOption = ["Medical student", "Post-graduate year 1", "Post-graduate year 2", "Post-graduate year 3", "Post-graduate year 4", "Post-graduate year 5+", "Clinical fellow", "Attending surgeon"]
  const hoursOptions = ["0", "2", "5", "10", "More than 10"]



  const ViewGeneratorMultiAns = (props) => {
    let errorActive = props.error == null ? false : props.error
    return (
      <View style={props.containerStyle}>
        <SelectPicker
          placeholder={props.placeholder}
          placeholderStyle={{ fontSize: 17, color: '#757575' }}
          onSelectedStyle={{ fontSize: 20, color: '#252525' }}
          titleText={props.titleText}
          style={[props.pickerStyle, errorActive && { borderColor: 'red' }]}
          onValueChange={(value) => {
            if (value == null)
              props.setInput({ value: '', error: '' })
            else
              props.setInput({ value: value, error: '' })
          }}
          selected={props.input.value}
          disabled={props.disabled == null ? false : props.disabled}
        >
          {Object.values(props.inputOptions).map((val, index) => (
            <SelectPicker.Item label={val} value={val} key={index} />
          ))}
        </SelectPicker>
        {props.input.error ? <Text style={props.errorStyle}>{props.input.error}</Text> : null}
      </View>
    )
  }

  const AddInfoButtonPress = () => {
    var formdata = new FormData();
    var responseStatus = 0
    formdata.append("nickname", userToken)
    formdata.append("q1", answer1.value)
    formdata.append("q2", answer2.value)
    formdata.append("q3", answer3.value)
    formdata.append("q4", answer4.value)
    formdata.append("q5", answer5.value)
    formdata.append("q6", answer6.value)
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch('https://users.encs.concordia.ca/~m_orooz/demographicInfo.php', requestOptions)
      .then(response => {
        responseStatus = response.status
        AsyncStorage.setItem('alreadyLaunchedQuestioner', 'false')
        navigation.replace('MainTab')
      })
      .catch(error => {
        console.error('Demographic info error. Http server request Error: ', error.toString());
      });
  }
  const buttonDisabled = () => {
    if (answer1.value == '' || answer2.value == '' || answer3.value == '' ||
      answer4.value == '' || answer5.value == '' ||
      answer6.value == '')
      return true
    return false
  }
  useEffect(() => {
    AsyncStorage.getItem('userToken').then((value) => {
      userToken = value
    })
  })

  return (
    <Background>
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <Header>Demographic Questions</Header>
        <ViewGeneratorMultiAns
          containerStyle={styles.pickerContainer}
          placeholder='Medical grade'
          titleText="Your recent medical grade"
          pickerStyle={styles.picker}
          input={answer1}
          setInput={setAnswer1}
          inputOptions={WhatAreyouOption}
          errorStyle={styles.pickerError}
        />
        <ViewGeneratorMultiAns
          containerStyle={styles.pickerContainer}
          placeholder='Game playing hours weekly'
          titleText="On average, approximately how many hours of gaming do you play weekly?"
          pickerStyle={styles.picker}
          input={answer2}
          setInput={setAnswer2}
          inputOptions={hoursOptions}
          errorStyle={styles.pickerError}
        />
        <ViewGeneratorMultiAns
          containerStyle={styles.pickerContainer}
          placeholder='Laparoscopic surgery experience'
          titleText="Approximately how many total laparoscopic cholecystectomies have you performed to date (as primary surgeon or first assist)"
          pickerStyle={styles.picker}
          input={answer3}
          setInput={setAnswer3}
          inputOptions={hoursOptions}
          errorStyle={styles.pickerError}
        />
        <TextInput
          label="Institution / Training Program / Hospital"
          returnKeyType="done"
          value={answer4.value}
          autoCorrect={false}
          onChangeText={text => setAnswer4({ value: text, error: '' })}
          error={!!answer4.error}
          errorText={answer4.error}
        />
        <TouchableOpacity
          style={styles.countryContainer}
          onPress={() => setVisible(!visible)}
        >
          <Text style={{ fontSize: 17, color: '#757575', paddingRight: 15 }}>
            Your country
          </Text>
          <CountryPicker
            {...{
              countryCode,
              onSelect: (country) => {
                setCountryCode(country.cca2)
                setAnswer5({ value: country.cca2, error: '' })
              },
              withAlphaFilter: true,
              withCountryNameButton: true,
              modalProps: {
                visible,
              },
              onClose: () => setVisible(false),
              onOpen: () => setVisible(true),
            }}
          />
        </TouchableOpacity>
        <TextInput
          label="City"
          returnKeyType="done"
          value={answer6.value}
          autoCorrect={true}
          onChangeText={text => setAnswer6({ value: text, error: '' })}
          error={!!answer6.error}
          errorText={answer6.error}
        />
        <FormButton
          buttonTitle="Add my info"
          onPress={() => AddInfoButtonPress()}
          disabled={buttonDisabled()}
        />
        <Text style={{ color: "red", marginTop: 10 }}>*Please answer all the questions then push the button</Text>
      </ScrollView>
    </Background >
  )
}

const styles = StyleSheet.create({
  brandContainer: {
    width: '20%',
    height: '50%',
  },
  textInputContainer: {
    width: '100%',
    marginVertical: 12,
  },
  textInput: {
    backgroundColor: DefaultTheme.colors.surface,
  },
  textInputError: {
    fontSize: 13,
    color: DefaultTheme.colors.error,
    paddingTop: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 30,
  },
  link: {
    fontWeight: 'bold',
    color: DefaultTheme.colors.primary,
  },
  pickerContainer: {
    width: '100%',
    marginVertical: 12,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#757575',
    height: 50,
    fontSize: 30,
    backgroundColor: 'white',
  },
  pickerError: {
    fontSize: 15,
    color: DefaultTheme.colors.error,
    paddingTop: 8,
    fontWeight: 'bold',
  },
  countryContainer: {
    width: '100%',
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#757575',
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    //marginleft: 10,
    paddingLeft: 15,
    alignItems: 'center'
  }
})
export default DemographicQuestionScreen

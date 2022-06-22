import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { DefaultTheme, Text } from 'react-native-paper'
import {
  Background,
  Brand,
  Header,
  BackButton,
  TextInput,
} from '@/Components'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import { emailValidator } from '@/Helpers/emailValidator'
import { passwordValidator } from '@/Helpers/passwordValidator'
import { nameValidator } from '@/Helpers/nameValidator'
import { ScrollView } from 'react-native-gesture-handler'
import FormButton from '../Components/FormButton'
import SelectPicker from 'react-native-form-select-picker'
import { AuthContext } from '../Components/context';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [gender, setGender] = useState({ value: '', error: '' })
  const [age, setAge] = useState({ value: '', error: '' })

  const genderOptions = ["Male", "Female", "Other"]

  const { signIn } = React.useContext(AuthContext);

  const updateErrorTexts = (response) => {
    if (response.nickname != "00")
      setName({ ...name, error: response.nickname })
    if (response.age != "00")
      setAge({ ...age, error: response.age })
    if (response.gender != "00")
      setGender({ ...gender, error: response.gender })
    if (response.email != "00")
      setEmail({ ...email, error: response.email })
  }

  const onSignUpPressed = () => {
    var formdata = new FormData();
    var responseStatus = 0
    formdata.append("nickname", name.value)
    formdata.append("email", email.value)
    formdata.append("gender", gender.value)
    formdata.append("age", age.value)
    console.log(name.value + " 1 " + email.value + " 2 " + gender.value + " 3 " + age.value)
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch('https://users.encs.concordia.ca/~m_orooz/players.php', requestOptions)
      .then(response => {
        responseStatus = response.status
        return response.text()
      })
      .then(data => {
        data = data.toString()
        data = JSON.parse('{"' + decodeURI(data
          .replace(/&/g, "\",\"").replace(/=/g, "\":\"")
          .replace(/\+/g, " ").replace(/%/g, "")) + '"}')
        console.log(data)
        return data
      }).then(data => {
        updateErrorTexts(data)
        console.log(responseStatus)
        if (responseStatus == "200")
          signIn(name.value)
      })
      .catch(error => {
        console.error('Register user error. Http server request part. Error: ', error.toString());
      });
  }

  return (
    <Background>
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <Header>Create Account</Header>
        <TextInput
          label="Nickname"
          returnKeyType="done"
          value={name.value}
          autoCorrect={false}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Email"
          returnKeyType="done"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Age"
          returnKeyType="done"
          value={age.value}
          onChangeText={text => setAge({ value: text, error: '' })}
          error={!!age.error}
          errorText={age.error}
          keyboardType='number-pad'
        />
        <View style={styles.genderPickerContainer}>
          <SelectPicker
            placeholder="Gender"
            placeholderStyle={{ fontSize: 17, color: '#757575' }}
            onSelectedStyle={{ fontSize: 20, color: '#252525' }}
            titleText="Select your gender"
            style={styles.genderPicker}
            onValueChange={(value) => {
              if (value == null)
                setGender({ value: '', error: '' })
              else
                setGender({ value: value, error: '' })
            }}
            selected={gender.value}
          >
            {Object.values(genderOptions).map((val, index) => (
              <SelectPicker.Item label={val} value={val} key={index} />
            ))}
          </SelectPicker>
          {gender.error ? <Text style={styles.genderError}>{gender.error}</Text> : null}
        </View>
        <FormButton
          buttonTitle="Sign Up"
          onPress={() => onSignUpPressed()}
        />
      </ScrollView>
      <BackButton navigation={navigation} />
    </Background>
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
  genderPickerContainer: {
    width: '100%',
    marginVertical: 12,
  },
  genderPicker: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    fontSize: 30,
    //marginTop: 20,
    //marginBottom: 20,
    borderColor: '#757575',
  },
  genderError: {
    fontSize: 15,
    color: DefaultTheme.colors.error,
    paddingTop: 8,
    fontWeight: 'bold',
  },
})
export default RegisterScreen

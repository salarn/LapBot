import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { DefaultTheme, Text } from 'react-native-paper'
import {
  Background,
  Brand,
  Header,
  BackButton,
  TextInput,
  Button,
} from '@/Components'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import { emailValidator } from '@/Helpers/emailValidator'
import { passwordValidator } from '@/Helpers/passwordValidator'
import { nameValidator } from '@/Helpers/nameValidator'
import { ScrollView } from 'react-native-gesture-handler'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    })
  }

  return (
    <Background>
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <Header>Create Account</Header>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BackButton />
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
})
export default RegisterScreen

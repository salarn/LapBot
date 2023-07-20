import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';
import SocialButton from '../Components/SocialButton';
import { AuthContext } from '../Components/context';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { signIn } = React.useContext(AuthContext);

  // const { login, googleLogin, fbLogin } = useContext(AuthContext);

  return (
    <ImageBackground
      source={require('../Assets/Images/background-splashScreen.png')}
      resizeMode="cover"
      style={styles.container}
    >

      <Image source={require('../Assets/Images/front-line-drs.gif')}
        style={styles.loginGif} />

      <FormButton
        buttonTitle="Create Account"
        onPress={() => navigation.push("StudyConsent")}
      />
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    width: '90%',
    resizeMode: 'contain',
  },
  loginGif: {
    resizeMode: 'contain',
    height: 250,
    width: '90%',
    marginTop: 150,
    marginBottom: 100,
  },
});
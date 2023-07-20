import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth0 from './auth0';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

import { AuthContext } from '../Components/context';


const Routes = () => {
  const [accessToken, setAccessToken] = useState(null)

  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(() => ({
    signIn: (userToken) => {
      AsyncStorage.setItem('userToken', userToken);
      dispatch({ type: 'LOGIN', token: userToken });
      console.log('User Token is: ' + userToken);
    },
    askUserToken: () => {
      return loginState.userToken
    }
    /*
    signIn: async () => {
      let userToken = null;
      await auth0
        .webAuth
        .authorize({ scope: 'openid profile email' })
        .then(credentials => {
          userToken = credentials.accessToken
          AsyncStorage.setItem('userToken', userToken);
          dispatch({ type: 'LOGIN', token: userToken });
          console.log('User Token is: ' + JSON.stringify(credentials));
        })
        .catch(error => console.log(error));
    },
    signOut: async () => {
      await auth0.webAuth
        .clearSession({})
        .then(success => {
          AsyncStorage.removeItem('userToken');
          dispatch({ type: 'LOGOUT' });
        })
        .catch(error => {
          console.log('Log out cancelled ' + error);
        });
    },*/
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default Routes

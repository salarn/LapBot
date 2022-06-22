import React from 'react'
import { StartLoginScreen } from '@/Containers'

const MainLogin = (props: any) => {
  return (
    <props.Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <props.Stack.Screen name="StartScreen" component={StartLoginScreen} />
      {/*
      <props.Stack.Screen name="LoginScreen" component={LoginScreen} />
      <props.Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <props.Stack.Screen name="Dashboard" component={Dashboard} />
      <props.Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      /> */}
    </props.Stack.Navigator>
  )
}
export default MainLogin

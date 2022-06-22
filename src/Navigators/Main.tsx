import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  IndexConsentContainer,
  IndexStartupContainer,
  IndexTrainVideoContainer,
  IndexVideoQuizLandContainer,
} from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Quiz" component={IndexVideoQuizLandContainer} />
      <Tab.Screen name="Old-Quiz" component={IndexTrainVideoContainer} />
      <Tab.Screen name="Salar" component={IndexStartupContainer} />
      <Tab.Screen name="Consent" component={IndexConsentContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator

import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Entypo'

import LevelsScreen from './LevelsScreen'
import TutorialScreen from './TutorialScreen'
import LeaderboardScreen from './LeaderboardScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Game"
      activeColor="#fff"
      shifting={true}
    >
      <Tab.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={{
          tabBarLabel: 'Tutorial',
          tabBarColor: '#66cc66',
          tabBarIcon: ({ color }) => (
            <Icon3 name="book" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={LevelsScreen}
        options={{
          tabBarLabel: 'Game',
          tabBarColor: '#36a4c9',
          tabBarIcon: ({ color }) => (
            <Icon name="game-controller" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarColor: '#42bdb3',
          tabBarIcon: ({ color }) => (
            <Icon2 name="leaderboard" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabScreen;
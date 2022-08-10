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

const HomeStack = createNativeStackNavigator();
const DetailsStack = createStackNavigator();

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
          tabBarColor: '#ff944d',
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
          tabBarColor: '#f4666a',
          tabBarIcon: ({ color }) => (
            <Icon2 name="leaderboard" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }} >
    <HomeStack.Screen name="Levels" component={LevelsScreen} options={{
      title: 'Level Screen',
      //orientation: 'landscape_right'
    }} />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#1f65ff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <DetailsStack.Screen name="Details" component={LevelsScreen} options={{}} />
  </DetailsStack.Navigator>
);
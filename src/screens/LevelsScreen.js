import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import FormButton from '../Components/FormButton';
import { AuthContext } from '../Components/context';
import Orientation from 'react-native-orientation';

const LevelsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to levels screen</Text>
      <FormButton buttonTitle='Play Game' onPress={() => {
        navigation.replace('Game')
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  }
})

export default LevelsScreen;
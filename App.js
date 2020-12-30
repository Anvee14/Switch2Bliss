import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import EnterProb from './Screens/EnterProb';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
export default function App() {
  return (
    <AppContainer />
  );
}
const switchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  EnterProb: { screen: EnterProb },


})

const AppContainer = createAppContainer(switchNavigator);


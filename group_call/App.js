import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import AppNavigation from './AppNavigation';


export default function App() {
  return (<NavigationContainer >
    <AppNavigation />
  </NavigationContainer>);
}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Deal from './Deal';
import FullDealView from './FullDealView';
import {Text, View,Button } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
export default function DealNavigator() {
  return (
    <Stack.Navigator initialRouteName="Deal" >
      <Stack.Screen name="Deal" options={{ title: 'Deal'}} component={Deal} />
      <Stack.Screen name="FullDealView" component={FullDealView}  />
    </Stack.Navigator>

  );
}
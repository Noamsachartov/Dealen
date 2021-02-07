import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogIn from './assets/Components/LogInSection/LogIn';
import Signup from './assets/Components/LogInSection/SignUp';
import FaceBookSignup from './assets/Components/LogInSection/FaceBookSignup';
import ChoosePreferences from './assets/Components/LogInSection/ChoosePreferences';
import Bylaws from './assets/Components/LogInSection/Bylaws'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
     }}>
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="FaceBookSignup" component={FaceBookSignup} />
        <Stack.Screen name="ChoosePreferences" component={ChoosePreferences} />
        <Stack.Screen name="Bylaws" component={Bylaws}  initialParams={{ aprrove: false }} />
      </Stack.Navigator>
    </NavigationContainer>
      // <LogIn/>
  );
}

const styles = StyleSheet.create({
  
});

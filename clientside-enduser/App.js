import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedbackBase} from 'react-native';
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
      <Stack.Navigator 
     >
        <Stack.Screen name="Login" component={LogIn} options={{headerShown: false}} />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
        <Stack.Screen name="FaceBookSignup" component={FaceBookSignup} />
        <Stack.Screen name="ChoosePreferences" component={ChoosePreferences} options={({ navigation, route }) => ({title: '',headerTintColor:'whitesmoke',headerStyle: {height: 60, backgroundColor:'#003f5c'},
        headerRight: () => (<Button title="דלג" color="#003f5c" onPress={() => navigation.navigate('Login')} />)   })} />
        <Stack.Screen name="Bylaws" component={Bylaws}  initialParams={{ aprrove: false }}  options={{title: '',headerTintColor:'whitesmoke',headerStyle: {height: 60, backgroundColor:'#003f5c'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

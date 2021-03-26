import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedbackBase, Dimensions} from 'react-native';
import LogIn from './assets/Components/LogInSection/LogIn';
import Signup from './assets/Components/LogInSection/SignUp';
import FaceBookSignup from './assets/Components/LogInSection/FaceBookSignup';
import ChoosePreferences from './assets/Components/LogInSection/ChoosePreferences';
import FBChoosePreferences from './assets/Components/LogInSection/FBChoosePreferences';
import Bylaws from './assets/Components/LogInSection/Bylaws'
import TabControler from './assets/Components/MainTab/TabControler';
import HomeR from './assets/Components/MainTab/TabControler';
import HeaderForDeal from './assets/HeaderForDeal';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeConsumer } from 'react-native-elements';
import {DealContextProvider} from './assets/Context/DealContext';
const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();



export default function App() {

  return (
    <DealContextProvider>
      
        <HeaderForDeal />
        <NavigationContainer>
          <Stack.Navigator 
        >
            <Stack.Screen name="Login" component={LogIn} options={{headerShown: false}} />
            <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
            <Stack.Screen name="FaceBookSignup" component={FaceBookSignup} />
            <Stack.Screen name="ChoosePreferences" component={ChoosePreferences} options={({ navigation, route }) => ({title: '',headerTintColor:'whitesmoke',headerStyle: {height: height/10, backgroundColor:'#003f5c'},
            headerRight: () => (<Button title="דלג" color="#003f5c"  onPress={() => navigation.navigate('Login')} />)   })} />
            <Stack.Screen name="FBChoosePreferences" component={FBChoosePreferences} options={({ navigation, route }) => ({title: '',headerTintColor:'whitesmoke',headerStyle: {height: height/10, backgroundColor:'#003f5c'},
            headerRight: () => (<Button title="דלג" color="#003f5c"  onPress={() => navigation.navigate('HomeR')} />)   })} />
            <Stack.Screen name="Bylaws" component={Bylaws}  initialParams={{ aprrove: false }}  options={{title: '',headerTintColor:'whitesmoke',headerStyle: {height: height/10.3, backgroundColor:'#003f5c'}}}/>
            <Stack.Screen name="HomeR" component={HomeR} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </DealContextProvider>

  );
}

const styles = StyleSheet.create({
  
});

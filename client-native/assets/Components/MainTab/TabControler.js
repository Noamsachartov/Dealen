import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Recommendation from './Recommendation-section/Recommendation';
import Search from './Search-section/Search';
import Map_sec from './Map-section/Map_sec';
import Profile from './Profile-section/Profile';
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import FullDealView from './Recommendation-section/Deals/FullDealView';
import CategoryFullView from './Recommendation-section/Category/CategoryFullView';
import DealApproval from './Recommendation-section/Deals/DealApproval';
const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Recommendation"
      activeColor="#fff"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
    <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'אזור אישי',
          tabBarColor: '#003f5c',
          // #158bd4
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: 'מפה',
          tabBarColor: '#003f5c',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="google-maps" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'חיפוש',
          tabBarColor: '#003f5c',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="card-search-outline" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Recommendation"
        component={Recommendation}
        options={{
          tabBarLabel: 'מומלצים',
          tabBarColor: '#003f5c',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function TabControler() {

  return (
      <Stack.Navigator initialRouteName="MyTabs"       
     >
        <Stack.Screen name="MyTabs" options={{ headerShown: false}} component={MyTabs} />
        <Stack.Screen name="FullDealView" options={{ title: '', headerTintColor:'whitesmoke',headerStyle: {height: height/10.3, backgroundColor:'#003f5c'}}} component={FullDealView}  />
        <Stack.Screen name="CategoryFullView" options={{ title: ''}} component={CategoryFullView}  />
        <Stack.Screen name="DealApproval" options={{headerShown: false }} component={DealApproval}  />
      </Stack.Navigator>    
  );
}




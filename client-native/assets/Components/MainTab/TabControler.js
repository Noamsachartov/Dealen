import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
        name="Map_sec"
        component={Map_sec}
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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation(); 

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    console.log("get Token: " + expoPushToken)
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response.notification);
      console.log("Tappppped: " + JSON.stringify(response.notification.request.content.data.coupon))
      navigation.navigate('RatingStars',{notification: response})

    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  return (
      <Stack.Navigator initialRouteName="MyTabs"       
     >
        <Stack.Screen name="MyTabs" options={{ headerShown: false}} component={MyTabs} />
        <Stack.Screen name="FullDealView" options={{ title: '', headerTintColor:'whitesmoke',headerStyle: {height: height/10.3, backgroundColor:'#003f5c'}}} component={FullDealView}  />
        {/* <Stack.Screen name="FullDealViewMap" options={{ title: '', headerTintColor:'whitesmoke',headerStyle: {height: height/10.3, backgroundColor:'#003f5c'}}} component={FullDealViewMap}  /> */}
        <Stack.Screen name="CategoryFullView" options={{ title: ''}} component={CategoryFullView}  />
        <Stack.Screen name="DealApproval" options={{headerShown: false }} component={DealApproval}  />
      </Stack.Navigator>    
  );
}





async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
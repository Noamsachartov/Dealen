import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView,StatusBar } from 'react-native';
import Map from './Map';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export default function Map_sec() {
  console.log("inside recommendation")
  const navigation = useNavigation(); 
    return (
      <Map navigation={navigation} />  
    );
  }
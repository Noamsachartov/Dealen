import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView,StatusBar } from 'react-native';
import Map from './Map';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';


LogBox.ignoreLogs([
 'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead',
]);

export default function Map_sec() {
  console.log("inside recommendation")
  const navigation = useNavigation(); 
    return (
      <View style={{marginTop: 7}}>  
          <StatusBar
          animated={true}
          backgroundColor="#003f5c"
           />
          <ScrollView showsVerticalScrollIndicator={false} >
            <Map navigation={navigation} />  
          </ScrollView>
      </View>
    );
  }
import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView,StatusBar } from 'react-native';
import Carousel from './Carousel/Carousel';
import Category from './Category/Category';
import Deal from './Deals/Deal';
import { DataForCarousel } from './Carousel/DataForCarousel';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';


LogBox.ignoreLogs([
 'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead',
]);

export default function Recommendation() {
  console.log("inside recommendation")
  const navigation = useNavigation(); 
    return (
      <View style={{marginTop: 7}}>  
          <StatusBar
          animated={true}
          backgroundColor="#003f5c"
           />
          <ScrollView showsVerticalScrollIndicator={false} > 
            <Carousel data = {DataForCarousel}/>
            <Category navigation={navigation} />  
            <Deal navigation={navigation} />  
          </ScrollView>
      </View>
    );
  }
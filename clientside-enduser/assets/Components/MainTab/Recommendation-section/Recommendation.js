import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import Carousel from './Carousel/Carousel';
import Category from './Category/Category';
import Deal from './Deals/Deal';
import { DataForCarousel } from './Carousel/DataForCarousel';
import { FlatList } from 'react-native-gesture-handler';

export default function Recommendation() {
  console.log("inside recommendation")
    return (
      <View style={{marginTop: 25}}>
          <ScrollView   showsVerticalScrollIndicator={false} >
            <Carousel data = {DataForCarousel}/>
            <Category />  
            <Deal />   
          </ScrollView>
      </View>
    );
  }
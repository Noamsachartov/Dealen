import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import Carousel from './Carousel/Carousel';
import Category from './Category/Category'
import { DataForCarousel } from './Carousel/DataForCarousel';

export default function Recommendation() {
  console.log("inside recommendation")
    return (
      <View style={{marginTop: 25}}>
        <ScrollView  >
          <Carousel data = {DataForCarousel}/>
          <Category />
        </ScrollView>
      </View>
    );
  }
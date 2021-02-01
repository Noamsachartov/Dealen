import * as React from 'react';
import { Text, View } from 'react-native';
import Carousel from './Carousel/Carousel';
import { dummyData } from './Carousel/DataForCarousel';


export default function Recommendation() {
  console.log("inside recommendation")
    return (
      <View style={{marginTop: 25}}>
        <Carousel data = {dummyData}/>
      </View>
    );
  }
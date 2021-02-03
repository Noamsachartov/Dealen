import * as React from 'react';
import { Text, View } from 'react-native';

export default function FullDealView() {
  console.log("inside Deal Full View")
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Deal Full View</Text>
      </View>
    );
  }
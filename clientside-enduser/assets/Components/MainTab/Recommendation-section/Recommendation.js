import * as React from 'react';
import { Text, View } from 'react-native';
export default function Recommendation() {
  console.log("inside recommendation")
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Recommendation!</Text>
      </View>
    );
  }
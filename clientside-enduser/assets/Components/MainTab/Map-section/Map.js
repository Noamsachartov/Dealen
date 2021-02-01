import * as React from 'react';
import { Text, View } from 'react-native';
export default function Map() {
  console.log("inside map")
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Map!</Text>
      </View>
    );
  }
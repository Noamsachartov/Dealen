import * as React from 'react';
import { Text, View } from 'react-native';
export default function Search() {
  console.log("inside search")
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Search!</Text>
      </View>
    );
  }
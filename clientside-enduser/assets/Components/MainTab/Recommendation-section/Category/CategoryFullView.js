import * as React from 'react';
import { Text, View } from 'react-native';

export default function CategoryFullView() {
  console.log("inside Deal Full View")
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Category Full View</Text>
      </View>
    );
  }
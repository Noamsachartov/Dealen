import * as React from 'react';
import { Text, View } from 'react-native';
export default function Profile() {
  console.log("inside profile")
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
  
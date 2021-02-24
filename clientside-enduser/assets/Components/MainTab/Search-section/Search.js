import * as React from 'react';
import {StyleSheet, Text, View } from 'react-native';

export default class Search extends React.Component {
  state = {
    
  };

  render(props) {
    return (
      <View style={styles.container}>
        <Text>Search!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
});
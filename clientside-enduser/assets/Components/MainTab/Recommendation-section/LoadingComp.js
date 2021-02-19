

import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

export default class App extends React.Component {
  state = {
    spinner: true
  };


  render(props) {
    console.log(this.props.title)
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.props.title}
          textStyle={styles.spinnerTextStyle}
          color={'white'}
          overlayColor={'#003f5c'}
         
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  
});
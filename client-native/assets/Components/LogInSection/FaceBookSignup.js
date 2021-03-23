import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import UserList from './UserList';
import TabControler from '../MainTab/TabControler'

export default class FaceBookSignUp extends React.Component {

    state={
        email:"",
        password:"",
        CurrentUser: ""
      }




  render(){
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
          <Text style={styles.Logo}>Facebook</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
      },
      Logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
      }
});
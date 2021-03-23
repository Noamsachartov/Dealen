import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Button, FlatList, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')

export default class Bylaws extends React.Component {

    state={
        Data: ''
        
      }

      handleApprove = (e) => {
        const { navigation, route } = this.props;
        route.params.onGoBack();
        navigation.navigate('Signup')        
    }

      componentDidMount =() => {
        this.setState({Data: "אני מאשר שאני מעל גיל 18, ללא מטרות זדוניות, אשתמש באפליקציה לטובת הנאה בלבד ללא צריכים עסקיים"})
       }



  render(){
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <Text>{this.state.Data}</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={this.handleApprove}>
              <Text style={styles.loginText} >מאשר</Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width - 20
      },
      loginBtn:{
        width: width - 100,
        backgroundColor:"#003f5c",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
    },
        loginText:{
            color: "white"
        },
     
});


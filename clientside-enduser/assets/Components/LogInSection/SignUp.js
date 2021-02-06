import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import UserList from './UserList';
import TabControler from '../MainTab/TabControler'
export default class LogIn extends React.Component {

    state={
        email:"",
        password:"",
        Fname: "",
        CurrentUser: ""
      }


      handlePassword = () =>{
        console.log("presd",UserList);
        for (let i = 0; i < UserList.length; i++) {
          let item = UserList[i];
          if(this.state.email == item.name && this.state.password == item.password){
            this.setState({
              CurrentUser: [item.name,item.password]
            })
          }
        }

        console.log("welcome back", this.state.CurrentUser.length);
      }

  render(){

    if(this.state.CurrentUser.length > 0){
      return(
        <TabControler>{console.log("Inside Tabs")}</TabControler>
      )
    }else {

    return (
      <View style={styles.container}>
        <Text style={styles.Logo}>DEALEN</Text>
         <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Email..." 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({email:text})}/>
            </View>
            <View style={styles.inputView}>
            <TextInput  
                style={styles.inputText}
                placeholder="password..." 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({password:text})}
                />
            <TextInput  
                style={styles.inputText}
                placeholder="First Name" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({Fname:text})}
                />
            </View>
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={this.handlePassword}>
              <Text style={styles.loginText}  >LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>
      </View>
    );
  }
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
      inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        color:"white"
      },
      forgot:{
        color:"white",
        fontSize:11
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
          color: "white"
      },
      Logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
      }
});
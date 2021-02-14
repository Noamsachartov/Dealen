import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import UserList from './UserList';
import TabControler from '../MainTab/TabControler'
// import { useNavigation } from '@react-navigation/native';


export default class LogIn extends React.Component {

    state={
        email:"",
        password:"",
        CurrentUser: "",
        apiUrl: "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Customer?cust_mail=noam@gmail.com&password=123",
        Cust_name: '',
        Cust_id: -1,
        isLoading: true
      }


      handlePassword = () =>{
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Customer?cust_mail=" + this.state.email +"&password=" +this.state.password
        return fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.length > 0){
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson,
              Cust_id: responseJson[0].Cust_id,
              Cust_name: responseJson[0].Cust_name
            },
            function() {
              alert(responseJson[0].Cust_name)
            }
          );
        }else {
          alert("Sorry We Couldn't find you")
        }

      })
      .catch(error => {
        console.error(error);
      });
        
      }

  render(){
    const { navigation } = this.props;

    if(!this.state.isLoading){
      return(
        <TabControler >{console.log("Inside Tabs")}</TabControler>
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
            </View>
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={this.handlePassword}>
              <Text style={styles.loginText}  >LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              >
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
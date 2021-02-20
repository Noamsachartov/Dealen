import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import UserList from './UserList';
import TabControler from '../MainTab/TabControler'
import * as Facebook from 'expo-facebook';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      CurrentUser: "",
      apiUrl: "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Customer?cust_mail=noam@gmail.com&password=123",
      Cust_name: '',
      Cust_id: -1,
      isLoading: true,
      userFacebookData: null,
      isfromFacebook: false,
    };
    this.logInFaceBook = this.logInFaceBook.bind(this);
  }



  handlePassword = async (userFacebookData) => {
    try {
      if (!this.state.isfromFacebook) {
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Customer?cust_mail=" + this.state.email + "&password=" + this.state.password
      } else {
        console.log("try login from faceboook")
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Customer?cust_mail=" + userFacebookData.email + "&password=" + userFacebookData.id
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.length) {
        this.setState(
          {
            isLoading: false,
            dataSource: data,
            Cust_id: data[0].Cust_id,
            Cust_name: data[0].Cust_name
          },
          function () {
            if(!this.state.isfromFacebook){
              // alert(data[0].Cust_name)
            }    
          }
        );
        return true;
      } else {
        if(!this.state.isfromFacebook){
          alert("Sorry We Couldn't find you")
        }
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }


  async logInFaceBook() {
    try {
      await Facebook.initializeAsync({
        appId: '3717779581610741',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
    
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,link,first_name,last_name,email,picture.type(large)`);
        // , `Hi ${(await response.json()).name}!`);
        const userFacebookData = await response.json()
        this.setState({ userFacebookData: userFacebookData, isfromFacebook: true })
        var first_name = userFacebookData.first_name;
        var last_name = userFacebookData.last_name;
        var id = userFacebookData.id;
        var id = userFacebookData.email;

        //try login with facebook data- mabey already exists
        var logedin = await this.handlePassword(userFacebookData)
        if (!logedin) {
          console.log("Need sign up")
          this.signupWithFacebook(userFacebookData)
        } else {
          console.log("already exists")  
        }

      } else {
        // type === 'cancel'
        alert("false")
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  signupWithFacebook = (userFacebookData) => {
    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Customer"
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        Cust_name: userFacebookData.first_name,
        Cust_mail: userFacebookData.email,
        Password: userFacebookData.id,
        Image: '',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(JSON.stringify(responseJson))
        this.setState({ userId: JSON.stringify(responseJson) })
        const { navigation } = this.props;
        navigation.navigate('FBChoosePreferences')
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }


  render() {
    const { navigation } = this.props;
    if (!this.state.isLoading) {
      return (
        <TabControler >{console.log("Inside Tabs")}</TabControler>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.Logo}>DEALEN</Text>
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ email: text })} />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="password..."
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ password: text })}
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
          <TouchableOpacity
            onPress={this.logInFaceBook}
          >
            <Text style={styles.loginText}>SignIn with facebook</Text>
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
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  Logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  }
});
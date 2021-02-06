import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Button } from 'react-native';
import UserList from './UserList';
import TabControler from '../MainTab/TabControler';
import ImagesPicker from './ImagePicker';

export default class SignUp extends React.Component {

    state={
        email:"",
        password:"",
        Fname: "",
        Lname: "",
        CurrentUser: "",
        Img: ''
      }


      handleSignUp = () =>{    
        const { navigation } = this.props;
        if (this.state.email.length > 1){
            navigation.navigate('ChoosePreferences')
        }else{
            alert("Make sure you fill everything")
        }
      }

      
        getId2RemoveFromChild = (url) => {
            this.setState({ Img: [url] })
        }


  render(){
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.Logo}>Welcome</Text>
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
            <View style={styles.inputView}>
            <TextInput  
                style={styles.inputText}
                placeholder="First Name" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({Fname:text})}
                />
            </View>
            <View style={styles.inputView}>
            <TextInput  
                style={styles.inputText}
                placeholder="Last Name" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({Lname:text})}
                />
            </View>
            <View style={styles.ImagesPickerView}>
                <ImagesPicker func = {this.getId2RemoveFromChild} /> 
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={this.handleSignUp}>
              <Text style={styles.loginText}  >Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.FaceBook} onPress={() => navigation.navigate('FaceBookSignup')}>
              <Text style={styles.loginText}>Signup with facebook</Text>
            </TouchableOpacity>
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
        marginTop:20,
        marginBottom:25
      },
      loginText:{
          color: "white"
      },
      Logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginVertical: 40
      },
      ImagesPickerView :{ width:"50%",
      height:40,
      marginBottom:20,
      marginTop: 10,
      justifyContent:"center",
      padding:20,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    pictureText: {color: 'white'},
    FaceBook: {marginBottom: 30}
});


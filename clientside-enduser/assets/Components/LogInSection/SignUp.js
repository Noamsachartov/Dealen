import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Button , Dimensions} from 'react-native';
import UserList from './UserList';
import TabControler from '../MainTab/TabControler';
import ImagesPicker from './ImagePicker';

import { CheckBox } from 'react-native-elements'


// import CheckBox from '@react-native-community/checkbox';



import { useIsFocused } from '@react-navigation/native'
import { LogBox } from 'react-native';
const { width, height } = Dimensions.get('window');
LogBox.ignoreLogs([
 'Non-serializable values were found in the navigation state',
]);
export default class SignUp extends React.Component {

    state={
        email:"",
        password:"",
        Fname: "",
        Lname: "",
        CurrentUser: "",
        Img: '',
        toggleCheckBox_Resturant: false
      }


      handleSignUp = () =>{    
        const { navigation } = this.props;
        if (this.state.email.length > 1){
            navigation.navigate('ChoosePreferences')
        }else{
            alert("Make sure you fill everything")
        }
      }

      
        getImgUrl = (url) => {
            this.setState({ Img: [url] })
        }


        refresh = () => {
              this.setState({toggleCheckBox_Resturant: true}) 
        }


  render(){
    const { navigation, route } = this.props;

    return (
<View style={{flex:1, backgroundColor: '#003f5c'}}>
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
                <ImagesPicker func = {this.getImgUrl} /> 
            </View>
            <View style={styles.checkView}>
              <View style={{marginTop: 0}} >
                <CheckBox
                   
                    checkedColor='#fb5b5a'
                    checked={this.state.toggleCheckBox_Resturant}
                    onPress={() => this.setState({checked: !this.state.toggleCheckBox_Resturant})}
                  />
              
              </View>   
            <TouchableOpacity style={{ width: '80%', height: height/22, marginTop:height/75, width: '60%'}} onPress={() => navigation.navigate('Bylaws', {onGoBack: () => this.refresh()})}>
                  <Text style={{color: 'whitesmoke', }}>I read and confirm The bylaws</Text>
            </TouchableOpacity>         
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={this.handleSignUp}>
              <Text style={styles.loginText} >Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.FaceBook} onPress={() => navigation.navigate('FaceBookSignup')}>
              <Text style={styles.loginText}>Signup with facebook</Text>
            </TouchableOpacity>
      </View>
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
        width: "100%",
        marginVertical: 30
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
        marginBottom:25
      },
      loginText:{
          color: "white"
      },
      Logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginVertical: 20
      },
      ImagesPickerView :{ width:"50%",
      height:40,
      marginBottom:40,
      marginTop: 20,
      justifyContent:"center",
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    pictureText: {color: 'white'},
    FaceBook: {marginBottom: 30},
    checkView: {flex: 1, flexDirection: 'row'}
});


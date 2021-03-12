import * as React from 'react';
import { StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';



export default class Marker extends React.Component {
  state={
    Data: null,
    isLoading: true,
    UserData: null
  }

  componentDidMount =() => {
    //Get User data From Async Storage
    this.LoadUserData();


    //Get Deals for User
    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal";
    return fetch(apiUrl)
    .then(response => response.json())
    .then(responseJson => {
      if(responseJson.length > 0){
        this.setState(
          {
            isLoading: false,
            Data: responseJson,
          },
          function() {
            
          }
        );
      }else {
        alert("Sorry We there have been an error")
      }

    })
    .catch(error => {
      console.error(error);
    });
  }

  LoadUserData = async () => {
    console.log("try load")
    try{
        let UserData = await AsyncStorage.getItem("UserData");
        if (UserData !== null){
            this.setState({UserData: JSON.parse(UserData)})
        }else{
          this.setState({UserData: []});
        }
      
    } catch (error){
        alert(error);
    }
  }




  render(props){

        console.log(this.props.item.coords.latitudeDelta,'map')

    return (
       
            <Marker
            coordinate={{
              latitude:this.props.item.coords.latitude,
              longitude:this.props.item.coords.longitude,
            }}
            title='my place:)'
            description='here i am'
            /> 
    )
  }
}



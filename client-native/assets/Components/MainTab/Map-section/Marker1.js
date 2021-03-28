import * as React from 'react';
import { StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class Marker1 extends React.Component {
  state={
    latitude:35,
    longitude: null,
    isLoading: false

  }

  componentDidMount =() => {
    //Get User data From Async Storage
    this.Location();   
  }

  Location = async () =>{
    this.setState({isLoading: false})
    console.log(this.props.Markeritem.Baddress,"from marker1")
    try{
      let u= await Location.geocodeAsync(this.props.Markeritem.Baddress)
      this.setState({latitude: u[0].latitude });
      this.setState({longitude: u[0].longitude });
      console.log(u[0].latitude,u[0].longitude,"from marker111")
    } catch (e){
      alert(e)
    } finally {
      this.setState({isLoading: true})
    }
    // let u= await Location.geocodeAsync(this.props.Markeritem.Baddress)
    // if(u){
    // console.log(u,'uri')
    // this.setState({latitude: u[0].latitude });
    // this.setState({longitude: u[0].longitude });
    
  } 


  render(props){

    if(this.state.isLoading){

      console.log(this.props.Markeritem.Baddress,this.state.longitude, "from render")
      return (
              <Marker
              coordinate={{
                  latitude: 35,
                  longitude:35,
                
                }}
                title= {this.props.Markeritem.Baddress}
                description={this.props.Markeritem.Baddress}
                key={this.props.Markeritem.bid}
                onPress={()=>this.props.PressMarker(this.props.Markeritem)}
                /> 
        );
        }
      
      else  {
        console.log("halas");
    return(<View></View>)
      }


  }
}



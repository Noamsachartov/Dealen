import * as React from 'react';
import { StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Marker1 from'./Marker1';






export default class Markeritem extends React.Component {
  state={
    
    itemscoords:null,
    loc: null
    //latitude:0,
   // longitude:0

  }


  componentDidMount =() => {

  }
  
  Location = async (loc) =>{
    
    var u = await Location.geocodeAsync(loc);
    this.setState({loc: u });
    return u;
    } 

  render(props){
   
        console.log(this.props.Markeritem,'marker')

        var martkerlist= this.props.Markeritem.map((item, index) => {
          return(
            <Marker1 Markeritem={item} key={index} PressMarker={this.props.PressMarker}/> 
          )
        });

    return (
     <View>{martkerlist}</View>    
    )
  }
}



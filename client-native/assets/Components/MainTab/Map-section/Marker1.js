import * as React from 'react';
import { StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class Marker1 extends React.Component {
  state={
    latitude:null,
    longitude: null,

  }

  componentDidMount =() => {
    //Get User data From Async Storage
    //this.Location();


   
  }

  Location = async () =>{

    let u= await Location.geocodeAsync(this.props.Markeritem.Baddress)
    if(u){
    console.log(u,'uri')
    this.setState({latitude: u[0].latitude });
    this.setState({longitude: u[0].longitude });

  }
    else{
      
      alert("no ,kc")
    }

  }



  render(props){
    console.log(this.props.Markeritem.Baddress)

    // if(this.state.latitude){
      // console.log(this.props.loc)
      console.log(this.props.Markeritem.Baddress,this.state.longitude)


          //console.log(this.props.Markeritem,'map')
      return (
        
              <Marker
              coordinate={{
                  latitude: this.state.latitude,
                  longitude:this.state.longitude,
                
                }}
                title= {this.props.Markeritem.Baddress}
                description={this.props.Markeritem.Baddress}
                key={this.props.Markeritem.bid}
                onPress={()=>this.props.PressMarker(this.props.Markeritem)}
                /> 
        );
      
    //   else  {
    //     console.log("halas");
    // return( 
      
    //     <View></View> 
    //     );
    //   }


  }
}



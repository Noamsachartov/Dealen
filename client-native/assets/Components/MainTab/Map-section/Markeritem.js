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


  componentDidMount =() => {}
    // this.Location();


    //console.log(this.props.Markeritem.Baddress)
    // let u= await Location.geocodeAsync(this.props.Markeritem.Baddress);

    // if(u){
    //   console.log(u[0].longitude,'u')
    //   // alert(address)
    //   }
    //Get User data From Async Storage 
  

  Location = async (loc) =>{
         
     var u = await Location.geocodeAsync(loc);
      this.setState({loc: u });


    } 
  
     
   

  // }
    


       //var u = await Location.geocodeAsync(item.Baddress);
          //var latitude=u[0].latitude;
          //var longitude=u[0].longitude;
           //this.setState({latitude: u[0].latitude});
    //this.setState({longitude: u[0].longitude})


  render(props){
   
        console.log(this.props.Markeritem,'marker')



        var martkerlist= this.props.Markeritem.map((item, index) => {
          // this.Location(item.Baddress);
          

          return(
            <Marker1 Markeritem={item} key={index} PressMarker={this.props.PressMarker}/>
         
             
          )
        });

    return (
     <View>{martkerlist}</View>
       
          
    )
  }
}



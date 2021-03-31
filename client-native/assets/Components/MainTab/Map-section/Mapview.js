import * as React from 'react';
import { StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Markeritem from './Markeritem';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class Mapview extends React.Component {


    state={
       lmarker:null,
    //      { 
    //     "Bus_rest": null,
    //     "Business_Name": "דיזי",
    //     "Business_id": 1,
    //     "Cat_id": 1,
    //     "Category": "אסייתי",
    //     "Coupon": 0,
    //     "Date": "0001-01-01T00:00:00",
    //     "Description": "פוקה פוקה פוקה פוקה פוקה פוקה בחה טעים טעים טעים",
    //     "Discount": 20,
    //     "Endtime": "23:59:00",
    //     "Id": 1,
    //     "Image": "https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg",
    //     "Name": "קערת פוקה",
    //     "Startime": "00:00:00",
    //     "latitude" : 32.0649966,
    //     "longitude": 34.7793597,
    //     "title":'my place:)',
    //   },
    //     {
    //     "Bus_rest": null,
    //     "Business_Name": "דיזי",
    //     "Business_id": 1,
    //     "Cat_id": 1,
    //     "Category": "אסייתי",
    //     "Coupon": 0,
    //     "Date": "0001-01-01T00:00:00",
    //     "Description": "האוכל הטבעוני שלנו מפוצץ חלבון וטעים, בואו במקום האימון עכשיו ב 30 % הנחה",
    //     "Discount": 40,
    //   "Endtime": "12:00:00",
    //     "Id": 2,
    //     "Image": "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg",
    //     "Name": "אוכל טבעוני",
    //     "Startime": "12:00:00",
    //     "latitude" : 32.0679966,
    //     "longitude": 34.793597,
    //     "title":'my place2:)',
    //     "description":'here i am'
    //   },
    //   {
    //     "Bus_rest": null,
    //     "Business_Name": "דיזי",
    //     "Business_id": 1,
    //     "Cat_id": 2,
    //     "Category": "בירה",
    //     "Coupon": 0,
    //     "Date": "0001-01-01T00:00:00",
    //     "Description": "טקסט טקסט טקסט טקסט טקס טקסט",
    //     "Discount": 60,
    //     "Endtime": "12:00:00",
    //     "Id": 3,
    //     "Image": "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg",
    //     "Name": "בירה מהחבית",
    //     "Startime": "12:00:00",
    //     "latitude" : 32.0659966,
    //     "longitude": 34.7794597,
    //     "title":'my place3:)',
    //     "description":'here i am'
    //   }
    //  ]
     }

      componentDidMount =() => {
       
        // this.LoadUserData();
        //Get Deals for User
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Businesses/ActiveRest";
        return fetch(apiUrl)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.length > 0){
            this.setState(
              {
                isLoading: false,
                lmarker: responseJson,
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

  render(props){

if(this.state.lmarker){
    return (
        <View style={{flex:1 , flexDirection: 'row', justifyContent: 'flex-end' }}>
          <MapView
              style={{flex:1 , width: Dimensions.get ('window').width}}
              showsUserLocation={true}
              region={{
                latitude:this.props.item.latitude,
                longitude: this.props.item.longitude,
                latitudeDelta: 0.03 ,
                longitudeDelta: 0.03,
              }} >
       
              <Markeritem Markeritem={this.state.lmarker} PressMarker={this.props.PressMarker}  /> 
          </MapView>
        </View>
    )
  }
  else  {

    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}
}



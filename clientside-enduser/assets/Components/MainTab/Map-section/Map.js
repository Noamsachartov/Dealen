import * as React from 'react';
import { StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity, ScrollView} from 'react-native';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Mapview from './Mapview';
import FullDealViewMap from './FullDealViewMap';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import DealOnMapItem from'./DealOnMapItem';
import ActiveDealMarker from './ActiveDealMarker';



export default class Map extends React.Component {
  state={
    lmarker:[ {
      "Bus_rest": null,
      "Business_Name": "דיזי",
      "Business_id": 1,
      "Cat_id": 1,
      "Category": "אסייתי",
      "Coupon": 0,
      "Date": "0001-01-01T00:00:00",
      "Description": "פוקה פוקה פוקה פוקה פוקה פוקה בחה טעים טעים טעים",
      "Discount": 20,
      "Endtime": "23:59:00",
      "Id": 1,
      "Image": "https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg",
      "Name": "קערת פוקה",
      "Startime": "00:00:00",
      "latitude" : 32.0649966,
      "longitude": 34.7793597,
      "title":'my place:)',
    },
     {
      "Bus_rest": null,
      "Business_Name": "דיזי",
      "Business_id": 1,
      "Cat_id": 1,
      "Category": "אסייתי",
      "Coupon": 0,
      "Date": "0001-01-01T00:00:00",
      "Description": "האוכל הטבעוני שלנו מפוצץ חלבון וטעים, בואו במקום האימון עכשיו ב 30 % הנחה",
      "Discount": 40,
      "Endtime": "12:00:00",
      "Id": 2,
      "Image": "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg",
      "Name": "אוכל טבעוני",
      "Startime": "12:00:00",
      "latitude" : 32.0679966,
      "longitude": 34.793597,
      "title":'my place2:)',
      "description":'here i am'
    },
    {
      "Bus_rest": null,
      "Business_Name": "דיזי",
      "Business_id": 1,
      "Cat_id": 2,
      "Category": "בירה",
      "Coupon": 0,
      "Date": "0001-01-01T00:00:00",
      "Description": "טקסט טקסט טקסט טקסט טקס טקסט",
      "Discount": 60,
      "Endtime": "12:00:00",
      "Id": 3,
      "Image": "https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg",
      "Name": "בירה מהחבית",
      "Startime": "12:00:00",
      "latitude" : 32.0659966,
      "longitude": 34.7794597,
      "title":'my place3:)',
      "description":'here i am'
    }
    ],
  
      
      location: null,
      UserData: null,
      Ismarker: false,

    }
  

    componentDidMount =() => {
      //Get User data From Async Storage
      this.Location();
      this.LoadUserData();
      //this.ShowDeal();
    }
    
    Location = async () =>{
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        this.setState ({errorMessage : 'Permission to access location was denied', });
      }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location});
        // let address='דרך שלמה 62, תל אביב יפו';
        // address= unicode(address.decode('utf8')).encode('utf8')
        let u= await Location.geocodeAsync('נטף')
        if(u){
        console.log(u[0].longitude,'uri')
        // alert(address)
        }
        else{
          alert("no ,kc")
        }

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

    ShowDeal= (marker)=>{
      
      console.log(marker.Business_id,"pin");
      console.log("bla");

      this.setState({Ismarker: true })
    }

    


    render(){
      var  ShowView= <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}} >
      <ActiveDealMarker data={this.state.lmarker} UserData={this.state.UserData} />
      </View>
      if(this.state.location){
        console.log("inside map")
        console.log(this.state.Ismarker)
        return(
          // <ScrollView>
          <View style={styles.container}>
            <View style={styles.inputView} >
              <View style={styles.seconderView}>
                <View>
                  <TextInput  
                  style={styles.inputText}
                  placeholder="חיפוש..." 
                  placeholderTextColor="#003f5c"
                  textAlign={"right"} />
                </View>
                <View >
                  <SearchIcon name="search" size={35} color={"#003f5c"} title="Open camera"  />
                </View>
              </View>
            </View>
            <View style={{flex:2, flexDirection: 'row', justifyContent: 'flex-end'}} >     
            <Mapview item= {this.state.location} PressMarker={this.ShowDeal} /> 
            </View>
            {this.state.Ismarker? ShowView : <View></View>}
            
          </View>
          /* </ScrollView> */
            
        );
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
const styles = StyleSheet.create({
    container: {flex: 1, flexDirection:'column', alignItems: 'center'},
      inputView:{
        width:"95%",
        backgroundColor:"#d7d8db",
        borderRadius:5,
        height:45,
        marginTop: 10,
        justifyContent:"center",
        padding:7
      },
      seconderView: {flex:1, flexDirection: 'row', justifyContent: 'flex-end' },
      CategoryView:{
        backgroundColor:"#003f5c",
        borderRadius:25,
        height:35,
        justifyContent:'center',
        alignItems: 'center',
        padding:10,
        marginHorizontal: 5,
        marginVertical: 10
      },
      inputText:{
        height:30,
        color:"#003f5c",
        
      },
      flatlistview: {flex:2,marginVertical: 20, alignItems: 'center', justifyContent: 'center'},
      categoryList: {color: 'whitesmoke'},
});
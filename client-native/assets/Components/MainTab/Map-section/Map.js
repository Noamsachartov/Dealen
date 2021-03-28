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
import { useNavigation } from '@react-navigation/native';




export default class Map extends React.Component {
  state={
    lmarker:[],    
      location: null,
      UserData: null,
      lactivedeals: false,

      Ismarker: true,
    }
  

    componentDidMount =() => {
      //Get User data From Async Storage
      this.Location();
      this.LoadUserData();
      //  this.ShowDeal();
 
    }

    
    
    Location = async () =>{
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        this.setState ({errorMessage : 'Permission to access location was denied', });
      }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location});
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

    ShowDeal= async ()=>{
      // console.log(marker);
      this.setState({Ismarker: true })


      var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/dealbyRest/"+marker.Bid;
      console.log(apiUrl);
        return fetch(apiUrl)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.length > 0){
            this.setState(
              {
                isLoading: false,
                lactivedeals: responseJson,
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
 
      //console.log(marker.Business_id,"pin");
    


    }

    


    render(props){
      var  ShowView= <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}} >
      <ActiveDealMarker data={this.state.lactivedeals} UserData={this.state.UserData}  />
      {/* navigation={this.props.navigation} */}
      </View>
      if(this.state.location){
        console.log("inside map")

        return(
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
                  <SearchIcon name="search" size={35} color={"#003f5c"} title="Search"  />
                </View>
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}} >     
              <Mapview item={this.state.location} PressMarker={this.ShowDeal} UserData={this.state.UserData}/> 
            </View>
            {this.state.lmarker.length ? ShowView : <View></View>} 
          </View>
            
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
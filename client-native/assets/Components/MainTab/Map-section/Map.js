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
    firstime:0,
    lmarker:[],    
    location: null,
    UserData: null,
    lactivedeals: false,

    Ismarker: false,
    }
  

    componentDidMount =() => {
      //Get User data From Async Storage
      
      this.Location();
      this.LoadUserData();
      //  this.ShowDeal();
 
    }

    
    
    Location = async () =>{
      if(!this.state.firstime!=0){
        console.log(this.state.firstime,'get in');
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        this.setState ({errorMessage : 'Permission to access location was denied', });
      }
        let locationfunc = await Location.getCurrentPositionAsync({});
        let location={
            latitude: locationfunc.coords.latitude,
            longitude:locationfunc.coords.longitude,  
        }
        console.log(location,'object')
        this.setState({ location });
        this.setState({ firstime:1 });
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

    ShowDeal= async (marker)=>{
      console.log(marker);
      console.log(marker, "=====");
      this.setState({Ismarker: true })
      let locationfunc = await Location.geocodeAsync(
        marker.Baddress
      );
      let location={
        latitude: locationfunc[0].latitude,
        longitude:locationfunc[0].longitude,
      }

      console.log(location)
      this.setState({ location});


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
    FreeSearch = (text) => {
      this.setState({
        Search:text,
      })
  
      console.log(this.state.Search)
    }
    
    onEndEditing = () => {
      console.log("!!!!!!!!!!!!!!!")
      if(this.state.Search == ""){
        this.likecomponenetdidmount();
      }else {
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/SearchDeals/" + this.state.Search;
        return fetch(apiUrl)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.length > 0){
            this.setState(
                    {
                      lactivedeals: responseJson,
                      isLodingCategory: false,
                      isLoading: true
                    },
                    function() {
                      
                    }
                  );
                }else {
                  alert("לא מצאנו מבצעים מתאימים לחיפוש")
                  this.likecomponenetdidmount();
                }
          
              })
              .catch(error => {
                console.error(error);
              });
      }
      
    }

    onMapLayout = () => {
      this.setState({ isMapReady: true });
    };

    render(props){
      var  ShowView= <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}} >
      <ActiveDealMarker data={this.state.lactivedeals} UserData={this.state.UserData} navigation={this.props.navigation}/>
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
                  textAlign={"right"}
                  onChangeText={text => this.FreeSearch(text)} 
                  onEndEditing={() => this.onEndEditing()}
                  />
                </View>
                <View >
                  <SearchIcon name="search" size={35} color={"#003f5c"} title="Search"  />
                </View>
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}} >     
              <Mapview item={this.state.location} PressMarker={this.ShowDeal} UserData={this.state.UserData}/> 
            </View>
            {this.state.lactivedeals.length ? ShowView : <View></View>} 
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
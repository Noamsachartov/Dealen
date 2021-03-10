import * as React from 'react';
import { StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function Map() {



  console.log("inside map")
    return (
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

                
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          <MapView
            style={{flex:0.7 , width: Dimensions.get ('window').width-30,}}
            region={{
              latitude:32.157154,
              longitude:34.843893,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            }} >
            <Marker
            coordinate={{
              latitude:32.15715,
              longitude:34.843893
            }}
            title='my place:)'
            description='here i am'
            /> 
          </MapView>                  
        </View>
        </View>
    );
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
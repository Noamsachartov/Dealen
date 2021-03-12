import * as React from 'react';
import { StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';



export default class Mapview extends React.Component {

    state={

      }

      componentDidMount =() => {
       
      }




  render(props){

        console.log(this.props.item.coords.latitudeDelta,'map')

    return (
        <View style={{flex:1 , flexDirection: 'row', justifyContent: 'flex-end' }}>
        <MapView
            style={{flex:1 , width: Dimensions.get ('window').width,}}
            region={{
              latitude:this.props.item.coords.latitude,
              longitude: this.props.item.coords.longitude,
              latitudeDelta: 0.02 ,
              longitudeDelta: 0.02,
            }} >
            <Marker
            coordinate={{
              latitude:this.props.item.coords.latitude,
              longitude:this.props.item.coords.longitude,
            }}
            title='my place:)'
            description='here i am'
            /> 

        </MapView>

        </View>
    )
  }
}



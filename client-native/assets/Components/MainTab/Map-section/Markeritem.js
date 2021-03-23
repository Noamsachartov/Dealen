import * as React from 'react';
import { StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';




export default class Markeritem extends React.Component {
  state={
   
  }

  componentDidMount =() => {
    //Get User data From Async Storage
  }
    




  render(props){

        //console.log(this.props.Markeritem,'marker')

        var martkerlist= this.props.Markeritem.map((item, index,props) => {
          return(
            <Marker
              coordinate={{
                latitude:item.latitude,
                longitude:item.longitude,
              }}
              title= {item.Business_Name}
              description={item.Description}
              key={index}
              onPress={()=>this.props.PressMarker(item)}
              /> 
          )
        })

    return (
     <View>{martkerlist}</View>
       
          
    )
  }
}



import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity , Image,ImageBackground, Dimensions, TouchableWithoutFeedback,FlatList} from 'react-native';
const { width, height } = Dimensions.get('window');
import DealOnMapItem from'./DealOnMapItem';



export default class ActiveDealMarker extends React.Component {

    state={
      isLoading: true

    }


  componentDidMount = () => {
    }
     
  render(){
    console.log("activedealmarker")
    console.log(this.props.UserData)
    if(this.props.data){
      return(
        <FlatList
        data={this.props.data}
        renderItem={({ item }) => {
          console.log(item)
            return <DealOnMapItem UserData={this.props.UserData} item={item} key={item.Id} navigation={this.props.navigation} /> 
        }}
        keyExtractor={(item, index) => 'key' + index}
        scrollEventThrottle={16}
        decelerationRate={"fast"}
    />
 
      )
    }else {
      return (
      <View>
          <Text>Loading..</Text>
      </View>
      );
  }
  }
}


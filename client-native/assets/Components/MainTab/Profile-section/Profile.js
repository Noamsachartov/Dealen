import * as React from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity, FlatList, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window')
import Initprofile from './Initprofile'
export default class Deal extends React.Component {

    state={
        Data: null,
        isLoading: true,
        UserData: [],
        showedit: false,
        toggleCheckBox_Resturant: false,
        toggleCheckBox_Bar: false,
        toggleCheckBox_Caffe: false,
      }

      componentDidMount =() => {
        //Get User data From Async Storage
        this.LoadUserData();
      }

        
    LoadUserData = async () => {
      console.log("try load")
      try{
          let UserData = await AsyncStorage.getItem("UserData");
          if (UserData !== null){
              this.setState({UserData: JSON.parse(UserData),  isLoading: false})
          }else{
            this.setState({UserData: []});
          }
        
      } catch (error){
          alert(error);
      }
    }


  render(){
console.log("Deal Component")
    if(!this.state.isLoading){
      return(
        <View style={{flex:1}}>
          <Initprofile UserData={this.state.UserData} UserId={this.state.UserData.Id}/>
        </View>
      )
    }else {

    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  }
}



const styles = StyleSheet.create({

  });
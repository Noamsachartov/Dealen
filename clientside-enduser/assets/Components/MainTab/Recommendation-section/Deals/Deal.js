import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, FlatList, Button} from 'react-native';
import DealItem from './DealItem'
import FullDealView from './FullDealView';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class Deal extends React.Component {

    state={
        Data: null,
        isLoading: true,
        UserData: null
      }

      componentDidMount =() => {
        //Get User data From Async Storage
        this.LoadUserData();


        //Get Deals for User
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal";
        return fetch(apiUrl)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.length > 0){
            this.setState(
              {
                isLoading: false,
                Data: responseJson,
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


  render(){
console.log("Deal Component")
    if(!this.state.isLoading){
      console.log(this.state.UserData.Id)
      return(
        <View>
          <Text style={styles.Header}>מבצעים</Text>
             <FlatList
                data={this.state.Data}
                renderItem={({ item }) => {
                    return <DealItem UserData={this.state.UserData} item={item} navigation={this.props.navigation} />
                }}
                keyExtractor={(item, index) => 'key' + index}
                scrollEventThrottle={16}
                decelerationRate={"fast"}
            />
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
Header : {fontSize: 24, fontWeight: 'bold', marginHorizontal: 12}
});




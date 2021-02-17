import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, FlatList, Button} from 'react-native';
import DealItem from './DealItem'
import FullDealView from './FullDealView';






export default class Deal extends React.Component {

  // static navigationOptions = {
  //   title:'Home',
  //   headerStyle: {
  //     backgroundColor: 'red'
  //   },
  //   headerTitleStyle: {
  //     color: 'white'
  //   }
  // }

    state={
        Data: null,
        isLoading: true
      }

      componentDidMount =() => {

        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal";
        return fetch(apiUrl)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.length > 0){
            console.log(responseJson)
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

  render(){
console.log("Deal Component")
    if(!this.state.isLoading){
      return(
        <View>
          <Text style={styles.Header}>מבצעים</Text>
             <FlatList
                data={this.state.Data}
                renderItem={({ item }) => {
                    return <DealItem item={item} navigation={this.props.navigation} />
                }}
                keyExtractor={(item, index) => 'key' + index}
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                // removeClippedSubviews={false}
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




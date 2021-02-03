import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, FlatList, Button} from 'react-native';
import DealItem from './DealItem'
import FullDealView from './FullDealView';
import { DealsData } from './DealsData.js'





export default class Deal extends React.Component {

  static navigationOptions = {
    title:'Home',
    headerStyle: {
      backgroundColor: 'red'
    },
    headerTitleStyle: {
      color: 'white'
    }
  }

    state={
        Data: DealsData,
      }

      componentDidMount =() => {
        this.setState({Data: DealsData})
      }

  render(){
console.log("Deal Component")
    if(this.state.Data){
      return(
        <View>
          <Text style={styles.Header}>מבצעים</Text>
             <FlatList
                data={this.state.Data}
                renderItem={({ item }) => {
                  console.log("tryyy")
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




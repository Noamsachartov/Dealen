import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, FlatList} from 'react-native';
import DealItem from './DealItem'
import { DealsData } from './DealsData.js'




export default class Deal extends React.Component {

    state={
        Data: DealsData,
      }

      componentDidMount =() => {
        this.setState({Data: DealsData})
        console.log(DealsData)
      }

  render(){

    if(this.state.Data){
      return(
        <View>
          <Text style={styles.Header}>מבצעים</Text>
             <FlatList
                data={this.state.Data}
                renderItem={({ item }) => {
                    return <DealItem item={item} />
                }}
                keyExtractor={(item, index) => 'key' + index}
                // horizontal
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                // showsHorizontalScrollIndicator={false}
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
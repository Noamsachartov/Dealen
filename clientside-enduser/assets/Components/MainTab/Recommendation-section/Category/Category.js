import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, FlatList} from 'react-native';
import CategoryItem from './CategoryItem'
import { CategoryData } from './CategoryData'





export default class Category extends React.Component {

    state={
        Data: CategoryData,
        isLoading: true
      }

      componentDidMount =() => {

        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Category";
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

    if(!this.state.isLoading){
      return(
        <View>
          <Text style={styles.Header}>קטגוריות</Text>
             <FlatList
                data={this.state.Data}
                renderItem={({ item }) => {
                    return <CategoryItem item={item} navigation={this.props.navigation}  />
                }}
                keyExtractor={(item, index) => 'key' + index}
                horizontal
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                inverted={true}
            />
        </View>
      )
    }else {

    return (
      <View>
        <Text>Loading categories</Text>
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
Header : {fontSize: 24, fontWeight: 'bold', marginHorizontal: 12}
});
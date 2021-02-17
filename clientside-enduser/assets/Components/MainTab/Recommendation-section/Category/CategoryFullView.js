import * as React from 'react';
import { Text, View,FlatList,StyleSheet } from 'react-native';
import DealItem from '../Deals/DealItem';


export default class CategoryFullView extends React.Component {
  state={
    Data: null,
    categoryName: '',
    isLoading: true
  }

  componentDidMount = () => {
    const { navigation, route } = this.props;
    this.setState({
      categoryId: JSON.stringify(route.params.categoryId),
      categoryName: route.params.categoryName
    })
    console.log(route.params.categoryId)

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

   
  render(){
    const { navigation, route } = this.props;

    if(!this.state.isLoading){
      return(
        <View>
        <Text style={styles.Header}>{this.state.categoryName}</Text>
           <FlatList
              data={this.state.Data}
              renderItem={({ item }) => {
                  return <DealItem item={item} navigation={this.props.navigation} />
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
        <Text>Loading</Text>
    </View>
      );
    }
  }
}



const styles = StyleSheet.create({
  Header : {fontSize: 24, fontWeight: 'bold', marginHorizontal: 22}
  });
  
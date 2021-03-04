import * as React from 'react';
import { Text, View,FlatList,StyleSheet } from 'react-native';
import DealItem from '../Recommendation-section/Deals/DealItem';


export default class CategoryFullView extends React.Component {
  state={
    Data: null,
    categoryName: '',
    isLoading: true
  }

  componentDidMount = () => {
    const { navigation, route } = this.props;
    this.setState({
      categoryId: 2,
      categoryName: 'sdf',
      isLoading: false,
      Data: this.props.Data,
    })           
  }

   
  render(){
    const { navigation, route } = this.props;

    if(!this.state.isLoading){
      return(
        <View>
        {/* <Text style={styles.Header}>{this.state.categoryName}</Text> */}
           <FlatList
              data={this.state.Data}
              renderItem={({ item }) => {
                  return <DealItem UserData={this.props.UserData} item={item} navigation={this.props.navigation} />
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
  
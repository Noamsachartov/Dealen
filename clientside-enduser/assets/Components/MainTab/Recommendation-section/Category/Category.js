import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, FlatList} from 'react-native';
import CategoryItem from './CategoryItem'
import { CategoryData } from './CategoryData'





export default class Category extends React.Component {

    state={
        Data: CategoryData,
      }

      componentDidMount =() => {
        this.setState({Data: CategoryData})
        console.log(CategoryData)
      }

  render(){

    if(this.state.Data){
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
        <Text>SDFS</Text>
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
Header : {fontSize: 24, fontWeight: 'bold', marginHorizontal: 12}
});
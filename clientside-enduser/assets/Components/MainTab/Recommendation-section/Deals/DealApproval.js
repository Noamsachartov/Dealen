import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity , Image,ImageBackground, Dimensions, TouchableWithoutFeedback} from 'react-native';

const { width, height } = Dimensions.get('window')


export default class DealApproval extends React.Component {

    state={
      like: false,
      isLoading: true
    }


    DiscountImplementaion = () => {
      console.log("Discount Implementaion")
      //post וקבלה חזרה קוד חד פעמי
    }

    componentDidMount = () => {
    const { navigation, route } = this.props;
    this.setState({dealId: JSON.stringify(route.params.dealId), isLoading: false})
     
    }

     
  render(){
    const { navigation, route } = this.props;
    if(!this.state.isLoading){
        console.log(this.state.dealId)
      return(
        <View style={{flex:1}}>
            <Text></Text>
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
 
});
import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity , Image,ImageBackground, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Loading from '../LoadingComp.js';
const { width, height } = Dimensions.get('window')


export default class DealApproval extends React.Component {

    state={
      like: false,
      isLoading: true,
      state: true
    }


    DiscountImplementaion = () => {
      console.log("Discount Implementaion")
      //post וקבלה חזרה קוד חד פעמי
    }

    componentDidMount = () => {
    const { navigation, route } = this.props;
    this.setState({dealId: JSON.stringify(route.params.dealId),CustomerId: JSON.stringify(route.params.CustomerId)})
    console.log("From APPROVAL",JSON.stringify(route.params.CustomerId))
    setInterval(() => {
      this.setState({
        isLoading: false
      });
    }, 3000);

    }

     
  render(){
    const { navigation, route } = this.props;
    if(!this.state.isLoading){
        
      return(
        <View style={{flex:1}}>
            <Text>number</Text>
        </View>
      )
    }else {
      return (
      <View>
          <Loading title={'מכינים לך מספר ייחודי...'}/>
      </View>
      );
  }
  }
}

const styles = StyleSheet.create({
 
});
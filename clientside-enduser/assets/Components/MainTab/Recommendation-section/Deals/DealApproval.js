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
    this._isMounted = true;
    const { navigation, route } = this.props;
    this.setState({dealId: JSON.stringify(route.params.dealId),CustomerId: JSON.stringify(route.params.CustomerId)})
    setInterval(() => {
      this.setState({
        isLoading: false
      });
    }, 3000);

    }
    componentWillUnmount(){
      //fix the the bug - Can't perform a React state update on an unmounted component
      this._isMounted = false;
    }

     
  render(){
    const { navigation, route } = this.props;
    if(!this.state.isLoading){
        
      return(
        <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#003f5c'}}>
            <Text style={{fontSize: 30, marginBottom: 30, color: 'white'}}>הצג קוד זה למארחת</Text>
            <Text style={{fontSize: 50, color: 'white', letterSpacing: 35}}>12345</Text>
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
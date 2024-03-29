import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity , Image,ImageBackground, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Loading from '../LoadingComp.js';
const { width, height } = Dimensions.get('window')


export default class DealApproval extends React.Component {

    state={
      like: false,
      isLoading: true,
      state: true,
      coupon: ''
    }


    // DiscountImplementaion = () => {
    //   console.log("Discount Implementaion")
    //   //post וקבלה חזרה קוד חד פעמי
    // }

    componentDidMount = () => {
    this._isMounted = true;
    const { navigation, route } = this.props;
    this.setState({dealId: JSON.stringify(route.params.dealId),CustomerId: JSON.stringify(route.params.CustomerId)})
    setInterval(() => {
      this.setState({
        isLoading: false
      });
    }, 3000);

    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/DealInCust"
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        Dealinbus_id: JSON.stringify(route.params.dealId),
        Dealincust_id: JSON.stringify(route.params.CustomerId),
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({coupon: JSON.stringify(responseJson)})
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });



    }



    componentWillUnmount(){
      //fix the the bug - Can't perform a React state update on an unmounted component
      this._isMounted = false;
    }

     
  render(){
    const { navigation, route } = this.props;
    if(!this.state.isLoading && this.state.coupon.length){
        
      return(
        <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#003f5c'}}>
            <Text style={{fontSize: 30, marginBottom: 30, color: 'white'}}>הצג קוד זה למארחת</Text>
            <Text style={{fontSize: 40, color: 'white', letterSpacing: 35}}>{this.state.coupon}</Text>
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
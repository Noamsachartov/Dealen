import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity , Image,ImageBackground, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Loading from '../LoadingComp.js';
import { DealContext } from '../../../../Context/DealContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window')


export default class DealApproval extends React.Component {
  static contextType = DealContext;
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
    this.setState({dealId: JSON.stringify(route.params.dealId),CustomerId: JSON.stringify(route.params.CustomerId), Data: route.params.Data})
    setInterval(() => {
      this.setState({
        isLoading: false
      });
    }, 3000);

    this.LoadToken();
    // var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/DealInCust"
    // console.log("The Token from the fetch: " + this.state.Token)
    // fetch(apiUrl, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     Dealinbus_id: JSON.stringify(route.params.dealId),
    //     Dealincust_id: JSON.stringify(route.params.CustomerId),
    //     Token: this.state.Token
    //   }),
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson);
    //     this.setState({coupon: JSON.stringify(responseJson)})
    //     this.context.showDeal(true, this.state.Data,JSON.stringify(responseJson))
    //   })
    //   .catch((error) => {
    //     alert(JSON.stringify(error));
    //     console.error(error);
    //   });



    }


    LoadToken = async () => {
      const { navigation, route } = this.props;
      console.log("try load")
      try{
          let Token = await AsyncStorage.getItem("Token");
          if (Token !== null){
              this.setState({Token: JSON.parse(Token)})



              var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/DealInCust";
              let tokenpar = JSON.parse(Token)
              console.log("The Token from the fetch: " + JSON.stringify(tokenpar.Tokenum))
              fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({
                  Dealinbus_id: JSON.stringify(route.params.dealId),
                  Dealincust_id: JSON.stringify(route.params.CustomerId),
                  Token: JSON.stringify(tokenpar.Tokenum)
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
                  this.context.showDeal(true, this.state.Data,JSON.stringify(responseJson))
                })
                .catch((error) => {
                  alert(JSON.stringify(error));
                  console.error(error);
                });


          }else{
            this.setState({Token: []});
          }
        
      } catch (error){
          alert(error);
      }
    }






    // componentWillUnmount(){
    //   //fix the the bug - Can't perform a React state update on an unmounted component
    //   this._isMounted = false;
    // }

    componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state,callback)=>{
          return;
      };
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
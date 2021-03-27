import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity , Image,ImageBackground, Dimensions, TouchableWithoutFeedback, Share} from 'react-native';
import TimerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DiscountIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DealContext } from '../../../../Context/DealContext';

const { width, height } = Dimensions.get('window')



export default class FullDealView extends React.Component {
  static contextType = DealContext;

    state={
      like: false,
      isLoading: true,
      islikealready: "2"

    }


    handleLike = ()=> {
      console.log("pressed")
      const { navigation, route } = this.props;
      if(!this.state.like && this.state.islikealready == 2){
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/DealInCust/like/2/True/" + JSON.stringify(route.params.CustomerId)+ "/" +JSON.stringify(route.params.dealId);
      }else if(!this.state.like && this.state.islikealready == 1){
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/DealInCust/like/1/True/" + JSON.stringify(route.params.CustomerId)+ "/" +JSON.stringify(route.params.dealId);
      }
      else{
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/DealInCust/Unlike/1/True/" + JSON.stringify(route.params.CustomerId)+ "/" +JSON.stringify(route.params.dealId);
      }

      fetch(apiUrl, {
        method: 'PUT',
        body: JSON.stringify({
        
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({like: !this.state.like})
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          console.error(error);
        });

      
    }

    
    handleWhatsapp = ()=> {
      console.log("Share pressed")
      this.onShare();
    }

     onShare = async () => {
      try {
        const result = await Share.share({
          message: 'היי! ראיתי מבצע מפחיד באפליקציית DEALEN ' +  ' המבצע הוא '  +this.state.Data[0].Name+ ' זה נמצא ב' +this.state.Data[0].Business_Name + " בכתובת: " + this.state.Data[0].Bus_rest.Baddress + ' כל הפרטים באפליקצייה!'
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

    DiscountImplementaion = () => {
      if(this.context.isShow === true) return;

      console.log("Discount Implementaion")
      const { navigation, route } = this.props;
      navigation.navigate('DealApproval',{dealId: route.params.dealId, CustomerId: route.params.CustomerId, Data: this.state.Data})
      
    }

    componentDidMount = () => {
      this._isMounted = true;
      this.islikealready();
      const { navigation, route } = this.props;
      this.setState({categoryId: JSON.stringify(route.params.categoryId), dealId: JSON.stringify(route.params.dealId) ,CustomerId: JSON.stringify(route.params.CustomerId)})
      //Get Deal Data By Deal Id
      var DealId = JSON.stringify(route.params.dealId);
      var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/deal/" + DealId;
      return fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson){
          this.setState(
            {
              isLoading: false,
              Data: responseJson,
            },
            function() {
              
            }
          );
        }else {
          alert("Sorry there have been an error")
        }
      })
      .catch(error => {
        console.error(error);
      });
    }


    islikealready=()=>{
      const { navigation, route } = this.props;
      var DealId = JSON.stringify(route.params.dealId);
      var CustomerId = JSON.stringify(route.params.CustomerId);
console.log(DealId)
      var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/CheckIsLike/" + DealId + "/" + CustomerId;
      return fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.length){
          if(!responseJson[0].IsLike){
            console.log(responseJson[0].IsLike,"falseer")
            this.setState(
              {
                islikealready: "1",
                
              },
              function() {
                
              }
            );
          }else {
            console.log("true")
            this.setState({
              like: !this.state.like,
              islikealready: "1",
            })
            
          }
          
        }else{
          this.setState({
            islikealready: "2",
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
    }

    componentWillUnmount(){
      //fix the the bug - Can't perform a React state update on an unmounted component
      this._isMounted = false;
    }
     
  render(){
    const { navigation, route } = this.props;
    if(!this.state.isLoading){
      return(
        <View style={{flex:1}}>
          <View style={styles.mainView}>
            <ImageBackground style={styles.image} source={{ uri: this.state.Data[0].Image }}>
              <View style={{flex:1}}>
              </View>
              <View style={styles.hederView}>
                <Text style={styles.BusinessName}>{this.state.Data[0].Business_Name}</Text>
                <Text style={styles.DealName}>{this.state.Data[0].Name}</Text>
                <Text style={styles.DealDescription}>{this.state.Data[0].Description}</Text>
                  <View style={styles.IconView}>
                        <View style={styles.TimerView}>
                            <TimerIcon style={styles.TimerIcon} name="timer-sand-empty" size={30} />
                            <Text style={styles.timeText} >00 דק'</Text>
                        </View>
                        <View>
                            <DiscountIcon style={styles.DiscountIcon} name="ticket-percent-outline" size={30} />
                            <Text style={styles.DiscountText}>{this.state.Data[0].Discount}%</Text>
                        </View>
                    </View>
              </View>
              <View style={{flex:1}}>
                      <View style={styles.IconView2}>
                        <View style={styles.viewWaLike}>
                          <TouchableWithoutFeedback onPress={this.handleLike}>
                            <TimerIcon  color={this.state.like ? '#fb5b5a' : 'whitesmoke'} style={{backgroundColor: '#003f5c', borderRadius: 100, height: 60, width: 60, padding: 10}} name="heart-outline" size={40} />
                          </TouchableWithoutFeedback>
                        </View>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                          <TouchableWithoutFeedback onPress={this.handleWhatsapp}>
                            <TimerIcon style={styles.WaIcon} name="whatsapp" size={40} />
                          </TouchableWithoutFeedback>
                        </View>
                    </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.viewBusinessDeatel}>
            <View style={styles.second_viewBusinessDeatel}>
              <Text>{this.state.Data[0].Bus_rest.Bdescription}</Text>
              <Text>כתובת: {this.state.Data[0].Bus_rest.Baddress}</Text>
              <Text>שעות פעילות: {this.state.Data[0].Bus_rest.Opentime} - {this.state.Data[0].Bus_rest.Closetime}</Text>
              <Text>מספר טלפון: {this.state.Data[0].Bus_rest.Bphone}</Text>
            </View>
          </View>
          <View style={styles.viewimplemntation}>
            {!this.context.isShow && 
            <TouchableWithoutFeedback onPress={this.DiscountImplementaion} >
                <View style={styles.Secondery_viewimplemntation}>
                  <Text style={styles.approveText}>אישור</Text>
                </View>
              </TouchableWithoutFeedback>
              }
              
              {this.context.isShow && <Text>קיים מבצע פעיל אחר</Text>}
          </View>
        </View>
      )
    }else {
      return (
      <View>
          <Text>Loading..</Text>
      </View>
      );
  }
  }
}

const styles = StyleSheet.create({
  mainView: {flex:2, backgroundColor: '#003f5c'},
  hederView: {flex:3, backgroundColor: '#003f5c', opacity: 0.8 ,shadowColor: '#fff',shadowOpacity: 0.9,shadowRadius: 5,elevation: 2, flexDirection: 'column', alignItems: 'center'},
  BusinessName: {color: 'white', fontWeight: 'bold', fontSize: 40},
  DealName: {color: 'white', fontWeight: 'bold', fontSize: 15},
  DealDescription: {color: 'white', fontSize: 15, width: width-20},
  image: {flex: 1, },
  IconView: {flex: 1, flexDirection: 'row', position: 'absolute', bottom: 1},
  IconView2: {flex: 1, flexDirection: 'row', position: 'relative', bottom: -26, zIndex: 9999},
  TimerView: {marginRight: 30},
  timeText: {color:"white", fontSize:18},
  DiscountText: {color:"white", fontSize:18},
  TimerIcon: {color: '#b04c00'},
  DiscountIcon: {color: '#00961e'},
  viewWaLike: {flex:1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
  WaIcon: {backgroundColor: '#003f5c', borderRadius: 100, height: 60, width: 60, padding: 10, color: 'whitesmoke'},
  viewBusinessDeatel: {flex:1.2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  second_viewBusinessDeatel: {marginVertical:40, marginHorizontal: 10 },
  viewimplemntation: {flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
  Secondery_viewimplemntation: {alignSelf: 'center',justifyContent:'center', backgroundColor: '#003f5c', width: width/2, height:height/10, borderRadius: 20},
  approveText: {color:'whitesmoke',fontSize:30, position: 'absolute', right: width/6.5},
});
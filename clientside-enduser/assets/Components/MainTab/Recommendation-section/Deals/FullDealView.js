import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity , Image,ImageBackground, Dimensions, TouchableWithoutFeedback, I18nManager} from 'react-native';
import TimerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DiscountIcon from 'react-native-vector-icons/MaterialCommunityIcons'
const { width, height } = Dimensions.get('window')

I18nManager.allowRTL(true)


export default class FullDealView extends React.Component {

    state={
      title: 'בירה היינקן', url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
      description: "בואו לאכול אצלנו בשוק ותקבלו מתנה תבלינים בואו לאכול אצלנו בשוק ותקבלו מתנה תבלינים",
      BusinessName: "פורט 19 - שלמה המלך",
      DiscountDescription: "40%",
      TimeLeft: "30",
      id: 1,
      like: false

    }


    handleLike = ()=> {
      console.log("pressed")
      this.setState({like: !this.state.like})
    }

    
    handleWhatsapp = ()=> {
      console.log("wa pressed")
    }

    DiscountImplementaion = () => {
      console.log("Discount Implementaion")
      //post וקבלה חזרה קוד חד פעמי
    }

    componentDidMount = () => {
      const { navigation, route } = this.props;
      this.setState({categoryId: JSON.stringify(route.params.categoryId)})
      //get all data about the category
      //update state
    }

     
  render(){
    const { navigation, route } = this.props;
    if(this.state.categoryId){
      return(
        <View style={{flex:1}}>
          <View style={{flex:2, backgroundColor: '#003f5c'}}>
            <ImageBackground style={styles.image} source={{ uri: this.state.url }}>
              <View style={{flex:1}}>

              </View>
              <View style={{flex:3, backgroundColor: '#003f5c', opacity: 0.8 ,shadowColor: '#fff',shadowOpacity: 0.5,shadowRadius: 5,elevation: 2, flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{color: 'whitesmoke', fontWeight: 'bold', fontSize: 40}}>שם העסק</Text>
                <Text style={{color: 'whitesmoke', fontWeight: 'bold', fontSize: 15}}>שם המבצע</Text>
                <Text style={{color: 'whitesmoke', fontSize: 15, width: width-20}}>פרטים על המבצע פרטים על המבצע פרטים פרטים על  על המבצע פרטים על המבצע פרטים על המבצע</Text>
                  <View style={styles.IconView}>
                        <View style={styles.TimerView}>
                            <TimerIcon style={styles.TimerIcon} name="timer-sand-empty" size={30} />
                            <Text style={{color:"whitesmoke", fontSize:18}} >30 דק'</Text>
                        </View>
                        <View>
                            <DiscountIcon style={styles.DiscountIcon} name="ticket-percent-outline" size={30} />
                            <Text style={{color:"whitesmoke", fontSize:18}}>25%</Text>
                        </View>
                    </View>
              </View>
              <View style={{flex:1}}>
                      <View style={styles.IconView2}>
                        <View style={{flex:1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                          <TouchableWithoutFeedback onPress={this.handleLike}>
                            <TimerIcon  color={this.state.like ? '#fb5b5a' : 'whitesmoke'} style={{backgroundColor: '#003f5c', borderRadius: 100, height: 60, width: 60, padding: 10}} name="heart-outline" size={40} />
                          </TouchableWithoutFeedback>
                           
                        </View>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                          <TouchableWithoutFeedback onPress={this.handleWhatsapp}>
                            <TimerIcon style={{backgroundColor: '#003f5c', borderRadius: 100, height: 60, width: 60, padding: 10, color: 'whitesmoke'}} name="whatsapp" size={40} />
                          </TouchableWithoutFeedback>
                        </View>
                    </View>
              </View>
            </ImageBackground>
            
          </View>
          <View style={{flex:0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{marginVertical:40, marginHorizontal: 10 }}>
              <Text>פרטים על העסק פרטים על העסק</Text>
              <Text>כתובת: בלה בלה בלה בלה בלה</Text>
              <Text>שעות פעילות: א'-ה': 14:00-02:00 ו': 10:00-23:30</Text>
            </View>
              
          </View>
          <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableWithoutFeedback onPress={this.DiscountImplementaion} >
                <View style={{alignSelf: 'center',justifyContent:'center', backgroundColor: '#003f5c', width: width/2, height:height/10, borderRadius: 20}}>
                  <Text style={{color:'whitesmoke',fontSize:30, position: 'absolute', right: width/6.5}}>אישור</Text>
                </View>
              </TouchableWithoutFeedback>
          </View>
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
  image: {flex: 1, },
  IconView: {flex: 1, flexDirection: 'row', position: 'absolute', bottom: 1},
  IconView2: {flex: 1, flexDirection: 'row', position: 'relative', bottom: -26, zIndex: 9999},
  TimerView: {marginRight: 30},
  TimerIcon: {color: '#b04c00'},
  DiscountIcon: {color: '#00961e'}
});
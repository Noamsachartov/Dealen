import * as React from 'react';
import RecentListDeal from '../Search-section/RecentListDeal'
import { StyleSheet, Text, View,Dimensions,TouchableOpacity, FlatList, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window')
import Slider from '@react-native-community/slider'
import SkipIcon from 'react-native-vector-icons/AntDesign';
import { color } from 'react-native-reanimated';

import { CheckBox } from 'react-native-elements'
export default class Deal extends React.Component {

    state={
        Data: null,
        isLoading: true,
        UserData: [],
        showedit: false,
        toggleCheckBox_Resturant: false,
        toggleCheckBox_Bar: false,
        toggleCheckBox_Caffe: false,
      }

      componentDidMount =() => {
        //Get User data From Async Storage
        console.log("whyyyy")
        this.LoadUserData();
      }



      LoadUserData = async () => {
        console.log("try load")
        try{
            let UserData = await AsyncStorage.getItem("UserData");
            if (UserData !== null){
                this.setState({UserData: JSON.parse(UserData), isLoading: false})
                console.log(this.state.UserData)
            }else{
              this.setState({UserData: []});
            }
          
        } catch (error){
            alert(error);
        }
      }

      updatep = () => {
        this.setState({showedit: true})
      }

      onValueChange(value) {
        this.setState({ radios: value });
      }
      saveclose = () => {
        this.setState({showedit: false})
      }
  render(){
console.log("Deal Component")
    if(!this.state.isLoading){
      return(
        <View style={{flex:1}}>
          <View style={{flex:1}}>
            <Text style={styles.Header}>שלום {this.state.UserData.UserName}</Text>
            <Image style={styles.image} source={{ uri: 'https://scontent.ftlv1-1.fna.fbcdn.net/v/t1.6435-9/131919398_10219682015587064_7445995433781091962_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Kd3N3dMalxsAX-kXPhn&_nc_ht=scontent.ftlv1-1.fna&oh=5165482a2a5123c813819950666be8fe&oe=60BC04AE' }} />
          </View>

          <View style={{flex:0.5}}>
            <View style={{flex:0.4, justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize: 20}}>חסכת עד כה x ש''ח</Text>
            </View>
            <TouchableOpacity style={{flex:0.2, justifyContent:'center', alignItems:'center'}} onPress={this.updatep} >
                 <Text style={styles.Headersecond} >עדכן העדפות</Text>
            </TouchableOpacity>
          </View>
          {this.state.showedit && 
          <View style={{flex:1.3}}>
            <View style={styles.sliderView}>
            <Text style={styles.radiosText}>{this.state.radios} רדיוס</Text>
                 <Slider 
                  minimumValue={1}
                  maximumValue={100}
                  width={width-20}
                  minimumTrackTintColor="#fb5b5a"
                  thumbTintColor="#003f5c"
                  step={1}
                  value={50}
                  onValueChange={value => this.onValueChange(value)}
                 />
            </View>

            <View style={styles.checkboxView}>
                <View style={styles.checkrowview}>
                    <View>
                    <CheckBox
                    title='מסעדה'
                    containerStyle={{backgroundColor: '#003f5c',borderWidth: 0}}
                    textStyle={{color: 'whitesmoke'}}
                   checkedColor='#fb5b5a'
                   checked={this.state.toggleCheckBox_Resturant}
                   onPress={() => this.setState({toggleCheckBox_Resturant: !this.state.toggleCheckBox_Resturant})}
                 />
                    </View>
                </View>
               <View style={styles.checkrowview}>
                    <View>
                    <CheckBox
                    title='פאב'
                    containerStyle={{backgroundColor: '#003f5c',borderWidth: 0}}
                    textStyle={{color: 'whitesmoke'}}
                   checkedColor='#fb5b5a'
                   checked={this.state.toggleCheckBox_Bar}
                   onPress={() => this.setState({toggleCheckBox_Bar: !this.state.toggleCheckBox_Bar})}
                 />
                    </View>
               </View>
               <View  style={styles.checkrowview}>
                    <View>
                    <CheckBox
                      title='בית קפה'
                      containerStyle={{backgroundColor: '#003f5c',borderWidth: 0}}
                      textStyle={{color: 'whitesmoke'}}
                      checkedColor='#fb5b5a'
                      checked={this.state.toggleCheckBox_Caffe}
                      onPress={() => this.setState({toggleCheckBox_Caffe: !this.state.toggleCheckBox_Caffe})}
                    />
                    </View>
               </View>
            </View>
            <TouchableOpacity style={{flex:0.4, flexDirection:'column', alignItems:'center', justifyContent:'center'}} onPress={this.saveclose} >
                 <Text style={styles.Header} >שמור</Text>
            </TouchableOpacity>
          </View>
          }
          {/* <updateP UserData={this.state.UserData}/> */}
          {!this.state.showedit && 
                  <View style={{flex:1}}>
                    <RecentListDeal UserData={this.state.UserData}/>
                  </View>
          }
        </View>
      )
    }else {

    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  }
}



const styles = StyleSheet.create({
  Header : {fontSize: 24, fontWeight: 'bold', marginTop:10, marginRight:10},
  Headersecond : {fontSize: 20, fontWeight: '900', marginHorizontal: 12},
  image: {
    marginLeft: 10,
    width: width/2,
    height: height / 5,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    },
    sliderView: {flex: 1},
    radiosText: {flex:0.3, alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: '#003f5c' },
    checkboxView: {flex:1,width: width, flexDirection: 'row-reverse'},
    checkrowview: {flex:0.5, flexDirection: 'row', justifyContent: 'flex-end'}, 
  });
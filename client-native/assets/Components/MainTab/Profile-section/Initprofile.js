import * as React from 'react';
import RecentListDeal from '../Search-section/RecentListDeal'
import { StyleSheet, Text, View,Dimensions,TouchableOpacity, FlatList, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window')
import Slider from '@react-native-community/slider'
import SkipIcon from 'react-native-vector-icons/AntDesign';
import { color } from 'react-native-reanimated';

import { CheckBox, ThemeConsumer } from 'react-native-elements'
export default class Deal extends React.Component {

    state={
        Data: null,
        isLoading: true,
        UserData: [],
        showedit: false,
        toggleCheckBox_Resturant: false,
        toggleCheckBox_Bar: false,
        toggleCheckBox_Caffe: false,
        titleupdate: 'עדכון העדפות',
        typearr: "",
        radios: 50
      }

      componentDidMount =() => {
        //Get User data From Async Storage
        // this.LoadUserData();
        console.log("props: " + this.props)
        this.getTotalsaved();
      }



      // LoadUserData = async () => {
      //   console.log("try load")
      //   try{
      //       let UserData = await AsyncStorage.getItem("UserData");
      //       if (UserData !== null){
      //           this.setState({UserData: JSON.parse(UserData), isLoading: false})
      //           console.log(this.state.UserData)
      //       }else{
      //         this.setState({UserData: []});
      //       }
          
      //   } catch (error){
      //       alert(error);
      //   }
      // }

      getTotalsaved = () =>{
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Customer/GetCustomer/" + this.props.UserId + "" ;
        console.log("the api url: " + apiUrl)
        return fetch(apiUrl)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.length > 0){
            this.setState(
              {
                isLoading: false,
                Data: responseJson,
              },
            );
          }else {
            alert("Sorry We there have been an error")
          }
  
        })
        .catch(error => {
          console.error(error);
        });
      }

      updatep = () => {
        if(!this.state.showedit){
          this.setState({showedit: true, titleupdate: 'בטל עדכון'})
        }else{
          // this.setState({showedit: false, titleupdate: 'עדכון העדפות'})
          this.saveclose()
        }
      }

      onValueChange(value) {
        this.setState({ radios: value });
      }
      saveclose = () => {
        this.setState({showedit: false,  titleupdate: 'עדכון העדפות'})
      }

      handlePostPreferences = ()=>{
        console.log("post")
        
        if(this.state.toggleCheckBox_Resturant){
          var resturant = "מסעדה";
        }else{
          var resturant = "";
        }

        if(this.state.toggleCheckBox_Bar){
          var bar = "בר";
        }else{
          var bar = "";
        }

        if(this.state.toggleCheckBox_Caffe){
          var caffe = "בית קפה";
        }else{
          var caffe = "";
        }
        
        if (resturant.length > 1 && bar.length>1 && caffe.length > 1){
          var join = `${resturant},${bar},${caffe}`;
        }else if(resturant.length > 1 && bar.length>1 && caffe.length < 2){
          var join = `${resturant},${bar}`;
        }else if(resturant.length > 1 && bar.length<2 && caffe.length > 1){
          var join = `${resturant},${caffe}`;
        }else if(resturant.length < 2 && bar.length>1 && caffe.length > 1){
          var join = `${bar},${caffe}`;
        }else if(resturant.length < 2 && bar.length<2 && caffe.length > 1){
          var join = `${caffe}`;
        }else if(resturant.length < 2 && bar.length>1 && caffe.length <2){
          var join = `${bar}`;
        }else if(resturant.length > 1 && bar.length<2 && caffe.length <2){
          var join = `${resturant}`;
        }else{
          var join = ``;
        }
        
        console.log("Joined types: "+ join, "resturant: " +resturant + " bar: " + bar +" caffe: " +caffe)
        this.setState({typearr: join })


      
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Customer/Updateinitial/" +this.props.UserId + "";
        console.log("this api initial: " + apiUrl);
        fetch(apiUrl, {
          method: 'PUT',
          body: JSON.stringify({
            P_type: join,
            P_distance: this.state.radios.toString(),
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            this.saveclose()
          })
          .catch((error) => {
            alert(JSON.stringify(error));
            console.error(error);
          });

        // navigation.navigate('Login')
      }



  render(props){
console.log("Deal Component")
    if(!this.state.isLoading){
      console.log("Total save: "+ this.state.Data[0].Cust_fname)
      return(
        <View style={{flex:1}}>
          <View style={{flex:1}}>
            <Text style={styles.Header}>שלום {this.state.Data[0].Cust_fname}</Text>
            <Image style={styles.image} source={{ uri: this.state.Data[0].Image }} />
          </View>

          <View style={{flex:0.5}}>
            <View style={{flex:0.4, justifyContent:'center', alignItems:'center', marginBottom: 10}}>
              <Text style={{fontSize: 20}}>חסכת עד כה <Text style={{fontSize: 26, fontWeight:'bold'}}>{this.state.Data[0].Totalsave}</Text> ש''ח</Text>
            </View>
            <TouchableOpacity style={{flex:0.2, justifyContent:'center', alignItems:'center'}} onPress={this.updatep} >
                 <Text style={styles.Headersecond} >{this.state.titleupdate}</Text>
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
            <TouchableOpacity style={{flex:0.4, flexDirection:'column', alignItems:'center', justifyContent:'center'}} onPress={this.handlePostPreferences} >
                 <Text style={styles.Header} >שמור</Text>
            </TouchableOpacity>
          </View>
          }
          {/* <updateP UserData={this.state.UserData}/> */}
          {!this.state.showedit && 
                  <View style={{flex:1}}>
                    <RecentListDeal UserData={this.props.UserData}/>
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
import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Button, FlatList, Dimensions, TouchableWithoutFeedback, Switch } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider'
import SkipIcon from 'react-native-vector-icons/AntDesign';
import { CategoryData } from '../MainTab/Recommendation-section/Category/CategoryData'
import TabControler from '../MainTab/TabControler';
import ImagesPicker from './ImagePicker';
import { color } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window')

export default class ChoosePreferences extends React.Component {

    state={
        email:"",
        password:"",
        Fname: "",
        Lname: "",
        Img: '',
        toggleCheckBox_Resturant: false,
        toggleCheckBox_Bar: false,
        toggleCheckBox_Caffe: false
      }


      handlePreferences = () =>{
        const { navigation } = this.props;
        navigation.navigate('Login')
      }

      newCategoryPreferences = (item) => {
        console.log(item.title,"added")
      }

      handleSkip = () => {
        const { navigation } = this.props;
        navigation.navigate('Login')
      }

      onValueChange(value) {
        this.setState({ radios: value });
      }

      handlePostPreferences = ()=>{
        console.log("post")
        const { navigation } = this.props;
        navigation.navigate('Login')
      }

    componentDidMount =() => {
      this.setState({CategoryDatas: CategoryData})
     }


  render(){
    const { navigation } = this.props;
    if(this.state.CategoryDatas){
      return(
        <View style={styles.container}>
             <View style={styles.headerView}>
                 {/* <View>
                   <TouchableWithoutFeedback onPress={this.handleSkip}>
                    <SkipIcon size={30} name="arrowright" color="whitesmoke"/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.skipText}>דלג</Text>
                    
                 </View>  */}
                 <View style={{flex:1}}>
               <Text style={styles.Logo}>נשמח להכיר אותך</Text>
             </View>  
            </View>
            <View style={{flex:2}}>
              <FlatList
                style={styles.categoryList}
                data={this.state.CategoryDatas}
                renderItem={({ item }) => {
                    return (<View style={styles.inputView} >
                                <TouchableOpacity onPress={() => this.newCategoryPreferences(item)}>
                                    <Text style={styles.inputText}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>)
              }}
              keyExtractor={(item, index) => 'key' + index}
              horizontal={false}
              numColumns={4}
              showsHorizontalScrollIndicator={false}
              />
            </View>
            
            <View style={styles.checkboxView}>
                <View style={styles.checkrowview}>
                    <View >
                        <Text style={styles.inputText}>מסעדה</Text>
                    </View>
                    <View>
                        <CheckBox
                            disabled={false}
                            value={this.state.toggleCheckBox_Resturant}
                            onValueChange={(newValue) => this.setState({toggleCheckBox_Resturant: newValue})}
                            tintColors={{ true: '#fb5b5a', false: 'whitesmoke' }}
                        />
                    </View>
                </View>
               <View style={styles.checkrowview}>
                    <View>
                        <Text style={styles.inputText}>פאב</Text>
                    </View>
                    <View>
                        <CheckBox
                            disabled={false}
                            value={this.state.toggleCheckBox_Bar}
                            onValueChange={(newValue) => this.setState({toggleCheckBox_Bar: newValue})}
                            tintColors={{ true: '#fb5b5a', false: 'whitesmoke' }}
                        />
                    </View>
               </View>
               <View  style={styles.checkrowview}>
                    <View>
                        <Text style={styles.inputText}>בית קפה</Text>
                    </View>
                    <View>
                        <CheckBox
                            disabled={false}
                            value={this.state.toggleCheckBox_Caffe}
                            onValueChange={(newValue) => this.setState({toggleCheckBox_Caffe: newValue})}
                            tintColors={{ true: '#fb5b5a', false: 'whitesmoke' }}
                        />
                    </View>
               </View>
            </View>
            <View style={styles.sliderView}>
            <Text style={styles.radiosText}>{this.state.radios} רדיוס</Text>
                 <Slider 
                  minimumValue={1}
                  maximumValue={100}
                  width={width-20}
                  minimumTrackTintColor="#fb5b5a"
                  thumbTintColor="whitesmoke"
                  step={1}
                  value={50}
                  onValueChange={value => this.onValueChange(value)}
                 />
                 
            </View>
            <View>
              <TouchableOpacity onPress={this.handlePostPreferences} style={styles.postButton}>
                 <Text style={styles.signText}>להתחברות</Text>
              </TouchableOpacity>
            </View>
        </View>
      )
    }else {
    return (
     <View><Text>Loading..</Text></View>
    );
  }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center', 
        width: width
      },
      inputView:{
        // width:"20%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20,
        marginHorizontal: 5
      },
      inputText:{
        // height:50,
        color:"white"
      },
      Logo:{
        fontWeight:"bold",
        fontSize:40,
        color:"#fb5b5a",
      },
      headerView: {flex:0.7, flexDirection:'column' , alignItems: 'flex-end', marginTop: 15},
      skipText: {color: 'whitesmoke', marginHorizontal: 4},
      categoryList: {color: 'whitesmoke', marginHorizontal: 4},
      checkboxView: {flex:0.5,width: width, flexDirection: 'row-reverse'},
      checkrowview: {flex:0.5, flexDirection: 'row', justifyContent: 'flex-end'}, 
      sliderView: {flex: 0.4},
      radiosText: {flex:1, alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'whitesmoke' },
      postButton: {flex: 0.3, backgroundColor: "#465881", borderRadius: 10, width: width/2, justifyContent: 'center', alignItems: 'center', marginTop: 30},
      signText: {color: 'white', fontWeight: 'bold', fontSize: 20}
});



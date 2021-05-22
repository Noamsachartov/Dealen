import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Button, FlatList, Dimensions, TouchableHighlight , Switch } from 'react-native';
import Slider from '@react-native-community/slider'
import SkipIcon from 'react-native-vector-icons/AntDesign';
import TabControler from '../MainTab/TabControler';
import ImagesPicker from './ImagePicker';
import { color } from 'react-native-reanimated';

import { CheckBox } from 'react-native-elements'
const { width, height } = Dimensions.get('window')

export default class ChoosePreferences extends React.Component {

    state={
        email:"",
        password:"",
        Fname: "",
        Lname: "",
        Img: '',
        dataSource: null,
        toggleCheckBox_Resturant: false,
        toggleCheckBox_Bar: false,
        toggleCheckBox_Caffe: false,
        isLoading: true,
        categoryAdd: [],
        BTypeAdd: [],
        typearr: "",
        colorbutton: 'blue'
      }


      handlePreferences = () =>{
        const { navigation } = this.props;
        navigation.navigate('Login')
      }

      newCategoryPreferences = data => {
        console.log(data,"added")
        let connected;
        if(!this.state.categoryAdd.includes(data.Id)){
          let connected = this.state.categoryAdd.concat(data.Id);
          this.setState({categoryAdd: connected});
        }
        console.log(this.state.categoryAdd)

        data.isSelect = !data.isSelect;
        data.selectedClass = data.isSelect
         ? styles.selected: styles.list;
       
      // const index = this.state.dataSource.findIndex(
      //    item => data.id === id
      // );

      // this.state.dataSource[index] = data.item;
      this.setState({
        dataSource: this.state.dataSource
      });



      }

      onValueChange(value) {
        this.setState({ radios: value });
      }

      handlePostPreferences = ()=>{
        console.log("post")
        
        if(this.state.toggleCheckBox_Resturant){
          this.state.BTypeAdd.push(1)
          var resturant = "מסעדה";

        }else{
          var resturant = "";
        }

        if(this.state.toggleCheckBox_Bar){
          this.state.BTypeAdd.push(2)

          var bar = "בר";
        }else{
          var bar = "";
        }

        if(this.state.toggleCheckBox_Caffe){
          var caffe = "בית קפה";
          this.state.BTypeAdd.push(3)
        }else{
          var caffe = "";
        }
        // var join = `${resturant},${bar},${caffe}`;
        // this.setState({typearr: this.state.BTypeAdd })


       
        const { navigation, route } = this.props;
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Customer/" +route.params.userId;
        console.log(apiUrl)
        fetch(apiUrl, {
          method: 'PUT',
          body: JSON.stringify({
            P_category: this.state.categoryAdd,
            P_type: this.state.BTypeAdd,
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
            navigation.navigate('Login')
          })
          .catch((error) => {
            alert(JSON.stringify(error));
            console.error(error);
          });


        // navigation.navigate('Login')
      }

    componentDidMount =() => {
      
      var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Category";
      return fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.length > 0){
          console.log(responseJson)
          responseJson = responseJson.map(item => {
            item.isSelect = false;
            console.log("item state: " + item.isSelect)
            item.selectedClass = styles.list;
            return item;
          });
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson,
            },
            function() {
              
            }
          );
        }else {
          alert("Sorry We there have been an error")
        }

      })
      .catch(error => {
        console.error(error);
      });

     }


  render(){
    const { navigation } = this.props;
    if(!this.state.isLoading){
      // const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;
      return(
        <View style={styles.container}>
             <View style={styles.headerView}>
                 <View style={{flex:1}}>
               <Text style={styles.Logo}>נשמח להכיר אותך</Text>
             </View>  
            </View>
            <View style={{flex:2}}>
              <FlatList
                style={styles.categoryList}
                data={this.state.dataSource}
                extraData={this.state}
                renderItem={({ item }) => {
                    return (<View style={styles.inputView} >
                                <TouchableOpacity style={[styles.list, item.selectedClass]}  onPress={() => this.newCategoryPreferences(item)}>
                                    <Text style={styles.inputText}>{item.Name}</Text>
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
            <View style={styles.sliderView}>
            <Text style={styles.radiosText}>{this.state.radios}  רדיוס מ' ממקומך</Text>
                 <Slider 
                  minimumValue={1}
                  maximumValue={15000}
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
        backgroundColor: "#465881",
        borderRadius:25,
        height:60,
        marginBottom:20,
        justifyContent:"center",
        padding:20,
        marginHorizontal: 5
      },
      inputText:{
        color:"white"
      },
      Logo:{
        fontWeight:"bold",
        fontSize:40,
        color:"#fb5b5a",
      },
      headerView: {flex:0.7, flexDirection:'column' , alignItems: 'flex-end', marginTop: 15},
      skipText: {color: 'whitesmoke', marginHorizontal: 4},
      categoryList: {color: 'whitesmoke'},
      checkboxView: {flex:1,width: width, flexDirection: 'row-reverse'},
      checkrowview: {flex:0.5, flexDirection: 'row', justifyContent: 'flex-end'}, 
      sliderView: {flex: 0.7},
      radiosText: {flex:1, alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'whitesmoke' },
      postButton: {flex: 0.3, backgroundColor: "#465881", borderRadius: 10, width: width/2, justifyContent: 'center', alignItems: 'center', marginTop: 30},
      signText: {color: 'white', fontWeight: 'bold', fontSize: 20},
      list: {backgroundColor: "#465881"},
      selected: {backgroundColor: "#FA7B5F", color: "#FA7B5F"},
});



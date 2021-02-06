import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Button, FlatList, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { CategoryData } from '../MainTab/Recommendation-section/Category/CategoryData'
import TabControler from '../MainTab/TabControler';
import ImagesPicker from './ImagePicker';
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

      

    componentDidMount =() => {
      this.setState({CategoryDatas: CategoryData})
     }


  render(){
    const { navigation } = this.props;
    if(this.state.CategoryDatas){
      return(
        <View style={styles.container}>
            <Text style={styles.Logo}>נשמח להכיר אותך</Text>
            <FlatList
            style={{width: width,  maxHeight: 200}}
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
            <View style={{flex:1, flexDirection: 'row'}}>
                <View>
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
        justifyContent:  'flex-start',
        width: "100%"
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
        marginVertical: 40
      },

});



import * as React from 'react';
import {StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import SearchIcon from 'react-native-vector-icons/EvilIcons';
import RecentListDeal from './RecentListDeal';
import SearchByCategory from './SearchByCategory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableHighlight } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window')
export default class Search extends React.Component {
  state = {
    isLoading: true,
    Data: null,
    DataToSearch: null,
    isLodingCategory: true,
  };

  CategorySearch = (item) => {

    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/" +item.Id;
    return fetch(apiUrl)
    .then(response => response.json())
    .then(responseJson => {
      if(responseJson.length > 0){
        this.setState(
          {
            DataToSearch: responseJson,
            isLodingCategory: false,
            isLoading: true
          },
          function() {
            console.log("after")
          }
        );
      }else {
        alert("לא מצאנו דילים בקטגוריה הזו :(")
      }

    })
    .catch(error => {
      console.error(error);
    });


  }


  componentDidMount =() => {
    const { navigation, route } = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.likecomponenetdidmount();
      // this.LoadUserData();

      // var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Category";
      // return fetch(apiUrl)
      // .then(response => response.json())
      // .then(responseJson => {
      //   if(responseJson.length > 0){
      //     this.setState(
      //             {
      //               isLoading: false,
      //               Data: responseJson,
      //             },
      //             function() {
                    
      //             }
      //           );
      //         }else {
      //           alert("נראה שיש לנו שגיאה במערכת, מצטערים")
      //         }
        
      //       })
      //       .catch(error => {
      //         console.error(error);
      //       });
        });  
   }

   likecomponenetdidmount = () => {
    this.LoadUserData();

    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Category";
    return fetch(apiUrl)
    .then(response => response.json())
    .then(responseJson => {
      if(responseJson.length > 0){
        this.setState(
                {
                  isLoading: false,
                  Data: responseJson,
                },
                function() {
                  
                }
              );
            }else {
              alert("נראה שיש לנו שגיאה במערכת, מצטערים")
            }
      
          })
          .catch(error => {
            console.error(error);
          });
   }


   LoadUserData = async () => {
    console.log("try load")
    try{
        let UserData = await AsyncStorage.getItem("UserData");
        if (UserData !== null){
            this.setState({UserData: JSON.parse(UserData)})
        }else{
          this.setState({UserData: []});
        }
      
    } catch (error){
        alert(error);
    }
  }

  FreeSearch = (text) => {
    this.setState({
      Search:text,
    })

    console.log(this.state.Search)
  }

  onEndEditing = () => {
    console.log("!!!!!!!!!!!!!!!")
    if(this.state.Search == ""){
      this.likecomponenetdidmount();
    }else {
      var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/SearchDeals/" + this.state.Search;
      return fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.length > 0){
          this.setState(
                  {
                    DataToSearch: responseJson,
                    isLodingCategory: false,
                    isLoading: true
                  },
                  function() {
                    
                  }
                );
              }else {
                alert("לא מצאנו מבצעים מתאימים לחיפוש")
                this.likecomponenetdidmount();
              }
        
            })
            .catch(error => {
              console.error(error);
            });
    }
    
  }

  render(props) {

    var InputHeader = (      
    <View style={styles.inputView} >
      <View style={styles.seconderView}>
        <View>
          <TextInput  
          style={styles.inputText}
          placeholder="חיפוש..." 
          placeholderTextColor="#003f5c"
          textAlign={"right"}
          onChangeText={text => this.FreeSearch(text)} 
          onEndEditing={() => this.onEndEditing()}
          />
     
        </View>
        <View >
          <SearchIcon name="search" size={35} color={"#003f5c"} title="Open camera"  />
        </View>
      </View>  
    </View>)

    if(!this.state.isLoading){
      return (
        <View style={styles.container}>
            <StatusBar
          animated={true}
          backgroundColor="#003f5c"
           />
          {InputHeader}
          <View style={styles.flatlistview}>
            <FlatList
                    style={styles.categoryList}
                    data={this.state.Data}
                    renderItem={({ item }) => {
                        return (<View style={styles.CategoryView} >
                                    <TouchableOpacity  onPress={() => this.CategorySearch(item)}>
                                        <Text style={{color: "whitesmoke"}}>{item.Name}</Text>
                                    </TouchableOpacity>
                                </View>)
                  }}
                  keyExtractor={(item, index) => 'key' + index}
                  horizontal={false}
                  numColumns={5}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  />
          </View>
          <View style={{flex: 1.5}}>
            <RecentListDeal UserData={this.state.UserData}/>
          </View>
        </View>
      );
    } else if (!this.state.isLodingCategory) {
      return (
        <View style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor="#003f5c"
          />
          {InputHeader}
            <SearchByCategory UserData={this.state.UserData} Data={this.state.DataToSearch} navigation={this.props.navigation}/>   
      </View>
      )
    } else{
      return (
        <Text>Loading...</Text>
      )
      
    }
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection:'column', alignItems: 'center'},
    inputView:{
      width:"95%",
      backgroundColor:"#d7d8db",
      borderRadius:5,
      height:45,
      marginTop: 10,
      justifyContent:"center",
      padding:7
    },
    seconderView: {flex:1, flexDirection: 'row', justifyContent: 'flex-end' },
    CategoryView:{
      backgroundColor:"#003f5c",
      borderRadius:25,
      height:35,
      justifyContent:'center',
      alignItems: 'center',
      padding:10,
      marginHorizontal: 5,
      marginVertical: 10
    },
    inputText:{
      height:30,
      width: 250,
      color:"#003f5c",
      
    },
    flatlistview: {flex:2,marginVertical: 20, alignItems: 'center', justifyContent: 'center'},
    categoryList: {color: 'whitesmoke'},
});
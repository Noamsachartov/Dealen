import * as React from 'react';
import {StyleSheet,Dimensions, Text, View ,TextInput,StatusBar,FlatList,TouchableOpacity} from 'react-native';
import SearchIcon from 'react-native-vector-icons/EvilIcons';


const { width, height } = Dimensions.get('window')
export default class Search extends React.Component {
  state = {
    isLoading: true,
    Data: null,
  };

  CategorySearch = (item) => {
    console.log("Search Category by id: ",item.Id)
  }


  componentDidMount =() => {
      
    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Category";
    return fetch(apiUrl)
    .then(response => response.json())
    .then(responseJson => {
      if(responseJson.length > 0){
        console.log(responseJson)
        this.setState(
          {
            isLoading: false,
            Data: responseJson,
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

  render(props) {

    if(!this.state.isLoading){
      return (
        <View style={styles.container}>
            <StatusBar
          animated={true}
          backgroundColor="#003f5c"
           />
          <View style={styles.inputView} >
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <View>
                <TextInput  
                style={styles.inputText}
                placeholder="חיפוש..." 
                placeholderTextColor="#003f5c"
                textAlign={"right"}
                onChangeText={text => this.setState({email:text})} />
              </View>
              <View >
                <SearchIcon name="search" size={35} color={"#003f5c"} title="Open camera"  />
              </View>
            </View>  
          </View>
          <View style={{flex:1,marginVertical: 20}}>
            <FlatList
                    style={styles.categoryList}
                    data={this.state.Data}
                    renderItem={({ item }) => {
                        return (<View style={styles.CategoryView} >
                                    <TouchableOpacity onPress={() => this.CategorySearch(item)}>
                                        <Text style={{color: "whitesmoke"}}>{item.Name}</Text>
                                    </TouchableOpacity>
                                </View>)
                  }}
                  keyExtractor={(item, index) => 'key' + index}
                  horizontal={false}
                  numColumns={5}
                  showsHorizontalScrollIndicator={false}
                  />
          </View>
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right', fontSize: 20, fontWeight: 'bold'}}>מבצעים שנבחרו לאחרונה</Text>
          </View>

          
          
          
  
        </View>
      );
    } else {
      return <Text>Loading...</Text>
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
    CategoryView:{
      backgroundColor:"#003f5c",
      borderRadius:25,
      height:35,
      // marginBottom:20,
      justifyContent:"center",
      padding:10,
      marginHorizontal: 5,
      marginVertical: 10
    },
    inputText:{
      height:30,
      color:"#003f5c",
      
    },
    categoryList: {color: 'whitesmoke'},
});
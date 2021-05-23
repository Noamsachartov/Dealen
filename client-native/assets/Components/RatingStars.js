//This is an example code to make a Star Rating Bar // 
import React, { Component } from 'react';
//import react in our code. 
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
//import all the components we are going to use.

export default class RatingStars extends React.Component {
  constructor() {
    super();
    this.state = {
      Default_Rating: 2.5,
      //To set the default Star Selected
      Max_Rating: 5,
      //To set the max number of Stars
    };
    //Filled Star. You can also give the path from local
    this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    //Empty Star. You can also give the path from local
    this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }
  UpdateRating(key) {
    this.setState({ Default_Rating: key });
    //Keeping the Rating Selected in state
  }

  
componentDidMount = ()=>{
  const { navigation, route } = this.props;
  this.setState({title: JSON.stringify(route.params.notification)})
  // JSON.stringify(response.notification.request.content.data.coupon)
  console.log("From Rating stars: " + JSON.stringify(route.params.notification.notification.request.content.data.coupon))
  // console.log("Coupon From Rating stars: " + route.params.notification.request.content.data.coupon)
}

  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>
      );
    }
    const { navigation, route } = this.props;

    return (
    
      <View style={styles.MainContainer}>
        <Text style={styles.textStyle}>איך היית החוויה שלך ב{route.params.notification.notification.request.content.title}</Text>
        {/* <Text style={styles.textStyleSmall}>אנא דרג/י כדי שנלמד להכיר אותך </Text> */}
        {/*View to hold our Stars*/}
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
        
        <Text style={styles.textStyle}>
        {/*To show the rating selected*/}
          {this.state.Default_Rating} / {this.state.Max_Rating}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={this.rateDeal}>
          {/* onPress={() => alert(this.state.Default_Rating)}> */}
          {/*Clicking on button will show the rating as an alert*/}
          <Text style={{color:'whitesmoke'}}>דרג</Text>
        </TouchableOpacity>
      </View>
    );
  }

rateDeal = () =>{
  const { navigation, route } = this.props;


  var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/DealInCust/RateDeal/"+ route.params.notification.notification.request.content.data.coupon +"/" + this.state.Default_Rating + "";
  console.log(apiUrl)
  fetch(apiUrl, {
    method: 'PUT',
    body: JSON.stringify({
      coupon: route.params.notification.notification.request.content.data.coupon,
      rate: this.state.Default_Rating,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);    
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
}
  
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#003f5c',
    borderRadius: 15,
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,

    color: '#000',
    marginTop: 15,
  },
});
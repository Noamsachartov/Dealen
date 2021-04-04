import * as React from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Marker1 extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    isLoading: false,
  };

  componentDidMount = () => {
    //Get User data From Async Storage

    setTimeout(() => {
      this.Location();
    }, this.props.index * 1500);
  };

  Location = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      console.log("status: ", status);

      if (status !== 'granted') {
        conosle.log('Permission to access location was denied')
        return;
      }

      const response = await Location.geocodeAsync(
        this.props.Markeritem.Baddress
      );
      console.log("index: ", this.props.index + 1);
      this.setState({
        latitude: response[0].latitude,
        longitude: response[0].longitude,
        isLoading: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      console.log('finally: ', this.props.index);
      // this.setState({isLoading: true})
    }
  };

  render() {
    console.log("render: ", this.props.index);
    if (this.state.isLoading && this.state.longitude) {
      return (
        <Marker
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
          title={this.props.Markeritem.Baddress}
          description={this.props.Markeritem.Baddress}
          key={this.props.Markeritem.bid}
          onPress={() => this.props.PressMarker(this.props.Markeritem)}
        />
      );
    } else {
      return <View></View>;
    }
  }
}

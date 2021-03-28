import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Button } from 'react-native'
import { TouchableHighlight, TouchableWithoutFeedback  } from 'react-native-gesture-handler';
import TimerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DiscountIcon from 'react-native-vector-icons/MaterialCommunityIcons'
const { width, height } = Dimensions.get('window')
import FullDealViewMap from './FullDealViewMap';  



const DealItem = ({ UserData, item, navigation }) => {
    

    return (
        <TouchableWithoutFeedback  onPress={() => navigation.navigate('FullDealViewMap',{categoryId: item.Cat_id, dealId: item.Id, CustomerId: UserData.Id})} >
            <View style={styles.cardView}  >
                <Image style={styles.image} source={{ uri: item.Image }} />
                <View style={styles.textView}>
                    <Text style={styles.itemTitle}> {item.Name}</Text>
                    <Text style={styles.itemDescription}>{item.Description}</Text>
                    <Text style={styles.itemBusinessName}> {item.Business_Name}</Text>
                    <View style={styles.IconView}>
                        <View style={styles.TimerView}>
                            <TimerIcon style={styles.TimerIcon} name="timer-sand-empty" size={20} />
                            {/* <Text >{item.TimeLeft}</Text> */}
                            <Text >00</Text>
                        </View>
                        <View>
                            <DiscountIcon style={styles.DiscountIcon} name="ticket-percent-outline" size={20} />
                            {/* <Text>{item.DiscountDescription}</Text> */}
                            <Text>{item.Discount}%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,

        flexDirection: 'row-reverse',
        width: width-20,
        height: height / 5,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        bottom: 10,
        marginTop: 10,
        width: width/1.75
        
        },
    image: {
        width: width/3,
        height: height / 5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
        },
    itemTitle: {
        color: 'black',
        fontSize: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5,

    },
    itemDescription: {
        color: 'black',
        fontSize: 13,
        shadowColor: '#000',
        elevation: 5,
        marginHorizontal: 3,

    },
    itemBusinessName: {
        color: 'black',
        fontSize: 13,
        shadowColor: '#000',
    },
    IconView: {flex: 1, flexDirection: 'row', position: 'absolute', bottom: 1},
    TimerView: {marginRight: 7},
    TimerIcon: {color: '#b04c00'},
    DiscountIcon: {color: '#00961e'}
})

export default DealItem
import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Button } from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import TimerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DiscountIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FullDealView from './FullDealView'
const { width, height } = Dimensions.get('window')


const DealItem = ({ item,navigation }) => {
    console.log("DealItem Component")
    return (
        <View style={styles.cardView}  >
            <Image style={styles.image} source={{ uri: item.url }} />
            <View style={styles.textView}>
                <Text style={styles.itemTitle}> {item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemBusinessName}> {item.BusinessName}</Text>
                <Button
                    title="Go to FullDealView"
                    onPress={() => navigation.navigate('FullDealView')}
                />
                <View style={styles.IconView}>
                    <View style={styles.TimerView}>
                        <TimerIcon style={styles.TimerIcon} name="timer-sand-empty" size={20} />
                        <Text >{item.TimeLeft}</Text>
                    </View>
                    <View>
                        <DiscountIcon style={styles.DiscountIcon} name="ticket-percent-outline" size={20} />
                        <Text>{item.DiscountDescription}</Text>
                    </View>
                </View>
            </View>
        </View>
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
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'black',
        fontSize: 13,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
        marginHorizontal: 3
    },
    itemBusinessName: {
        color: 'black',
        fontSize: 13,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    IconView: {flex: 1, flexDirection: 'row', position: 'absolute', bottom: 1},
    TimerView: {marginRight: 7},
    TimerIcon: {color: '#b04c00'},
    DiscountIcon: {color: '#00961e'}
})

export default DealItem
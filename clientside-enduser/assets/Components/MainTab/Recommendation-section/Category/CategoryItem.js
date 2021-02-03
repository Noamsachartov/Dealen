import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Button } from 'react-native'
import CategoryFullView from './CategoryFullView'
const { width, height } = Dimensions.get('window')


const CategoryItem = ({ item, navigation }) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: item.url }} />
            <View style={styles.textView}>
                <Text style={styles.itemTitle}> {item.title}</Text>
                <Button
                    title="Go to CategoryFullView"
                    onPress={() => navigation.navigate('CategoryFullView')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width/3,
        height: height / 4.2,
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
        right: 5,
        
        },
    image: {
        width: width/3,
        height: height / 5.5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
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
})

export default CategoryItem
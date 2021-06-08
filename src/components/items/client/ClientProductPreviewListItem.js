import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
export default function ClientProductPreviewListItem({product}) {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={{uri: product.image_url}} style={styles.image}/>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.titleText}>{product.name}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 250,
        height: 200,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#741922',
        backgroundColor: 'white',
        marginRight: 20
    },

    topContainer: {
        //borderRadius: 15,
        flex: 8,
        //backgroundColor: 'red'
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    },

    bottomContainer: {
        flex: 2,
        //backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        //borderTopWidth: 1
    },

    titleText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16
    }
})
import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default function WaiterTableListItem({table, numColumns, onPress}) {
    
    return (
        <TouchableHighlight style={[styles.container, table.need_waiter ? styles.requiresAttentionBackground : styles.normalBackground]} onPress={onPress}>
            <View >
                <Text style={styles.number}>{table.table_number}</Text>
            </View>
        </TouchableHighlight>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: WIDTH / 3,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5
    },

    normalBackground: {
        backgroundColor: '#741922',
    },

    requiresAttentionBackground: {
        backgroundColor: '#DEAC00',
    },

    number: {
        fontSize: 55,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
    }
});
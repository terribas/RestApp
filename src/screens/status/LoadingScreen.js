import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

export default function LoadingScreen({navigation, route, message}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#741922'/>
            <View style={{marginTop: 20}} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        textAlign: 'center'
    }
});
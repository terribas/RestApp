import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

export default function LoadingScreen({navigation, route, message}) {
    return (
        <View>
            <ActivityIndicator size='large' />
            <View style={{marginTop: 10}} />
            <Text>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});
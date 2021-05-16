import React from 'react';
import {View, Text, Button} from 'react-native';
import {CLIENT_WELCOME} from 'src/consts/screens';



export default function OrderConfirmationScreen({navigation, route}) {

    function handleOnPress() {
        navigation.navigate(CLIENT_WELCOME);
    }

    return (
        <View>
            <Text>OrderConfirmationScreen</Text>
            <Button onPress={handleOnPress} title="Pantalla principal" />
        </View>
    );

}
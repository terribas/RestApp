import React from 'react';
import {View, Text, Button} from 'react-native';
import {WAITER_TABLES_LIST} from 'src/consts/screens';



export default function OrderConfirmationScreen({navigation, route}) {

    function handleOnPress() {
        navigation.navigate(WAITER_TABLES_LIST);
    }

    return (
        <View>
            <Text>OrderConfirmationScreen</Text>
            <Button onPress={handleOnPress} title="Pantalla principal" />
        </View>
    );

}
import React from 'react';
import {View, Text, Button} from 'react-native';
import {WAITER_TABLES_LIST} from 'src/consts/screens';
import tr from 'src/language/utils';



export default function OrderConfirmationScreen({navigation, route}) {

    function handleOnPress() {
        navigation.navigate(WAITER_TABLES_LIST);
    }

    return (
        <View>
            <Text>OrderConfirmationScreen</Text>
            <Button onPress={handleOnPress} title={tr("pantalla_principal")} />
        </View>
    );

}
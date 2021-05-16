import React from 'react';
import {View, Text, Button} from 'react-native';
import {WAITER_CONFIRM_ORDER} from 'src/consts/screens';



export default function ProductsScreen({navigation, route}) {

    function handleOnPress() {
        navigation.navigate(WAITER_CONFIRM_ORDER);
    }

    return (
        <View>
            <Text>ProductsScreen</Text>
            <Button onPress={handleOnPress} title="Siguiente pantalla" />
        </View>
    );

}
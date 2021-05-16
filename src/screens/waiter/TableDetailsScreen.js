import React from 'react';
import {View, Text, Button} from 'react-native';
import {WAITER_PRODUCTS} from 'src/consts/screens';



export default function TableDetailsScreen({navigation, route}) {

    function handleOnPress() {
        navigation.navigate(WAITER_PRODUCTS);
    }

    return (
        <View>
            <Text>TableDetailsScreen</Text>
            <Button onPress={handleOnPress} title="Siguiente pantalla" />
        </View>
    );

}
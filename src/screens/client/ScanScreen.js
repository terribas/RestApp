import React from 'react';
import {View, Text, Button} from 'react-native';
import {CLIENT_PRODUCTS} from 'src/consts/screens';



export default function ScanScreen({navigation, route}) {

    function handleOnPress() {
        navigation.navigate(CLIENT_PRODUCTS);
    }

    return (
        <View>
            <Text>ScanScreen</Text>
            <Button onPress={handleOnPress} title="Siguiente pantalla" />
        </View>
    );

}
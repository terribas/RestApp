import React from 'react';
import {View, Text, Button} from 'react-native';
import {WAITER_TABLE_DETAILS} from 'src/consts/screens';

import useAuthContext from 'src/hooks/useAuthContext';


export default function TablesScreen({navigation, route}) {

    const {logOut} = useAuthContext();

    function handleOnPress() {
        navigation.navigate(WAITER_TABLE_DETAILS);
    }

    return (
        <View>
            <Text>TablesScreen</Text>
            <Button onPress={handleOnPress} title="Siguiente pantalla" />
            <Button onPress={logOut} title="Logout" />
        </View>
    );

}
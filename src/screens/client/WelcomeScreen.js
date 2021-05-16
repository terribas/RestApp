import React from 'react';
import {View, Text, Button} from 'react-native';
import {CLIENT_SCAN} from 'src/consts/screens';
import useAuthContext from 'src/hooks/useAuthContext';


export default function WelcomeScreen({navigation, route}) {

    const {logOut, tokenState} = useAuthContext();

    function handleOnPress() {
        navigation.navigate(CLIENT_SCAN);
    }

    return (
        <View>
            <Text>WelcomeScreen {tokenState}</Text>
            <Button onPress={handleOnPress} title="Siguiente pantalla" />
            <Button onPress={logOut} title="Logout" />
        </View>
    );

}
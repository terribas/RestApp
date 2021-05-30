import React from 'react';
import {View, Text, Button} from 'react-native';
import useAuthContext from 'src/hooks/useAuthContext';

export default function SettingsScreen({navigation, route}) {
    const {logOut} = useAuthContext();
    return (
        <View>
            <Button onPress={logOut} title="Logout" />
            
        </View>
    );
}
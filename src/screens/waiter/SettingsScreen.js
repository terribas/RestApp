import React from 'react';
import {View, Text, Button} from 'react-native';
import useAuthContext from 'src/hooks/useAuthContext';
import tr from 'src/language/utils';

export default function SettingsScreen({navigation, route}) {
    const {logOut} = useAuthContext();
    return (
        <View>
            <Button onPress={logOut} title={tr("logout")} />
            
        </View>
    );
}
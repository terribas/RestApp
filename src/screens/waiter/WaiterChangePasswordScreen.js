import React, {useState} from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import Inputs from 'src/components/Inputs';
import Buttons from 'src/components/Buttons';
import Texts from 'src/components/Texts';
import {useMutation} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';
import useAuthContext from 'src/hooks/useAuthContext';
import tr from 'src/language/utils';

const minLength = 4;
async function postChangePassword({oldPassword, newPassword}) {
    const response = await apiAuthFetch('/auth/changeMyPassword', {method: 'POST', body: JSON.stringify({oldPassword, newPassword})} );
    if (!response.ok) throw Error;
    const json = await response.json();
    return json;
}

export default function WaiterChangePasswordScreen({navigation, route}) {
    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const {logOut} = useAuthContext();

    const {mutate, isLoading} = useMutation(postChangePassword, {
        onSuccess: (response) => {
            Alert.alert(tr("cambio_pw_ok"));
            logOut();
        },
        onError: () => {
            Alert.alert(tr("cambio_pw_error"));
        }
    });

    
    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        
            <View style={{marginTop: 30}} />
            <Inputs
                placeholder={tr("pw_actual")}
                isPassword
                leftIcon='lock-outline'
                rightIcon='close'
                label={tr("pw_actual")}
                value={oldPassword}
                onChangeText={setOldPassword}
            />

            <View style={{marginTop: 20}} />
            <Inputs
                placeholder={tr("pw_nueva")}
                leftIcon='lock'
                rightIcon='close'
                isPassword
                label={tr("pw_nueva")}
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <Inputs
                placeholder={tr("re_pw_nueva")}
                leftIcon='lock'
                rightIcon='close'
                isPassword
                label={tr("re_pw_nueva")}
                value={newPasswordRepeat}
                onChangeText={setNewPasswordRepeat}
                errorMessage={newPasswordRepeat.length > 0 && newPasswordRepeat !== newPassword ? tr("pw_distinta") : ''}
            
            />
            <View style={styles.buttonContainer}>
                <Buttons
                    title={tr("cambiar_pw")}
                    disabled={oldPassword.length <= 0 || newPassword.length < minLength || newPassword !== newPasswordRepeat}
                    loading={isLoading}
                    onPress={() => {mutate({oldPassword, newPassword})}}
                />
                <View style={{marginTop: 10}} />
                {newPassword.length < minLength && <Texts h5 center>{tr("min_char_1")}{minLength}{tr("min_char_2")}</Texts>}
            </View>
        </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },

    scrollView: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white'
    },

    buttonContainer: {
        marginTop: 30,
        flex: 1,
        width: '90%'
    }
});
import React, {useState} from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import Inputs from 'src/components/Inputs';
import Buttons from 'src/components/Buttons';
import Texts from 'src/components/Texts';
import {useMutation} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';
import useAuthContext from 'src/hooks/useAuthContext';


const minLength = 4;


async function postChangePassword({oldPassword, newPassword}) {
    const response = await apiAuthFetch('/auth/changeMyPassword', {method: 'POST', body: JSON.stringify({oldPassword, newPassword})} );
    if (!response.ok) throw Error;
    const json = await response.json();
    return json;
}


export default function ChangePasswordScreen({navigation, route}) {
    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const {logOut} = useAuthContext();

    const {mutate, isLoading} = useMutation(postChangePassword, {
        onSuccess: () => {
            Alert.alert('Contraseña cambiada correctamente. Vuelve a iniciar sesión');
            logOut();
        },
        onError: () => {
            Alert.alert('Error al cambiar la contraseña. Comprueba que la actual sea correcta');
        }
    });

    
    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        
            <View style={{marginTop: 30}} />
            <Inputs
                placeholder='Contraseña actual'
                isPassword
                leftIcon='lock-outline'
                rightIcon='close'
                label='Contraseña actual'
                value={oldPassword}
                onChangeText={setOldPassword}
            />

            <View style={{marginTop: 20}} />
            <Inputs
                placeholder='Nueva contraseña'
                leftIcon='lock'
                rightIcon='close'
                isPassword
                label='Nueva contraseña'
                value={newPassword}
                onChangeText={setNewPassword}
            />

            
            <Inputs
                placeholder='Repetir nueva contraseña'
                leftIcon='lock'
                rightIcon='close'
                isPassword
                label='Repetir nueva contraseña'
                value={newPasswordRepeat}
                onChangeText={setNewPasswordRepeat}
                errorMessage={newPasswordRepeat.length > 0 && newPasswordRepeat !== newPassword ? 'Las contraseñas no coinciden' : ''}
            
            />

            
            <View style={styles.buttonContainer}>
                <Buttons
                    title='Cambiar contraseña'
                    disabled={oldPassword.length <= 0 || newPassword.length < minLength || newPassword !== newPasswordRepeat}
                    loading={isLoading}
                    onPress={() => {mutate({oldPassword, newPassword})}}
                />
                <View style={{marginTop: 10}} />
                {newPassword.length < minLength && <Texts h5 center>La nueva contraseña debe tener al menos {minLength} caracteres</Texts>}
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
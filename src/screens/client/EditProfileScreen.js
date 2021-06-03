import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Alert, ScrollView, Text} from 'react-native';
import Inputs from 'src/components/Inputs';
import Buttons from 'src/components/Buttons';
import Texts from 'src/components/Texts';
import {useMutation} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';
import {useMyProfile, useInvalidateMyProfileCache} from 'src/hooks/useMyProfile';
import LoadingScreen from 'src/screens/status/LoadingScreen';


var initialName, initialLastName, initialEmail;
const emailRegex = /\S+@\S+\.\S+/;

async function postEditUser({name, lastName, email}) {
    const response = await apiAuthFetch('/user', {method: 'PUT', body: JSON.stringify({name, lastName, email})} );
    if (!response.ok) {
        console.log('RESPUESTA NO OK');
        throw Error
    };
    const json = await response.json();
    return json;
}



export default function ChangePasswordScreen({navigation, route}) {
    
    const {isLoading: isUserLoading, isSuccess: isUserSuccess, data: user} = useMyProfile();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isVali2dEmail, setIsValidEmail] = useState(false);

    const invalidateProfile = useInvalidateMyProfileCache();

    const clearCache = useCallback(() => {invalidateProfile()});

    const {mutate, isLoading: isUpdating} = useMutation(postEditUser, {
        onSuccess: () => {
            clearCache();
            Alert.alert('Tu perfil se ha actualizado correctamente');
            navigation.goBack();
        },
        onError: () => {
            Alert.alert('Error al actualizar el perfil');
        }
    });

    

    useEffect(() => {
        if (isUserSuccess) {
            setName(user.name ?? '');
            setLastName(user?.lastName ?? '');
            setEmail(user?.email ?? '');

            initialName = user.name ?? '';
            initialLastName = user.lastName ?? '';
            initialEmail = user.email ?? '';
        }
    }, [user])

    

    if (isUserLoading) return <LoadingScreen message='Recuperando tu perfil...' />;
    
    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        
            <View style={{marginTop: 30}} />
            <Inputs
                placeholder='Nombre'
                leftIcon='person'
                rightIcon='close'
                label='Nombre'
                value={name}
                onChangeText={setName}
            />

            
            <Inputs
                placeholder='Apellidos'
                leftIcon='person-outline'
                rightIcon='close'
                label='Apellidos'
                value={lastName}
                onChangeText={setLastName}
            />

            
            <Inputs
                placeholder='Email'
                leftIcon='email'
                rightIcon='close'
                label='Email'
                value={email}
                onChangeText={setEmail}
                errorMessage={!emailRegex.test(email) ? 'Introduce un mail válido' : ''}
            
            />

            
            <View style={styles.buttonContainer}>
                <Buttons
                    title='Actualizar'
                    disabled={
                        (initialName === name && initialLastName === lastName && initialEmail === email) ||
                        (name.length <= 0 || lastName.length <= 0 || email.length <= 0) ||
                        !emailRegex.test(email)
                    }
                    loading={isUpdating}
                    onPress={() => {mutate({name, lastName, email})}}
                />
                <View style={{marginTop: 10}} />
                {(name.length <= 0 || lastName.length <= 0 || email.length <= 0) && <Texts h5 center>Debes rellenar los campos</Texts>}
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
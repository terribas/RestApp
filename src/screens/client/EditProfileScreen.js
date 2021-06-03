import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Alert, ScrollView, Text} from 'react-native';
import Inputs from 'src/components/Inputs';
import Buttons from 'src/components/Buttons';
import Texts from 'src/components/Texts';
import {useMutation} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';
import {useMyProfile, useInvalidateMyProfileCache} from 'src/hooks/useMyProfile';
import LoadingScreen from 'src/screens/status/LoadingScreen';
import tr from 'src/language/utils';


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
            Alert.alert(tr("actualizar_perfil_ok"));
            navigation.goBack();
        },
        onError: () => {
            Alert.alert(tr("actualizar_perfil_error"));
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

    

    if (isUserLoading) return <LoadingScreen message={tr("recuperando_perfil_loading")} />;
    
    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        
            <View style={{marginTop: 30}} />
            <Inputs
                placeholder={tr("nombre")}
                leftIcon='person'
                rightIcon='close'
                label={tr("nombre")}
                value={name}
                onChangeText={setName}
            />

            
            <Inputs
                placeholder={tr("apellidos")}
                leftIcon='person-outline'
                rightIcon='close'
                label={tr("apellidos")}
                value={lastName}
                onChangeText={setLastName}
            />

            
            <Inputs
                placeholder={tr("email")}
                leftIcon='email'
                rightIcon='close'
                label={tr("email")}
                value={email}
                onChangeText={setEmail}
                errorMessage={!emailRegex.test(email) ? tr("email_valido") : ''}
            
            />

            
            <View style={styles.buttonContainer}>
                <Buttons
                    title={tr("actualizar")}
                    disabled={
                        (initialName === name && initialLastName === lastName && initialEmail === email) ||
                        (name.length <= 0 || lastName.length <= 0 || email.length <= 0) ||
                        !emailRegex.test(email)
                    }
                    loading={isUpdating}
                    onPress={() => {mutate({name, lastName, email})}}
                />
                <View style={{marginTop: 10}} />
                {(name.length <= 0 || lastName.length <= 0 || email.length <= 0) && <Texts h5 center>{tr("rellenar_campos")}</Texts>}
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
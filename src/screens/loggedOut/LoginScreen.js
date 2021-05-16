import React, {useState} from 'react';
import {Text, StyleSheet, View, SafeAreaView, Image, ScrollView, Alert} from 'react-native';

import {REGISTER} from 'src/consts/screens';

import Inputs from 'src/components/Inputs';

import {Button} from 'react-native-elements';

import {API_URL} from 'src/consts/server';

import useAuthContext from 'src/hooks/useAuthContext';


export default function LoginScreen({navigation, route}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {clientLogin, waiterLogin} = useAuthContext();


    function handleOnLoginPress() {
        if (email === 'client') {
            clientLogin('token del cliente');
        } else {
            waiterLogin('token del camarero');
        }
    }

    /*  Se conecta al servidor.
    async function handleOnLoginPress() {

        const postData = {email, password};

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        }

        try {
            const response = await fetch(`${API_URL}/auth/login`, options);

            if (!response.ok) {
                Alert.alert('Usuario o contraseña incorrectos');
            } else {
                const {token, isWaiter} = await response.json();
                
                if (isWaiter) {
                    waiterLogin(token);
                } else {
                    clientLogin(token);
                }
            }
        } catch (error) {
            Alert.alert('Hubo un problema al iniciar sesión.\n\nInténtalo de nuevo más tarde.');
        }
    }
    */


    function handleOnRegisterPress() {
        navigation.navigate(REGISTER);
    }




    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
                <Image
                    source={require('assets/logo/vertical.png')}
                    resizeMode='center'
                    style={styles.image}/>

                <Text style={styles.textTitle}>Bienvenido</Text>
                <Text style={styles.textBody}>Inicia sesión con tu cuenta</Text>

                <View style={{marginTop: 20}} />

                <Inputs
                    placeholder="Correo electrónico"
                    leftIcon="mail-outline"
                    rightIcon="close"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Inputs
                    placeholder="Contraseña"
                    leftIcon="lock"
                    isPassword={true}
                    value={password}
                    onChangeText={setPassword}
                />
                

                <View style={{marginTop: 25}} />


                <Button
                    title="Iniciar sesión"
                    containerStyle={styles.buttons}
                    onPress={handleOnLoginPress}
                />

                <View style={{marginTop: 10}} />

                <Button
                    title="Regístrate"
                    containerStyle={styles.buttons}
                    type='outline'
                    onPress={handleOnRegisterPress}
                />

            </View>
        </ScrollView>
        
    );
    
}



const styles = StyleSheet.create({


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttons: {
        width: '90%'
    },

    image: {
        width: 300,
        height: 200,
        marginVertical: 10
    },

    textTitle: {
        //fontFamily: 'Quicksand-Medium',
        fontSize: 40,
        marginVertical: 10
    },

    textBody: {
        //fontFamily: 'Quicksand-Regular',
        fontSize: 16
    }
});
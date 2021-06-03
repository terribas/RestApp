import React, {useState} from 'react';
import {Text, StyleSheet, View, SafeAreaView, Image, ScrollView, Alert} from 'react-native';

import {REGISTER} from 'src/consts/screens';

import Inputs from 'src/components/Inputs';
import Buttons from 'src/components/Buttons';
import Texts from 'src/components/Texts';

import {API_URL} from 'src/consts/server';

import useAuthContext from 'src/hooks/useAuthContext';
import tr from 'src/language/utils';

export default function LoginScreen({navigation, route}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {clientLogin, waiterLogin} = useAuthContext();



    /*function handleOnLoginPress() {
        if (email === 'client') {

    function handleOnLoginPress() {
        if (email === 'client' || email === 'Client')  {

            clientLogin('token del cliente');
        } else {
            waiterLogin('token del camarero');
        }
    } */

    //  Se conecta al servidor.
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
                Alert.alert(tr("user_pw_invalido"));
            } else {
                const {token, role} = await response.json();
                
                if (role === 'waiter') {
                    waiterLogin(token);
                } else {
                    clientLogin(token);
                }
            }
        } catch (error) {
            Alert.alert(tr("problema_inicio_sesion"));
        }
    }
    


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

                <Texts h1 semibold center>{tr("bienvenido")}</Texts>
                <Texts h4 center>{tr("inicia_sesion_cuenta")}</Texts>

                <View style={{marginTop: 20}} />
                
                <Inputs
                    placeholder={tr("email")}
                    leftIcon="mail-outline"
                    rightIcon="close"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Inputs
                    placeholder={tr("pw")}
                    leftIcon="lock"
                    isPassword={true}
                    value={password}
                    onChangeText={setPassword}
                />
                

                <View style={{marginTop: 25}} />

                <View style={styles.buttonsContainer}>
                    <Buttons
                        title={tr("iniciar_sesion")}
                        onPress={handleOnLoginPress}
                    />

                    <View style={{marginTop: 15}} />

                    
                    <Texts h5 center>{tr("sin_cuenta")}</Texts>

                    <View style={{marginTop: 5}} />

                    <Buttons
                        title={tr("registrate")}
                        type='outline'
                        onPress={handleOnRegisterPress}
                    />
                </View>
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

    buttonsContainer: {
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
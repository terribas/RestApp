import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, ScrollView, Text, Image} from 'react-native';
import Inputs from 'src/components/Inputs';
import Buttons from 'src/components/Buttons';
import Texts from 'src/components/Texts';
import {useMutation} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';
import LoadingScreen from 'src/screens/status/LoadingScreen';
import DropDownPicker from 'react-native-dropdown-picker';


const dropdownItems = [
    {label: 'A través de un amigo', value: 'Friends'},
    {label: 'En un anuncio de internet', value: 'Internet Ad'},
    {label: 'Instagram', value: 'Instagram'},
    {label: 'Facebook', value: 'Facebook'},
    {label: 'En la radio', value: 'Radio'},
    {label: 'En la TV', value: 'TV'},
    {label: 'Otro', value: 'Others'},
]


const emailRegex = /\S+@\S+\.\S+/;

async function postRegister({name, lastName, email, password, referral}) {
    const response = await apiAuthFetch('/auth/signup', {method: 'POST', body: JSON.stringify({name, lastName, email, password, referral})} );
    if (!response.ok) throw Error;
    const json = await response.json();
    return json;
}



export default function Register({navigation, route}) {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [referral, setReferral] = useState(null);

    const {mutate, isLoading} = useMutation(postRegister, {
        onSuccess: () => {
            Alert.alert('Tu cuenta se ha creado correctamente');
            navigation.goBack();
        },
        onError: () => {
            Alert.alert('Error al crear la cuenta. Comprueba que no existe');
        }
    });

    
    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>

            <View style={{marginTop: 30}}/>
            <Image style={styles.logo} source={require('assets/logo/single.png')}/>
            <View style={{marginTop: 10}}/>
            <Texts h3 center semibold>Crea tu cuenta en RestApp</Texts>
        
            
            <View style={{marginTop: 40}} />
            <View style={styles.leftContainer}><Texts h4 semibold color='gray'>Tus datos</Texts></View>
            <View style={{marginTop: 5}} />
            <Inputs
                placeholder='Nombre'
                leftIcon='person'
                rightIcon='close'
                label='Nombre'
                value={name}
                onChangeText={setName}
            />

            <View style={{marginTop: 5}} />
            <Inputs
                placeholder='Apellidos'
                leftIcon='person-outline'
                rightIcon='close'
                label='Apellidos'
                value={lastName}
                onChangeText={setLastName}
            />



            <View style={{marginTop: 20}} />
            <View style={styles.leftContainer}><Texts h4 semibold color='gray'>Tu inicio de sesión</Texts></View>
            <View style={{marginTop: 5}} />
            <Inputs
                placeholder='Email'
                leftIcon='email'
                rightIcon='close'
                label='Email'
                value={email}
                onChangeText={setEmail}
                errorMessage={email.length > 0 && !emailRegex.test(email) ? 'Introduce un mail válido' : ''}
            />


            <View style={{marginTop: 5}} />
            <Inputs
                placeholder='Crea tu contraseña segura'
                leftIcon='lock'
                rightIcon='close'
                label='Contraseña'
                value={password}
                onChangeText={setPassword}
                isPassword
                
            />


            <View style={{marginTop: 5}} />
            <Inputs
                placeholder='Repite contraseña'
                leftIcon='lock-outline'
                rightIcon='close'
                label='Repite contraseña'
                isPassword
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                errorMessage={passwordRepeat.length > 0 && passwordRepeat !== password ? 'Las contraseñas no coinciden' : ''}
            />

            <View style={{marginTop: 10}} />
            <View style={styles.leftContainer}><Texts h4 semibold color='gray'>¿Cómo nos conociste?</Texts></View>
            <DropDownPicker
                value={referral}
                setValue={setReferral}
                open={dropdownOpen}
                setOpen={setDropdownOpen}
                placeholder='¿Cómo nos conociste?'
                items={dropdownItems}
                style={{borderColor: '#741922'}}
                containerStyle={{width: '85%' }}
                textStyle={{ fontFamily: 'Montserrat-Regular' }}
            /> 

            
            <View style={styles.buttonContainer}>
                <Buttons
                    title='Regístrate'
                    disabled={
                        name.length <= 0 || lastName.length <= 0 || email.length <= 0 || password.length <= 0 || passwordRepeat.length <= 0 || password !== passwordRepeat ||
                        !emailRegex.test(email) || !referral
                    }
                    loading={isLoading}
                    onPress={() => {mutate({name, lastName, email, password, referral})}}
                />
                <View style={{marginTop: 10}} />
                {(name.length <= 0 || lastName.length <= 0 || email.length <= 0 ||
                password.length <= 0 || passwordRepeat.length <= 0 || referral == null)
                && <Texts h5 center>Debes rellenar los campos</Texts>}
            </View>

            <View style={{marginTop: 100}} />
            
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
        marginTop: 40,
        flex: 1,
        width: '90%'
    },

    leftContainer: {
        width: '85%',
        alignItems: 'flex-start',
        marginBottom: 8
    },

    logo: {
        width: 70,
        height: 70
    }
});
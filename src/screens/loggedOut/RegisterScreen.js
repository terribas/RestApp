import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, ScrollView, Text, Image} from 'react-native';
import Inputs from 'src/components/Inputs';
import Buttons from 'src/components/Buttons';
import Texts from 'src/components/Texts';
import {useMutation} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';
import LoadingScreen from 'src/screens/status/LoadingScreen';
import DropDownPicker from 'react-native-dropdown-picker';
import tr from 'src/language/utils';


const dropdownItems = [
    {label: tr("dropitem_friend"), value: 'Friends'},
    {label: tr("dropitem_internet"), value: 'Internet Ad'},
    {label: tr("dropitem_instagram"), value: 'Instagram'},
    {label: tr("dropitem_facebook"), value: 'Facebook'},
    {label: tr("dropitem_radio"), value: 'Radio'},
    {label: tr("dropitem_tv"), value: 'TV'},
    {label: tr("dropitem_other"), value: 'Others'},
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
            Alert.alert(tr("registro_ok"));
            navigation.goBack();
        },
        onError: () => {
            Alert.alert(tr("registro_error"));
        }
    });

    
    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>

            <View style={{marginTop: 30}}/>
            <Image style={styles.logo} source={require('assets/logo/single.png')}/>
            <View style={{marginTop: 10}}/>
            <Texts h3 center semibold>{tr("crea_cuenta")}</Texts>
        
            
            <View style={{marginTop: 40}} />
            <View style={styles.leftContainer}><Texts h4 semibold color='gray'>{tr("tus_datos")}</Texts></View>
            <View style={{marginTop: 5}} />
            <Inputs
                placeholder={tr("nombre")}
                leftIcon='person'
                rightIcon='close'
                label={tr("nombre")}
                value={name}
                onChangeText={setName}
            />

            <View style={{marginTop: 5}} />
            <Inputs
                placeholder={tr("apellidos")}
                leftIcon='person-outline'
                rightIcon='close'
                label={tr("apellidos")}
                value={lastName}
                onChangeText={setLastName}
            />



            <View style={{marginTop: 20}} />
            <View style={styles.leftContainer}><Texts h4 semibold color='gray'>{tr("tu_inicio_sesion")}</Texts></View>
            <View style={{marginTop: 5}} />
            <Inputs
                placeholder={tr("email")}
                leftIcon='email'
                rightIcon='close'
                label={tr("email")}
                value={email}
                onChangeText={setEmail}
                errorMessage={email.length > 0 && !emailRegex.test(email) ? tr("email_valido") : ''}
            />


            <View style={{marginTop: 5}} />
            <Inputs
                placeholder={tr("pw_registro")}
                leftIcon='lock'
                rightIcon='close'
                label='Contraseña'
                value={password}
                onChangeText={setPassword}
                isPassword
                
            />


            <View style={{marginTop: 5}} />
            <Inputs
                placeholder={tr("repw_registro")}
                leftIcon='lock-outline'
                rightIcon='close'
                label='Repite contraseña'
                isPassword
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                errorMessage={passwordRepeat.length > 0 && passwordRepeat !== password ? tr("pw_distinta") : ''}
            />

            <View style={{marginTop: 10}} />
            <View style={styles.leftContainer}><Texts h4 semibold color='gray'>{tr("como_conociste")}</Texts></View>
            <DropDownPicker
                value={referral}
                setValue={setReferral}
                open={dropdownOpen}
                setOpen={setDropdownOpen}
                placeholder={tr("como_conociste")}
                items={dropdownItems}
                style={{borderColor: '#741922'}}
                containerStyle={{width: '85%' }}
                textStyle={{ fontFamily: 'Montserrat-Regular' }}
            /> 

            
            <View style={styles.buttonContainer}>
                <Buttons
                    title={tr("registrate")}
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
                && <Texts h5 center>{tr("rellenar_campos")}</Texts>}
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
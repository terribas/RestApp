import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import Buttons from 'src/components/Buttons';


export default function PaymentScreen({navigation, route}) {
    
    const {cart, total, table} = route.params;
    const [cardInput, setCardInput] = useState({});

    function handleOnPayPress() {
        console.log('hola');
    }

    return (
        <View style={styles.container}>
            <View style={{marginTop: 20}} />
            <CreditCardInput
                labels={{
                    number: 'Número de tarjeta',
                    expiry: 'Validez',
                    cvc: 'CVC'
                }}
                placeholders={{
                    number: '1234 5678 1234 5678',
                    expiry: 'MM/AA',
                    cvc: 'CVC'
                }}
                labelStyle={{
                    //color: '#741922'
                    color: 'black'
                }}
                inputContainerStyle={{
                    borderBottomWidth: 1,
                    //borderBottomColor: '#741922'
                    borderBottomColor: 'black'
                }}
                allowScroll={true}
                cardImageFront={require('assets/images/front-card.png')}
                cardImageBack={require('assets/images/back-card.png')}
                onChange={setCardInput}
            />
            <View style={{marginTop: 70}} />

            <View style={styles.buttonContainer}>
                <Buttons title="PAGAR" onPress={handleOnPayPress} disabled={!cardInput?.valid}/>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    buttonContainer: {
        marginLeft: 16,
        marginRight: 16
    }
})
import React from 'react';
import {CreditCardInput} from 'react-native-credit-card-input';

export default function CreditCardInputs(props) {
    return (
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
                color: 'black'
            }}
            inputContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: 'black'
            }}
            allowScroll={true}
            cardImageFront={require('assets/images/front-card.png')}
            cardImageBack={require('assets/images/back-card.png')}
            onChange={props.onChange}
        />
    );
}
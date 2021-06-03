import React from 'react';
import {CreditCardInput} from 'react-native-credit-card-input';
import tr from 'src/language/utils';

export default function CreditCardInputs(props) {
    return (
        <CreditCardInput
            labels={{
                number: tr("numero_tarjeta"),
                expiry: tr("validez"),
                cvc: tr("cvc")
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
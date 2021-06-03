import React from 'react';
import {CardView} from 'react-native-credit-card-input';


export default function CreditCardViews({number, expiry, brand}) {
    return (
        <CardView
            imageFront={require('assets/images/front-card.png')}
            imageBack={require('assets/images/back-card.png')}
            name=" "
            number={number}
            expiry={expiry}
            brand={brand}
        />
    );
}
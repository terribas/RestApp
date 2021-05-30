import React from 'react';
import {View, Text} from 'react-native';
import {CreditCardInput, CardView} from 'react-native-credit-card-input';


export default function PaymentMethodScreen({navigation, route}) {
    return (
        <View>
            <Text>Payment Method</Text>
            <CardView
                imageFront={require('assets/images/front-card.png')}
                imageBack={require('assets/images/back-card.png')}
                name=" "
                number={'**** **** **** 1234'}
                expiry='MM/AA'
                brand="visa"
            />
        </View>
    );
}
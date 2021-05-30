import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import {CheckBox} from 'react-native-elements'
import Buttons from 'src/components/Buttons';
import apiAuthFetch from 'src/services/apiAuthFetch';


export default function PaymentScreen({navigation, route}) {
    
    const {cart, total, table} = route.params;
    const [cardInput, setCardInput] = useState({});
    const [isSelected, setIsSelected] = useState(false);

    const [card, setCard] = useState({});
    
    async function get_cards() {
        const options = {
          method: 'POST',
          body: JSON.stringify({
          })
        }
        const response = await apiAuthFetch("/payment/getCard", options)
        
        const json = await response.json()
        console.log(json)
        if (json.tarjeta){
          console.log("entro en if")
          setCard(json)
        }
    }

    useEffect( () =>{
        get_cards()}, [] );

    function handleOnPayPress() {
        console.log('hola');
    }
    if (card.tarjeta){
        return(
        <View>
            <Text>Esta a punto de pagar {total.toFixed(2)}€ con su tarjeta acabada en {card.paymentMethods.data[0].card.last4} ¿Desea confirmar su pedido?</Text>
            <Button title="ACEPTAR"></Button>
            <Button title="CANCELAR"></Button>
        </View>
        )
    } else{
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
                <CheckBox
                    checked={isSelected}
                    onPress={() => {setIsSelected(!isSelected)} }
                    title="¿Quieres guardar tu tarjeta para futuros pagos?"
                    />   
            <View style={styles.buttonContainer}>
                <Buttons title="PAGAR" onPress={handleOnPayPress} disabled={!cardInput?.valid}/>
            </View>
        </View>
        );
    }
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
import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {CreditCardInput, CardView} from 'react-native-credit-card-input';
import Buttons from 'src/components/Buttons';
import apiAuthFetch from 'src/services/apiAuthFetch';

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

export default function PaymentMethodScreen({navigation, route}) {
   
    const [card, setCard] = useState({});
    const [cardInput, setCardInput] = useState({});

    useEffect( () =>{
        get_cards()}, [] );

    function handleSaveCard(){
        saveCard()
    }

    

    async function createPaymentMethod() {
        const number = cardInput.values.number.replace(/\s/g,"")
        let expiry = cardInput.values.expiry
        const month =parseInt(expiry[0]+expiry[1]) 
        const year = parseInt("20"+expiry[3]+expiry[4])
        const cvc = cardInput.values.cvc
        const card = {
          number: number ,
          //4000002500003155
          //number: '4000000000003220', //asdas44ds
          exp_month: month,
          exp_year: year,
          cvc: cvc,
        }
        const options = {
          method: 'POST',
          body: JSON.stringify({
            "card": card
          })
        }
        try{    
          const response = await apiAuthFetch("/payment/createPaymentMethod", options)
          if(!response.ok){
            console.log("Error en createpaymentmethod")
          } else {
            console.log("todo ok en crear metodo de pago")
            return await response.json()
          }
  
        } catch(error){
          console.log("error de conexion")
        }
      }


      async function saveCard() {
        console.log('saveCard');
        const { paymentMethod, error } = await createPaymentMethod();
        const options = {
          method: 'POST',
          body: JSON.stringify({
            "paymentMethodId":paymentMethod.id
          })
        }
        const response = await apiAuthFetch("/payment/save_card_v2", options)
    }


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
        } else {

        }
   
    }

    async function deleteCard() {
        console.log("deleteCard")
        const options = {
          method: 'POST',
          body: JSON.stringify({
            
          })
        }
        console.log("borrando tarjeta")
        const response = await apiAuthFetch("/payment/deleteCard", options)
        console.log(response)
        
      }

    if (card.tarjeta){
        
        const numeroTarjeta = "**** **** **** " +card.paymentMethods.data[0].card.last4
        const expiry = card.paymentMethods.data[0].card.exp_month+"/"+card.paymentMethods.data[0].card.exp_year
        console.log(card.brand)
        return (
    
            <View>
                <Text>Payment Method</Text>
                <CardView
                    imageFront={require('assets/images/front-card.png')}
                    imageBack={require('assets/images/back-card.png')}
                    name=" "
                    number= {numeroTarjeta}
                    expiry= {expiry}
                    brand="visa"
                />
                <Button title="Borrar metodo de pago" onPress={deleteCard}></Button>
            </View>
        );
    } else{
        return(
        <View>
            <Text>No se ha encontrado metodo de pago</Text>
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
            <View style={styles.buttonContainer}>
                <Buttons title="Añadir tarjeta" onPress={handleSaveCard} disabled={!cardInput?.valid}/>
            </View>
        </View>
    
    )}
    
    
}
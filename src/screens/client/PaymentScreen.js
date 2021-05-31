import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import {CheckBox} from 'react-native-elements'
import Buttons from 'src/components/Buttons';
import apiAuthFetch from 'src/services/apiAuthFetch';
import useSavedCards from 'src/hooks/useSavedCards';
import LoadingScreen from 'src/screens/status/LoadingScreen';


export default function PaymentScreen({navigation, route}) {
    
    const {cart, total, table} = route.params;
    const [cardInput, setCardInput] = useState({});
    const [isSelected, setIsSelected] = useState(false);
    //const [card, setCard] = useState({});

    //const [card, setCard] = useState({});

    const {isLoading, isSuccess, data: card} = useSavedCards();

    
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

    /*useEffect( () =>{
        get_cards()}, [] );*/

    function handleOnPayPress() {
        payWithSavedCard()
        payWithNoSavedCard()
    }

    function handlePayWithSavedCard(){
        payWithSavedCard()
    }

    async function payWithSavedCard(){

//        const paymentMethods = card
        const paymentMethodId = card.paymentMethods.data[0].id
        
  
  
        console.log("Estoy en PAY WITH SAVED CARD")
        console.log(paymentMethodId)
        
  
        const options = {
          method: 'POST',
          body: JSON.stringify({
            paymentMethodiD:paymentMethodId,
            amount:total * 100
          })
        }
        const response = await apiAuthFetch("/payment/payWithCard", options)
        const json = await response.json()
        if(json.error){
            console.log("Error en Pago")
            Alert.alert(
              "Error pago",
              "Se ha producido un error en la compra de su producto. Intentelo de nuevo o contacte a uno de nuestros encargados",
              [
                { text: "OK"}
              ]
            );
         
        } else if (json.success) {
            console.log("PAGO OK")
            Alert.alert(
              "Pago correcto",
              "Su pedido se ha realizado. Muchas gracias",
              [
                { text: "OK"}
              ]
            );
        } else {
            Alert.alert(
                "Error pago",
                "Se ha producido un error en la compra de su producto. Intentelo de nuevo o contacte a uno de nuestros encargados",
                [
                  { text: "OK"}
                ]
              ); 
        }
    }

    const payWithNoSavedCard = async () => {
        const { paymentMethod, error } = await createPaymentMethod();
        
        if (error) {
          // Handle error
        } else if (paymentMethod) {
          const paymentMethodId = paymentMethod.id;
          console.log("--------------------------")
          console.log(paymentMethodId)
          // Send the ID of the PaymentMethod to your server for the next step
          // ...
          console.log("number")
          const amount = total*100
          const options = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({
              "payment_method_id": paymentMethodId,
              "amount":amount
            })
          }
          try{
            const response = await fetch("http://51.178.36.227:2003/api/payment/pay", options)
            const json = await response.json()
            console.log("response")
            console.log(json)
            if(json.error){
              console.log("Error en Pago")
              Alert.alert(
                "Error pago",
                "Se ha producido un error en la compra de su producto. Intentelo de nuevo o contacte a uno de nuestros encargados",
                [
                  { text: "OK"}
                ]
              );
           
            } else if (json.success) {
              console.log("PAGO OK")
              Alert.alert(
                "Pago correcto",
                "Su pedido se ha realizado. Muchas gracias",
                [
                  { text: "OK"}
                ]
              );

                if (isSelected){
                    console.log("Guardar tarjeta")
                    saveCard()
                }
            } else {
                Alert.alert(
                    "Error pago",
                    "Se ha producido un error en la compra de su producto. Intentelo de nuevo o contacte a uno de nuestros encargados",
                    [
                      { text: "OK"}
                    ]
                  ); 
            }
    
          } catch(error){
            console.log(error)
            console.log("error de conexion (pago)")
            Alert.alert(
                "Error pago",
                "Se ha producido un error en la compra de su producto. Intentelo de nuevo o contacte a uno de nuestros encargados",
                [
                  { text: "OK"}
                ]
              );
          }
        }
      }; 

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

      async function createPaymentMethod() {
        const number = cardInput.values.number.replace(/\s/g,"")
        let expiry = cardInput.values.expiry
        const month =parseInt(expiry[0]+expiry[1]) 
        const year = parseInt("20"+expiry[3]+expiry[4])
        const cvc = cardInput.values.cvc
        const card = {
          number: number ,
          exp_month: month,
          exp_year: year,
          cvc: cvc,
        }
      
        console.log("creando payment method")
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "card": card
          })
        }
        try{
          const response = await fetch("http://51.178.36.227:2003/api/payment/createPaymentMethod", options)
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

    //if (card.tarjeta){
    if (isLoading) {
        return <LoadingScreen message='Recuperando métodos de pago...' />;
    } else if (!isSuccess) {
        Alert.alert('Error al recuperar los métodos de pago');
        navigation.goBack();
        return <View />
    } else if (card.tarjeta){
        return(
        <View>
            <Text>Esta a punto de pagar {total.toFixed(2)}€ con su tarjeta acabada en {card.paymentMethods.data[0].card.last4} ¿Desea confirmar su pedido?</Text>
            <Button title="ACEPTAR" onPress={handlePayWithSavedCard}></Button>
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
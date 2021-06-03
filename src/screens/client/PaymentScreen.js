import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import CreditCardInputs from 'src/components/CreditCardInputs';
import CreditCardViews from 'src/components/CreditCardViews';
import {CheckBox} from 'react-native-elements'
import Buttons from 'src/components/Buttons';
import apiAuthFetch from 'src/services/apiAuthFetch';
import useSavedCards from 'src/hooks/useSavedCards';
import LoadingScreen from 'src/screens/status/LoadingScreen';
import {API_URL} from 'src/consts/server';
import {useMutation} from 'react-query';
import {CLIENT_WELCOME} from 'src/consts/screens';


async function postOrder({table, total, products}) {
  const options = {
    method: 'POST',
    body: JSON.stringify({table, total, products})
  }
  const response = await apiAuthFetch('/order/create', options);
  if (!response.ok) throw Error;
  return await response.json();
}



export default function PaymentScreen({navigation, route}) {
    
  const {cart, total, table} = route.params;
  const [cardInput, setCardInput] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [paying, setPaying] = useState(false);

  const {isLoading, isSuccess, data: card} = useSavedCards();

  const {mutate: sendOrder, isLoading: isPosting, data: orderData} = useMutation(postOrder, {
    onError: () => {
      Alert.alert('Error al completar el pedido. Inténtalo de nuevo más tarde');
    },
    onSuccess: () => {
      Alert.alert('Su pedido se ha realizado exitosamente. Muchas gracias por su confianza.');
      navigation.navigate(CLIENT_WELCOME);
    }
  })


  function handleOnPayPress() {
    //console.log(table);
    payWithNoSavedCard()
  }

  function handlePayWithSavedCard(){
    //console.log(total);
    payWithSavedCard()
  }

  async function payWithSavedCard(){
    setPaying(true)
    let amount = total.toString()
    amount = amount * 100
    console.log(amount)
    let cant = parseInt(amount)
    console.log("pay")
    console.log(amount)
    const paymentMethodId = card.paymentMethods.data[0].id
    console.log("Estoy en PAY WITH SAVED CARD")
    console.log(paymentMethodId)
    const options = {
      method: 'POST',
      body: JSON.stringify({
        paymentMethodiD: paymentMethodId,
        amount: cant
      })
    }
    const response = await apiAuthFetch("/payment/payWithCard", options)
    const json = await response.json()
    if(json.error){
      console.log("Error en Pago")
      Alert.alert(
        "Error pago",
        "Se ha producido un error en la compra de su producto. Intentelo de nuevo o contacte a uno de nuestros encargados",
        [{ text: "OK" }]
      );
      setPaying(false)
      
    } else if (json.success) {
      console.log("PAGO OK")
      /*Alert.alert(
        "Pago correcto",
        "Su pedido se ha realizado. Muchas gracias",
        [{ text: "OK" }]
      );*/


      //PETICION DEL PEDIDO

      sendOrder({table, total, products: cart});



      setPaying(false)
    } else {
      Alert.alert(
        "Error al pagar",
        "Se ha producido un error en la compra. Inténtalo de nuevo o contacta a uno de nuestros encargados",
        [{ text: "OK" }]
      ); 
      setPaying(false)
    }
  }

  const payWithNoSavedCard = async () => {
    setPaying(true)
    const { paymentMethod, error } = await createPaymentMethod();
      
    if (error) {
      setPaying(false)
      // Handle error
    } else if (paymentMethod) {
      const paymentMethodId = paymentMethod.id;
      console.log("--------------------------")
      console.log(paymentMethodId)
      // Send the ID of the PaymentMethod to your server for the next step
      // ...
      console.log("number")
      let amount = total.toString()
      amount = amount * 100
      console.log(amount)
      let cant = parseInt(amount)
      //cant = cant *100
      console.log(cant)
      const options = {
        method: 'POST',          
        body: JSON.stringify({
          payment_method_id: paymentMethodId,
          amount: cant
        })
      }
      try{
        const response = await apiAuthFetch('/payment/pay', options)
        const json = await response.json()
        console.log("response")
        console.log(json)
        if(json.error){
          console.log("Error en Pago")
          Alert.alert(
            "Error pago",
            "Se ha producido un error en la compra de su producto. Intentelo de nuevo o contacte a uno de nuestros encargados",
            [{ text: "OK" }]
          );
          setPaying(false)
        } else if (json.success) {
          console.log("PAGO OK")
          /*Alert.alert(
            "Pago correcto",
            "Su pedido se ha realizado. Muchas gracias",
            [{ text: "OK" }]
          );*/

          //PETICION PEDIDO



          if (isSelected){
            console.log("Guardar tarjeta")
            saveCard()
          } else{
            setPaying(false)
          }

          sendOrder({table, total, products: cart});


        } else {
          Alert.alert(
            "Error pago",
            "Se ha producido un error en la compra de su producto. Intentelo de nuevo o contacte a uno de nuestros encargados",
            [{ text: "OK" }]
          ); 
          setPaying(false)
        }

      } catch(error){
        console.log(error)
        console.log("error de conexion (pago)")
        Alert.alert(
          "Error pago",
          "Se ha producido un error en la compra de su producto. Intentelo de nuevo o contacte a uno de nuestros encargados",
          [{ text: "OK" }]
        );
        setPaying(false)
      }
    }
  }; 

  async function saveCard() {
    console.log('saveCard');
    const { paymentMethod, error } = await createPaymentMethod();
    const options = {
      method: 'POST',
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id
      })
    }
    const response = await apiAuthFetch("/payment/save_card_v2", options)
    setPaying(false)
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
      body: JSON.stringify({card})
    }
    try{
      const response = await apiAuthFetch('/payment/createPaymentMethod', options)
      if(!response.ok){
        console.log("Error en createpaymentmethod")
      } else {
        console.log("todo ok en crear metodo de pago")
        return await response.json()
      }

    } catch(error){
      console.log(error)
      console.log("error de conexion")
    }
  }

  function handleCancel(){
    navigation.goBack();
  }


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
          <Buttons title="ACEPTAR" onPress={handlePayWithSavedCard} loading={paying} ></Buttons>
          <Buttons title="CANCELAR" disabled={paying} onPress={handleCancel} ></Buttons>
      </View>
      )
  } else{
  return (
      <View style={styles.container}>
          <View style={{marginTop: 20}} />
          <CreditCardInputs
              onChange={setCardInput}
          />
          <View style={{marginTop: 70}} />
              <CheckBox
                  checked={isSelected}
                  onPress={() => {setIsSelected(!isSelected)} }
                  title="¿Quieres guardar tu tarjeta para futuros pagos?"
                  />   
          <View style={styles.buttonContainer}>
              <Buttons title="PAGAR" onPress={handleOnPayPress} disabled={!cardInput?.valid} loading={paying}/>
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
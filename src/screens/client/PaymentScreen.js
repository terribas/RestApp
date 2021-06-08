import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import CreditCardInputs from 'src/components/CreditCardInputs';
import CreditCardViews from 'src/components/CreditCardViews';
import {CheckBox} from 'react-native-elements'
import Buttons from 'src/components/Buttons';
import Texts from 'src/components/Texts'
import apiAuthFetch from 'src/services/apiAuthFetch';
import useSavedCards from 'src/hooks/useSavedCards';
import LoadingScreen from 'src/screens/status/LoadingScreen';
import {API_URL} from 'src/consts/server';
import {useMutation} from 'react-query';
import {CLIENT_WELCOME} from 'src/consts/screens';
import tr from 'src/language/utils';


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
      Alert.alert(tr("error_pago_detalle"));
    },
    onSuccess: () => {
      Alert.alert(tr("pago_ok_detalle"));
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
        tr("error_pago"),
        tr("error_pago_detalle"),
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
        tr("error_pago"),
        tr("error_pago_detalle"),
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
            tr("error_pago"),
            tr("error_pago_detalle"),
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
            tr("error_pago"),
            tr("error_pago_detalle"),
            [{ text: "OK" }]
          ); 
          setPaying(false)
        }

      } catch(error){
        console.log(error)
        console.log("error de conexion (pago)")
        Alert.alert(
          tr("error_pago"),
          tr("error_pago_detalle"),
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
      return <LoadingScreen message={tr("recuperando_metodos_pago")} />;
  } else if (!isSuccess) {
      Alert.alert(tr("recuperar_metodos_pago_error"));
      navigation.goBack();
      return <View />
  } else if (card.tarjeta){
      return(
        <View style={styles.container}>
      <View style={styles.centerContainer}>
          <View style={{marginTop: 20}} />
          <Texts h4>{tr("pagar_tarjeta_1")} {total.toFixed(2)} {tr("pagar_tarjeta_2")} {card.paymentMethods.data[0].card.last4}</Texts>
          <View style={{marginTop: 10}} />
          <Texts h4 semibold>{tr("pagar_tarjeta_3")}</Texts>
          
          <View style={{marginTop: 20}} />
          <Buttons title={tr("aceptar")} onPress={handlePayWithSavedCard} loading={paying} />
          <View style={{marginTop: 15}} />
          <Buttons title={tr("cancelar")} disabled={paying} onPress={handleCancel} type='outline'/>
      </View>
      </View>
      )
  } else{
  return (
      <View style={styles.container}>
          <View style={{marginTop: 20}} />
          <CreditCardInputs
              onChange={setCardInput}
          />
          <View style={{marginTop: 20}} />
          <CheckBox
              checked={isSelected}
              onPress={() => {setIsSelected(!isSelected)} }
              title={tr("guardar_tarjeta")}
          />
          <View style={{marginTop: 30}} />
          <View style={styles.buttonContainer}>
              <Buttons title={tr("pagar") + ' ' + total.toFixed(2) + ' €'} onPress={handleOnPayPress} disabled={!cardInput?.valid} loading={paying}/>
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
    },

    centerContainer: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      paddingLeft: 12,
      paddingRight: 12
    }
})
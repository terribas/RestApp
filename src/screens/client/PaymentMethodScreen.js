import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {CardView} from 'react-native-credit-card-input';
import CreditCardInputs from 'src/components/CreditCardInputs';
import CreditCardViews from 'src/components/CreditCardViews';
import Buttons from 'src/components/Buttons';
import apiAuthFetch from 'src/services/apiAuthFetch';
import useSavedCards from 'src/hooks/useSavedCards';
import LoadingScreen from 'src/screens/status/LoadingScreen';



export default function PaymentMethodScreen({navigation, route}) {

    const [cardInput, setCardInput] = useState({});
    const {isLoading, isSuccess, data: card} = useSavedCards();
    const [loadingBt, setLoadingBt] = useState(false)


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
          exp_month: month,
          exp_year: year,
          cvc: cvc,
        }
        const options = {
          method: 'POST',
          body: JSON.stringify({card})
        }
        try{    
          const response = await apiAuthFetch("/payment/createPaymentMethod", options)
          if(!response.ok){
            console.log("Error en createpaymentmethod")
            throw Error;
          } else {
            console.log("todo ok en crear metodo de pago")
            return await response.json()
          }
  
        } catch(error){
          console.log(error)
          console.log("error de conexion")
          Alert.alert(
            "Error de conexión",
            "No se ha podido conectar con el servidor, inténtalo más tarde",
            [{ text: "OK" }]
          );
        }
      }


    async function saveCard() {
      setLoadingBt(true)
      console.log('saveCard');
      const { paymentMethod, error } = await createPaymentMethod();
      const options = {
        method: 'POST',
        body: JSON.stringify({
          "paymentMethodId": paymentMethod.id
        })
      }
      const response = await apiAuthFetch("/payment/save_card_v2", options)

      console.log("saving card")
      const json = await response.json()
      if (json.error){
        Alert.alert(
          "Error al guardar la tarjeta",
          "No se ha podido guardar la tarjeta. Inténtalo de nuevo mas tarde",
          [{ text: "OK" }]
        );
        setLoadingBt(false)

      } else {
        Alert.alert(
          "Tarjeta guardada",
          "Su tarjeta ha sido guardada exitosamente.",
          [{ text: "OK" }]
        );
        setLoadingBt(true)
        navigation.goBack()
      }
    }

    async function deleteCard() {
      setLoadingBt(true)
      console.log("deleteCard")
      console.log("borrando tarjeta")
      const response = await apiAuthFetch("/payment/deleteCard", {method: 'POST'})
      
      if (response.ok){
        Alert.alert('Su tarjeta se ha borrado correctamente');
        navigation.goBack();
      } else{
        Alert.alert('Error al borrar su tarjeta. Inténtalo de nuevo más tarde');
        setLoadingBt(false);
      }
    }


    if (isLoading){
      return <LoadingScreen message="Cargando..."/>;

    } else if (!isSuccess){
      Alert.alert(
        "Error de conexión",
        "No se ha podido conectar con el servidor, intentelo más tarde",
        [{ text: "OK" }]
      );
      navigation.goBack();
      return <View/>;

    } else if (card.tarjeta){
        const {last4, exp_month, exp_year, brand} = card.paymentMethods.data[0].card;
        const cardNumber = "**** **** **** " + last4;
        const expiry = exp_month + "/" + exp_year;

        return (
            <View>
              <Text>Payment Method</Text>
              <CreditCardViews
                  number={cardNumber}
                  expiry={expiry}
                  brand={brand}
              />
              
              <Buttons
                  title='Borrar metodo de pago'
                  loading={loadingBt}
                  onPress={deleteCard}
                  //onPress={() => {console.log(last4)}}
              />
            </View>
        );
    } else {
      return(
        <View>

          <Text>No se ha encontrado metodo de pago</Text>

          <CreditCardInputs onChange={setCardInput} />

          <View style={styles.buttonContainer}>
              <Buttons
                  title='Añadir tarjeta'
                  disabled={!cardInput?.valid}
                  loading={loadingBt}
                  onPress={handleSaveCard}
              />
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
});
import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {CardView} from 'react-native-credit-card-input';
import CreditCardInputs from 'src/components/CreditCardInputs';
import CreditCardViews from 'src/components/CreditCardViews';
import Buttons from 'src/components/Buttons';
import Texts from 'src/components/Texts';
import apiAuthFetch from 'src/services/apiAuthFetch';
import useSavedCards from 'src/hooks/useSavedCards';
import LoadingScreen from 'src/screens/status/LoadingScreen';
import tr from 'src/language/utils';

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
            tr("error_conexion"),
            tr("error_conexion_detalle")
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
          tr("error_guardar"),
          tr("error_guardar_detalle"),
          [{ text: "OK" }]
        );
        setLoadingBt(false)

      } else {
        Alert.alert(
          tr("tarjeta_guardada"),
          tr("tarjeta_guardada_detalle"),
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
        Alert.alert(tr("borrado_metodo_pago"));
        navigation.goBack();
      } else{
        Alert.alert(tr("error_borrar_metodo_pago"));
        setLoadingBt(false);
      }
    }


    if (isLoading){
      return <LoadingScreen message={tr("cargando")}/>;

    } else if (!isSuccess){
      Alert.alert(
        tr("error_conexion"),
        tr("error_conexion_detalle"),
        [{ text: "OK" }]
      );
      navigation.goBack();
      return <View/>;

    } else if (card.tarjeta){
        const {last4, exp_month, exp_year, brand} = card.paymentMethods.data[0].card;
        const cardNumber = "**** **** **** " + last4;
        const expiry = exp_month + "/" + exp_year;

        return (
            <View style={styles.container}>

              <View style={styles.marginContainer}>
                <Texts h3 center semibold>{tr("metodo_pago")}</Texts>
              </View>

              <View style={styles.cardContainer}>
                <CreditCardViews
                    number={cardNumber}
                    expiry={expiry}
                    brand={brand}
                />
              </View>
              
              <View style={styles.marginContainer}>
              <Buttons
                  title={tr("borrar_metodo_pago")}
                  loading={loadingBt}
                  onPress={deleteCard}
                  //onPress={() => {console.log(last4)}}
              />
              </View>
            </View>
        );
    } else {
      return(
        <View style={styles.container}>

          <View style={styles.marginContainer}>
            <Texts h3 semibold>{tr("guarda_tu_tarjeta")}</Texts>
            <Texts h5>{tr("msg_guarda_tarjeta")}</Texts>
          </View>

          <CreditCardInputs onChange={setCardInput} />

          <View style={{marginTop: 15}} />
          <View style={styles.marginContainer}>
              <Buttons
                  title={tr("add_tarjeta")}
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

    marginContainer: {
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16
    },

    cardContainer: {
      alignItems: 'center',
    }
});
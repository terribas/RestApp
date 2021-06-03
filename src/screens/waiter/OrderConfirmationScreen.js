import React from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import Buttons from 'src/components/Buttons';
import {WAITER_TABLES_LIST} from 'src/consts/screens';
import {useMutation} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';
import ClientCartListItem from 'src/components/items/client/ClientCartListItem';
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

export default function OrderConfirmationScreen({navigation, route}) {

    const {cart, total, table} = route.params;

    // Order the provided cart by category in order to show it grouped by category
    const sortedCart = cart.sort((a, b) => {
        if (a.category > b.category) { return 1; }
        if (a.category < b.category) { return -1; }
        return 0;
    });

    var lastCategory = '';
    var component;
    const {mutate: sendOrder, isLoading: isPosting, data: orderData} = useMutation(postOrder, {      
        onError: () => {
            Alert.alert(tr("error_order_detalle"));
          },
          onSuccess: () => {
            navigation.navigate(WAITER_TABLES_LIST);
          }
        })
    function handleOnPress() {  
        sendOrder({table, total, products: cart});
    }

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{tr("tu_carrito")}</Text>
            </View>

            <View style={styles.cartListContainer}>
                <FlatList
                    data={sortedCart ?? []}
                    renderItem={({item}) => {
                        component = <ClientCartListItem product={item} newCategory={lastCategory !== item.category}/>;
                        lastCategory = item.category;
                        return component;
                    }}
                    keyExtractor={item => item._id}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Buttons onPress={handleOnPress} title={tr("confirm_order")} />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    titleContainer: {
        flex: 1.2,
        //backgroundColor: 'red',
        justifyContent: 'center',
        paddingLeft: 8
    },

    titleText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30
    },

    cartListContainer: {
        flex: 12,
        //backgroundColor: 'blue',
    },

    buttonContainer: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8
        //backgroundColor: 'green'
    }
});
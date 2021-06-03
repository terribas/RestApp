import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {View, Text, Button, StyleSheet, FlatList, ScrollView} from 'react-native';
import {CLIENT_SCAN} from 'src/consts/screens';
import useAuthContext from 'src/hooks/useAuthContext';
import apiAuthFetch from 'src/services/apiAuthFetch';
import { useFocusEffect } from '@react-navigation/native';
import Texts from 'src/components/Texts';
import {useMyProfile} from 'src/hooks/useMyProfile';
import ClientOrderListItem from 'src/components/items/client/ClientOrderListItem';

export default function WelcomeScreen({navigation, route}) {

    const [lastOrder, setLastOrder] = useState();
    const {logOut, tokenState} = useAuthContext()
    const {isLoading, isSuccess, data: user} = useMyProfile();


    useFocusEffect(
        useCallback(() => {
            async function getLastOrders() {
                const response = await apiAuthFetch('/order/myLastOrder', {method: 'POST'});
                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                    const array = [];
                    array[0] = json
                    setLastOrder(array);
                }
            }
            getLastOrders();
        }, [])
    );

    function handleOnPress() {
        console.log(lastOrder);
        /*
        console.log(new Date(lastOrder.date).getTime());
        console.log(Date.now());

        if (new Date(lastOrder.date).getTime() > Date.now() - 1000 * 60 * 30) {
            console.log('Es una order reciente');
        }

        navigation.navigate(CLIENT_SCAN);
        */
    }




    return (
        
        <View style={styles.container}>
        <ScrollView>
            <View style={styles.topContainer}>
            
            <View style={{marginTop: 15}} />
            <Texts h2 semibold>Bienvenido, {user?.name}</Texts>

            
            
            
            {lastOrder ?
                <>
                <View style={{marginTop: 10}} />
                <Texts h4 bold color='gray'>Tu último pedido</Texts>
                <FlatList data={lastOrder}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => (<ClientOrderListItem order={item} />)}
                />
                    
                
                </>
            : <></>}
            

            <Button onPress={handleOnPress} title="Siguiente pantalla" />
            </View>

            <View style={styles.bottomContainer}>

            </View>
            </ScrollView>
        </View>
        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    topContainer: {
        flex: 9,
        paddingLeft: 8,
        paddingRight: 8
    },

    bottomContainer: {
        flex: 1,
        backgroundColor: 'red'
    }
});
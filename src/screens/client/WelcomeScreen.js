import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {View, Text, Button, StyleSheet, FlatList, ScrollView, Alert} from 'react-native';
import {CLIENT_SCAN} from 'src/consts/screens';
import useAuthContext from 'src/hooks/useAuthContext';
import apiAuthFetch from 'src/services/apiAuthFetch';
import { useFocusEffect } from '@react-navigation/native';
import Texts from 'src/components/Texts';
import Buttons from 'src/components/Buttons';
import {useMyProfile} from 'src/hooks/useMyProfile';
import ClientOrderListItem from 'src/components/items/client/ClientOrderListItem';
import ClientProductPreviewListItem from 'src/components/items/client/ClientProductPreviewListItem';
import useProductContext from 'src/hooks/useProductContext';
import tr from 'src/language/utils';

/*
const randomProducts = [
    {
        "zone": 2,
        "name": "Paella",
        "image_url": "https://recetasdecocina.elmundo.es/wp-content/uploads/2017/09/paella-de-pulpo.jpg",
    },
    {
        "zone": 2,
        "name": "Tarta de queso",
        "image_url": "https://www.annarecetasfaciles.com/files/tarta-de-queso-de-la-vina.jpg",
    },
    {

        "zone": 2,
        "name": "Producto Testeando",
        "image_url": "https://recetasdecocina.elmundo.es/wp-content/uploads/2017/09/paella-de-pulpo.jpg",
    },
    {
        "zone": 2,
        "name": "Producto de prueba",
        "image_url": "https://www.petitchef.es/imgupl/recipe/tarta-de-queso-esponjosa--445890p709045.jpg",
    },
    {
        "zone": 2,
        "name": "Pulpo a la gallega",
        "image_url": "https://www.hola.com/imagenes/cocina/recetas/2016033184797/pulpo-gallega/0-805-441/pulpo-a-la-gallega-con-cachelos-m.jpg",
    },
]
*/


export default function WelcomeScreen({navigation, route}) {

    const [lastOrder, setLastOrder] = useState();
    const [waiterCalled, setWaiterCalled] = useState(false);
    const {logOut, tokenState} = useAuthContext()
    const {isLoading, isSuccess, data: user} = useMyProfile();
    const {isLoading: productsLoading, isSuccess: productsSuccess, products} = useProductContext();

    useFocusEffect(
        useCallback(() => {
            async function getLastOrders() {
                const response = await apiAuthFetch('/order/myLastOrder', {method: 'POST'});
                if (response.ok) {
                    const json = await response.json();
                    //console.log(json);      
                    setLastOrder(json);
                }
            }
            getLastOrders();
        }, [])
    );
    async function callWaiter() {
        await apiAuthFetch(`/table/turn/${lastOrder?.table._id}`, {method: 'POST'});
    }

    function handleOnCallWaiter(){
        if (!waiterCalled) {
            callWaiter();
            Alert.alert(tr("camarero_atencion"))
            setWaiterCalled(true);
        }
    }

    function handleOnOrderPress() {
        navigation.navigate(CLIENT_SCAN);
    }
    return (
        
        <View style={styles.container}>
            <View style={styles.topContainer}>
            <ScrollView style={{flex: 1}}>
            <View style={{marginTop: 15}} />
            <Texts h2 semibold>{tr("bienvenido")}, {user?.name}</Texts>
            {lastOrder ?
                <View>
                <View style={{marginTop: 10}} />  
                <Texts h4 bold color='gray'>{tr("ultimo_pedido")}</Texts>
                <ClientOrderListItem order={lastOrder} />
                {new Date(lastOrder.date).getTime() > Date.now() - 1000 * 60 * 30 &&
                    <Buttons title={tr("necesito_ayuda")} type='outline' onPress={handleOnCallWaiter} disabled={waiterCalled}/>
                }
                </View>
            : <></>}
            <View style={{marginTop: 20}} />
            <Texts h3 semibold >{tr("con_hambre")}</Texts>
            <Texts h5 semibold color='gray'>{tr("algunos_productos")}</Texts>
            <View style={{marginTop: 10}} />
            <FlatList
                horizontal={true}
                data={products?.filter(product => product.zone != 1).sort(() => 0.5 - Math.random()).slice(0,5)}
                renderItem={({item}) => (
                    <ClientProductPreviewListItem product={item}/>
                )}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
            />
            </ScrollView>
            </View>
            <View style={styles.bottomContainer}>
                <Buttons onPress={handleOnOrderPress} title={tr("hacer_pedido")} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    topContainer: {
        flex: 10,
        paddingLeft: 14,
        paddingRight: 14,
    },

    bottomContainer: {
        flex: 1.2,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
    }
});
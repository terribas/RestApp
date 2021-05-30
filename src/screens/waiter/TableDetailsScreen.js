import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {WAITER_PRODUCTS} from 'src/consts/screens';
import Buttons from 'src/components/Buttons';
import {Overlay, Image} from 'react-native-elements';
import WaiterTableOrderListItem from 'src/components/items/waiter/WaiterTableOrderListItem';

import useAuthContext from 'src/hooks/useAuthContext';
import useTableContext from 'src/hooks/useTableContext';

import useTableOrders from 'src/hooks/useTableOrders';

import {API_URL} from 'src/consts/server';


export default function TableDetailsScreen({navigation, route}) {

    const {table} = route.params;
    const [isVisibleQrOverlay, setIsVisibleQrOverlay] = useState(false);
    const [lastOrders, setLastOrders] = useState([]);
    const qrCodeUri = `https://api.qrserver.com/v1/create-qr-code/?data=${table._id}&color=741922`;

    const {tokenState} = useAuthContext();
    const {invalidateTableListCache} = useTableContext();


    const {isLoading, isSuccess, data} = useTableOrders(table._id);


    useLayoutEffect(function() {
        console.log('uselayouteffect');
        navigation.setOptions({
            title: 'Mesa ' + table.table_number
        });
    });


    useEffect(function() {
        async function turnStatus() {
            console.log('el token es ' + tokenState);
            await fetch(`${API_URL}/table/turn/${table._id}`, {
                method: 'POST',
                headers: { 'x-access-token': tokenState }
            });
            invalidateTableListCache();
        }

        if (table.need_waiter) {turnStatus();}

    }, []);

    function handleOnQrPress() {
        setIsVisibleQrOverlay(true);
    }

    function handleOnOrderPress() {
        navigation.navigate(WAITER_PRODUCTS, {table});
    }

    function handleOnBackdropPress() {
        setIsVisibleQrOverlay(false);
    }

    return (
        <View style={styles.container}>

            <Overlay isVisible={isVisibleQrOverlay} onBackdropPress={handleOnBackdropPress}>
                <Image style={styles.qrImage} source={{uri: qrCodeUri}}/>
            </Overlay>

            <View style={styles.listContainer}>

                {isSuccess &&
                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                            <WaiterTableOrderListItem
                                order={item}
                            />
                        )}
                    />
                
                }



            </View>

            <View style={styles.buttonsContainer}>
                <View style={styles.qrButtonContainer}>
                    <Buttons onPress={handleOnQrPress} title='QR' icon='qrcode' style={styles.qrButton}/>
                </View>
                <View style={styles.orderButtonContainer}>
                    <Buttons onPress={handleOnOrderPress} title='Crear comanda' icon='plus'/>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    listContainer: {
        flex: 9
    },

    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    qrButtonContainer: {
        flex: 2,
        margin: 3
    },

    qrButton: {
        
    },

    orderButtonContainer: {
        flex: 8,
        margin: 3
    },

    orderButton: {
        height: '100%'
    },

    qrImage: {
        width: 220,
        height: 220
    }
})
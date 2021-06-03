import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {CLIENT_PRODUCTS} from 'src/consts/screens';

import QRCodeScanner from 'react-native-qrcode-scanner';


import Texts from 'src/components/Texts';
import tr from 'src/language/utils';


export default function ScanScreen({navigation, route}) {

    function handleOnPress() {
        navigation.navigate(CLIENT_PRODUCTS, {
            table: '60a53cdb89603c02b4d1627f'
        });
    }

    function onRead(code) {
        console.log("Datos del qr: "+e.data);
        navigation.navigate(CLIENT_PRODUCTS,{
            table: code.data,
        });
    };
    return (
        <View style={styles.container}>

            <QRCodeScanner
                topContent={<Texts h3 center bold>{tr("escanea_qr")}</Texts>}
                onRead={onRead}
                reactivateTimeout={5000}
                reactivate={true}   
                //containerStyle={{height:300}}
            />
        
            <Button onPress={handleOnPress} title="Siguiente pantalla" />
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
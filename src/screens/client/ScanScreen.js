import React from 'react';
import {View, Text, Button} from 'react-native';
import {CLIENT_PRODUCTS} from 'src/consts/screens';

import QRCodeScanner from 'react-native-qrcode-scanner';


export default function ScanScreen({navigation, route}) {

    function handleOnPress() {
        navigation.navigate(CLIENT_PRODUCTS);
    }

    function onSuccess (e) {
        console.log("Datos del qr: "+e.data);
        navigation.navigate(CLIENT_PRODUCTS,{
            qrdata: e.data,
        }
        );
        
    };
    return (
        <View>
            <Text>ScanScreen</Text>
            <Button onPress={handleOnPress} title="Siguiente pantalla" />
            <QRCodeScanner
            topContent={<Text>Texto arriba</Text>}
            bottomContent={<Text>Texto arriba</Text>}
            onRead={onSuccess}
            reactivateTimeout={5000}
            reactivate={true}   
            />
        

        </View>
    );

}
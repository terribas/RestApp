import React from 'react';
import {Text, StyleSheet, View, SafeAreaView, TextInput, Image, ScrollView} from 'react-native';
import Inputs from 'src/components/Inputs';

export default function LoginScreen() {

    return (


        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
                <Image
                    source={require('assets/logo/vertical.png')}
                    resizeMode='center'
                    style={styles.image}/>

                <Text style={styles.textTitle}>Bienvenido</Text>
                <Text style={styles.textBody}>Inicia sesión</Text>

                <View style={{marginTop: 20}} />

            </View>
        </ScrollView>
        
    );
    
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        width: 300,
        height: 200,
        marginVertical: 10
    },

    textTitle: {
        //fontFamily: 'Quicksand-Medium',
        fontSize: 40,
        marginVertical: 10
    },

    textBody: {
        //fontFamily: 'Quicksand-Regular',
        fontSize: 16
    }
});
import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import {Image} from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;

export default function WaiterProductListItem({product, amount, onAmountChanged}) {
    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{product?.name}</Text>
            </View>


            <View style={styles.numberInputContainer} >
                <InputSpinner
                    max={100}
                    min={0}
                    step={1}
                    value={amount}
                    onIncrease={onAmountChanged}
                    onDecrease={onAmountChanged}
                    editable={false}
                    style={styles.numberInput}
                    color='#741922'
                    rounded={false}
                    showBorder={true}
                    inputStyle={styles.inputText}
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: WIDTH / 2.6,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        borderColor: '#741922'
    },
 

    titleContainer: {
        flex: 3,
        //backgroundColor: 'blue'
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 3,
        paddingRight: 3
    },

    titleText: {
        fontSize: 19,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },

    numberInputContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        width: '90%',
    },

    numberInput: {
        width: '100%',
    },

    inputText: {
        fontWeight: 'bold',
        fontSize: 18
    }
})
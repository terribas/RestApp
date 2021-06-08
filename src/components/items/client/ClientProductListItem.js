import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import {Image} from 'react-native-elements';
export default function ClientProductListItem({product, amount, onAmountChanged}) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: product.image_url}} PlaceholderContent={<ActivityIndicator />} />               
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{product?.name}</Text>
                </View>
                <View style={styles.descriptionContainer} >
                    <Text style={styles.descriptionText}>{product.description ?? ''}</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>{product.price.toFixed(2) + ' €'}</Text>
                    </View>
                    <View style={styles.numberInputContainer} >
                        <InputSpinner
                            max={10}
                            min={0}
                            step={1}
                            value={amount}
                            onIncrease={onAmountChanged}
                            onDecrease={onAmountChanged}
                            editable={false}
                            style={styles.numberInput}
                            height={35}
                            color='#741922'
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 8,
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#DCDCDC',
        //shadowColor: "#000",
        //shadowOffset: {
        //    width: 0,
        //    height: 1,
        //},
        //shadowOpacity: 0.22,
        //shadowRadius: 2.22,
        //elevation: 3
    },
    imageContainer: {
        flex: 4,
        borderRadius: 15,
        backgroundColor: '#F5F5F5'
        //backgroundColor: 'green'
    },
    rightContainer: {
        flex: 6,
        paddingLeft: 20
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderRadius: 15
    },
    titleContainer: {
        flex: 2,
        //backgroundColor: 'blue'
    },

    titleText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18
    },

    descriptionContainer: {
        flex: 6,
        paddingTop: 5,
        //backgroundColor: 'green'
    },

    descriptionText: {
        fontFamily: 'Montserrat-Light'
    },

    bottomContainer: {
        flex: 2,
        flexDirection: 'row',
        //backgroundColor: 'red'
    },

    numberInputContainer: {
        flex: 2,
        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        //backgroundColor: 'blue'
    },

    priceContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },


    priceText: {
        fontFamily: 'Montserrat-Medium'
    },



    numberInput: {
        width: '100%'
    }
});
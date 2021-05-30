import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ClientCartListItem({product, newCategory}) {
    if (newCategory) {
        return (
            <View style={styles.containerWithCategory}>
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>{product.category}</Text>
                </View>

                <View style={styles.productWithCategoryContainer}>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountText}>{product?.amount + ''}</Text>
                    </View>

                    <View style={styles.productContainer}>
                        <Text style={styles.productText}>{product?.name}</Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>
                            {(product?.price * product?.amount).toFixed(2) + ' €'}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.amountContainer}>
                <Text style={styles.amountText}>{product?.amount + ''}</Text>
            </View>

            <View style={styles.productContainer}>
                <Text style={styles.productText}>{product?.name}</Text>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>
                    {(product?.price * product?.amount).toFixed(2) + ' €'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    containerWithCategory: {
        flex: 1,
        height: 75,
        marginTop: 20,
        borderBottomWidth: 0.4,
        justifyContent: 'center'
    },

    categoryContainer: {
        flex: 1,
        height: 30,
        //backgroundColor: 'red',
        paddingLeft: 8,
        justifyContent: 'center'
    },

    categoryText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 17,
        color: '#741922'
    },

    productWithCategoryContainer: {
        flex: 2,
        //backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        height: 45,
        borderBottomWidth: 0.4,
        justifyContent: 'center',
        //alignItems: 'center'
    },

    amountContainer: {
        flex: 1,
        //backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
    },

    amountText: {
        fontFamily: 'Montserrat-Medium'
    },

    productContainer: {
        flex: 8,
        //backgroundColor: 'lightgreen',
        justifyContent: 'center',
    },

    productText: {
        fontFamily: 'Montserrat-Regular'
    },

    priceContainer: {
        flex: 2,
        //backgroundColor: 'gray',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 8
    },

    priceText: {
        fontFamily: 'Montserrat-Medium'
    }
});
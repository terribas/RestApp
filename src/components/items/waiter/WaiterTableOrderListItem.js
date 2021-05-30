import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements'


export default function WaiterTableOrderListItem({order}) {

    const productsOrdered = order.products.sort((a, b) => (
        a.zone - b.zone
    ));

    const total = parseFloat(order.products.reduce((sum, product) => (
        sum + ((product.price ?? 0) * (product.amount ?? 0))
    ), 0)).toFixed(2);


    return (
        <View style={[styles.container, order.user.role === 'waiter' ? {backgroundColor: lightblue} : {}]}>
            <View style={styles.titleContainer}>
                <View style={styles.nameContainer}>
                    <Icon name='person'/>
                    <Text> {order.user.name} {order.user.lastName}</Text>
                </View>

                <View style={styles.dateContainer}>
                </View>
                
            </View>

            <View style={styles.productsContainer}>
                {productsOrdered.map((product) => (
                    <View style={[styles.itemContainer, product.zone == 1 && !order.bar_delivered || product.zone == 2 && !order.kitchen_delivered ? {backgroundColor: '#FF8484'} : {}]}>
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
                ))}

                <View style={styles.itemContainer}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total:</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.totalText}>{total + ' €'}</Text>
                    </View>
                </View>
            </View>

        </View>
    );
}







const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1.2,
        borderRadius: 4,

        marginTop: 15,
        marginBottom: 8,

        marginLeft: 10,
        marginRight: 10,

        borderColor: '#741922'
    },

    titleContainer: {
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    nameContainer: {
        flex: 7,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 6
    },

    dateContainer: {
        flex: 3
    },

    productsContainer: {
        height: undefined
    },

    itemContainer: {
        flex: 1,
        flexDirection: 'row',

        height: 32,
        borderTopWidth: 0.2
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
        fontFamily: 'Montserrat-Regular',
        fontSize: 15
    },

    priceContainer: {
        flex: 2,
        //backgroundColor: 'gray',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 8
    },


    totalContainer: {
        flex: 9,
        paddingRight: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    totalText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15
    },

    priceText: {
        fontFamily: 'Montserrat-Medium'
    }
});
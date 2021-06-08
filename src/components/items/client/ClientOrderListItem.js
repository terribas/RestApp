import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tr from 'src/language/utils';

export default function ClientOrderListItem({order}) {

    const productsOrdered = order.products.sort((a, b) => (
        a.zone - b.zone
    ));

    const theDate = () => {
        const date = new Date(order.date);
        if (date.getTime() > Date.now() - 1000 * 60 * 60) {
            return Math.round(((Date.now() - date.getTime()) / 1000) / 60) + ' min'
        } else {
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            const hh = date.getHours();
            const mm = date.getMinutes();
            //return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year.toString().substr(-2);

            return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + ' ' + (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={styles.nameContainer}>
                    <MaterialCommunityIcons name='table-chair' style={{fontSize: 20}}/>
                    <Text style={styles.titleText}>  {tr("mesa")} {order.table.table_number}</Text>
                </View>

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{theDate()} </Text>
                    <MaterialCommunityIcons name='calendar-range' style={{fontSize: 20}}/>
                </View>
                
            </View>

            <View style={styles.productsContainer}>
                {productsOrdered.map((product) => (
                    <View style={styles.itemContainer}>
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
                        <Text style={styles.totalText}>{order.total.toFixed(2) + ' €'}</Text>
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

        //marginLeft: 10,
        //marginRight: 10,

        borderColor: '#741922',
    },

    titleContainer: {
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    titleText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15
    },

    nameContainer: {
        flex: 7,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 6
    },

    dateContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 8
    },

    dateText: {
        fontFamily: 'Montserrat-Medium'
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
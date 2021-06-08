import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import {CLIENT_WELCOME, CLIENT_CONFIRM_ORDER} from 'src/consts/screens';
import {API_URL} from 'src/consts/server';
import useProductContext from 'src/hooks/useProductContext';
import {Chip} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import ClientProductListItem from 'src/components/items/client/ClientProductListItem';
import ClientCategoryListItem from 'src/components/items/client/ClientCategoryListItem'
import tr from 'src/language/utils';
import Buttons from 'src/components/Buttons';



export default function ProductsScreen({navigation, route}) {

    const {table} = route.params;

    //const [products, setProducts] = useState([]);
    const {isSuccess, isLoading, products} = useProductContext();
    const [categories, setCategories] = useState(['']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([0]);


    const totalAmount = parseInt(cart.reduce((sum, product) => ((product.amount ?? 0) + sum), 0));
    const totalPrice = parseFloat(cart.reduce((sum, product) => ((product.price ?? 0) * (product.amount ?? 0) + sum), 0));


    function handleCancelOrder() {
        Alert.alert(tr("cancelar_pedido"), tr("confirma_cancelar_pedido"), [
            {
                text: tr("seguir_pidiendo"),
                style: 'cancel'
            },
            {
                text: tr("cancelar_pedido"),
                onPress: () => {navigation.navigate(CLIENT_WELCOME)}
                
            }
        ])
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableHighlight onPress={handleCancelOrder} underlayColor='white'>
                <Icon style={{color: '#741922', fontSize: 25, marginLeft: 10}} name="arrow-left"/>
                </TouchableHighlight>
            )
        })
    });

    
    useEffect(function() {
        setCart([]);
        if (isSuccess) {
            const cats = [];
            products.sort((a, b) => (a.zone - b.zone))
            products.forEach(product => {
                product.amount = 0;
                if (!cats.some(cat => cat === product.category)) {
                    cats.push(product.category);
                }
            });

            const productsCopy = [...products];
            setCart(productsCopy);
            
            setCategories(cats);
            setSelectedCategory(cats[0]);
        }
    }, []);


    function setProductInCart(id, amount) {
        const cartCopy = [...cart];
        for (var i in cartCopy) {
            if (cartCopy[i].id === id) {
                cartCopy[i].amount = amount;
                break;
            }
        }
        setCart(cartCopy);
    }


    function handleOnConfirmPress() {
        const cartCopy = [...cart];

        const cleanCart = cartCopy.filter(product => (product.amount > 0));

        console.log('carrito limpio ' + JSON.stringify(cleanCart));

        navigation.navigate(CLIENT_CONFIRM_ORDER, {
            table: table,
            cart: cleanCart,
            total: totalPrice
        });
    }


    
    return (
        <View style={styles.container}>
            <View style={styles.categories} >
                <FlatList
                    data={categories}
                    renderItem={({item}) => (
                        <ClientCategoryListItem
                            category={item}
                            key={item?.name}
                            onPress={() => {setSelectedCategory(item)}}
                            mode={selectedCategory === item ? 'flat' : 'outlined'}
                        />
                    )}
                    keyExtractor={item => item?.name}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.products}>
                <FlatList
                    data={products?.filter(product => (product.category === selectedCategory))}
                    renderItem={({item, index}) => (
                        <ClientProductListItem
                            product={item}
                            key={item.id}
                            amount={cart.find(product => product.id === item.id).amount ?? 0}
                            onAmountChanged={(amount) => {setProductInCart(item.id, amount)}}
                        />
                    )}
                    keyExtractor={item => item.id}
                    style={styles.products}
                    
                    //numColumns={2}
                />
            </View>

            <View style={styles.bottomContainer}>
                <Buttons
                    title={totalAmount == 0 ? tr("annade_producto") : `${totalAmount} ${tr("producto")}${totalAmount > 1 ? 's' : ''} - ${totalPrice.toFixed(2)} €`}
                    onPress={handleOnConfirmPress}
                    disabled={totalAmount == 0}
                />
            </View>

        </View>
    );
    



    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
        //alignItems: 'center',
    },
    categories: {
        marginTop: 10,
        flex: 1
    },
    products: {
        //marginTop: 10,
        flex: 10,
        marginBottom: 8,
        //backgroundColor: 'red',
        
    },
    bottomContainer: {
        flex: 1.5,
        paddingLeft: 8,
        paddingRight: 8,
        //backgroundColor: 'red',
        justifyContent: 'center',
    }
});
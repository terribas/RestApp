import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet, Alert} from 'react-native';
import {CLIENT_WELCOME, CLIENT_CONFIRM_ORDER} from 'src/consts/screens';
import {API_URL} from 'src/consts/server';
import useProductContext from 'src/hooks/useProductContext';
import {Chip} from 'react-native-elements';

import ClientProductListItem from 'src/components/items/client/ClientProductListItem';
import ClientCategoryListItem from 'src/components/items/client/ClientCategoryListItem'

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
        Alert.alert('Cancelar pedido', '¿Seguro que quieres cancelar el pedido?', [
            {
                text: 'Seguir pidiendo',
                style: 'cancel'
            },
            {
                text: 'Cancelar',
                onPress: () => {navigation.navigate(CLIENT_WELCOME)}
                
            }
        ])
    }


    useLayoutEffect(function() {
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    color='#741922'
                    onPress={handleCancelOrder}
                    title="Cancelar"
                />
            )
        })
    });

    
    useEffect(function() {
        setCart([]);
        if (isSuccess) {
            const cats = [];
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
                            key={item.id}
                            onPress={() => {setSelectedCategory(item)}}
                            mode={selectedCategory === item ? 'flat' : 'outlined'}
                        />
                    )}
                    keyExtractor={item => item.name}
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
                    title={totalAmount == 0 ? 'Añade productos a tu pedido' : `${totalAmount} Producto${totalAmount > 1 ? 's' : ''} - ${totalPrice.toFixed(2)} €`}
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
        flex: 12,
        marginBottom: 8,
        //backgroundColor: 'red',
        
    },
    bottomContainer: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        //backgroundColor: 'red',
        justifyContent: 'center',
    }
});
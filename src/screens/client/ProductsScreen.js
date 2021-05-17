import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {CLIENT_CONFIRM_ORDER} from 'src/consts/screens';
import {API_URL} from 'src/consts/server';
import useProductContext from 'src/hooks/useProductContext';
import {Chip} from 'react-native-elements';

import ClientProductListItem from 'src/components/items/client/ClientProductListItem';
import ClientCategoryListItem from 'src/components/items/client/ClientCategoryListItem'


export default function ProductsScreen({navigation, route}) {

    //const [products, setProducts] = useState([]);
    const {isSuccess, isLoading, products} = useProductContext();
    const [categories, setCategories] = useState(['']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]);

    

    useEffect(function() {
        if (isSuccess) {
            const cats = [];
            products.forEach(product => {
                if (!cats.some(cat => cat.id === product.category.id)) {
                    cats.push(product.category);
                }
            });

            const productsCopy = [...products];
            setCart(productsCopy);
            
            setCategories(cats);
            setSelectedCategory(cats[0].id);
        }
    }, []);


    function setProductInCart(id, amount) {
        console.log('he entrado en setproduct');

        const cartCopy = [...cart];
        for (var i in cartCopy) {
            if (cartCopy[i].id === id) {
                cartCopy[i].amount = amount;
                break;
            }
        }
        
        console.log(cartCopy);
        setCart(cartCopy);

        console.log('El cart es ' + JSON.stringify(cart));
    }

    
    function getCurrentAmount(id) {
        //console.log('id recibido ' + id);
        console.log('he entrado en getCurrentAmount');

        
        cart.forEach(product => {
            //console.log('tengo ' + product.id + ' y como parametro ' + id);
            if (product.id === id) {
                console.log("si coincide");
                console.log('El amount de funcion es ' + product.amount );

                return product.amount ?? 0;
            } else {
                console.log(product.id + ' no coincide con ' + id);
            }
        });

        return 0;
        
        /*
        for (var i in cart){
            if (cart[i])
        }*/
    }

    /*
    useEffect(function() {
        async function fetchData() {
            const response = await fetch(`${API_URL}/product`);
            const json = await response.json();
            setProducts(json);

            const cats = [];
            json.forEach(product => {
                if (!cats.some(cat => cat.id === product.category.id)) {
                    console.log('categoria' + product.category.id + product.category.name + 'no estaba')
                    cats.push(product.category);
                }
            });
            
            setCategories(cats);
            setSelectedCategory(cats[0].id);

            console.log(products);
            console.log(categories);
        }
        fetchData();
    }, []);
    */
    

    function handleOnPress() {
        navigation.navigate(CLIENT_CONFIRM_ORDER);
    }

    return (
        <View style={styles.container}>
            <View style={styles.categories} >
                <FlatList
                    data={categories}
                    renderItem={({item}) => (
                        
                        <ClientCategoryListItem
                            category={item}
                            onPress={() => {setSelectedCategory(item.id)}}
                            type={selectedCategory === item.id ? 'solid' : 'outline'}
                        />
                    )}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.products}>
                <FlatList
                    data={products?.filter(product => (product.category.id === selectedCategory))}
                    renderItem={({item, index}) => {
                        //if (item.category.id === selectedCategory) {
                            return (
                                <ClientProductListItem
                                    product={item}
                                    key={item.id}
                                    amount={() => getCurrentAmount(item.id)}
                                    onAmountChanged={(amount) => {setProductInCart(item.id, amount)}}
                                />
                            );
                        //} else {
                        //    return null;
                        //}
                        
                    }}
                    keyExtractor={item => item.id}
                    style={styles.products}
                    
                    //numColumns={2}
                />
            </View>

            <View style={styles.bottomContainer}>
                <Chip title="Precio" onPress={() => {
                    console.log(cart);
                    console.log('Patatas bravas ' + getCurrentAmount("60993ede4f1e893f310cfc70"));
                }} />
            </View>

            {/*<Button onPress={handleOnPress} title="Siguiente pantalla" />*/}

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
        backgroundColor: 'red',
        
    },
    bottomContainer: {
        flex: 1
        //justifyContent: 'flex-end'
    }
});
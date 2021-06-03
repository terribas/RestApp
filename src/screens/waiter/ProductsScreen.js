import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {WAITER_CONFIRM_ORDER} from 'src/consts/screens';
import {API_URL} from 'src/consts/server';
import useProductContext from 'src/hooks/useProductContext';
import {Chip} from 'react-native-elements';

import WaiterProductListItem from 'src/components/items/waiter/WaiterProductListItem';
import WaiterCategoryListItem from 'src/components/items/waiter/WaiterCategoryListItem'
import tr from 'src/language/utils';

import Buttons from 'src/components/Buttons';

//import Category from 'react-native-category';


export default function ProductsScreen({navigation, route}) {

    //const [products, setProducts] = useState([]);
    const {isSuccess, isLoading, products} = useProductContext();
    const [categories, setCategories] = useState(['']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([0]);

    const totalAmount = parseInt(cart.reduce((sum, product) => ((product.amount ?? 0) + sum), 0));
    
    useEffect(function() {
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
    }


    function handleOnConfirmPress() {
        navigation.navigate(WAITER_CONFIRM_ORDER);
    }


    
    return (
        <View style={styles.container}>
            <View style={styles.categories} >
                <FlatList
                    data={categories}
                    renderItem={({item}) => (
                        
                        <WaiterCategoryListItem
                            category={item}
                            key={item}
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
                        <WaiterProductListItem
                            product={item}
                            key={item.id}
                            amount={cart.find(product => product.id === item.id).amount ?? 0}
                            onAmountChanged={(amount) => {setProductInCart(item.id, amount)}}
                        />
                    )}
                    keyExtractor={item => item.id}
                    style={styles.products}
                    
                    numColumns={2}
                />
            </View>

            <View style={styles.bottomContainer}>
                <Buttons
                    title={totalAmount == 0 ? tr("annade_productos_waiter") : `${totalAmount} ${tr("producto")}${totalAmount > 1 ? 's' : ''}`}
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
        marginBottom: 3,
        flex: 1,
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
        paddingRight: 8
        //justifyContent: 'flex-end'
    }
});
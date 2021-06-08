import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {WAITER_TABLE_DETAILS} from 'src/consts/screens';
import {API_URL} from 'src/consts/server';



import useAuthContext from 'src/hooks/useAuthContext';

import useTableContext from 'src/hooks/useTableContext';

import WaiterTableListItem from 'src/components/items/waiter/WaiterTableListItem';


export default function TablesScreen({navigation, route}) {
    const {logOut} = useAuthContext();
    const {isSuccess, isLoading, tables} = useTableContext();

    
    function handleOnTablePress(table) {
        navigation.navigate(WAITER_TABLE_DETAILS, {table});
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={isSuccess ? tables : []}
                renderItem={({item, index}) => (
                    <WaiterTableListItem
                        table={item}
                        numColumns={2}
                        onPress={() => {handleOnTablePress(item)}}
                    />
                )}
                keyExtractor={item => item._id}
                numColumns={3}

                style={{
                    flex: 1
                }}
            />
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
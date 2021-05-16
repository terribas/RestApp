import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SCREEN from 'src/consts/screens';

import TablesScreen from 'src/screens/waiter/TablesScreen';
import TableDetailsScreen from 'src/screens/waiter/TableDetailsScreen';
import ProductsScreen from 'src/screens/waiter/ProductsScreen';
import OrderConfirmationScreen from 'src/screens/waiter/OrderConfirmationScreen';


const RootWaiterStack = createStackNavigator();

export default function WaiterLoggedInScreens() {
    return (
        <RootWaiterStack.Navigator>
            <RootWaiterStack.Screen name={SCREEN.WAITER_TABLES_LIST} component={TablesScreen} options={{title: 'Mesas'}} />
            <RootWaiterStack.Screen name={SCREEN.WAITER_TABLE_DETAILS} component={TableDetailsScreen} options={{title: 'Mesa'}} />
            <RootWaiterStack.Screen name={SCREEN.WAITER_PRODUCTS} component={ProductsScreen} options={{title: 'Comanda'}} />
            <RootWaiterStack.Screen name={SCREEN.WAITER_CONFIRM_ORDER} component={OrderConfirmationScreen} options={{title: 'Confirmar comanda'}} />
        </RootWaiterStack.Navigator>
    );
}
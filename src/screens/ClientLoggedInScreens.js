import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SCREEN from 'src/consts/screens';


import WelcomeScreen from 'src/screens/client/WelcomeScreen';
import ScanScreen from 'src/screens/client/ScanScreen';
//import CategoriesScreen from 'src/screens/client/CategoriesScreen';
import ProductsScreen from 'src/screens/client/ProductsScreen';
import OrderConfirmationScreen from 'src/screens/client/OrderConfirmationScreen';

import ProfileScreen from 'src/screens/client/ProfileScreen';


const Tab = createBottomTabNavigator();


const OrderRootStack = createStackNavigator();
const ProfileRootStack = createStackNavigator();



function OrderRootStackScreen() {
    return (
        <OrderRootStack.Navigator>
            <OrderRootStack.Screen name={SCREEN.CLIENT_WELCOME} component={WelcomeScreen} options={{title: 'Bienvenido'}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_SCAN} component={ScanScreen} options={{title: 'Mesa'}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_PRODUCTS} component={ProductsScreen} options={{title: 'Carta'}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_CONFIRM_ORDER} component={OrderConfirmationScreen} options={{title: 'Confirmar pedido'}} />
        </OrderRootStack.Navigator>
    );
}


function ProfileRootStackScreen() {
    return (
        <ProfileRootStack.Navigator>
            <ProfileRootStack.Screen name={SCREEN.CLIENT_PROFILE} component={ProfileScreen} options={{name: 'Perfil'}} />
        </ProfileRootStack.Navigator>
    );
}



export default function ClientLoggedInScreens() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='OrderTab' component={OrderRootStackScreen} options={{title: 'Pedir'}} />
            <Tab.Screen name='ProfileTab' component={ProfileRootStackScreen} options={{title: 'Perfil'}} />
        </Tab.Navigator>
    );
}

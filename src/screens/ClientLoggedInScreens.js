import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SCREEN from 'src/consts/screens';


import WelcomeScreen from 'src/screens/client/WelcomeScreen';
import ScanScreen from 'src/screens/client/ScanScreen';
//import CategoriesScreen from 'src/screens/client/CategoriesScreen';
import ProductsScreen from 'src/screens/client/ProductsScreen';
import OrderConfirmationScreen from 'src/screens/client/OrderConfirmationScreen';
import PaymentScreen from 'src/screens/client/PaymentScreen';

import ProfileScreen from 'src/screens/client/ProfileScreen';
import EditProfileScreen from 'src/screens/client/EditProfileScreen';
import PaymentMethodScreen from 'src/screens/client/PaymentMethodScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();


const OrderRootStack = createStackNavigator();
const ProfileRootStack = createStackNavigator();



function OrderRootStackScreen() {
    return (
        <OrderRootStack.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: 'Montserrat-Bold',
                fontWeight: 'bold',
            }}}
        >
            <OrderRootStack.Screen name={SCREEN.CLIENT_WELCOME} component={WelcomeScreen} options={{title: 'Bienvenido'}} />



            <OrderRootStack.Screen name={SCREEN.CLIENT_SCAN} component={ScanScreen} options={{title: 'Mesa'}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_PRODUCTS} component={ProductsScreen} options={{title: 'Carta'}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_CONFIRM_ORDER} component={OrderConfirmationScreen} options={{title: 'Confirmar pedido'}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_PAYMENT} component={PaymentScreen} options={{title: 'Pagar'}} />
        </OrderRootStack.Navigator>
    );
}


function ProfileRootStackScreen() {
    return (
        <ProfileRootStack.Navigator>
            <ProfileRootStack.Screen name={SCREEN.CLIENT_PROFILE} component={ProfileScreen} options={{title: 'Perfil'}} />
            <ProfileRootStack.Screen name={SCREEN.CLIENT_EDIT_PROFILE} component={EditProfileScreen} options={{title: 'Perfil'}} />
            <ProfileRootStack.Screen name={SCREEN.CLIENT_PAYMENT_METHOD} component={PaymentMethodScreen} options={{title: 'Perfil'}} />
        </ProfileRootStack.Navigator>
    );
}



export default function ClientLoggedInScreens() {
    return (
        <Tab.Navigator tabBarOptions={{
            
            labelStyle: {
                //color: '#fff',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 11
            },

            activeTintColor: '#741922',
            
        }}
        >
            <Tab.Screen
                name='OrderTab'
                component={OrderRootStackScreen}
                options={{
                    title: 'Pedir',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="food-fork-drink" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name='ProfileTab'
                component={ProfileRootStackScreen}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

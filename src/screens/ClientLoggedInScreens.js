import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SCREEN from 'src/consts/screens';
import WelcomeScreen from 'src/screens/client/WelcomeScreen';
import ScanScreen from 'src/screens/client/ScanScreen';
import ProductsScreen from 'src/screens/client/ProductsScreen';
import OrderConfirmationScreen from 'src/screens/client/OrderConfirmationScreen';
import PaymentScreen from 'src/screens/client/PaymentScreen';
import ProfileScreen from 'src/screens/client/ProfileScreen';
import EditProfileScreen from 'src/screens/client/EditProfileScreen';
import PaymentMethodScreen from 'src/screens/client/PaymentMethodScreen';
import ChangePasswordScreen from 'src/screens/client/ChangePasswordScreen';
import OrderListScreen from 'src/screens/client/OrderListScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tr from 'src/language/utils';

const Tab = createBottomTabNavigator();


const OrderRootStack = createStackNavigator();
const ProfileRootStack = createStackNavigator();

function OrderRootStackScreen() {
    return (
        <OrderRootStack.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: 'Montserrat-Bold',
                fontWeight: 'bold',
            }
        }}>
            <OrderRootStack.Screen name={SCREEN.CLIENT_WELCOME} component={WelcomeScreen} options={{title: tr("bienvenido")}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_SCAN} component={ScanScreen} options={{title: tr("bienvenido")}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_PRODUCTS} component={ProductsScreen} options={{title: tr("carta")}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_CONFIRM_ORDER} component={OrderConfirmationScreen} options={{title: tr("confirmar_pedido")}} />
            <OrderRootStack.Screen name={SCREEN.CLIENT_PAYMENT} component={PaymentScreen} options={{title: tr("pagar_lc")}} />
        </OrderRootStack.Navigator>
    );
}

function ProfileRootStackScreen() {
    return (
        <ProfileRootStack.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: 'Montserrat-Bold',
                fontWeight: 'bold',
        }}}>
            <ProfileRootStack.Screen name={SCREEN.CLIENT_PROFILE} component={ProfileScreen} options={{title: tr("tab_bar_perfil")}} />
            <ProfileRootStack.Screen name={SCREEN.CLIENT_EDIT_PROFILE} component={EditProfileScreen} options={{title: tr("editar_perfil")}} />
            <ProfileRootStack.Screen name={SCREEN.CLIENT_PAYMENT_METHOD} component={PaymentMethodScreen} options={{title: tr("mi_tarjeta")}} />
            <ProfileRootStack.Screen name={SCREEN.CLIENT_ORDER_LIST} component={OrderListScreen} options={{title: tr("mis_pedidos")}} />
            <ProfileRootStack.Screen name={SCREEN.CLIENT_CHANGE_PASSWORD} component={ChangePasswordScreen} options={{title: tr("cambiar_pw")}} />
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
                    title: tr("tab_bar_pedir"),
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="food-fork-drink" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name='ProfileTab'
                component={ProfileRootStackScreen}
                options={{
                    title: tr("tab_bar_perfil"),
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

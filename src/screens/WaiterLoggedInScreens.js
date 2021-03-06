import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SCREEN from 'src/consts/screens';

import TablesScreen from 'src/screens/waiter/TablesScreen';
import TableDetailsScreen from 'src/screens/waiter/TableDetailsScreen';
import ProductsScreen from 'src/screens/waiter/ProductsScreen';
import OrderConfirmationScreen from 'src/screens/waiter/OrderConfirmationScreen';
import SettingsScreen from 'src/screens/waiter/SettingsScreen';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {TableContextProvider} from 'src/contexts/TableContext';


import useAuthContext from 'src/hooks/useAuthContext';
import tr from 'src/language/utils';
import WaiterChangePasswordScreen from './waiter/WaiterChangePasswordScreen';

const RootWaiterStack = createStackNavigator();
function RootWaiterStackScreen() {
    return (
        <RootWaiterStack.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: 'Montserrat-Bold',
                fontWeight: 'bold',
            }
        }}>
            <RootWaiterStack.Screen name={SCREEN.WAITER_TABLES_LIST} component={TablesScreen} options={{title: tr("tab_bar_mesas")}} />
            <RootWaiterStack.Screen name={SCREEN.WAITER_TABLE_DETAILS} component={TableDetailsScreen} options={{title: tr("mesa")}} />
            <RootWaiterStack.Screen name={SCREEN.WAITER_PRODUCTS} component={ProductsScreen} options={{title: tr("comanda")}} />
            <RootWaiterStack.Screen name={SCREEN.WAITER_CONFIRM_ORDER} component={OrderConfirmationScreen} options={{title: tr("confirmar_comanda")}} />
        </RootWaiterStack.Navigator>
    );
}



const RootSettingsStack = createStackNavigator();
function RootSettingsStackScreen() {
    return (
        <RootSettingsStack.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: 'Montserrat-Bold',
                fontWeight: 'bold',
            }
        }}>
            <RootWaiterStack.Screen name={SCREEN.WAITER_SETTINGS} component={SettingsScreen} options={{title: tr("tab_bar_perfil")}}/>
            <RootWaiterStack.Screen name={SCREEN.WAITER_CHANGE_PASSWORD} component={WaiterChangePasswordScreen} options={{title: tr("cambiar_pw")}}/>
        </RootSettingsStack.Navigator>
    );
}



const Tab = createBottomTabNavigator();






export default function WaiterLoggedInScreens() {
    return (
        <TableContextProvider>
            <Tab.Navigator tabBarOptions={{
            
                labelStyle: {
                    //color: '#fff',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 11
                },

                activeTintColor: '#741922',
                
            }}>
                <Tab.Screen
                    name='WaiterTab'
                    component={RootWaiterStackScreen}
                    options={{
                        title: tr("tab_bar_mesas"),
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="table-chair" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name='SettingsTab' component={RootSettingsStackScreen} options={{
                        title: tr("tab_bar_opciones"),
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="account-cog" color={color} size={size} />
                        )
                    }}
                />
            </Tab.Navigator>
        </TableContextProvider>
    );
}
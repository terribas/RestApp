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

const RootWaiterStack = createStackNavigator();
function RootWaiterStackScreen() {
    return (
        <RootWaiterStack.Navigator>
            <RootWaiterStack.Screen name={SCREEN.WAITER_TABLES_LIST} component={TablesScreen} options={{title: 'Mesas'}} />
            <RootWaiterStack.Screen name={SCREEN.WAITER_TABLE_DETAILS} component={TableDetailsScreen} options={{title: 'Mesa'}} />
            <RootWaiterStack.Screen name={SCREEN.WAITER_PRODUCTS} component={ProductsScreen} options={{title: 'Comanda'}} />
            <RootWaiterStack.Screen name={SCREEN.WAITER_CONFIRM_ORDER} component={OrderConfirmationScreen} options={{title: 'Confirmar comanda'}} />
        </RootWaiterStack.Navigator>
    );
}



const RootSettingsStack = createStackNavigator();
function RootSettingsStackScreen() {
    return (
        <RootSettingsStack.Navigator>
            <RootWaiterStack.Screen name={SCREEN.WAITER_SETTINGS} component={SettingsScreen} />
        </RootSettingsStack.Navigator>
    );
}



const Tab = createBottomTabNavigator();






export default function WaiterLoggedInScreens() {
    return (
        <TableContextProvider>
            <Tab.Navigator>
                <Tab.Screen
                    name='WaiterTab'
                    component={RootWaiterStackScreen}
                    options={{
                        title: 'Mesas',
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="table-chair" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name='SettingsTab' component={RootSettingsStackScreen} options={{
                        title: 'Opciones',
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="account-cog" color={color} size={size} />
                        )
                    }}
                />
            </Tab.Navigator>
        </TableContextProvider>
    );
}
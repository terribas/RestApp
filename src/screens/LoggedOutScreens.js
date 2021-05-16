import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import * as SCREEN from 'src/consts/screens';

import LoginScreen from 'src/screens/loggedOut/LoginScreen';
import RegisterScreen from 'src/screens/loggedOut/RegisterScreen';

const LoggedOutStack = createStackNavigator();


export default function LoggedOutScreens() {
    return (
        <LoggedOutStack.Navigator>
            <LoggedOutStack.Screen name={SCREEN.LOGIN} component={LoginScreen} options={{title: 'Iniciar sesión'}} />
            <LoggedOutStack.Screen name={SCREEN.REGISTER} component={RegisterScreen} options={{title: 'Registro'}} />
        </LoggedOutStack.Navigator>
    );
}
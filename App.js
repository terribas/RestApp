import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContextProvider} from 'src/contexts/AuthContext';


//import { SafeAreaProvider } from 'react-native-safe-area-context';
// <SafeAreaProvider>

import LoginScreen from 'src/screens/loggedOut/LoginScreen';

import SwitchAuthScreens from 'src/screens/SwitchAuthScreens';



export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <SwitchAuthScreens />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
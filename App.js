import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContextProvider} from 'src/contexts/AuthContext';

// #741922
//import { SafeAreaProvider } from 'react-native-safe-area-context';
// <SafeAreaProvider>

import LoginScreen from 'src/screens/loggedOut/LoginScreen';

import SwitchAuthScreens from 'src/screens/SwitchAuthScreens';

import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {ProductContextProvider} from './src/contexts/ProductContext';


/*
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
*/

export default function App() {
  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <ProductContextProvider>
          <NavigationContainer>
            <SwitchAuthScreens />
          </NavigationContainer>
        </ProductContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
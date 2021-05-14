/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// asdf comentario by gabri
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


//import { SafeAreaProvider } from 'react-native-safe-area-context';
// <SafeAreaProvider>

import LoginScreen from 'src/screens/loggedOut/LoginScreen';



export default function App() {
  return (
    <SafeAreaView>
      <LoginScreen />
    </SafeAreaView>
  );
}
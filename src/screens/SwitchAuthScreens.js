import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import useAuthContext from 'src/hooks/useAuthContext';
import ClientLoggedInScreens from 'src/screens/ClientLoggedInScreens';
import WaiterLoggedInScreens from 'src/screens/WaiterLoggedInScreens';
import LoggedOutScreens from 'src/screens/LoggedOutScreens';
import {CLIENT_LOGGED_IN, WAITER_LOGGED_IN, LOADING} from 'src/contexts/AuthContext';
import LoadingScreen from 'src/screens/status/LoadingScreen';
import tr from 'src/language/utils';



export default function SwitchAuthScreens(props) {

    const {loggedState} = useAuthContext();

    if (loggedState === LOADING) {
        return (
            <SafeAreaView>
                <LoadingScreen message={tr("loading")} />
            </SafeAreaView>
        );
    } else if (loggedState === CLIENT_LOGGED_IN){
        return <ClientLoggedInScreens />;
    } else if (loggedState === WAITER_LOGGED_IN){
        return <WaiterLoggedInScreens />;
    } else {
        return <LoggedOutScreens />;
    }
}
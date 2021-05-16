import React, {useReducer, useCallback, createContext, useMemo, useEffect} from 'react';
import storage from 'src/services/storage';

const AuthContext = createContext();

export default AuthContext;

export const CLIENT_LOGGED_IN = 'CLIENT_LOGGED_IN';
export const WAITER_LOGGED_IN = 'WAITER_LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOADING = 'LOADING';


const APP_LOGGED_KEY = 'restapp.logged_key';
const AUTH_TOKEN_KEY = 'restapp.auth_token';


const CLIENT_LOGIN = 'CLIENT_LOGIN';
const WAITER_LOGIN = 'WAITER_LOGIN';
const LOGOUT = 'LOGOUT';
const SET_STATE = 'SET_STATE'; 


function authStateReducer(currentState, action) {
    switch (action.type) {
        case CLIENT_LOGIN:
            return CLIENT_LOGGED_IN;
        case WAITER_LOGIN:
            return WAITER_LOGGED_IN;
        case LOGOUT:
            return LOGGED_OUT;
        case SET_STATE:
            return action.payload;
        default:
            return currentState;
    }
}

function tokenStateReducer(currentState, action) {
    switch (action.type) {
        case CLIENT_LOGIN:
        case WAITER_LOGIN:
        case SET_STATE:
            return action.payload;
        default:
            return '';
    }
}



export function AuthContextProvider({children}) {
    const [authState, authDispatch] = useReducer(authStateReducer, LOADING);
    const [tokenState, tokenDispatch] = useReducer(tokenStateReducer, '');

    const clientLogin = useCallback((authToken) => {
        storage.set(APP_LOGGED_KEY, CLIENT_LOGGED_IN);
        storage.set(AUTH_TOKEN_KEY, authToken);
        authDispatch({type: CLIENT_LOGIN});
        tokenDispatch({type: CLIENT_LOGIN, payload: authToken});
    }, []);

    const waiterLogin = useCallback((authToken) => {
        storage.set(APP_LOGGED_KEY, WAITER_LOGGED_IN);
        storage.set(AUTH_TOKEN_KEY, authToken);
        authDispatch({type: WAITER_LOGIN});
        tokenDispatch({type: WAITER_LOGIN, payload: authToken});
    }, []);

    const logOut = useCallback(() => {
        
        storage.set(APP_LOGGED_KEY, LOGGED_OUT);
        storage.set(AUTH_TOKEN_KEY, '');
        authDispatch({type: LOGOUT});
    }, []);


    const contextValue = useMemo(() => ({
        clientLogin,
        waiterLogin,
        logOut,
        loggedState: authState,
        tokenState
    }),
        [clientLogin, waiterLogin, logOut, authState, tokenState]
    );


    useEffect(function() {
        async function fetchState() {
            const authStatus = await storage.get(APP_LOGGED_KEY);
            const tokenStatus = await storage.get(AUTH_TOKEN_KEY);
            authDispatch({type: SET_STATE, payload: authStatus ?? LOGGED_OUT});
            console.log('EL TOKEN STATus ' + tokenStatus);
            tokenDispatch({type: SET_STATE, payload: tokenStatus ?? '' });
        }
        fetchState();
    }, []);

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );

}
import React, {useCallback, useMemo, createContext, useReducer} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {API_URL} from 'src/consts/server';
import useAuthContext from 'src/hooks/useAuthContext';
import storage from 'src/services/storage';

const TableContext = createContext();


const GET_TABLES = 'GET_TABLES';


async function fetchData() {    
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-access-token': await storage.get('restapp.auth_token')
        },
    }

    const response = await fetch(`${API_URL}/table`, options);
    const json = await response.json();
    return json;
}


export function TableContextProvider({children}){

    const queryClient = useQueryClient();
    const invalidateTableListCache = useCallback(function(){
        queryClient.invalidateQueries(GET_TABLES);
    }, []);

    const {isSuccess, isLoading, data: tables} = useQuery(GET_TABLES, fetchData, {refetchInterval: 10000});

    const value = useMemo(
        () => ({
            isSuccess,
            isLoading,
            tables,
            invalidateTableListCache
        }),
        [isSuccess, isLoading, tables, invalidateTableListCache]
    );

    return (
        <TableContext.Provider value={value}>{children}</TableContext.Provider>
    );

}


export default TableContext;
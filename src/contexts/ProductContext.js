import React, {useCallback, useMemo, createContext, useReducer} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {API_URL} from 'src/consts/server';

const ProductContext = createContext();


const GET_PRODUCTS = 'GET_PRODUCTS';


async function fetchData() {
    const response = await fetch(`${API_URL}/product`, {method: 'POST'});
    const json = await response.json();
    return json;
}


export function ProductContextProvider({children}){


    const {isSuccess, isLoading, data} = useQuery(GET_PRODUCTS, fetchData);

    const queryClient = useQueryClient();
    const invalidateProductListCache = useCallback(function(){
        queryClient.invalidateQueries(GET_PRODUCTS);
    }, []);

    const value = useMemo(
        () => ({
            isSuccess,
            isLoading,
            products: data,
            invalidateProductListCache
        }),
        [isSuccess, isLoading, data, invalidateProductListCache]
    );

    return (
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    );

}


export default ProductContext;
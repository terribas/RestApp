import {useQuery} from 'react-query';
import {API_URL} from 'src/consts/server';
import apiAuthFetch from 'src/services/apiAuthFetch';

const GET_TABLE_ORDERS = 'GET_TABLE_ORDERS';


export default function useTableOrders(tableId) {

    async function fetchLastOrders() {
        const response = await apiAuthFetch(`/table/lastorders/${tableId}`);
        const json = await response.json();
        return json;
    }

    return useQuery([GET_TABLE_ORDERS, tableId], fetchLastOrders, {cacheTime: 0});
}
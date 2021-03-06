import {useQuery} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';

const GET_MY_ORDERS = 'GET_SAVED_CARDS';


export default function useMyOrders() {

    async function fetchMyOrders() {
        const response = await apiAuthFetch("/payment/getCard", {method: 'POST'})
        const json = await response.json();
        return json;
    }

    return useQuery(GET_MY_ORDERS, fetchMyOrders, {cacheTime: 0});
}
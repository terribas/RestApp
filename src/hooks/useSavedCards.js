import {useQuery} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';

const GET_SAVED_CARDS = 'GET_SAVED_CARDS';


export default function useSavedCards() {

    async function fetchSavedCards() {
        const response = await apiAuthFetch("/payment/getCard", {method: 'POST'})
        const json = await response.json();
        return json;
    }

    return useQuery(GET_SAVED_CARDS, fetchSavedCards, {cacheTime: 0});
}
import {useQuery, useQueryClient} from 'react-query';
import apiAuthFetch from 'src/services/apiAuthFetch';

const GET_MY_PROFILE = 'GET_MY_PROFILE';


export function useMyProfile() {

    async function fetchMyProfile() {
        const response = await apiAuthFetch("/user/myUser", {method: 'POST'});
        if (!response.ok) throw Error;
        const json = await response.json();
        console.log('perfil de usuario ' + JSON.stringify(json));
        return json;
    }

    return useQuery(GET_MY_PROFILE, fetchMyProfile);
}


export function invalidateMyProfileCache() {
    const queryClient = useQueryClient();
    const invalidateMyProfileCache = useCallback(() => {
        queryClient.invalidateQueries(GET_MY_PROFILE);
    }, []);

    return invalidateMyProfileCache;
}
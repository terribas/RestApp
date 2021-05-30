import {API_URL} from 'src/consts/server';
import {AUTH_TOKEN_KEY} from 'src/contexts/AuthContext';
import storage from 'src/services/storage';


const apiAuthFetch = (function() {
    return async function(path, options) {
        return fetch(`${API_URL}${path}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': await storage.get(AUTH_TOKEN_KEY)
            },
            ...options
        });
    }
})();

export default apiAuthFetch;